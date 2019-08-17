# flow-tools

A set of tools for working with flow typed JavaScript code

## packages

- flow-ast: flow typed AST nodes + builders
- flow-build: sucrase + nodemon (or chokidar) to generate lib folders
- flow-codegen: thin wrapper around prettier for pretty printing flow ASTs
- flow-coverage-report: generate coverage reports for projects including files with @noflow

## ideas

- automatically determine if we're able to mark something as readonly
- determine if a function or method mutates or not
- generate a readonly interface from a class by removing all mutating methods
- ...
