"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const classifier_1 = require("../src/classifier");
(0, vitest_1.describe)('classify', () => {
    const cfg = {
        studying: ['study'],
        gaming: ['game'],
        audio: { good: '', bad: '', neutral: '' },
    };
    (0, vitest_1.it)('identifies studying titles', () => {
        (0, vitest_1.expect)((0, classifier_1.classify)('I like to study', cfg)).toBe('studying');
    });
    (0, vitest_1.it)('identifies gaming titles', () => {
        (0, vitest_1.expect)((0, classifier_1.classify)('Playing a game now', cfg)).toBe('gaming');
    });
    (0, vitest_1.it)('identifies mixed titles', () => {
        (0, vitest_1.expect)((0, classifier_1.classify)('Study game session', cfg)).toBe('mixed');
    });
    (0, vitest_1.it)('returns none for unrelated titles', () => {
        (0, vitest_1.expect)((0, classifier_1.classify)('Just walking', cfg)).toBe('none');
    });
});
