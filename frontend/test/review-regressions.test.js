import test from "node:test";
import assert from "node:assert/strict";
import { buildModel, buildCells, cellsFor } from "../src/core/model.js";
import { validatePlan } from "../src/core/validation.js";
import { spillDetail } from "../src/core/evaluate.js";
import * as S from "../src/panel/state.js";
import { PresencePlannerPanel } from "../src/panel/index.js";

const plan = () => ({version:1, floors:[{id:"f", rooms:[{id:"r", points:[[0,0],[2,0],[2,2],[0,2]]}]}]});

test("unsafe geometry, malformed IDs and remote image imports are rejected", () => {
  for (const value of [10000, 1e100, NaN, Infinity]) {
    const p = plan(); p.floors[0].rooms[0].points[1][0] = value;
    assert.throws(() => buildModel(p,"f"));
  }
  assert.throws(() => validatePlan({version:1,floors:[{rooms:[{}]}]}));
  const p = plan(); p.floors[0].background={image:"https://example.invalid/tracker.png"};
  assert.throws(() => validatePlan(p));
  for (const key of ["rooms","walls","openings","furniture","outdoor"]) {
    const p=plan(); p.floors[0][key]=null; assert.throws(()=>validatePlan(p));
  }
});

test("direct and cached grid entry points enforce step and work budgets", () => {
  const m = buildModel(plan(),"f");
  for (const step of [0, -1, NaN, Infinity, Number.MIN_VALUE]) {
    m.cells[String(step)] = [];
    assert.throws(() => buildCells(m,step));
    assert.throws(() => cellsFor(m,step));
  }
  assert.ok(buildCells(m,.25).length);
  m.rooms[0].points = [[0,0],[999,0],[999,.001],[0,999]];
  assert.throws(() => cellsFor(m,.1));
});

test("free wall openings are not cut into room edges", () => {
  const p=plan(); p.floors[0].walls=[{id:"w",a:[1,.5],b:[1,1.5]}];
  p.floors[0].openings=[{id:"d",room_id:"r",edge:0,offset:1,width:.8,type:"door",wall:"w"}];
  assert.deepEqual(buildModel(p,"f").doors,[]);
});

test("live contacts respect inversion and treat unknown states as open", () => {
  const f={openings:[{id:"d",contact:"binary_sensor.d",contact_invert:true}]};
  assert.deepEqual(S.doorsOption("live",f,{"binary_sensor.d":{state:"on"}}),{d:false});
  assert.deepEqual(S.doorsOption("live",f,{"binary_sensor.d":{state:"off"}}),{d:true});
  for(const state of ["unknown","unavailable"]) assert.deepEqual(S.doorsOption("live",f,{"binary_sensor.d":{state}}),{d:true});
});

test("edited floors are selectable and optimizer contexts cannot cross floors or revisions", () => {
  const p=plan(); const s=S.applyLoad(S.initialState(),{source:"own",plan:p,sensors:[{entity_id:"binary_sensor.a",floor_id:"f",x:1,z:1}],revision:1});
  const edited={...p,floors:[...p.floors,{id:"new",rooms:[]}]};
  const next=S.selectFloor(S.setEditPlan(s,edited),"new");
  assert.equal(S.floorOf(next).id,"new");
  assert.equal(next.selected,null);
  assert.equal(S.sameOptimizerContext(S.optimizerContext(s),S.optimizerContext(next)),false);
  assert.equal(S.sameOptimizerContext(S.optimizerContext(s),S.optimizerContext({...s,revision:2})),false);
  assert.equal(S.applyCandidate(next,"binary_sensor.a",{x:99,z:99}),next);
  assert.equal(S.resetChanges(next).floorId,"f");
});

test("a newly selected empty floor has finite bounds matching the Python model", () => {
  const m=buildModel({version:1,floors:[{id:"new",rooms:[]}]},"new");
  assert.deepEqual(m.bounds,{x0:-.4,x1:.4,z0:-.4,z1:.4});
});

test("multi-door spill records every contact independent of opening order", () => {
  const f={id:"f",rooms:[0,1,2].map(i=>({id:String(i),points:[[i*2,0],[i*2+2,0],[i*2+2,2],[i*2,2]]})),openings:[{id:"d1",room_id:"0",edge:1,offset:1,width:1,type:"door"},{id:"d2",room_id:"1",edge:1,offset:1,width:1,type:"door"}]};
  const p={version:1,floors:[f]}; const s={entity_id:"binary_sensor.s",x:1,z:1,height:1.9,phi:0,tilt:0,reach:8,fov_h:360,fov_v:180};
  const a=spillDetail(buildModel(p,"f"),s,{cell:.2})["2"];
  assert.ok(a.door_paths.some(p=>p.doors.join(",")==="d1,d2" && p.share>0));
  f.openings.reverse();
  assert.deepEqual(spillDetail(buildModel(p,"f"),s,{cell:.2})["2"],a);
});

test("panel rejects a late optimizer reply and stale Apply after an editor floor event", async () => {
  const p=plan(); p.floors[0].rooms[0].id="r";
  p.floors.push({...structuredClone(p.floors[0]),id:"b"});
  const panel=new PresencePlannerPanel();
  panel._scheduleEval=()=>{};
  panel._rebuildModel=()=>{panel._model=buildModel(panel._s.editPlan,panel._s.floorId);};
  panel._s=S.applyLoad(S.initialState(),{source:"own",plan:p,revision:1,sensors:[{entity_id:"binary_sensor.a",floor_id:"f",x:1,z:1},{entity_id:"binary_sensor.b",floor_id:"b",x:1,z:1}]});
  panel._rebuildModel();
  let finish;
  panel._runner={cancel(){},run(){return new Promise(resolve=>{finish=resolve;});}};
  const running=panel.runOptimizer(false);
  panel._onFloorSelected({detail:{floorId:"b"}});
  assert.equal(panel._s.floorId,"b");
  finish({r:[{x:90,z:90,height:1.9,phi:0,tilt:10}]});
  await running;
  assert.equal(panel._opt.results,null);
  panel.applyCandidate("binary_sensor.b",{x:90,z:90});
  assert.equal(S.getSensor(panel._s,"binary_sensor.b").x,1);
});

for (const change of ["profile", "cancel", "contact"]) test(`panel rejects stale optimizer reply after ${change}`, async () => {
  const p=plan(); const panel=new PresencePlannerPanel();
  panel._scheduleEval=()=>{};
  panel._s=S.applyLoad(S.initialState(),{source:"own",plan:p,revision:1,sensors:[{entity_id:"binary_sensor.a",floor_id:"f",x:1,z:1}]});
  panel._model=buildModel(p,"f");
  let finish;
  panel._runner={cancel(){},run(){return new Promise(resolve=>{finish=resolve;});}};
  const running=panel.runOptimizer(false);
  if(change==="profile") panel.setOpt({profileId:"another"});
  else if(change==="cancel") panel.cancelOptimizer();
  else {
    panel._s={...panel._s,doorsMode:"live"};
    const connection={}; panel._client={connection};
    panel.hass={language:"en",themes:{darkMode:false},connection,states:{}};
    panel._contactSignature=()=>"changed";
    panel.willUpdate(new Map([["hass",null]]));
  }
  finish({r:[{x:90,z:90}]}); await running;
  assert.equal(panel._opt.results,null);
  panel.applyCandidate("binary_sensor.a",{x:90,z:90});
  assert.equal(S.getSensor(panel._s,"binary_sensor.a").x,1);
});
