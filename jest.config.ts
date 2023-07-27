// https://typescript-tdd.github.io/ts-auto-mock/installation
import 'jest-ts-auto-mock'
import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    bail: 15,                                       // Stop running tests after `n` failures
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        ".(ts|tsx)": "ts-jest",
        "^.+\\.(t|j)s$": "ts-jest"
    },
    globals: {
        "modulePathIgnorePatterns ": [
            "shared",
        ],
        "testPathIgnorePatterns ": [
            "/.cache.ti.api.gs.ru.shares.report/",
            "/assets/",
            "/benchmark/",
            "/dist/",
            "./shared",
            "/shared/",
            "shared",
            "shared/**",
            "/node_modules/"
        ],
        "testMatch": [
            "*.(test|spec).(ts|js)"
        ],
        "ts-jest": {
            "tsconfig": "tsconfig.json",
            "compiler": "ttypescript",
        }
    }
};
// @ts-ignore
export default config;

