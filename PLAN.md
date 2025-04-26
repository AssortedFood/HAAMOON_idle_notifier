# PLAN.md

## Remaining Tasks

- [x] **Packaging with Electron-Builder**
  - [x] In `package.json`, under `"build"`:
    - [x] Set `"appId": "com.example.study-game-monitor"`
    - [x] Specify `"files": ["dist/**/*","config/**/*","audio/**/*","assets/**/*"]`
    - [x] Configure `"win": { "target": "nsis" }`
    - [x] Configure `"linux": { "target": ["AppImage","deb"] }`
  - [x] Commit: `build: configure electron-builder`

- [ ] **Final Verification**
  - [ ] Run `npx vitest` and ensure all tests pass.
  - [ ] Run `npm run build:dir` and verify unpacked executables launch on Windows & Linux.
  - [ ] Commit: `chore: final test & build verification`
