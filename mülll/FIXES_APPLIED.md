# React Native Metronome - Fixes Applied

## Problem Summary
The metronom-app was experiencing React version conflicts where Metro was bundling React 19.2.0 instead of the required React 19.1.0, causing "Invalid hook call" errors.

```
ERROR: Incompatible React versions:
  - react: 19.2.0 (bundled by Metro)
  - react-native-renderer: 19.1.0 (required)
```

## Solution Applied

### Fix: Local Hook Copy (Option 2)
Instead of using the shared `@brassio/metronome-ui` package which was causing React resolution issues, I copied the `use-metronome` hook directly into the app.

### Changes Made

#### 1. Created Local Hook
**File**: `/workspaces/BrassIO-Suite/apps/metronom-app/hooks/use-metronome.ts`
- Copied the entire `useMetronome` hook from `@brassio/metronome-ui`
- This ensures React is resolved from the app's local node_modules (19.1.0)
- Still uses `@brassio/metronome-core` for business logic (no React dependency)

#### 2. Updated MetronomeScreen
**File**: `/workspaces/BrassIO-Suite/apps/metronom-app/components/metronome/metronome-screen.tsx`
```typescript
// Before:
import { useMetronome } from '@brassio/metronome-ui'

// After:
import { useMetronome } from '@/hooks/use-metronome'
```

#### 3. Created Metro Config
**File**: `/workspaces/BrassIO-Suite/apps/metronom-app/metro.config.js`
- Added custom resolver to force React to resolve from app's node_modules
- Configured monorepo support with watchFolders
- This provides an additional layer of protection

#### 4. Platform-Aware Audio Engine (Already Created)
**File**: `/workspaces/BrassIO-Suite/apps/metronom-app/lib/audio-engine.ts`
- Web: Uses Web Audio API (fully functional)
- Native (Expo Go): Uses MockAudioEngine (silent, no crashes)
- Native (Dev Build): Can use NativeAudioEngine with react-native-audio-api

## Testing the Fix

### Test on Android/iOS with Expo
```bash
cd apps/metronom-app
npx expo start --clear
# Scan QR code with Expo Go
```

**Expected Result:**
- ✅ No React version mismatch errors
- ✅ No "Invalid hook call" errors
- ✅ App renders correctly
- ✅ UI controls work
- ⚠️ Audio will be silent (MockAudioEngine in Expo Go)

### Test on Web
```bash
cd apps/metronom-app
npx expo start --clear
# Press 'w' for web
```

**Expected Result:**
- ✅ Full functionality including audio
- ✅ Web Audio API works perfectly

## Why This Fix Works

### The Problem
When using `@brassio/metronome-ui`:
1. The package has React as a peerDependency
2. Metro bundler was resolving React from the workspace root (19.2.0)
3. React Native expected React 19.1.0
4. Mismatch caused hook errors

### The Solution
By copying the hook locally:
1. The hook imports `react` directly
2. Node.js module resolution finds React in `apps/metronom-app/node_modules/react` first
3. Metro bundles React 19.1.0 (correct version)
4. No version mismatch

## Architecture

```
apps/metronom-app/
├── hooks/
│   └── use-metronome.ts         ← Local copy (uses app's React 19.1.0)
├── lib/
│   └── audio-engine.ts          ← Platform-aware audio
├── components/metronome/
│   ├── metronome-screen.tsx     ← Uses local hook
│   ├── tempo-controls.tsx
│   ├── time-signature-selector.tsx
│   ├── beat-visualizer.tsx
│   └── playback-controls.tsx
└── metro.config.js              ← Forces React resolution

Still uses shared packages:
- @brassio/metronome-core        ← Business logic (no React)
- @brassio/metronome-audio-native (not used in Expo Go)
```

## Trade-offs

### Advantages ✅
- Simple, reliable fix
- No complex Metro configuration required
- Guaranteed to use correct React version
- Easy to understand and maintain

### Disadvantages ⚠️
- Hook code is duplicated between apps
- Updates to metronome logic need to be copied
- Ideally would use shared package

## Future Improvements

### Short-term
1. **Test the app** - Restart Expo and verify no React errors
2. **Update slider** - Upgrade `@react-native-community/slider` to 5.0.1 if needed

### Long-term
1. **EAS Development Build** - Create custom build for native audio support:
   ```bash
   eas build --profile development --platform android
   ```

2. **Separate Next.js to Different Repo** - Or use pnpm workspaces which handle version isolation better

3. **Re-share the Hook** - Once React versions are stable across apps, move hook back to shared package

## Current Status

### ✅ Working
- Next.js frontend (brassio-frontend) - Full metronome functionality
- React Native Web - Full metronome functionality
- Shared packages build successfully
- Platform-aware audio engine created

### 🔧 Ready to Test
- React Native (Expo Go) - Should work without React errors, but audio silent

### 📋 Next Steps
1. Kill any running Expo processes
2. Run `cd apps/metronom-app && npx expo start --clear`
3. Test on device with Expo Go
4. Verify no React version errors
5. (Optional) Create EAS dev build for native audio

## Commands

```bash
# Start metronome app
cd apps/metronom-app
npx expo start --clear

# Start Next.js frontend (works perfectly)
npm run dev:frontend

# Build all packages
npm run build:packages

# Clean everything
npm run clean && npm install
```

## Files Modified

1. ✅ Created: `apps/metronom-app/hooks/use-metronome.ts`
2. ✅ Modified: `apps/metronom-app/components/metronome/metronome-screen.tsx`
3. ✅ Created: `apps/metronom-app/lib/audio-engine.ts`
4. ✅ Created: `apps/metronom-app/metro.config.js`
5. ✅ Modified: `.npmrc` (dependency hoisting config)

The metronome should now work correctly on React Native without React version conflicts! 🎵
