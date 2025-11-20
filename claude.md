# BrassIO-Suite

## Projektübersicht

BrassIO-Suite ist ein umfassendes Ökosystem von Apps und Tools für Musiker, mit Fokus auf Blechbläser. Das Projekt bietet sowohl grundlegende Tools (Tuner, Metronom) als auch fortgeschrittene Lern- und Übungstools mit Lehrer-Schüler-Integration.

### Vision

- **Grundlegende Tools**: Moderner Tuner und Metronom auf aktuellem Stand der Technik
- **Übungstools**: Spezialisierte Apps wie Tonsprungtrainer, Rhythmustrainer mit integrierter Messtechnik
- **Practice Logging**: Erfassung und Analyse von Übungsfortschritten
- **Lehrer-Schüler-System**: Lehrer können Übungen konfigurieren und Schülerfortschritte überwachen
- **Dashboard**: Webbasiertes Dashboard für Fortschrittsverwaltung
- **Cross-App-Kommunikation**: Apps können auf dem Gerät per Deeplinks und Shared Storage kommunizieren

### Zielgruppen

1. **Musiker**: Einzelnutzer für Übungszwecke
2. **Schüler**: Nutzer, die von Lehrern betreut werden
3. **Lehrer**: Können Schüler-Codes einbinden, Übungen konfigurieren und Fortschritte überwachen

---

## Monorepo-Struktur

Das Projekt ist als npm Workspaces Monorepo organisiert mit folgenden Komponenten:

```
BrassIO-Suite/
├── apps/
│   ├── metronom-app/           # Mobile Metronom-App (Expo/React Native)
│   ├── tuner-app/              # Mobile Tuner-App (Expo/React Native) [Geplant]
│   └── brassio-frontend/       # Web-Frontend & Dashboard (Next.js)
├── packages/
│   ├── legal-content/          # Shared Legal Content (Impressum, Datenschutz, Disclaimer)
│   ├── metronome-core/         # Shared Metronome Engine & Logic
│   ├── metronome-audio-web/    # Web Audio API Implementation
│   ├── metronome-audio-native/ # React Native Audio Implementation
│   └── metronome-ui/           # Shared React Hooks & Components
├── package.json                # Root package.json (Workspaces)
├── .npmrc                      # npm Configuration (No hoisting for React)
├── nixpacks.toml               # Coolify/Nixpacks Build Configuration
└── claude.md                   # Diese Datei
```

### Implementierungsstatus

**Vollständig implementiert:**
- ✅ `metronom-app` - Vollständiges Metronom mit:
  - BPM-Steuerung (30-300 BPM)
  - Taktarten (2/4, 3/4, 4/4, 5/4, 6/8)
  - Drei Beat-Typen (Normal, Akzent, Downbeat) mit klickbarer Konfiguration
  - Drei verschiedene Tonhöhen (400Hz, 600Hz, 800Hz)
  - Dynamische BPM-Änderung während Wiedergabe
  - Shared Packages für Wiederverwendbarkeit
- ✅ `brassio-frontend` - Next.js Frontend mit Web-Metronom
  - Metronome Widget mit gleicher Funktionalität wie App
  - Dark Mode Support (next-themes)
  - Navigation (Home, Metronom, Einstellungen)
  - Footer mit Legal Links
  - Settings Page mit Theme-Auswahl
  - Legal Pages (Impressum, Datenschutz, Disclaimer)
  - Responsive Design
- ✅ `legal-content` - Shared Legal Content Package
  - Markdown-basierte Legal-Texte
  - Export für Web und React Native
  - Zentrale Verwaltung für alle Apps

**Geplant:**
- 🔄 `tuner-app` - Grundlegender Tuner
- 🔄 `interval-trainer-app` - Tonsprungtrainer mit integriertem Tuner
- 🔄 `rhythm-trainer-app` - Rhythmustrainer mit Button-Tap-Interface
- 🔄 `practice-logger-app` - Practice Logging Tool
- 🔄 `teacher-dashboard-app` - Lehrer-Dashboard für Schülerverwaltung

---

## Tech Stack

### Mobile Apps (React Native/Expo)

**Framework & Runtime:**
- React Native 0.81.5
- React 19.1.0
- Expo SDK ~54.0.24
- TypeScript ~5.9.2

**Navigation & Routing:**
- Expo Router ~6.0.15 (file-based routing)
- @react-navigation/native ^7.1.8
- @react-navigation/bottom-tabs ^7.4.0

**UI & Animations:**
- React Native Reanimated ~4.1.1
- React Native Gesture Handler ~2.28.0
- React Native Worklets 0.5.1
- Expo Symbols ~1.0.7 (SF Symbols für iOS)

**Plattformen:**
- iOS (inkl. iPad-Support)
- Android (mit Edge-to-Edge UI)
- Web (static export möglich)

### Web Frontend (Next.js)

**Framework:**
- Next.js 16.0.3 (App Router)
- React 19.2.0
- TypeScript ^5

**Styling:**
- Tailwind CSS ^4
- PostCSS mit @tailwindcss/postcss
- Geist Fonts (Sans & Mono)

**Deployment:**
- Vercel (geplant)

### Backend & Datenbank

**Geplant:**
- Supabase (PostgreSQL-basiert)
  - Authentication
  - Realtime Database
  - Storage für Übungsdaten
  - Row Level Security für Lehrer-Schüler-Isolation

---

## Architekturentscheidungen

### Warum Expo?

- ✅ Moderner Stack mit aktueller Version (SDK 54)
- ✅ Schnelle Entwicklung durch Expo Router
- ✅ Cross-Platform Support (iOS, Android, Web)
- ✅ Integrierte Tools für Audio (expo-av) und Haptic Feedback
- ✅ OTA Updates für schnelle Iteration
- ✅ EAS Build für native Builds

### Warum Next.js?

- ✅ Aktuelle Version (16.0.3) mit modernem App Router
- ✅ Server-Side Rendering für SEO
- ✅ Optimale Vercel-Integration
- ✅ React Server Components
- ✅ Basis für zukünftiges Dashboard

### Warum Supabase?

- ✅ Open Source, selbst-hostbar
- ✅ PostgreSQL mit Realtime-Funktionen
- ✅ Integrierte Authentication
- ✅ Row Level Security für Datenschutz
- ✅ SDKs für React Native und Next.js
- ✅ Gut geeignet für Lehrer-Schüler-Datenisolation

---

## Design-System

**Alle Apps sollen ein einheitliches Design erhalten für hohe Wiedererkennbarkeit.**

### Design-Prinzipien

- **Konsistenz**: Gleiche Farben, Typografie, Komponenten über alle Apps
- **Modern**: Klares, minimalistisches Design
- **Accessibility**: WCAG 2.1 AA Standard
- **Dark Mode**: Native Unterstützung in allen Apps
- **Platform-Aware**: Native Feels (iOS Human Interface, Material Design)

### Geplante Design-Tokens

```typescript
// Wird später in shared-design-system/ definiert
const colors = {
  primary: '#...', // Hauptfarbe (z.B. Brass-Gold)
  secondary: '#...',
  accent: '#...',
  background: { light: '#...', dark: '#...' },
  text: { light: '#...', dark: '#...' },
  success: '#...', // Für korrekte Tonhöhe
  warning: '#...', // Für leicht verstimmte Töne
  error: '#...',   // Für stark verstimmte Töne
}

const typography = {
  fontFamily: {
    sans: 'Geist Sans', // Oder system fonts
    mono: 'Geist Mono',
  },
  // ...
}
```

### Shared Components (Geplant)

- `Button`, `Input`, `Card`, `Modal`
- `Tuner` (wiederverwendbar im Interval Trainer)
- `MetronomeEngine` (wiederverwendbar in Rhythm Trainer)
- `PracticeSummary` (für Practice Logger und Dashboards)

---

## Geplante Features

### 1. Tuner App (tuner-app)

**Grundfunktionen:**
- ✅ Echtzeit-Tonhöhenerkennung
- ✅ Visuelle Anzeige (Nadel/Stimmgerät-Interface)
- ✅ Frequenzanzeige (Hz)
- ✅ Notenerkennung (A4, Bb3, etc.)
- ✅ Kalibrierung (A4 = 440Hz, 442Hz, etc.)
- ✅ Transponierung für verschiedene Instrumente

**Fortgeschrittene Features:**
- 🔄 Historie der gestimmten Noten
- 🔄 Langzeit-Intonationsanalyse
- 🔄 Integration in andere Apps (als Modul)

**Technische Anforderungen:**
- Audio-Input-Verarbeitung (expo-av oder react-native-audio-toolkit)
- Pitch-Detection-Algorithmus (z.B. YIN, FFT-basiert)
- Low-latency Audio Processing

### 2. Metronom App (metronom-app) ✅ IMPLEMENTIERT

**Vollständig implementierte Funktionen:**
- ✅ BPM-Einstellung (30-300 BPM) mit +/- Buttons und direkter Eingabe
- ✅ Taktarten (2/4, 3/4, 4/4, 5/4, 6/8)
- ✅ Drei Beat-Typen (Normal, Akzent, Downbeat)
  - Normal: 400 Hz, Grau
  - Akzent: 600 Hz, Orange
  - Downbeat: 800 Hz, Gold
- ✅ Klickbare Beat-Kreise zum Festlegen von Akzenten
  - Cycle: Normal → Akzent → Downbeat → Normal
  - Downbeat kann auf jedem Beat gesetzt werden (nicht fest auf Beat 1)
- ✅ Visuelles Feedback (animierte Beat-Kreise mit scale + opacity)
- ✅ Audio-Feedback (Web Audio API mit Oscillator)
- ✅ Dynamische BPM-Änderung während Wiedergabe
- ✅ Taktart-Änderung stoppt Wiedergabe und reset beatTypes

**Architektur:**
```
@brassio/metronome-core          # Shared Engine Logic
├── MetronomeEngine              # Look-ahead Scheduling
├── BeatType Enum                # Normal | Accented | Downbeat
├── MetronomeConfig Interface    # { bpm, timeSignature, beatTypes }
└── Helper Functions             # createDefaultBeatTypes, cycleBeatType

@brassio/metronome-audio-web     # Web Audio Implementation
└── WebAudioEngine               # Oscillator-based clicks

@brassio/metronome-audio-native  # React Native Audio (für Dev Builds)
└── NativeAudioEngine            # react-native-audio-api

@brassio/metronome-ui            # Shared React Hooks
└── useMetronome                 # State management + Engine integration

apps/metronom-app                # React Native App
├── lib/audio-engine.ts          # Platform-aware AudioEngine factory
├── hooks/use-metronome.ts       # Local copy (React version isolation)
└── components/
    ├── tempo-controls.tsx       # BPM controls with fixed display
    ├── time-signature-selector.tsx
    ├── beat-visualizer.tsx      # Animated beat dots with touch handlers
    └── playback-controls.tsx

apps/brassio-frontend            # Next.js Web App
└── components/metronome/
    ├── metronome-widget.tsx     # Uses shared useMetronome hook
    ├── beat-visualizer.tsx      # Click handlers for web
    └── ... (other controls)
```

**Technische Details:**

**Look-ahead Scheduling:**
- `MetronomeEngine` verwendet look-ahead scheduling für präzises Timing
- Schedule-Interval: 25ms
- Look-ahead-Zeit: 100ms
- Beat-Callback mit `(beat: number, beatType: BeatType)` Signatur

**React Version Isolation:**
- `.npmrc` mit `node-linker=hoisted` und `public-hoist-pattern[]=!react*`
- React 19.1.0 in React Native, 19.2.0 in Next.js
- Local copy von `useMetronome` in React Native app

**Platform-aware Audio:**
- Web: `WebAudioEngine` (Web Audio API)
- Expo Go: `MockAudioEngine` (silent, da kein native audio)
- Dev Build: `NativeAudioEngine` (react-native-audio-api)

**State Management:**
- `beatTypes: BeatType[]` State in useMetronome
- `setBeatType(beatIndex, newType)` für individuelle Beat-Änderung
- Auto-reset zu default (Beat 1 = Downbeat) bei Taktart-Änderung

**UI/UX:**
- SafeAreaView für korrekte Darstellung
- BPM-Anzeige mit `lineHeight: 86`, `minHeight: 90` (Fix für abgeschnittene Zahlen)
- Beat-Animation: `scale(1.2)` mit `stiffness: 300`, `damping: 12` für snappy Feedback
- Touch-Handler mit `TouchableOpacity` (React Native) / `onClick` + `hover:opacity-50` (Web)

**Fortgeschrittene Features (Geplant):**
- 🔄 Tap Tempo
- 🔄 Tempo-Ramping (automatische BPM-Steigerung)
- 🔄 Unterteilungen (8tel, 16tel, Triolen)
- 🔄 Polyrhythmen
- 🔄 Background Audio Support
- 🔄 Haptic Feedback (Expo Haptics)
- 🔄 Integration in Rhythm Trainer

### 3. Interval Trainer App (interval-trainer-app)

**Kernfunktionen:**
- Übung von Tonsprüngen (Intervallen) auf Blasinstrumenten
- Integrierter Tuner zur Messung der Intonation
- Messung der Zeit für saubere Tonproduktion
- Analyse der Sprungqualität (Glissando vs. sauberer Sprung)

**Übungsmodi:**
- Vordefinierte Intervallübungen (Sekunden, Terzen, Quinten, etc.)
- Zufällige Intervalle innerhalb eines Tonumfangs
- Vom Lehrer konfigurierte Übungen
- Selbst erstellte Übungssequenzen

**Messungen & Feedback:**
- Intonationsgenauigkeit (in Cent)
- Zeit bis zur sauberen Tonproduktion
- Sprungqualität (Spektralanalyse)
- Fortschrittsstatistiken

**Lehrer-Schüler-Integration:**
- Lehrer kann Intervalle/Noten in Teacher-App konfigurieren
- Code-basierte Übungszuweisung (Schüler gibt Code ein)
- Übungsergebnisse werden an Practice Logger gesendet
- Lehrer kann Fortschritt im Dashboard einsehen

**Technische Anforderungen:**
- Tuner-Modul Integration
- Spektralanalyse für Sprungqualität
- Realtime Audio Processing
- Supabase-Integration für Übungssynchronisation

### 4. Rhythm Trainer App (rhythm-trainer-app)

**Kernfunktionen:**
- Vorgegebene Rhythmen auf Button tippen
- Integriertes Metronom
- Messung der Timing-Genauigkeit
- Visuelles & haptisches Feedback

**Übungsmodi:**
- Vordefinierte Rhythmusübungen
- Vom Lehrer erstellte Rhythmen
- Selbst erstellte Rhythmuspatterns
- Schwierigkeitsstufen

**Messungen & Feedback:**
- Timing-Genauigkeit (in ms)
- Hit/Miss Ratio
- Konsistenz über Zeit
- Fortschrittsstatistiken

**Lehrer-Schüler-Integration:**
- Lehrer kann Rhythmen in Teacher-App erstellen
- Code-basierte Übungszuweisung
- Ergebnisse im Practice Logger
- Dashboard-Visualisierung

**Technische Anforderungen:**
- Metronom-Modul Integration
- Hochpräzises Touch-Timing
- Rhythmus-Notation (eigenes Format oder MusicXML-Subset)
- Haptic Feedback Engine

### 5. Practice Logger App (practice-logger-app)

**Kernfunktionen:**
- Erfassung von Übungseinheiten
- Manuelle Eingabe (Zeit, Übungsinhalt, Notizen)
- Automatische Erfassung von anderen Apps (Interval Trainer, Rhythm Trainer)
- Statistiken und Visualisierungen

**Datenerfassung:**
- Übungsdauer
- Übungstyp (Technik, Repertoire, Theorie, etc.)
- Spezifische Übungen (z.B. "C-Dur Tonleiter", "Interval Training: Quinten")
- Subjektive Bewertung (Wie lief es? 1-5 Sterne)
- Notizen/Reflexion

**Statistiken:**
- Wöchentliche/Monatliche Übungszeit
- Verteilung der Übungstypen
- Streaks (täglich geübt)
- Fortschrittskurven (z.B. Intonationsverbesserung)

**Lehrer-Schüler-Integration:**
- Schüler kann Lehrer Zugriff gewähren (Code-basiert)
- Lehrer sieht aggregierte Statistiken
- Lehrer kann Übungsziele setzen

**Technische Anforderungen:**
- Supabase für Datenpersistenz
- Charts/Visualisierungen (z.B. Victory Native oder Recharts)
- Deeplink-Integration von anderen Apps
- Background Data Sync

### 6. Teacher Dashboard App (teacher-dashboard-app)

**Platform:** Web (Next.js) oder Native App

**Kernfunktionen:**
- Verwaltung von Schülern (Code-basierte Verknüpfung)
- Übersicht über Schülerfortschritte
- Erstellung von Übungen (Intervalle, Rhythmen)
- Zuweisung von Übungen an Schüler
- Kommunikation mit Schülern

**Übungserstellung:**
- Interval-Trainer-Übungen konfigurieren
  - Intervalle auswählen
  - Tonumfang festlegen
  - Schwierigkeitsstufe
  - Wiederholungen
- Rhythm-Trainer-Übungen erstellen
  - Rhythmus-Notation-Interface
  - Tempo vorgeben
  - Schwierigkeitsstufe

**Schüler-Codes:**
- Jeder Schüler hat einen eindeutigen Code
- Lehrer fügt Schüler-Codes hinzu
- Schüler muss Verknüpfung bestätigen (Datenschutz)
- Row Level Security in Supabase verhindert unbefugten Zugriff

**Fortschritts-Dashboard:**
- Übersicht: Welcher Schüler hat wie viel geübt?
- Detailansicht: Spezifische Übungsergebnisse
- Trends: Verbesserung über Zeit
- Alerts: Schüler, die nicht üben

**Technische Anforderungen:**
- Next.js mit Server Actions
- Supabase Realtime für Live-Updates
- Chart-Library (Recharts)
- Responsive Design (Desktop & Tablet)
- Authentifizierung (Lehrer-Login)

### 7. BrassIO Frontend (brassio-frontend)

**Aktuell:** Moderne Web-Präsenz

**Inhalte:**
- Landing Page
- Feature-Übersicht
- Download-Links (App Store, Google Play)
- Dokumentation
- Blog (optional)

**Zukünftig:** User Dashboard

**Dashboard-Features:**
- Login für App-Nutzer
- Fortschrittsverwaltung (ähnlich Practice Logger)
- Web-Interface für Übungskonfiguration
- Synchronisation mit Mobile Apps
- Account-Management

**Technische Anforderungen:**
- SEO-Optimierung
- Responsive Design
- Supabase Auth Integration
- Deployment auf Vercel

---

## Cross-App-Kommunikation

### Deeplinks

**URL-Schema:** `brassio://`

**Beispiele:**
```
brassio://tuner                      # Öffnet Tuner App
brassio://metronome?bpm=120          # Öffnet Metronom mit 120 BPM
brassio://interval-trainer/exercise/abc123  # Öffnet spezifische Übung
brassio://practice-logger/log?from=interval-trainer&session=xyz
```

**Use Cases:**
- Interval Trainer → Tuner (Tuner als Modul nutzen)
- Rhythm Trainer → Metronom (Metronom als Modul nutzen)
- Beliebige App → Practice Logger (Ergebnisse loggen)
- Teacher Dashboard → Schüler-Apps (Übungen öffnen)

### Shared Storage

**iOS:** App Groups
**Android:** Shared Preferences / ContentProvider

**Shared Data:**
- Übungsergebnisse (vor Supabase-Sync)
- Konfiguration (gemeinsame Settings)
- Tuner-Kalibrierung (in allen Apps gleich)

### Supabase Realtime

**Echtzeit-Synchronisation:**
- Lehrer erstellt Übung → Schüler bekommt Push-Benachrichtigung
- Schüler beendet Übung → Lehrer-Dashboard wird aktualisiert
- Practice Logger → Dashboard Sync

---

## Datenbank-Schema (Supabase)

### Tables (Geplant)

```sql
-- Benutzer (erweitert Supabase Auth)
users (
  id uuid PRIMARY KEY REFERENCES auth.users,
  role text CHECK (role IN ('student', 'teacher')),
  user_code text UNIQUE, -- Für Lehrer-Schüler-Verknüpfung
  display_name text,
  created_at timestamp
)

-- Lehrer-Schüler-Beziehungen
teacher_student_links (
  id uuid PRIMARY KEY,
  teacher_id uuid REFERENCES users(id),
  student_id uuid REFERENCES users(id),
  confirmed boolean DEFAULT false, -- Schüler muss bestätigen
  created_at timestamp,
  UNIQUE(teacher_id, student_id)
)

-- Übungen (generisch für alle Trainer-Apps)
exercises (
  id uuid PRIMARY KEY,
  created_by uuid REFERENCES users(id),
  type text CHECK (type IN ('interval', 'rhythm', 'custom')),
  title text,
  description text,
  config jsonb, -- Flexibles Config-Objekt
  created_at timestamp
)

-- Übungszuweisungen
exercise_assignments (
  id uuid PRIMARY KEY,
  exercise_id uuid REFERENCES exercises(id),
  teacher_id uuid REFERENCES users(id),
  student_id uuid REFERENCES users(id),
  assigned_at timestamp,
  due_date timestamp
)

-- Übungsergebnisse
exercise_results (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  exercise_id uuid REFERENCES exercises(id),
  app_type text, -- 'interval-trainer', 'rhythm-trainer', etc.
  score jsonb, -- Flexible Datenstruktur für verschiedene Metriken
  duration_seconds int,
  completed_at timestamp
)

-- Practice Log Einträge
practice_sessions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  start_time timestamp,
  end_time timestamp,
  duration_seconds int,
  session_type text,
  notes text,
  rating int CHECK (rating BETWEEN 1 AND 5),
  created_at timestamp
)
```

### Row Level Security (RLS)

**Beispiel für `exercise_results`:**

```sql
-- Schüler können nur eigene Ergebnisse sehen
CREATE POLICY "Users can view own results"
ON exercise_results FOR SELECT
USING (auth.uid() = user_id);

-- Lehrer können Ergebnisse ihrer Schüler sehen
CREATE POLICY "Teachers can view student results"
ON exercise_results FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM teacher_student_links
    WHERE teacher_id = auth.uid()
    AND student_id = exercise_results.user_id
    AND confirmed = true
  )
);
```

---

## Entwicklungsrichtlinien

### Code-Stil

**TypeScript:**
- Strict Mode aktiviert
- Explizite Return-Types für Funktionen
- Keine `any` (außer begründete Ausnahmen)
- Prefer `const` over `let`, never `var`

**Naming Conventions:**
- **Komponenten:** PascalCase (`TunerDisplay`, `MetronomeButton`)
- **Funktionen/Variablen:** camelCase (`calculatePitch`, `isPlaying`)
- **Konstanten:** UPPER_SNAKE_CASE (`MAX_BPM`, `DEFAULT_A4_FREQUENCY`)
- **Dateien:** kebab-case (`tuner-display.tsx`, `use-pitch-detection.ts`)
- **Hooks:** `use` prefix (`useAudioInput`, `useMetronome`)
- **Types/Interfaces:** PascalCase mit `I` prefix für Interfaces optional

**Dateistruktur:**

```
app/(tabs)/
  index.tsx              # Screens
components/
  tuner/
    tuner-display.tsx
    pitch-indicator.tsx
  metronome/
    tempo-control.tsx
hooks/
  use-pitch-detection.ts
  use-metronome.ts
utils/
  audio/
    pitch-detection.ts
    audio-engine.ts
  helpers.ts
constants/
  theme.ts
  audio-config.ts
types/
  tuner.ts
  metronome.ts
```

### Component Guidelines

**React Native:**
- Functional Components mit Hooks
- Memoization für Performance (`React.memo`, `useMemo`, `useCallback`)
- Avoid Inline Functions in Render (Performance)
- Use Reanimated für Animationen (nicht Animated API)

**Next.js:**
- Server Components by Default
- Client Components nur wenn nötig (`'use client'`)
- Route Handlers für API Routes
- Server Actions für Mutations

### Git Workflow

**Branch-Strategie:**
- `main` - Production-ready Code
- `develop` - Development Branch
- `feature/feature-name` - Feature Branches
- `fix/bug-name` - Bugfix Branches

**Commit Messages:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Neue Feature
- `fix`: Bugfix
- `refactor`: Code-Refactoring
- `style`: Code-Stil (formatting, etc.)
- `docs`: Dokumentation
- `test`: Tests
- `chore`: Build-Prozess, Dependencies

**Beispiele:**
```
feat(tuner): add pitch detection algorithm
fix(metronome): correct tempo calculation
refactor(shared): extract design tokens
docs(claude): update architecture decisions
```

### Testing Strategy (Geplant)

**Unit Tests:**
- Jest für Logic/Utils
- Testing Library für Components
- Alle Utils/Helpers testen
- Kritische Algorithmen (Pitch Detection, Metronome Timing)

**Integration Tests:**
- E2E Tests mit Maestro (React Native)
- Playwright für Web
- Kritische User Flows

**Audio Tests:**
- Mock Audio Input für deterministische Tests
- Snapshot Tests für Audio Processing Results

---

## Entwicklungsworkflow

### Setup

**Prerequisites:**
- Node.js 18+ (LTS)
- npm oder yarn
- Expo CLI
- iOS: Xcode (macOS only)
- Android: Android Studio

**Installation:**

```bash
# Clone repo
git clone https://github.com/PixelCraftIO/BrassIO-Suite.git
cd BrassIO-Suite

# Install dependencies für alle Apps
cd tuner-app && npm install && cd ..
cd metronom-app && npm install && cd ..
cd brassio-frontend && npm install && cd ..

# Supabase Setup (später)
# - Projekt erstellen auf supabase.com
# - .env Dateien mit Supabase-Keys erstellen
```

### Development

**Wichtige Root-Level Scripts:**
```bash
# Packages bauen (wichtig nach Core-Änderungen!)
npm run build:packages

# Spezifische Package bauen
npm run build --workspace=packages/metronome-core
npm run build --workspace=packages/metronome-ui

# Clean all builds
npm run clean  # Entfernt alle node_modules

# Frontend bauen und starten
npm run build --workspace=apps/brassio-frontend
npm start --workspace=apps/brassio-frontend
```

**Metronom App:**
```bash
cd apps/metronom-app
npm start              # Expo Dev Server
npm run ios            # iOS Simulator
npm run android        # Android Emulator
npm run web            # Web Browser (http://localhost:8081)
```

**Frontend:**
```bash
cd apps/brassio-frontend
npm run dev            # http://localhost:3000
npm run build          # Production Build
npm run start          # Production Server
npm run lint           # ESLint
```

**Tuner App (Geplant):**
```bash
cd apps/tuner-app
npm start
```

### Debugging

**React Native:**
- Expo Dev Tools
- React DevTools
- Flipper (optional)
- Console Logs in Terminal

**Next.js:**
- Browser DevTools
- Next.js Dev Overlay
- React DevTools

**Audio Debugging:**
- iOS: Audio Unit Validation
- Android: logcat für Audio-Logs
- Oszilloskop für Audio-Output (z.B. Sonic Visualiser)

---

## Performance-Anforderungen

### Tuner App

- **Latency:** < 50ms von Audio Input zu UI Update
- **Accuracy:** ± 1 Cent Genauigkeit
- **Frame Rate:** 60 FPS für Needle Animation
- **Battery:** Optimiert für lange Übungseinheiten

### Metronome App

- **Timing Accuracy:** ± 1ms Abweichung pro Beat
- **UI Update:** Synchron mit Audio Click
- **Battery:** Background-Modus optimiert

### Interval/Rhythm Trainer

- **Audio Processing:** Realtime, < 50ms Latency
- **UI Responsiveness:** 60 FPS, instant Feedback
- **Data Sync:** Background Sync, kein UI Blocking

---

## Sicherheit & Datenschutz

### Authentifizierung

- Supabase Auth (Email/Password, OAuth)
- JWT Tokens
- Sichere Token-Speicherung (Keychain/KeyStore)

### Datenschutz

- **DSGVO-Konform**
- **Minimale Datenerfassung:** Nur notwendige Daten
- **Lehrer-Schüler-Verknüpfung:** Opt-in, Schüler muss bestätigen
- **Daten-Isolation:** RLS in Supabase
- **Daten-Export:** Nutzer können ihre Daten exportieren
- **Daten-Löschung:** Nutzer können Account löschen

### Audio-Daten

- **Keine permanente Speicherung** von Audio-Aufnahmen
- Audio wird nur in-memory verarbeitet
- Nur Metadaten (Pitch, Timing) werden gespeichert

---

## Deployment

### Mobile Apps

**Development:**
- Expo Go für Testing
- Development Builds für native Features

**Production:**
- EAS Build für iOS/Android
- App Store Connect (iOS)
- Google Play Console (Android)
- OTA Updates via EAS Update

**Versionierung:**
- Semantic Versioning (1.0.0, 1.1.0, 2.0.0)
- Build Numbers auto-increment

### Web Frontend

**Hosting:** Coolify (Self-hosted)

**Deployment:**
- Automatic Deploys von `main` Branch via Git Integration
- Nixpacks Build System
- Base Directory: Root (für Monorepo-Support)
- Build Commands:
  ```bash
  npm install --legacy-peer-deps
  npm run build:packages
  npm run build --workspace=apps/brassio-frontend
  ```
- Start Command: `npm start --workspace=apps/brassio-frontend`
- Port: 3000

**Nixpacks Configuration (`nixpacks.toml`):**
```toml
[variables]
NODE_ENV = "production"

[phases.setup]
nixPkgs = ["nodejs_22"]

[phases.install]
cmds = ["npm install --legacy-peer-deps"]

[phases.build]
cmds = [
  "npm run build:packages",
  "npm run build --workspace=apps/brassio-frontend"
]

[start]
cmd = "npm start --workspace=apps/brassio-frontend"
```

**Wichtige Hinweise:**
- Base Directory in Coolify auf Root setzen (nicht `apps/brassio-frontend`)
- Monorepo-Support: Alle Packages werden mit gebaut
- Build-Reihenfolge: Core → Audio → UI → Frontend

**Domains:**
- next.brassio.de (Frontend-Domain)
- brassio.de (Hauptdomain, geplant)

---

## Roadmap

### Phase 1: Grundlagen (Größtenteils abgeschlossen)

- ✅ Projekt-Setup (npm Workspaces Monorepo)
- ✅ Metronom App - Vollständig implementiert
  - Shared Packages (core, audio-web, audio-native, ui)
  - React Native App mit allen Features
  - Next.js Web-Integration
  - Coolify Deployment
- 🔄 Tuner App - Noch zu implementieren
- 🔄 Design-System etablieren
- 🔄 Supabase Setup

### Phase 2: Erweiterung

- Interval Trainer App
- Rhythm Trainer App
- Practice Logger App (Basis)
- Deeplink-Integration
- Supabase-Integration in alle Apps

### Phase 3: Lehrer-Schüler-System

- Teacher Dashboard (Web)
- Übungserstellung in Teacher Dashboard
- Code-basierte Schüler-Lehrer-Verknüpfung
- Fortschritts-Dashboard
- Benachrichtigungen

### Phase 4: Polish & Launch

- UI/UX Refinement
- Performance-Optimierung
- Testing (Unit, Integration, E2E)
- Beta-Testing
- Marketing-Website
- App Store Launch

### Phase 5: Fortgeschritten

- Weitere Trainer-Apps
- AI-basiertes Feedback
- Social Features (Community)
- In-App-Käufe (Premium-Features)
- Weitere Instrumente (Holzbläser, Streicher, etc.)

---

## Known Issues & Learnings

### React Version Conflicts

**Problem:** React Native (19.1.0) und Next.js (19.2.0) benötigen verschiedene React-Versionen

**Lösung:** `.npmrc` Konfiguration mit selective hoisting
```
node-linker=hoisted
public-hoist-pattern[]=*
public-hoist-pattern[]=!react
public-hoist-pattern[]=!react-dom
public-hoist-pattern[]=!@types/react
public-hoist-pattern[]=!@types/react-dom
```

**Alternative:** Local copy von shared hooks in React Native app (verwendet für `useMetronome`)

### Expo Go Audio Limitations

**Problem:** Expo Go unterstützt kein natives Audio (react-native-audio-api nicht verfügbar)

**Lösung:** Platform-aware AudioEngine factory
- Web: WebAudioEngine (Web Audio API)
- Expo Go: MockAudioEngine (silent)
- Dev Build: NativeAudioEngine (react-native-audio-api)

### UI Clipping Issues (React Native)

**Problem:** Teile der UI wurden auf verschiedenen Geräten abgeschnitten

**Lösungen:**
- SafeAreaView mit `edges={['top']}` verwenden
- BPM-Display: `lineHeight: 86`, `minHeight: 90`, `includeFontPadding: false`
- Container: `overflow: 'visible'`

### Coolify Monorepo Deployment

**Problem:** Coolify/Nixpacks versuchte nur Subdirectory zu bauen, konnte lokale Packages nicht finden

**Lösung:**
- `nixpacks.toml` im Root erstellen
- Base Directory in Coolify auf Root setzen (nicht `apps/brassio-frontend`)
- Build-Commands müssen Packages zuerst bauen

### TypeScript Build Cache

**Problem:** Nach Updates wurden alte Type Definitions gecacht

**Lösung:**
- `npm run build:packages` nach Core-Änderungen ausführen
- Bei Problemen: `rm -rf packages/*/dist` und neu bauen

### Neue Packages im Build-Script vergessen

**Problem:** Neues Package (`@brassio/legal-content`) wurde erstellt, aber nicht im `build:packages` Script hinzugefügt

**Symptom:** Coolify Deployment schlägt fehl mit:
```
Module not found: Can't resolve '@brassio/legal-content'
```

**Ursache:** Das `build:packages` Script in `package.json` wurde nicht aktualisiert, um das neue Package zu bauen

**Lösung:**
- Immer wenn ein neues Package unter `packages/` erstellt wird, muss es auch im `build:packages` Script in der Root `package.json` hinzugefügt werden
- Reihenfolge beachten: Packages ohne Dependencies zuerst (z.B. `legal-content`), dann abhängige Packages

**Aktuelles Build-Script:**
```json
"build:packages": "npm run build --workspace=packages/legal-content && npm run build --workspace=packages/metronome-core && npm run build --workspace=packages/metronome-audio-native && npm run build --workspace=packages/metronome-audio-web && npm run build --workspace=packages/metronome-ui"
```

**Checkliste für neue Packages:**
1. Package erstellen unter `packages/[name]/`
2. `package.json` mit Name `@brassio/[name]` erstellen
3. `tsconfig.json` erstellen (extends `../../tsconfig.base.json`)
4. **Build-Script aktualisieren** in Root `package.json`
5. Dependencies in Apps hinzufügen (`"@brassio/[name]": "*"`)
6. `npm install` ausführen

---

## Offene Fragen & Entscheidungen

### Design-System

- [ ] Farb-Palette definieren (Primary Color für Brass-Gold?)
- [ ] Logo/Branding erstellen
- [ ] Icon-Set (Custom vs. Library)
- [ ] Shared Component Library aufbauen (Wo? Separate Package?)

### Audio-Technologie

- [ ] Pitch-Detection-Algorithmus wählen (YIN, Autocorrelation, FFT?)
- [ ] Audio-Library für React Native (expo-av vs. react-native-audio vs. Custom Native Module?)
- [ ] Metronome-Timing-Strategie (Audio-Thread, WorkerThread?)

### Architektur

- [ ] Shared Code zwischen Apps (Monorepo Workspaces? Separate Packages?)
- [ ] State Management (Zustand, Jotai, Redux?)
- [ ] Offline-First-Strategie (Wie viel funktioniert ohne Internet?)

### Business/Monetarisierung

- [ ] Free vs. Premium Features (Was ist kostenlos? Was kostenpflichtig?)
- [ ] Pricing-Modell (Einmalkauf, Abo, Freemium?)
- [ ] Lehrer-Lizenzen (Separate Preisstruktur?)

---

## Ressourcen

### Dokumentation

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

### Audio-Bibliotheken (Evaluation)

- [expo-av](https://docs.expo.dev/versions/latest/sdk/av/)
- [react-native-audio-toolkit](https://github.com/react-native-audio-toolkit/react-native-audio-toolkit)
- [react-native-sound](https://github.com/zmxv/react-native-sound)
- [Tone.js](https://tonejs.github.io/) (für Web)

### Pitch Detection (Research)

- [YIN Algorithm Paper](http://audition.ens.fr/adc/pdf/2002_JASA_YIN.pdf)
- [PitchFinder](https://github.com/peterkhayes/pitchfinder) (JS Library)
- [Aubio](https://aubio.org/) (C Library, Native Module möglich)

### Design Inspiration

- [Tunable App](https://tunable.app/)
- [Pro Metronome](https://www.prometronomefree.com/)
- [Tempo by Frozen Ape](https://frozenape.com/tempo/)

---

## Kontakt & Ownership

**Organization:** PixelCraftIO
**GitHub:** https://github.com/PixelCraftIO/BrassIO-Suite

---

## Changelog

- **2025-11-19 (Abend):**
  - Legal Content Package erstellt (`@brassio/legal-content`)
    - Markdown-Dateien: Impressum, Datenschutz, Disclaimer
    - TypeScript-Export für alle Apps
  - Next.js Navigation & Dark Mode implementiert:
    - ThemeProvider mit next-themes
    - Navigation Component (Home, Metronom, Einstellungen)
    - Footer mit Legal Links
    - Settings Page mit Theme-Auswahl
    - Legal Pages unter /legal/*
  - React Native Tab-Navigation erweitert:
    - 3 Tabs: News, Metronom, Einstellungen
    - Settings Screen mit Dark Mode Toggle
    - Legal Screens mit Markdown-Renderer
  - Coolify Deployment Fix:
    - `legal-content` zu `build:packages` Script hinzugefügt
    - Dokumentation für neue Packages Checkliste erstellt

- **2025-11-19:**
  - Initial claude.md erstellt mit Projektvision und Architektur
  - Metronome App vollständig implementiert:
    - Shared Packages Architecture (core, audio-web, audio-native, ui)
    - Drei Beat-Typen mit klickbarer Konfiguration
    - Dynamische BPM-Änderung während Wiedergabe
    - React Native App mit allen Features
    - Next.js Web-Integration
    - Coolify Deployment konfiguriert
  - npm Workspaces Monorepo-Struktur etabliert
  - React Version Isolation gelöst (.npmrc Konfiguration)
  - claude.md aktualisiert mit vollständiger Metronome-Dokumentation
