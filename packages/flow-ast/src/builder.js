// @flow
import * as AST from "./ast";

export function blockStatement(
    body: AST.Statement[],
    loc?: AST.SourceLocation,
): AST.BlockStatement {
    return {
        type: "BlockStatement",
        body,
        loc: loc || null,
    };
}

export function literal<T: string | boolean | null | number>(
    value: T,
    loc?: AST.SourceLocation,
): AST.Literal<T> {
    return {
        type: "Literal",
        value,
        raw: JSON.stringify(value),
        loc: loc || null,
    };
}

export function identifier(
    name: string,
    typeAnnotation?: AST.TypeAnnotation,
    optional: boolean = false,
    loc?: AST.SourceLocation,
): AST.Identifier {
    return {
        type: "Identifier",
        name,
        optional,
        typeAnnotation: typeAnnotation || null,
        loc: loc || null,
    };
}

export function typeAnnotation(
    typeAnnotation: AST.TypeAnnotations,
    loc?: AST.SourceLocation,
): AST.TypeAnnotation {
    return {
        type: "TypeAnnotation",
        typeAnnotation,
        loc: loc || null,
    };
}

export function functionTypeAnnotation(
    params: AST.FunctionTypeParam[],
    returnType: AST.TypeAnnotations,
    loc?: AST.SourceLocation,
): AST.FunctionTypeAnnotation {
    return {
        type: "FunctionTypeAnnotation",
        params,
        returnType,
        rest: null, // TODO
        typeParameters: null, // TODO
        loc: loc || null,
    };
}

export function functionTypeParam(
    name: AST.Identifier,
    typeAnnotation: AST.TypeAnnotations,
    optional: boolean = false,
    loc?: AST.SourceLocation,
): AST.FunctionTypeParam {
    return {
        type: "FunctionTypeParam",
        name,
        typeAnnotation,
        optional,
        loc: loc || null,
    };
}

export function anyTypeAnnotation(
    loc?: AST.SourceLocation,
): AST.AnyTypeAnnotation {
    return {
        type: "AnyTypeAnnotation",
        loc: loc || null,
    };
}

export function declareModule(
    id: AST.Literal<string>,
    body: AST.BlockStatement,
    kind: "CommonJS" | "ES",
    loc?: AST.SourceLocation,
): AST.DeclareModule {
    return {
        type: "DeclareModule",
        id,
        body,
        kind,
        loc: loc || null,
    };
}

export function declareFunction(
    id: AST.Identifier,
    loc?: AST.SourceLocation,
): AST.DeclareFunction {
    return {
        type: "DeclareFunction",
        id,
        loc: loc || null,
    };
}

export function program(
    body: (AST.Directive | AST.Statement)[],
    loc?: AST.SourceLocation,
): AST.Program {
    return {
        type: "Program",
        comments: [],
        body,
        loc: loc || null,
    };
}
