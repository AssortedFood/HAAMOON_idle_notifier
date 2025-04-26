# PLAN.md

## Tasks

- [x] **Initial Setup & Tooling**
  - [x] Add `.gitignore` (ignore `node_modules/`, `dist/`, `*.log`).
  - [x] Initialise `package.json` with `"name"`, `"version"`, `"main": "dist/main.js"`, and scripts:  
    - `"build": "electron-builder"`  
    - `"build:dir": "electron-builder --dir"`  
    - `"start": "electron ."`  
    - `"test": "vitest"`
  - [x] Install dependencies:  
    - Deps: `electron`, `active-win`, `play-sound`  
    - DevDeps: `electron-builder`, `typescript`, `ts-node`, `vitest`, `eslint`
  - [x] Create `tsconfig.json` (target ES2020, module CommonJS, outDir `dist`).
  - [x] Create ESLint config (e.g. `.eslintrc.js`).
  - [x] Scaffold folders: `src/`, `config/`, `audio/`, `assets/`, `tests/`.
  - [x] Commit: `chore: initial scaffold & lint setup`

- [x] **Define & Load Configuration**
  - [x] Create `config/config.json` with empty `"studying"`/`"gaming"` arrays and `"audio": { good, bad, neutral }`.
  - [x] In `src/types.ts`, define `ConfigSchema` interface.
  - [x] In `src/config.ts`:
    - [x] Import `fs` and `path`.
    - [x] Read and `JSON.parse` `config/config.json`.
    - [x] Validate that `studying` and `gaming` are arrays, and `audio.good`, `audio.bad`, `audio.neutral` are strings.
    - [x] On failure, `console.error(...)` and `throw`.
    - [x] Export `function loadConfig(): ConfigSchema`.
  - [x] Commit: `feat: config schema & loader`

 - [x] **Fetch & Log Window Title**
  - [x] In `src/main.ts`, import `active-win`.
  - [x] Implement `async function fetchActiveTitle(): Promise<string>`.
  - [x] Commit: `feat: add fetchActiveTitle()`

- [x] **Classification Logic**
  - [x] In `src/classifier.ts`, import `ConfigSchema`.
  - [x] Export `function classify(title: string, cfg: ConfigSchema): 'studying'|'gaming'|'mixed'|'none'`.
  - [x] Implement keyword checks against `cfg.studying` and `cfg.gaming`.
  - [x] Commit: `feat: classification logic`

- [x] **State Change Detection**
  - [x] In `src/state.ts`, declare `let lastState: string = 'none'`.
  - [x] Export `function hasStateChanged(newState: string): boolean`.
  - [x] Commit: `feat: state change tracking`

- [x] **Monitoring Loop**
  - [x] In `src/main.ts`, import `loadConfig`, `classify`, `hasStateChanged`, `fetchActiveTitle`.
  - [x] At top, `const cfg = loadConfig()`.
  - [x] Implement `async function checkLoop()`:  
    - [x] Call `fetchActiveTitle()`.
    - [x] Call `classify(title, cfg)`.
    - [x] If `hasStateChanged(state)` is false, return.
    - [x] (Audio & notify steps to follow.)
  - [x] Schedule: run once immediately, then `setInterval(checkLoop, 60000)`.
  - [x] For development only: shorten interval to 5000 ms and `console.log(title)`.
  - [x] Commit: `feat: monitoring loop`

- [x] **Audio Playback**
  - [x] In `src/audioPlayer.ts`, import `play-sound`.
  - [x] Export `function playAudio(file: string): Promise<void>`:
    - [x] Wrap `player().play(file, callback)` in `new Promise`.
    - [x] In callback, `console.error(err)` if error, then `resolve()`.
    - [x] Surround in `try/catch` to catch sync errors and `console.error`, then `resolve()`.
  - [x] Commit: `feat: audioPlayer`

- [x] **System Notification**
  - [x] In `src/notifier.ts`, import `Notification` from `electron`.
  - [x] Export `function notify(state: string): void` using `new Notification({ silent: true })`.
  - [x] Commit: `feat: notifier`

- [x] **Wire Audio & Notifications into Loop**
  - [x] In `checkLoop()` (src/main.ts), after state change:
    - [x] `await playAudio(path.join(__dirname, '../audio', cfg.audio[state]))`
    - [x] `notify(state)`
  - [x] Wrap `checkLoop()` contents in `try/catch` or prefix calls with `void`.
  - [x] Add `process.on('unhandledRejection', err => console.error(err));`
  - [x] Commit: `feat: integrate audio & notifications`

- [x] **Tray Icon & Context Menu**
  - [x] In `src/main.ts`, import `app`, `Tray`, `Menu`.
  - [x] On `app.whenReady()`:
    - [x] `if (app.dock) app.dock.hide()`
    - [x] `const tray = new Tray(path.join(__dirname, '../assets/tray.png'))`
    - [x] `tray.setToolTip('Study/Game Monitor')`
    - [x] `tray.setContextMenu(Menu.buildFromTemplate([ { label: 'Open config', click: () => {/*…*/} }, { type: 'separator' }, { role: 'quit' } ]))`
  - [x] Commit: `feat: tray integration`

- [x] **Packaging with Electron-Builder**
  - [x] In `package.json`, under `"build"`:
    - [x] Set `"appId": "com.example.study-game-monitor"`
    - [x] Specify `"files": ["dist/**/*","config/**/*","audio/**/*","assets/**/*"]`
    - [x] Configure `"win": { "target":"nsis" }`
    - [x] Configure `"linux": { "target":["AppImage","deb"] }`
  - [x] Commit: `build: configure electron-builder`

- [x] **High-Value Unit Tests (Vitest)**
  - [x] Create `tests/config.spec.ts`:
    - [x] Test `loadConfig()` throws on invalid/missing keys.
    - [x] Test it returns correct `ConfigSchema`.
  - [x] Create `tests/classifier.spec.ts`:
    - [x] Test `classify()` output for sample titles.
  - [x] Create `tests/state.spec.ts`:
    - [x] Test `hasStateChanged()` only true on actual state changes.
  - [x] Commit: `test: add core unit tests`

- [x] **Documentation & Plan**
  - [x] Write `README.md` (Introduction; Installation; Usage; Configuration; Build & Packaging).
  - [x] Finalise `objective.md` & `plan.md`.
  - [x] Commit: `docs: add README & project plans`

- [x] **Final Verification**
  - [x] Run `npx vitest` and ensure all tests pass.
  - [x] Run `npm run build:dir` and verify executables launch on Windows & Linux.
  - [x] Commit: `chore: final test & build verification`
