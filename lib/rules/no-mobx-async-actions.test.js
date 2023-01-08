"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("eslint");
const no_mobx_async_actions_1 = __importDefault(require("./no-mobx-async-actions"));
const path_1 = require("path");
const tester = new eslint_1.RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
    parserOptions: {
        ecmaVersion: 2018,
        legacyDecorators: true,
        sourceType: 'module',
        babelOptions: {
            configFile: (0, path_1.resolve)(__dirname, '../../babel.config.js'),
        },
    },
});
tester.run("no-async-actions", no_mobx_async_actions_1.default, {
    valid: [
        { code: `class A {async foo(){}}` },
        { code: `class A {@action foo(){}}` },
        { code: `class A {@bond async foo(){}}` },
        { code: `class A {@bond @lock async foo(){}}` },
        { code: `class A {foo = async ()=>{}}` },
        { code: `class A {@action foo = ()=>{}}` },
        { code: `class A {@bond foo = async ()=>{}}` },
        { code: `class A {@bond @lock foo = async ()=>{}}` }
    ],
    invalid: [
        {
            code: `class A {@action async foo(){}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@action.bond async foo(){}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@action.bond.x async foo(){}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@bond @action async foo(){}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@bond @action.bond @lock async foo(){}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@action foo = async ()=>{}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@action foo = async function(){}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@bond @action foo = async ()=>{}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
        {
            code: `class A {@bond @action @lock foo = async ()=>{}}`,
            errors: [{ messageId: 'noDecorator' }],
        },
    ],
});
//# sourceMappingURL=no-mobx-async-actions.test.js.map