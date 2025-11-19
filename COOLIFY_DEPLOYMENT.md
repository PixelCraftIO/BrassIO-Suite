# Coolify Deployment - BrassIO Frontend

## Problem gelöst

Der Fehler trat auf, weil Coolify versuchte, nur das `apps/brassio-frontend` Verzeichnis zu bauen, aber die lokalen `@brassio/metronome-*` Pakete nicht gefunden hat (da sie nicht auf npm veröffentlicht sind).

## Lösung

Die `nixpacks.toml` im Root des Repos konfiguriert jetzt den Build für das gesamte Monorepo.

## Coolify Konfiguration

### 1. Base Directory
**WICHTIG**: Stelle in Coolify sicher, dass:
- **Base Directory**: LEER lassen oder `/` setzen (nicht `apps/brassio-frontend`!)
- Damit wird das komplette Repo gecloned, inklusive `packages/`

### 2. Build Pack
- Coolify/Nixpacks erkennt automatisch die `nixpacks.toml` im Root
- Keine manuelle Build Pack Konfiguration nötig

### 3. Environment Variables (Optional)
Falls du spezielle Next.js Env-Variablen brauchst:
```
NODE_ENV=production
```

## Was passiert beim Build

1. **Setup Phase**: Node.js 22 wird installiert
2. **Install Phase**: `npm install --legacy-peer-deps` installiert ALLE Dependencies (Root + Workspaces)
3. **Build Phase**:
   - `npm run build:packages` - Baut alle shared packages (metronome-core, metronome-audio-web, etc.)
   - `npm run build --workspace=apps/brassio-frontend` - Baut das Next.js Frontend
4. **Start**: `npm start --workspace=apps/brassio-frontend` - Startet Next.js Production Server

## Build-Reihenfolge (wichtig!)

```
1. packages/metronome-core       → TypeScript kompilieren
2. packages/metronome-audio-web  → TypeScript kompilieren
3. packages/metronome-audio-native → TypeScript kompilieren (nicht fürs Frontend benötigt)
4. packages/metronome-ui         → TypeScript kompilieren
5. apps/brassio-frontend         → Next.js Build (nutzt die kompilierten packages)
```

## Warum das funktioniert

### Monorepo Structure
```
BrassIO-Suite/
├── nixpacks.toml          ← Coolify findet diese Datei im Root
├── package.json           ← Root package.json mit workspaces
├── packages/              ← Shared packages (werden mit gebaut)
│   ├── metronome-core/
│   ├── metronome-audio-web/
│   ├── metronome-audio-native/
│   └── metronome-ui/
└── apps/
    ├── brassio-frontend/  ← Next.js App (wird deployed)
    ├── metronom-app/      ← React Native (nicht deployed)
    └── tuner-app/         ← React Native (nicht deployed)
```

### npm Workspaces
- npm installiert alle Dependencies für alle Workspaces
- Die `@brassio/metronome-*` Pakete werden als Symlinks im `node_modules` verfügbar gemacht
- Next.js kann dann die lokalen Pakete importieren

## Troubleshooting

### Error: Cannot find module '@brassio/metronome-core'
**Problem**: Packages wurden nicht gebaut
**Lösung**: Stelle sicher, dass `npm run build:packages` vor dem Frontend-Build läuft

### Error: 404 Not Found - @brassio/metronome-audio-web
**Problem**: Base Directory war auf `apps/brassio-frontend` gesetzt
**Lösung**: Base Directory auf Root (leer oder `/`) setzen

### Build timeout
**Problem**: Build dauert zu lange
**Lösung**:
- Erhöhe Build Timeout in Coolify
- Oder nutze `.dockerignore` um unnötige Files auszuschließen

## Performance-Optimierung (Optional)

### .dockerignore erstellen
Falls der Build langsam ist, erstelle `.dockerignore`:
```
node_modules
.git
.expo
*.log
.DS_Store
apps/metronom-app/node_modules
apps/tuner-app/node_modules
apps/metronom-app/.expo
apps/tuner-app/.expo
```

## Port Configuration

Next.js läuft standardmäßig auf Port **3000**.

In Coolify:
- **Port**: 3000
- Coolify handhabt automatisch das Reverse Proxy Setup

## Health Check

Next.js hat einen eingebauten Health-Check:
- **Health Check URL**: `/` oder `/api/health` (falls du einen erstellst)

## Nach dem Deployment

Die App sollte erreichbar sein unter:
```
https://next.brassio.de
```

Teste folgende Seiten:
- `/` - Homepage
- `/metronome` - Metronom Widget
- `/news` - News (falls Supabase eingerichtet)

## Nächste Deployments

Für weitere Deployments:
1. Code ändern
2. `git push origin main`
3. Coolify deployed automatisch (wenn Auto-Deploy aktiviert ist)

Oder manuell in Coolify: **Deploy** Button klicken

## Logs anschauen

In Coolify kannst du Live-Logs sehen während des Builds:
- **Build Logs**: Zeigt den Nixpacks Build-Prozess
- **Runtime Logs**: Zeigt Next.js Server Logs

## Rollback

Falls ein Deployment fehlschlägt, behält Coolify die vorherige Version. Du kannst:
1. In Coolify zur vorherigen Version wechseln
2. Oder den problematischen Commit in Git rückgängig machen und neu pushen
