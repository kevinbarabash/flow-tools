// @flow
import * as b from "./builder";
import * as AST from "./ast";

function filter<T, P: $Pred<1>>(
    arr: Array<T>,
    pred: P,
): Array<$Refine<T, P, 1>> {
    return arr.filter(pred);
}

const genLibdef = (program: AST.Program, name: string): AST.Program => {
    const namedExports: AST.ExportNamedDeclaration[] = filter(
        program.body,
        (stmt: AST.Statement): %checks =>
            stmt.type === "ExportNamedDeclaration",
    );

    const declares = [];

    for (const {declaration} of namedExports) {
        if (
            declaration &&
            declaration.type === "FunctionDeclaration" &&
            declaration.returnType
        ) {
            const {returnType} = declaration;
            declares.push(
                b.declareFunction(
                    b.identifier(
                        declaration.id.name,
                        b.typeAnnotation(
                            b.functionTypeAnnotation(
                                // TODO: handle other param types, e.g. rest
                                declaration.params.map(param => {
                                    switch (param.type) {
                                        case "Identifier": {
                                            const {typeAnnotation} = param;
                                            if (typeAnnotation) {
                                                return b.functionTypeParam(
                                                    b.identifier(param.name),
                                                    typeAnnotation.typeAnnotation,
                                                    param.optional,
                                                );
                                            }
                                            return b.functionTypeParam(
                                                b.identifier(param.name),
                                                b.anyTypeAnnotation(),
                                                param.optional,
                                            );
                                        }
                                        default: {
                                            // $FlowFixMe
                                            return {};
                                        }
                                    }
                                }),
                                returnType.typeAnnotation,
                            ),
                        ),
                    ),
                ),
            );
        }
    }

    return b.program([
        b.declareModule(b.literal(name), b.blockStatement(declares), "ES"),
    ]);
};

export default genLibdef;
