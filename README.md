# Presence Planner

![Presence Planner](custom_components/presence_planner/brand/icon.png)

Plane Präsenz- und Bewegungssensoren auf deinem Grundriss in Home Assistant: Abdeckung je Raum und Höhe, Fehlschalt-Risiko, Vorschläge für Sensorplätze und eine bereinigte Raumbelegung. Mit eigenem Editor und 3D-Ansicht, eigenständig oder mit [NeonPlan 3D](https://github.com/Mastershort/neonplan3d).

**Beta 0.1.0.** Die Ergebnisse sind eine geometrische Planungshilfe. Prüfe Sensorplätze und Automationen in deiner Wohnung. Presence Planner ist unabhängig von NeonPlan 3D und den Sensorherstellern.

## Voraussetzungen

- Home Assistant **2026.10.2 oder neuer** innerhalb der unterstützten 2026.10-Reihe. Spätere HA-Reihen brauchen einen eigenen Kompatibilitätscheck.
- Adminrechte zum Einrichten, Importieren und Speichern. Angemeldete Benutzer können den gesamten Plan und die Sensorinformationen lesen und exportieren.
- Ein Browser mit WebGL2 für die 3D-Ansicht. Der 2D-Planer ist auch ohne 3D nutzbar.
- NeonPlan ist optional. Der Adapter wurde ursprünglich mit 1.19.2 und 1.21.0 geprüft. Er verwendet interne Laufzeitdaten, keine zugesicherte öffentliche API. Nach einem NeonPlan-Update gesondert prüfen.

## Installation

Der HACS-Weg setzt ein öffentlich freigegebenes Repository voraus. Solange dieses Repository privat ist, ist keine Installation über HACS möglich.

1. In HACS im Menü „Benutzerdefinierte Repositories“ die URL `https://github.com/DigitalIQ/presence-planner` mit Kategorie **Integration** hinzufügen.
2. Presence Planner herunterladen und Home Assistant neu starten.
3. Unter **Einstellungen → Geräte & Dienste → Integration hinzufügen** nach **Presence Planner** suchen und bestätigen.
4. Den Eintrag **Presence Planner** in der Seitenleiste öffnen.

Alternativ den vollständigen Ordner `custom_components/presence_planner` nach `<HA-Konfiguration>/custom_components/presence_planner` kopieren, neu starten und die Integration hinzufügen. Die Frontend-Bundles sind enthalten; auf HA wird kein Node.js benötigt.

Die Aufnahme in die HACS-Standardliste ist ein eigener Veröffentlichungsschritt. Ein funktionierendes benutzerdefiniertes Repository bedeutet noch keine Aufnahme in diese Liste.

## Einrichtung

Die Integrationsoptionen bieten drei Planquellen:

- **Automatisch:** kompatibles geladenes NeonPlan verwenden, sonst den eigenen Plan.
- **NeonPlan:** NeonPlan bevorzugen. Bei fehlender oder strukturell inkompatibler Anbindung wird ein Fehler angezeigt und auf den eigenen Plan zurückgefallen.
- **Eigener Grundriss:** Etagen und Räume im Editor anlegen oder importieren und HA-Bereichen zuordnen.

Sensor-Entitäten hinzufügen, platzieren, Profile prüfen und Änderungen speichern. Pro Raum entstehen Abdeckung, Fehlschalt-Risiko und bereinigte Belegung. Profile belegen Sichtfeld und Reichweite vor; die Montage bleibt zu prüfen.

Bei NeonPlan schreibt **Speichern** Sensorplatzierungsfelder und eigene Planner-Extras. Der Button zum Verlinken ergänzt NeonPlans Menü nur auf ausdrücklichen Klick. Grundriss-Importe verändern den eigenen Plan, nicht das NeonPlan-Gebäude.

## Backup und Import

**Export** lädt `presence-planner-backup.json` herunter. Das äußere Format ist ein NeonPlan-Austauschformat. Das Zusatzfeld `presence_planner` enthält den vollständigen nativen Plan und die Sensorplätze. Ein erneuter Planner-Import erhält dadurch auch HA-Zuordnungen, Türkontakte, Wandwerte und Hintergrundbilder. NeonPlan kann die äußeren Austauschdaten verwenden und ignoriert die Planner-Zusatzdaten.

Ein Import **ersetzt** den eigenen Plan und seine Sensorliste. Eine Datei ohne Sensoren leert daher die bisherigen eigenen Sensorplätze. Vorher exportieren, wenn du den alten Stand behalten möchtest. Reine NeonPlan-Austauschdateien können keine Zuordnungen wiederherstellen, die ihrem Format fehlen.

Vor dem Speichern werden Struktur und Rechenaufwand geprüft. Grenzen sind unter anderem 16 Etagen, 64 Räume je Etage, 128 Punkte je Raum, 64 Sensoren und 100.000 konservativ geschätzte Rasteroperationen je Etage und Rasterabstand. Zusätzliche Gesamt- und Geometriebudgets können komplexe Pläne früher ablehnen. Fehlerhafte Importe ersetzen den letzten gültigen Plan nicht. Beim Laden abgewiesene Altbestände bleiben auf der Festplatte erhalten und werden nicht berechnet.

## Modellgrenzen

- Abdeckung ist eine Modellrechnung aus Sichtfeld, Reichweite, Höhe und vereinfachter Materialdämpfung. Sie ist keine gemessene Erkennungsqualität und keine Herstellergarantie.
- Reflexionen, Personen, Haustiere, Möbel und spezielle Wandmaterialien können andere praktische Ergebnisse verursachen.
- Fehlschalt-Risiko und vorberechneter Spill verwenden offene Türen als Worst Case. Die Echo-Bereinigung beachtet zugeordnete Kontakte; bei mehreren durchquerten Türen müssen alle offen sein. Unbekannte Kontakte gelten als offen.
- Öffnungen freistehender Wände sind derzeit in beiden Kernen nicht als Durchlass modelliert. Normale Raumtüren und Fenster werden unterstützt.
- Die Echo-Bereinigung kann echte gleichzeitige Anwesenheit unterdrücken, wenn Meldungen innerhalb des Echo-Fensters liegen. Haltezeit, Echo-Fenster und Spill-Schwelle im Alltag prüfen.
- Keine sicherheitskritischen Alarm-, Zutritts- oder Notfallfunktionen allein auf die bereinigte Belegung stützen.

## Datenschutz

Berechnung lokal in HA und im Browser, keine Telemetrie, kein Cloud-Account. Hintergrundbilder werden als Inline-Bilddaten gespeichert; externe Bild-URLs werden abgewiesen. Plan und eigene Sensorfelder liegen in `<HA-Konfiguration>/.storage/presence_planner` und damit auch in HA-Backups. Exporte enthalten private Wohnungs- und Sensordaten.

Der Seitenleisteneintrag ist auch für angemeldete Nicht-Admins sichtbar. Diese dürfen den vollständigen Plan lesen und exportieren. Es gibt keine zusätzliche Filterung nach HA-Bereich oder einzelner Entität.

## Aktualisieren und Entfernen

Vor Updates ein HA-Backup erstellen. In HACS aktualisieren, HA neu starten und Planquelle, Sensorplätze sowie die drei Raum-Entitäten prüfen. Nach einem NeonPlan-Update dessen Anbindung gesondert testen.

Zum Entfernen zuerst die Integration unter Geräte & Dienste löschen, dann die Dateien über HACS entfernen und HA neu starten. Dies nimmt keine Sensorplatzierungen aus NeonPlan zurück. Den optional angelegten NeonPlan-Menübutton bei Bedarf dort selbst entfernen. Eine gesicherte Planner-Datei bleibt als Datenquelle erhalten; sie nur bewusst mit passendem Backup löschen.

## Entwicklung und Prüfungen

Python 3.14.2 oder neuer und Node.js 22 verwenden:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements_test.txt
npm ci
.venv/bin/ruff check custom_components tests scripts
.venv/bin/python -m pytest -q
npm test
npm run build
python3 scripts/check_release.py
git diff --exit-code custom_components/presence_planner/frontend
```

Der Bundle-Diff kontrolliert einen bereits eingecheckten Build. HA und Test-Plugin sind kompatibel gepinnt. Der lokale Paketcheck prüft Metadaten, Dokumentation, Icon und ausgelieferte Dateien. Der offizielle HACS-Check läuft erst bei einem öffentlichen Repository; hassfest und lokale Checks laufen auch privat. Es gibt keinen automatischen Veröffentlichungsworkflow.

Fehler mit HA-Version, Planquelle, NeonPlan-Version und reproduzierbaren Schritten unter [Issues](https://github.com/DigitalIQ/presence-planner/issues) melden. Für öffentliche Beispiele synthetische Daten verwenden und echte Grundrisse sowie Zugangsdaten vor dem Teilen entfernen.

## Lizenz

MIT. Siehe [LICENSE](LICENSE).
