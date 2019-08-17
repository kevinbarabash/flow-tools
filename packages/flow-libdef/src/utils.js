// @flow
import fs from "fs";
import parse from "./parse";

const IMPORT_REGEX = /import[^'"]+['"]([^'"]+)['"]/gm;

const Constants = {
    ImportDeclaration: ("ImportDeclaration": "ImportDeclaration"),
    ImportSpecifier: ("ImportSpecifier": "ImportSpecifier"),
    ImportDefaultSpecifier: ("ImportDefaultSpecifier": "ImportDefaultSpecifier"),
    ImportNamespaceSpecifier: ("ImportNamespaceSpecifier": "ImportNamespaceSpecifier"),
};

export const extractImports = (source: string) => {
    // TODO: parse cached files
    const ast = parse(source);
    for (const stmt of ast.body) {
        if (stmt.type === Constants.ImportDeclaration) {
            console.log(
                `import path = "${stmt.source.value}" of kind: ${stmt.importKind}`,
            );
            for (const specifier of stmt.specifiers) {
                if (specifier.type === Constants.ImportDefaultSpecifier) {
                    console.log(`  ${specifier.local.name}`);
                } else if (specifier.type === Constants.ImportSpecifier) {
                    console.log(
                        // $FlowFixMe
                        `  ${specifier.local.name} : ${specifier.importKind}`,
                    );
                }
            }
        }
    }
};

export function getDeps(entry: string) {
    // extract all imports from a file and then resolve the paths
    // it looks like ES6 will require extensions but we can't actually rely on that in real projects
}
