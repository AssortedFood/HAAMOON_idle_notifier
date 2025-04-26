# PLAN.md

## Remaining Tasks

- [x] **Packaging with Electron-Builder**
  - [x] In `package.json`, under `"build"`:
    - [x] Set `"appId": "com.example.study-game-monitor"`
    - [x] Specify `"files": ["dist/**/*","config/**/*","audio/**/*","assets/**/*"]`
    - [x] Configure `"win": { "target": "nsis" }`
    - [x] Configure `"linux": { "target": ["AppImage","deb"] }`
  - [x] Commit: `build: configure electron-builder`

- [x] **Final Verification**
  - [x] Run `npx vitest` and ensure all tests pass.
  - [x] Run `npm run build:dir` and verify unpacked executables launch on Windows & Linux.
  - [x] Commit: `chore: final test & build verification`
