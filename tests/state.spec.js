"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const state_1 = require("../src/state");
(0, vitest_1.describe)('hasStateChanged', () => {
    (0, vitest_1.it)('returns false when state remains the same', () => {
        // initial state is 'none'
        (0, vitest_1.expect)((0, state_1.hasStateChanged)('none')).toBe(false);
    });
    (0, vitest_1.it)('returns true only on actual state changes', () => {
        (0, vitest_1.expect)((0, state_1.hasStateChanged)('studying')).toBe(true);
        (0, vitest_1.expect)((0, state_1.hasStateChanged)('studying')).toBe(false);
        (0, vitest_1.expect)((0, state_1.hasStateChanged)('gaming')).toBe(true);
        (0, vitest_1.expect)((0, state_1.hasStateChanged)('gaming')).toBe(false);
    });
});
