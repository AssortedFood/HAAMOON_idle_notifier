# PLAN.md

## Tasks

- [ ] **Initial Setup & Tooling**
  - [ ] Create new Git repo `study-game-monitor`.
  - [ ] Add `.gitignore` (ignore `node_modules/`, `dist/`, `*.log`).
  - [ ] Initialise `package.json` with `"name"`, `"version"`, `"main": "dist/main.js"`, and scripts:  
    - `"build": "electron-builder"`  
    - `"build:dir": "electron-builder --dir"`  
    - `"start": "electron ."`  
    - `"test": "vitest"`
  - [ ] Install dependencies:  
    - Deps: `electron`, `active-win`, `play-sound`  
    - DevDeps: `electron-builder`, `typescript`, `ts-node`, `vitest`, `eslint`
  - [ ] Create `tsconfig.json` (target ES2020, module CommonJS, outDir `dist`).
  - [ ] Create ESLint config (e.g. `.eslintrc.js`).
  - [ ] Scaffold folders: `src/`, `config/`, `audio/`, `assets/`, `tests/`.
  - [ ] Commit: `chore: initial scaffold & lint setup`

- [ ] **Define & Load Configuration**
  - [ ] Create `config/config.json` with empty `"studying"`/`"gaming"` arrays and `"audio": { good, bad, neutral }`.
  - [ ] In `src/types.ts`, define `ConfigSchema` interface.
  - [ ] In `src/config.ts`:
    - [ ] Import `fs` and `path`.
    - [ ] Read and `JSON.parse` `config/config.json`.
    - [ ] Validate that `studying` and `gaming` are arrays, and `audio.good`, `audio.bad`, `audio.neutral` are strings.
    - [ ] On failure, `console.error(...)` and `throw`.
    - [ ] Export `function loadConfig(): ConfigSchema`.
  - [ ] Commit: `feat: config schema & loader`

- [ ] **Fetch & Log Window Title**
  - [ ] In `src/main.ts`, import `active-win`.
  - [ ] Implement `async function fetchActiveTitle(): Promise<string>`.
  - [ ] Commit: `feat: add fetchActiveTitle()`

- [ ] **Classification Logic**
  - [ ] In `src/classifier.ts`, import `ConfigSchema`.
  - [ ] Export `function classify(title: string, cfg: ConfigSchema): 'studying'|'gaming'|'mixed'|'none'`.
  - [ ] Implement keyword checks against `cfg.studying` and `cfg.gaming`.
  - [ ] Commit: `feat: classification logic`

- [ ] **State Change Detection**
  - [ ] In `src/state.ts`, declare `let lastState: string = 'none'`.
  - [ ] Export `function hasStateChanged(newState: string): boolean`.
  - [ ] Commit: `feat: state change tracking`

- [ ] **Monitoring Loop**
  - [ ] In `src/main.ts`, import `loadConfig`, `classify`, `hasStateChanged`, `fetchActiveTitle`.
  - [ ] At top, `const cfg = loadConfig()`.
  - [ ] Implement `async function checkLoop()`:  
    - [ ] Call `fetchActiveTitle()`.
    - [ ] Call `classify(title, cfg)`.
    - [ ] If `hasStateChanged(state)` is false, return.
    - [ ] (Audio & notify steps to follow.)
  - [ ] Schedule: run once immediately, then `setInterval(checkLoop, 60000)`.
  - [ ] For development only: shorten interval to 5000 ms and `console.log(title)`.
  - [ ] Commit: `feat: monitoring loop`

- [ ] **Audio Playback**
  - [ ] In `src/audioPlayer.ts`, import `play-sound`.
  - [ ] Export `function playAudio(file: string): Promise<void>`:
    - [ ] Wrap `player().play(file, callback)` in `new Promise`.
    - [ ] In callback, `console.error(err)` if error, then `resolve()`.
    - [ ] Surround in `try/catch` to catch sync errors and `console.error`, then `resolve()`.
  - [ ] Commit: `feat: audioPlayer`

- [ ] **System Notification**
  - [ ] In `src/notifier.ts`, import `Notification` from `electron`.
  - [ ] Export `function notify(state: string): void` using `new Notification({ silent: true })`.
  - [ ] Commit: `feat: notifier`

- [ ] **Wire Audio & Notifications into Loop**
  - [ ] In `checkLoop()` (src/main.ts), after state change:
    - [ ] `await playAudio(path.join(__dirname, '../audio', cfg.audio[state]))`
    - [ ] `notify(state)`
  - [ ] Wrap `checkLoop()` contents in `try/catch` or prefix calls with `void`.
  - [ ] Add `process.on('unhandledRejection', err => console.error(err));`
  - [ ] Commit: `feat: integrate audio & notifications`

- [ ] **Tray Icon & Context Menu**
  - [ ] In `src/main.ts`, import `app`, `Tray`, `Menu`.
  - [ ] On `app.whenReady()`:
    - [ ] `if (app.dock) app.dock.hide()`
    - [ ] `const tray = new Tray(path.join(__dirname, '../assets/tray.png'))`
    - [ ] `tray.setToolTip('Study/Game Monitor')`
    - [ ] `tray.setContextMenu(Menu.buildFromTemplate([ { label: 'Open config', click: () => {/*…*/} }, { type: 'separator' }, { role: 'quit' } ]))`
  - [ ] Commit: `feat: tray integration`

- [ ] **Packaging with Electron-Builder**
  - [ ] In `package.json`, under `"build"`:
    - [ ] Set `"appId": "com.example.study-game-monitor"`
    - [ ] Specify `"files": ["dist/**/*","config/**/*","audio/**/*","assets/**/*"]`
    - [ ] Configure `"win": { "target":"nsis" }`
    - [ ] Configure `"linux": { "target":["AppImage","deb"] }`
  - [ ] Commit: `build: configure electron-builder`

- [ ] **High-Value Unit Tests (Vitest)**
  - [ ] Create `tests/config.spec.ts`:
    - [ ] Test `loadConfig()` throws on invalid/missing keys.
    - [ ] Test it returns correct `ConfigSchema`.
  - [ ] Create `tests/classifier.spec.ts`:
    - [ ] Test `classify()` output for sample titles.
  - [ ] Create `tests/state.spec.ts`:
    - [ ] Test `hasStateChanged()` only true on actual state changes.
  - [ ] Commit: `test: add core unit tests`

- [ ] **Documentation & Plan**
  - [ ] Write `README.md` (Introduction; Installation; Usage; Configuration; Build & Packaging).
  - [ ] Finalise `objective.md` & `plan.md`.
  - [ ] Commit: `docs: add README & project plans`

- [ ] **Final Verification**
  - [ ] Run `npx vitest` and ensure all tests pass.
  - [ ] Run `npm run build:dir` and verify executables launch on Windows & Linux.
  - [ ] Commit: `chore: final test & build verification`
