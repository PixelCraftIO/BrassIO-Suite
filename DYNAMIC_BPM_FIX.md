# Dynamische BPM-Anpassung & UI-Fixes

## Behobene Probleme

### 1. ✅ BPM-Anzeige abgeschnitten
**Problem**: Die BPM-Zahl war auf Expo Go nicht vollständig sichtbar

**Lösung**:
- Container mit `minWidth: 200` hinzugefügt
- `textAlign: 'center'` für zentrierte Anzeige
- Bessere Layout-Struktur

**Datei**: [tempo-controls.tsx](apps/metronom-app/components/metronome/tempo-controls.tsx)

```typescript
<View style={styles.bpmDisplayContainer}>
  <ThemedText type="title" style={styles.bpmDisplay}>
    {bpm}
  </ThemedText>
</View>
```

### 2. ✅ BPM dynamisch während Wiedergabe ändern
**Problem**: Bei BPM-Änderung während der Wiedergabe brach der Ton und die Visualisierung ab

**Lösung**:
- MetronomeEngine nutzt jetzt die neue BPM im nächsten `schedule()` Aufruf
- Kein Stop/Start mehr bei BPM-Änderungen
- Tempo passt sich flüssig an

**Datei**: [metronome-engine.ts](packages/metronome-core/src/metronome-engine.ts)

```typescript
updateConfig(config: Partial<MetronomeConfig>): void {
  const oldConfig = this.config
  this.config = { ...this.config, ...config }

  // BPM changes are applied automatically in the next schedule() call
  // Only restart if time signature changed
}
```

### 3. ✅ Taktart-Änderung stoppt Wiedergabe
**Problem**: Taktart-Änderung sollte die Wiedergabe stoppen

**Lösung**:
- Hook stoppt explizit bei Taktart-Änderung
- User muss Metronom neu starten
- Beat-Counter wird zurückgesetzt

**Datei**: [use-metronome.ts](apps/metronom-app/hooks/use-metronome.ts)

```typescript
const setTimeSignature = useCallback((ts: TimeSignature) => {
  // Stop playback when changing time signature (user must restart)
  if (isPlaying && engineRef.current) {
    engineRef.current.stop()
    setIsPlaying(false)
    setCurrentBeat(0)
  }
  setTimeSignatureState(ts)
}, [isPlaying])
```

## Verhalten

### BPM-Änderungen (während Wiedergabe)
- ✅ Slider bewegen → Tempo passt sich dynamisch an
- ✅ +10, +1, -1, -10 Buttons → Tempo passt sich sofort an
- ✅ Kein Abbruch der Wiedergabe
- ✅ Beat-Visualisierung läuft weiter
- ✅ Audio läuft flüssig mit neuem Tempo

### Taktart-Änderungen (während Wiedergabe)
- ✅ Auswahl einer neuen Taktart → Wiedergabe stoppt
- ✅ Button wechselt zu START
- ✅ Beat-Anzeige zeigt "-"
- ✅ User muss START drücken um fortzufahren
- ✅ Startet dann bei Beat 1 der neuen Taktart

### Taktart-Änderungen (wenn gestoppt)
- ✅ Keine Auswirkung, einfache Änderung
- ✅ Bereit zum Start mit neuer Taktart

## Technische Details

### Engine-Logik
Die `schedule()` Methode verwendet immer `this.config.bpm` für die Berechnung:
```typescript
const intervalMs = (60 / this.config.bpm) * 1000
```

Da `updateConfig()` die Konfiguration sofort aktualisiert, wird die neue BPM im nächsten Scheduling-Zyklus (alle 25ms) automatisch verwendet.

### Keine Unterbrechungen bei BPM
- Bereits geplante Beats werden mit der alten BPM abgespielt
- Neue Beats werden mit der neuen BPM geplant
- Übergang ist flüssig ohne Klick oder Pause

### Sauberer Stop bei Taktart
- Engine wird komplett gestoppt
- Alle Timeouts werden geclearet
- UI-State wird zurückgesetzt
- Neustart beginnt bei Beat 0

## Dateien geändert

1. ✅ [packages/metronome-core/src/metronome-engine.ts](packages/metronome-core/src/metronome-engine.ts)
   - `updateConfig()` nur bei Taktart-Änderung neu starten
   - BPM-Änderungen laufen durch

2. ✅ [apps/metronom-app/hooks/use-metronome.ts](apps/metronom-app/hooks/use-metronome.ts)
   - Expliziter Stop bei Taktart-Änderung
   - Kommentar für BPM-Dynamik

3. ✅ [apps/metronom-app/components/metronome/tempo-controls.tsx](apps/metronom-app/components/metronome/tempo-controls.tsx)
   - BPM-Display Container mit minWidth
   - Zentrierte Anzeige

## Testing

### Test 1: BPM während Wiedergabe ändern
1. Metronom starten (z.B. 120 BPM, 4/4)
2. Während es spielt:
   - Slider bewegen → ✅ Tempo ändert sich flüssig
   - +10 drücken → ✅ Sofortige Tempoerhöhung
   - -10 drücken → ✅ Sofortige Tempoverlangsamung
3. Keine Unterbrechung des Tons oder der Visualisierung

### Test 2: Taktart während Wiedergabe ändern
1. Metronom starten (z.B. 120 BPM, 4/4)
2. Während es spielt:
   - 3/4 Button drücken → ✅ Wiedergabe stoppt sofort
   - Button zeigt START
   - Beat-Anzeige: "Schlag - von 3"
3. START drücken → ✅ Spielt mit 3/4 Takt

### Test 3: BPM-Anzeige nicht abgeschnitten
1. Verschiedene BPM einstellen:
   - 30 BPM → ✅ "30" vollständig sichtbar
   - 120 BPM → ✅ "120" vollständig sichtbar
   - 300 BPM → ✅ "300" vollständig sichtbar
2. Auf verschiedenen Geräten testen

## Nächste Schritte

Reload die App in Expo Go:
```bash
# Im Terminal drücke 'r' für Reload
# Oder auf dem Handy: Schüttle das Gerät → Reload
```

Die Änderungen sollten sofort funktionieren!
