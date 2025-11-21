# React Version Conflict - Resolution

## Problem
The metronom-app was experiencing React version conflicts:
- React Native 0.81.5 requires **exactly** React 19.1.0
- Next.js frontend (brassio-frontend) uses React 19.2.0
- npm workspaces was hoisting React 19.2.0 to the root, causing incompatibility

## Error Messages
```
ERROR Invalid hook call. Hooks can only be called inside of the body of a function component.

ERROR [Error: Incompatible React versions: The "react" and "react-native-renderer"
packages must have the exact same version. Instead got:
  - react: 19.2.0
  - react-native-renderer: 19.1.0
```

## Solution
Created `.npmrc` file at project root with the following configuration:

```
legacy-peer-deps=true
auto-install-peers=false

# Prevent hoisting of React to avoid version conflicts between Next.js and React Native
public-hoist-pattern[]=!react
public-hoist-pattern[]=!react-dom
public-hoist-pattern[]=!react-native
```

This configuration:
1. Prevents React from being hoisted to the root node_modules
2. Allows each workspace to maintain its own React version
3. Enables metronom-app to use React 19.1.0 locally while brassio-frontend uses 19.2.0

## Verification
After running `npm run clean && npm install && npm run build:packages`:

```bash
# metronom-app uses React 19.1.0 (correct for React Native 0.81.5)
cd apps/metronom-app && node -e "console.log(require('react/package.json').version)"
# Output: 19.1.0

# Metro bundler starts without errors
npm run dev:metronome
# No React version mismatch errors
```

## Current Status
✅ All metronome packages build successfully
✅ React versions isolated per workspace
✅ Metro bundler starts without React conflicts
⚠️ Minor warning: `@react-native-community/slider` version (can be updated separately)

## Next Steps
The app should now run correctly. To start the metronome app:
```bash
npm run dev:metronome
```

Then use Expo Go or web to test the metronome functionality.
