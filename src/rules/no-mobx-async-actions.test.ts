import {RuleTester} from "eslint"
import rule from "./no-mobx-async-actions"
import {resolve} from 'path'

const tester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser'),
    parserOptions: {
        ecmaVersion: 2018,
        legacyDecorators: true,
        sourceType: 'module',
        babelOptions: {
            configFile: resolve(__dirname, '../../babel.config.js'),
        },
    },
})

tester.run("no-async-actions", rule, {
    valid: [
        {code: `class A {async foo(){}}`},
        {code: `class A {@action foo(){}}`},
        {code: `class A {@bond async foo(){}}`},
        {code: `class A {@bond @lock async foo(){}}`},
        {code: `class A {foo = async ()=>{}}`},
        {code: `class A {@action foo = ()=>{}}`},
        {code: `class A {@bond foo = async ()=>{}}`},
        {code: `class A {@bond @lock foo = async ()=>{}}`}
    ],
    invalid: [
        {
            code: `class A {@action async foo(){}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@action.bond async foo(){}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@action.bond.x async foo(){}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@bond @action async foo(){}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@bond @action.bond @lock async foo(){}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@action foo = async ()=>{}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@action foo = async function(){}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@bond @action foo = async ()=>{}}`,
            errors: [{messageId: 'noDecorator'}],
        },
        {
            code: `class A {@bond @action @lock foo = async ()=>{}}`,
            errors: [{messageId: 'noDecorator'}],
        },
    ],
})
