import type {Rule} from "eslint"
import type {TSESTree} from '@typescript-eslint/utils'

// ----------------------------------------------------

function getMemberExpressionIdentifierName(node: TSESTree.Node): string{
    if(node.type === "Identifier")
        return node.name

    if(node.type === "MemberExpression")
        return getMemberExpressionIdentifierName(node.object)

    return ""
}

function checkForAsyncAction(context: Rule.RuleContext, node: TSESTree.Node & any){
    // Quit if no decorators
    if(!node.decorators || !node.decorators?.length)
        return

    // ----------------------------------------------------

    let isAsync = false

    try {(!isAsync && node.type === "ClassMethod" && node.async) && (isAsync = true)}
    catch(e){}

    try {(!isAsync && node.type === "ClassProperty" && node.value.async) && (isAsync = true)}
    catch(e){}

    try {(!isAsync && node.type === "MethodDefinition" && node.value.async) && (isAsync = true)}
    catch(e){}

    try {(!isAsync && node.type === "PropertyDefinition" && node.value.async) && (isAsync = true)}
    catch(e){}

    // Quit if not async
    // ----------------------------------------------------

    if(!isAsync)
        return

    // ----------------------------------------------------

    let isActionDecorator = false

    try {
        isActionDecorator = node.decorators.some((decorator: TSESTree.Decorator) => {
            const isActionIdentifier = decorator.expression.type === "Identifier" && decorator.expression.name === "action"
            const isActionMemberExpression = decorator.expression.type === "MemberExpression" && getMemberExpressionIdentifierName(decorator.expression) === "action"
            return isActionIdentifier || isActionMemberExpression
        })
    }
    catch(e){}

    if(isActionDecorator){
        context.report({
            node,
            messageId: "noDecorator",
        })
    }
}

// ----------------------------------------------------

const rule: Rule.RuleModule = {
    create: (context) => {
        return {
            'ClassMethod[decorators.length>=1]:exit': (node: Rule.Node) => {
                checkForAsyncAction(context, node)
            },
            'ClassProperty[decorators.length>=1]:exit': (node: Rule.Node) => {
                checkForAsyncAction(context, node)
            },
            'PropertyDefinition[decorators.length>=1]': (node: Rule.Node) => {
                checkForAsyncAction(context, node)
            },
            'ClassDeclaration > ClassBody > MethodDefinition[decorators.length>=1]:exit': (node: Rule.Node) => {
                checkForAsyncAction(context, node)
            },
        }
    },
    meta: {
        messages: {
            noDecorator: 'MobX @action decorator is not allowed on async methods. Use separate @action method(s) instead.',
        },
        type: 'problem',
        schema: [],
    },
}

export default rule
