"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../src/config");
(0, vitest_1.describe)('loadConfig', () => {
    const configPath = path_1.default.resolve(__dirname, '../config/config.json');
    let originalConfig;
    (0, vitest_1.beforeAll)(() => {
        originalConfig = fs.readFileSync(configPath, 'utf-8');
    });
    (0, vitest_1.afterEach)(() => {
        fs.writeFileSync(configPath, originalConfig, 'utf-8');
    });
    (0, vitest_1.it)('returns correct ConfigSchema', () => {
        const expected = JSON.parse(originalConfig);
        const cfg = (0, config_1.loadConfig)();
        (0, vitest_1.expect)(cfg).toEqual(expected);
    });
    (0, vitest_1.it)('throws on missing studying', () => {
        const invalid = JSON.stringify({ gaming: [], audio: { good: 'g', bad: 'b', neutral: 'n' } });
        fs.writeFileSync(configPath, invalid, 'utf-8');
        (0, vitest_1.expect)(() => (0, config_1.loadConfig)()).toThrow('Invalid config: studying must be an array.');
    });
});
