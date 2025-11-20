# Future Ideas - BrassIO Metronome

Diese Datei enthält Ideen für zukünftige Funktionen, die das Metronom erweitern könnten, aber zunächst zurückgestellt wurden um die Benutzeroberfläche übersichtlich zu halten.

---

## Subdivision-Betonung

### Konzept
Ermöglicht es, einzelne Unterteilungen innerhalb eines Beats unterschiedlich zu betonen.

### Beispiel
Bei einem Beat mit Achtel-Unterteilung (2 Schläge):
- Erste Achtel: Akzent (600Hz)
- Zweite Achtel: Normal (400Hz)

### Mögliche Anwendungsfälle
- Swing-Rhythmen (Off-Beat-Betonung)
- Synkopierte Rhythmen
- Jazz-Übungen

### Implementierungsideen
- Erweiterung der `BeatConfig` um ein Array von Betonungen für jede Subdivision
- Eigenes Modal für erweiterte Subdivision-Konfiguration
- "Erweiterte Einstellungen" Toggle um die Komplexität zu verbergen

---

## Quintolen und Sextolen

### Konzept
Erweiterte Unterteilungen:
- Quintuplet (5 Schläge pro Beat)
- Sextuplet (6 Schläge pro Beat)

### Status
Bereits im Core implementiert (`SubdivisionType.Quintuplet`, `SubdivisionType.Sextuplet`), aber im Modal UI ausgeblendet um die Auswahl übersichtlich zu halten.

### Aktivierung
Kann durch Erweiterung der `subdivisionOptions` im Modal aktiviert werden.

---

## Tempo-Ramping (Automatische BPM-Steigerung)

### Konzept
Automatische Steigerung des Tempos während des Übens:
- Start-BPM → End-BPM
- Über definierte Zeit oder Anzahl von Takten

### Anwendungsfälle
- Progressive Übungen
- Aufwärm-Routinen
- Etüden-Training

---

## Tap Tempo

### Konzept
BPM durch Antippen eines Buttons ermitteln lassen.

### Implementierungsideen
- Mindestens 4 Taps für zuverlässige Berechnung
- Durchschnitts-BPM aus letzten N Taps
- Visuelle Feedback-Animation

---

## Polyrhythmen

### Konzept
Zwei unabhängige rhythmische Linien gleichzeitig:
- Hauptrhythmus (z.B. 4/4)
- Gegenrhythmus (z.B. 3/4)

### Herausforderungen
- Komplexe Audio-Scheduling
- Visuelle Darstellung
- Benutzerfreundliche Konfiguration

---

## Preset-System

### Konzept
Speichern und Laden von Metronom-Konfigurationen:
- Beat-Typen
- Subdivisions
- BPM
- Taktart

### Anwendungsfälle
- Schneller Wechsel zwischen Übungen
- Teilen von Übungskonfigurationen
- Standard-Konfigurationen für verschiedene Musikstile

---

## Background Audio Support

### Konzept
Metronom läuft weiter wenn App im Hintergrund ist.

### Technische Anforderungen
- iOS: Background Audio Mode aktivieren
- Android: Foreground Service
- Notification Controls

---

## Haptic Feedback

### Konzept
Vibration zusätzlich zum Audio-Click:
- Downbeat: Starke Vibration
- Akzent: Mittlere Vibration
- Normal: Leichte Vibration

### Implementierung
Expo Haptics ist bereits als Dependency vorhanden.

---

## Sound-Auswahl

### Konzept
Verschiedene Click-Sounds anstelle von Oszillator-Tönen:
- Wood Block
- Rim Shot
- Hi-Hat
- Custom Samples

### Technische Anforderungen
- Audio-Sample-Dateien
- Expo AV für Sample-Playback
- UI für Sound-Auswahl

---

## Metronom-Visualisierung

### Konzept
Alternative visuelle Darstellungen:
- Pendel-Animation
- Kreisförmige Darstellung
- Waveform-Anzeige

---

## Integration mit anderen Apps

### Konzept
Metronom als Modul in anderen BrassIO-Apps:
- Rhythm Trainer
- Practice Logger (automatische Tempo-Erfassung)

### Implementierung
Bereits als Shared Package vorbereitet (`@brassio/metronome-core`, etc.)

---

## Notizen

- Funktionen sollten schrittweise eingeführt werden
- Benutzerfreundlichkeit hat Priorität über Feature-Umfang
- Komplexe Features hinter "Erweiterte Einstellungen" verstecken
- A/B-Testing für neue UI-Elemente in Betracht ziehen
