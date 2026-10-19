// Entry of the floor plan editor: importing this module defines <pp-editor>.
//
// <pp-editor .plan=${plan} floor-id="f1" lang="de" ?dark=${dark} .areas=${areas} .floors=${floors}
//            @plan-changed=${(e) => save(e.detail.plan)} @floor-selected=${(e) => ...}>
export { PpEditor } from "./pp-editor.js";
export { EDITOR_STRINGS } from "./strings.js";
export { FURNITURE_GROUPS, FURNITURE_SIZE, FURNITURE_TYPES } from "./furniture.js";
