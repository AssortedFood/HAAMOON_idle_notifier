# PLAN.md

## Remaining Tasks

- [ ] **Packaging with Electron-Builder**
  - [ ] In `package.json`, under `"build"`:
    - [ ] Set `"appId": "com.example.study-game-monitor"`
    - [ ] Specify `"files": ["dist/**/*","config/**/*","audio/**/*","assets/**/*"]`
    - [ ] Configure `"win": { "target": "nsis" }`
    - [ ] Configure `"linux": { "target": ["AppImage","deb"] }`
  - [ ] Commit: `build: configure electron-builder`

- [ ] **Final Verification**
  - [ ] Run `npx vitest` and ensure all tests pass.
  - [ ] Run `npm run build:dir` and verify unpacked executables launch on Windows & Linux.
  - [ ] Commit: `chore: final test & build verification`
