# Metronome App - Current Status

## ✅ What's Working

### Next.js Frontend (brassio-frontend)
The metronome works perfectly in the Next.js frontend:
- ✅ All UI controls functional
- ✅ Web Audio API working
- ✅ BPM slider and adjustment buttons
- ✅ Time signature selection
- ✅ Beat visualization with animations
- ✅ Audio playback with synthetic clicks

**To run:**
```bash
npm run dev:frontend
```
Then visit http://localhost:3000/metronome

## ⚠️ React Native App (metronom-app) - Partial Support

### Current State
The React Native app has been updated with platform-aware audio that works on **React Native Web** but not yet on native iOS/Android in Expo Go.

### What Was Fixed
1. ✅ **Native module error**: Created platform-aware audio engine that uses Web Audio API for web and provides graceful fallback for native
2. ✅ **Component structure**: All metronome components properly implemented
3. ✅ **React version isolation**: Apps now use their correct React versions (19.1.0 for RN, 19.2.0 for Next.js)

### Remaining Issues

#### 1. React Hook Errors (Native & Android in Expo)
When running on Android/iOS in Expo, you may still see:
```
ERROR Invalid hook call. Hooks can only be called inside of the body of a function component.
```

**Root cause**: The shared `@brassio/metronome-ui` package might still be resolving to React from the wrong location in the Metro bundler.

**Potential solutions:**
- Option A: Use Metro's `resolveRequest` to force React resolution
- Option B: Copy the hook code directly into the app (avoid shared package)
- Option C: Create an EAS development build instead of using Expo Go

#### 2. Native Audio (iOS/Android)
The `react-native-audio-api` package requires native modules that aren't available in Expo Go.

**Current behavior:**
- Web: ✅ Works (uses Web Audio API)
- iOS/Android in Expo Go: ⚠️ Silent (MockAudioEngine fallback)
- iOS/Android with dev build: Should work (requires build)

## 🔧 How to Test

### Test on Web (Recommended)
```bash
cd apps/metronom-app
npx expo start
# Press 'w' for web
```

The web version should work correctly with:
- Full UI functionality
- Audio playback
- Beat visualization

### Test on Native (Expo Go)
```bash
cd apps/metronom-app
npx expo start --tunnel
# Scan QR code with Expo Go app
```

**Expected behavior:**
- UI should render
- Controls should work
- Audio will be silent (MockAudioEngine)
- May see React hook warnings

## 📋 Next Steps to Fix Native

### Option 1: Metro Resolver (Quick Fix)
Add to `apps/metronom-app/metro.config.js`:
```javascript
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Force React to resolve from the app's node_modules
  if (moduleName === 'react' || moduleName === 'react/jsx-runtime') {
    return context.resolveRequest(
      context,
      moduleName,
      platform,
      {
        ...context,
        // Override to look in app's node_modules first
        extraNodeModules: {
          react: path.join(__dirname, 'node_modules/react')
        }
      }
    )
  }
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = config
```

### Option 2: Move Hook Into App (Simpler)
Instead of using `@brassio/metronome-ui`, copy the `use-metronome` hook directly into the app:
```
apps/metronom-app/hooks/use-metronome.ts
```

This avoids the shared package React resolution issue entirely.

### Option 3: Create Development Build (Production-Ready)
For native audio support and production deployment:
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure and build
cd apps/metronom-app
eas build:configure
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

This creates a custom native app with `react-native-audio-api` properly linked.

## 📁 File Changes Summary

### New Files
- `/workspaces/BrassIO-Suite/.npmrc` - Dependency hoisting configuration
- `/workspaces/BrassIO-Suite/apps/metronom-app/lib/audio-engine.ts` - Platform-aware audio engine

### Modified Files
- `/workspaces/BrassIO-Suite/apps/metronom-app/components/metronome/metronome-screen.tsx` - Uses platform-aware audio

### Architecture
```
┌─────────────────────────────────────┐
│   Next.js (brassio-frontend)        │
│   Uses: WebAudioEngine             │
│   Status: ✅ Working                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   React Native (metronom-app)       │
│                                     │
│   Web:     WebAudioEngine           │
│   Status:  ✅ Working                │
│                                     │
│   Native:  MockAudioEngine          │
│   Status:  ⚠️ Silent (no audio)     │
└─────────────────────────────────────┘

         Both use shared packages:
    ┌──────────────────────────────┐
    │  @brassio/metronome-core     │
    │  @brassio/metronome-ui       │
    │  (platform-agnostic logic)   │
    └──────────────────────────────┘
```

## 🎯 Recommendation

For immediate testing and demonstration:
1. Use the Next.js frontend (`npm run dev:frontend`)
2. Or use React Native Web (`npx expo start` then press `w`)

For full native support:
1. Implement Option 2 above (copy hook into app) - quickest fix
2. Or create EAS development build - production-ready solution

The core metronome logic is solid and working. The remaining issue is purely about React resolution in the Metro bundler for the shared UI package.
