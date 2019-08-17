// @flow

export type _Node = {|
    type: string,
    loc: SourceLocation | null,
|};

export type SourceLocation = {|
    source: string | null,
    start: Position,
    end: Position,
|};

export type Position = {|
    line: number, // >= 1
    column: number, // >= 0
|};

// #region Expressions
// ES5
export type Literal<T: string | boolean | null | number> = {|
    ..._Node,
    type: "Literal",
    value: T,
    raw: string,
|};
//  | {|
//     ..._Node,
//     type: "Literal",
//     value: RegExp,
//     regex: {|
//         pattern: string,
//         flags: string,
//     |},
// |};

export type Identifier = {|
    ..._Node,
    type: "Identifier",
    name: string,
    typeAnnotation: ?TypeAnnotation,
    optional: boolean,
|};

export type ThisExpress = {|
    ..._Node,
    type: "ThisExpression",
|};

export type ArrayExpression = {|
    ..._Node,
    type: "ArrayExpression",
    elements: (Expression | SpreadElement | null)[], // SpreadElement was added in ES2015
|};

export type ObjectExpression = {|
    ..._Node,
    type: "ObjectExpression",
    properties: Property[],
|};

export type Property = {|
    ..._Node,
    type: "Property",
    key: Literal<string> | Identifier,
    value: Expression,
    kind: "init" | "get" | "set",

    // ES2015
    key: Expression,
    method: boolean,
    shorthand: boolean,
    computed: boolean,
|};

export type FunctionExpression = {|
    ..._Function,
    type: "FunctionExpression",
|};

export type UnaryExpression = {|
    ..._Node,
    type: "UnaryExpression",
    operator: UnaryOperator,
    prefix: boolean,
    argument: Expression,
|};

export type UnaryOperator =
    | "-"
    | "+"
    | "!"
    | "~"
    | "typeof"
    | "void"
    | "delete";

export type UpdateExpression = {|
    ..._Node,
    type: "UpdateExpression",
    operator: UpdateOperator,
    argument: Expression,
    prefix: boolean,
|};

export type UpdateOperator = "++" | "--";

export type BinaryExpression = {|
    ..._Node,
    type: "BinaryExpression",
    operator: BinaryOperator,
    left: Expression,
    right: Expression,
|};

export type BinaryOperator =
    | "=="
    | "!="
    | "==="
    | "!=="
    | "<"
    | "<="
    | ">"
    | ">="
    | "<<"
    | ">>"
    | ">>>"
    | "+"
    | "-"
    | "*"
    | "/"
    | "%"
    | "|"
    | "^"
    | "&"
    | "in"
    | "instanceof";

export type AssignmentExpression = {|
    ..._Node,
    type: "AssignmentExpression",
    operator: AssignmentOperator,
    left: Pattern | Expression,
    right: Expression,
|};

export type AssignmentOperator =
    | "="
    | "+="
    | "-="
    | "*="
    | "/="
    | "%="
    | "<<="
    | ">>="
    | ">>>="
    | "|="
    | "^="
    | "&=";

export type LogicalExpression = {|
    ..._Node,
    type: "LogicalExpression",
    operator: LogicalOperator,
    left: Expression,
    right: Expression,
|};

export type LogicalOperator = "||" | "&&";

export type MemberExpression = {|
    ..._Node,
    type: "MemberExpression",
    object: Expression | Super, // Super was added in ES2015
    property: Expression,
    computed: boolean,
|};

export type ConditionalExpression = {|
    ..._Node,
    type: "ConditionalExpression",
    test: Expression,
    alternate: Expression,
    consequent: Expression,
|};

export type CallExpression = {|
    ..._Node,
    type: "CallExpression",
    callee: Expression | Super, // Super was added in ES2015
    arguments: (Expression | SpreadElement)[], // SpreadElement was added in ES2015
|};

export type NewExpression = {|
    ..._Node,
    type: "NewExpression",
    callee: Expression,
    arguments: (Expression | SpreadElement)[], // SpreadElement was added in ES2015
|};

export type SequenceExpression = {|
    ..._Node,
    type: "SequenceExpression",
    expressions: Expression[],
|};

// ES2015
export type Super = {|
    ..._Node,
    type: "Super",
|};

export type SpreadElement = {|
    ..._Node,
    type: "SpreadElement",
    argument: Expression,
|};

export type ArrowFunctionExpression = {|
    ..._Function,
    type: "ArrowFunctionExpression",
    body: FunctionBody | Expression,
    expression: boolean,
|};

export type YieldExpression = {|
    ..._Node,
    type: "YieldExpression",
    argument: Expression | null,
    delegate: boolean,
|};

export type TemplateLiteral = {|
    ..._Node,
    type: "TemplateLiteral",
    quasis: TemplateElement[],
    expressions: Expression[],
|};

export type TaggedTemplateExpression = {|
    ..._Node,
    type: "TaggedTemplateExpression",
    tag: Expression,
    quasi: TemplateLiteral,
|};

export type TemplateElement = {|
    ..._Node,
    type: "TemplateElement",
    tail: boolean,
    value: {|
        cooked: string,
        raw: string,
    |},
|};

export type MetaProperty = {|
    ..._Node,
    type: "TemplateElement",
    tail: boolean,
    value: {|
        cooked: string,
        raw: string,
    |},
|};

export type ClassExpression = {|
    ..._Class,
    type: "ClassExpression",
|};

export type Expression =
    // ES5
    | Literal<>
    | Identifier
    | ThisExpress
    | ArrayExpression
    | ObjectExpression
    | UnaryExpression
    | UpdateExpression
    | BinaryExpression
    | AssignmentExpression
    | LogicalExpression
    | MemberExpression
    | ConditionalExpression
    | CallExpression
    | NewExpression
    | SequenceExpression

    // ES2015
    | ArrowFunctionExpression
    | YieldExpression
    | TemplateLiteral
    | TaggedTemplateExpression
    | MetaProperty
    | ClassExpression;
// #endregion

// #region Patterns
// ES2015
export type ObjectPattern = {|
    type: "ObjectPattern",
    properties: AssignmentProperty[],
    typeAnnotation: TypeAnnotation | null,
|};

export type AssignmentProperty = {|
    ...Property,
    value: Pattern,
    kind: "init",
    method: false,
|};

export type ArrayPattern = {|
    type: "ArrayPattern",
    elements: (Pattern | null)[],
    typeAnnotation: TypeAnnotation | null,
|};

export type RestElement = {|
    type: "RestElement",
    argument: Pattern,
    typeAnnotation: TypeAnnotation | null,
|};

export type AssignmentPattern = {|
    type: "AssignmentPattern",
    left: Pattern,
    right: Expression,
|};

export type Pattern =
    | Identifier
    | ObjectPattern
    | ArrayPattern
    | RestElement
    | AssignmentPattern;
// #endregion

// #region Statements
// ES5
export type ExpressionStatement = {|
    ..._Node,
    type: "ExpressionStatement",
    expression: Expression,
|};

export type BlockStatement = {|
    ..._Node,
    type: "BlockStatement",
    body: Statement[],
|};

export type EmptyStatement = {|
    ..._Node,
    type: "EmptyStatement",
|};

export type DebuggerStatement = {|
    ..._Node,
    type: "DebuggerStatement",
|};

export type WithStatement = {|
    ..._Node,
    type: "WithStatement",
    object: Expression,
    body: Statement,
|};

export type ReturnStatement = {|
    ..._Node,
    type: "ReturnStatement",
    argument: Expression | null,
|};

export type LabeledStatement = {|
    ..._Node,
    type: "LabeledStatement",
    label: Identifier,
    body: Statement,
|};

export type BreakStatement = {|
    ..._Node,
    type: "BreakStatement",
    label: Identifier | null,
|};

export type ContinueStatement = {|
    ..._Node,
    type: "ContinueStatement",
    label: Identifier | null,
|};

export type IfStatement = {|
    ..._Node,
    type: "IfStatement",
    test: Expression,
    consequent: Statement,
    alternate: Statement | null,
|};

export type SwitchStatement = {|
    ..._Node,
    type: "SwitchStatement",
    discriminant: Expression,
    cases: SwitchCase[],
|};

export type SwitchCase = {|
    ..._Node,
    type: "SwitchCase",
    test: Expression | null,
    consequent: Statement[],
|};

export type ThrowStatement = {|
    ..._Node,
    type: "ThrowStatement",
    argument: Expression,
|};

export type TryStatement = {|
    ..._Node,
    type: "TryStatement",
    block: BlockStatement,
    handler: CatchClause | null,
    finalizer: BlockStatement | null,
|};

export type CatchClause = {|
    ..._Node,
    type: "CatchClause",
    param: Pattern,
    body: BlockStatement,
|};

export type WhileStatement = {|
    ..._Node,
    type: "WhileStatement",
    test: Expression,
    body: Statement,
|};

export type DoWhileStatement = {|
    ..._Node,
    type: "DoWhileStatement",
    body: Statement,
    test: Expression,
|};

export type ForStatement = {|
    ..._Node,
    type: "ForStatement",
    init: VariableDeclaration | Expression | null,
    test: Expression | null,
    update: Expression | null,
    body: Statement,
|};

export type ForInStatement = {|
    ..._Node,
    type: "ForInStatement",
    left: VariableDeclaration | Pattern,
    right: Expression,
    body: Statement,
|};

export type VariableDeclaration = {|
    ..._Node,
    type: "VariableDeclaration",
    declarations: VariableDeclarator[],
    kind: "var" | "let" | "const", // let and const were added in ES2015
|};

export type VariableDeclarator = {|
    ..._Node,
    type: "VariableDeclarator",
    id: Pattern,
    init: Expression | null,
|};

export type FunctionDeclaration = {|
    ..._Function,
    type: "FunctionDeclaration",
    id: Identifier,
|};

// ES2015
export type ForOfStatement = {|
    ..._Node,
    type: "ForOfStatement",
|};

export type ClassDeclaration = {|
    ..._Class,
    type: "ClassDeclaration",
    id: Identifier,
|};

export type ImportSpecifier = {|
    ..._Node,
    type: "ImportSpecifier",
    imported: Identifier,
    local: Identifier,
    importKind: "type" | "typeof" | null,
|};

export type ImportDefaultSpecifier = {|
    ..._Node,
    type: "ImportDefaultSpecifier",
    local: Identifier,
|};

export type ImportNamespaceSpecifier = {|
    ..._Node,
    type: "ImportNamespaceSpecifier",
    local: Identifier,
|};

export type ImportDeclaration = {|
    ..._Node,
    type: "ImportDeclaration",
    specifiers: (
        | ImportSpecifier
        | ImportDefaultSpecifier
        | ImportNamespaceSpecifier
    )[],
    source: Literal<string>,
    importKind: "type" | "typeof" | "value",
|};

export type ExportNamedDeclaration = {|
    type: "ExportNamedDeclaration",
    declaration: Declaration | null,
    specifiers: ExportSpecifier[],
    source: Literal<string> | null,
|};

export type ExportSpecifier = {|
    ..._Node,
    type: "ExportSpecifier",
    exported: Identifier,
    local: Identifier,
|};

export type AnonymousDefaultExportedFunctionDeclaration = {|
    ..._Function,
    type: "FunctionDeclaration",
    id: null,
|};

export type AnonymousDefaultExportedClassDeclaration = {|
    ..._Class,
    type: "ClassDeclaration",
    id: null,
|};

export type ExportDefaultDeclaration = {|
    ..._Node,
    type: "ExportDefaultDeclaration",
    declaration:
        | AnonymousDefaultExportedFunctionDeclaration
        | FunctionDeclaration
        | AnonymousDefaultExportedClassDeclaration
        | ClassDeclaration
        | Expression,
|};

export type ExportAllDeclaration = {|
    ..._Node,
    type: "ExportAllDeclaration",
    source: Literal<string>,
|};

export type Declaration =
    // ES5
    | FunctionDeclaration
    | VariableDeclaration
    | ClassDeclaration
    | ExportDefaultDeclaration
    | ExportNamedDeclaration
    | ExportAllDeclaration;

export type Statement =
    // ES5
    | ExpressionStatement
    | BlockStatement
    | EmptyStatement
    | DebuggerStatement
    | WithStatement
    | ReturnStatement
    | LabeledStatement
    | BreakStatement
    | ContinueStatement
    | IfStatement
    | SwitchStatement
    | TryStatement
    | WhileStatement
    | DoWhileStatement
    | ForStatement
    | ForInStatement
    | VariableDeclaration
    | FunctionDeclaration

    // ES2015
    | ForOfStatement
    | ClassDeclaration
    | ImportDeclaration
    | ExportDefaultDeclaration
    | ExportNamedDeclaration
    | ExportAllDeclaration

    // Flow
    | DeclareFunction
    | DeclareModule
    | DeclareExportDeclaration;
// #endregion

// #region TypeAnnotations
export type StringTypeAnnotation = {|
    ..._Node,
    type: "StringTypeAnnotation",
|};

export type NumberTypeAnnotation = {|
    ..._Node,
    type: "NumberTypeAnnotation",
|};

export type BooleanTypeAnnotation = {|
    ..._Node,
    type: "BooleanTypeAnnotation",
|};

export type VoidTypeAnnotation = {|
    ..._Node,
    type: "VoidTypeAnnotation",
|};

export type AnyTypeAnnotation = {|
    ..._Node,
    type: "AnyTypeAnnotation",
|};

export type MixedTypeAnnotation = {|
    ..._Node,
    type: "MixedTypeAnnotation",
|};

export type EmptyTypeAnnotation = {|
    ..._Node,
    type: "EmptyTypeAnnotation",
|};

export type NullLiteralTypeAnnotation = {|
    ..._Node,
    type: "NullLiteralTypeAnnotation",
|};

export type StringLiteralTypeAnnotation = {|
    ..._Node,
    type: "StringLiteralTypeAnnotation",
    value: string,
    raw: string,
|};

export type NumberLiteralTypeAnnotation = {|
    type: "NumberLiteralTypeAnnotation",
    value: number,
    raw: string,
|};

export type BooleanLiteralTypeAnnotation = {|
    type: "BooleanLiteralTypeAnnotation",
    value: boolean,
    raw: string,
|};

export type UnionTypeAnnotation = {|
    ..._Node,
    type: "UnionTypeAnnotation",
    types: TypeAnnotations[],
|};

export type IntersectionTypeAnnotation = {|
    ..._Node,
    type: "IntersectionTypeAnnotation",
    types: TypeAnnotations[],
|};

export type ObjectTypeAnnotation = {|
    ..._Node,
    type: "ObjectTypeAnnotation",
    // TODO
|};

export type FunctionTypeAnnotation = {|
    ..._Node,
    type: "FunctionTypeAnnotation",
    params: FunctionTypeParam[],
    rest: FunctionTypeParam | null,
    returnType: TypeAnnotations,
    typeParameters: TypeParameterDeclaration | null,
|};

export type FunctionTypeParam = {|
    ..._Node,
    type: "FunctionTypeParam",
    name: Identifier | null,
    typeAnnotation: TypeAnnotations,
    optional: boolean,
|};

export type GenericTypeAnnotation = {|
    ..._Node,
    type: "GenericTypeAnnotation",
    id: Identifier,
    typeParameters: TypeParameterInstantiation | null,
|};

export type TypeParameterInstantiation = {|
    ..._Node,
    type: "TypeParameterInstantiation",
    params: TypeAnnotations[],
|};

export type TypeAnnotations =
    | StringTypeAnnotation
    | NumberTypeAnnotation
    | BooleanTypeAnnotation
    | StringLiteralTypeAnnotation
    | NumberLiteralTypeAnnotation
    | BooleanLiteralTypeAnnotation
    | AnyTypeAnnotation
    | MixedTypeAnnotation
    | EmptyTypeAnnotation
    | UnionTypeAnnotation
    | IntersectionTypeAnnotation
    | ObjectTypeAnnotation
    | FunctionTypeAnnotation
    | GenericTypeAnnotation;

export type TypeAnnotation = {|
    ..._Node,
    type: "TypeAnnotation",
    typeAnnotation: TypeAnnotations,
|};

export type TypeAlias = {|
    ..._Node,
    type: "TypeAlias",
    id: Identifier,
    typeParameters: TypeParameterDeclaration | null,
    right: TypeAnnotations,
|};

export type TypeParameterDeclaration = {|
    ..._Node,
    type: "TypeParameterDeclaration",
    params: TypeParameter[],
|};

export type TypeParameter = {|
    ..._Node,
    type: "TypeParameter",
    name: string,
    bound: TypeAnnotation | null,
    variance: Variance | null,
    default: TypeAnnotations | null,
|};

export type Variance = {|
    ..._Node,
    type: "Variance",
    kind: "plus" | "minus",
|};

export type DeclareFunction = {|
    ..._Node,
    type: "DeclareFunction",
    id: Identifier,
|};

export type DeclareModule = {|
    ..._Node,
    type: "DeclareModule",
    id: Literal<string>,
    body: BlockStatement,
    kind: "CommonJS" | "ES",
|};

export type DeclareExportDeclaration = {|
    ..._Node,
    type: "DeclareExportDeclaration",
    declaration: DeclareFunction | null, // TODO
    specifiers: ExportSpecifier[],
    source: null, // TODO
|};
// #endregion

export type Line = {|
    type: "Line",
    value: string,
|};

export type Block = {|
    type: "Block",
    value: string,
|};

export type Comment = Line | Block;

export type Directive = {|
    ..._Node,
    type: "ExpressionStatement",
    expression: Literal<string>,
    directive: string,
|};

export type _Function = {|
    ..._Node,
    id: Identifier | null,
    params: Pattern[],
    returnType: TypeAnnotation | null,
    typeParameters: TypeParameterDeclaration | null,
    body: FunctionBody,
|};

export type _Class = {|
    ..._Node,
    id: Identifier | null,
    typeParameters: TypeParameterDeclaration | null,
    superClass: Expression | null,
    superTypeParameters: TypeParameterInstantiation | null,
    body: ClassBody,
    // TODO: add "implements" and "decorators"
|};

export type ClassBody = {|
    type: "ClassBody",
    body: MethodDefinition[],
|};

export type MethodDefinition = {|
    ..._Node,
    type: "MethodDefinition",
    key: Expression,
    value: FunctionExpression,
    kind: "constructor" | "method" | "get" | "set",
    computed: boolean,
    static: boolean,
|};

export type FunctionBody = {|
    ...BlockStatement,
    body: (Directive | Statement)[],
|};

export type Program = {|
    ..._Node,
    type: "Program",
    body: (Directive | Statement)[],
    comments: Comment[],
|};
