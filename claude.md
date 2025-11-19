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

Das Projekt ist als Monorepo organisiert mit folgenden Hauptkomponenten:

```
BrassIO-Suite/
├── tuner-app/              # Mobile Tuner-App (Expo/React Native)
├── metronom-app/           # Mobile Metronom-App (Expo/React Native)
├── brassio-frontend/       # Web-Frontend & Dashboard (Next.js)
└── claude.md              # Diese Datei
```

### Geplante Apps (Roadmap)

**Aktuell in Entwicklung:**
- ✅ `tuner-app` - Grundlegender Tuner
- ✅ `metronom-app` - Grundlegendes Metronom
- ✅ `brassio-frontend` - Web-Auftritt

**Geplant:**
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

### 2. Metronom App (metronom-app)

**Grundfunktionen:**
- ✅ BPM-Einstellung (20-300 BPM)
- ✅ Taktarten (2/4, 3/4, 4/4, 5/4, 6/8, etc.)
- ✅ Visuelles Feedback (blinkend)
- ✅ Audio-Feedback (Click-Sound)
- ✅ Akzentuierung (erste Schlag betont)
- ✅ Tap Tempo

**Fortgeschrittene Features:**
- 🔄 Tempo-Ramping (automatische BPM-Steigerung)
- 🔄 Unterteilungen (8tel, 16tel, Triolen)
- 🔄 Polyrhythmen
- 🔄 Integration in Rhythm Trainer

**Technische Anforderungen:**
- Präzises Timing (Audio-Thread, nicht UI-Thread)
- Haptic Feedback (Expo Haptics)
- Background Audio Support

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

**Tuner App:**
```bash
cd tuner-app
npm start           # Expo Dev Server
npm run ios         # iOS Simulator
npm run android     # Android Emulator
npm run web         # Web Browser
```

**Metronom App:**
```bash
cd metronom-app
npm start
```

**Frontend:**
```bash
cd brassio-frontend
npm run dev         # http://localhost:3000
npm run build       # Production Build
npm run lint        # ESLint
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

**Hosting:** Vercel

**Deployment:**
- Automatic Deploys von `main` Branch
- Preview Deployments für PRs
- Environment Variables in Vercel

**Domains:**
- brassio.app (Hauptdomain, geplant)
- www.brassio.app

---

## Roadmap

### Phase 1: Grundlagen (Aktuell)

- ✅ Projekt-Setup (Monorepo, Apps initialisiert)
- 🔄 Tuner App - Grundfunktionen implementieren
- 🔄 Metronom App - Grundfunktionen implementieren
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

- **2025-11-19:** Initial claude.md erstellt mit Projektvision und Architektur
