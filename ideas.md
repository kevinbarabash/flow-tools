# ideas

-   automatically determine if we're able to mark something as readonly
-   determine if a function or method mutates or not
-   generate a readonly interface from a class by removing all mutating methods
-   fast build system using sucrase.io and a watcher that keeps lib output dir up to date
-   finish AST (interfaces, declare nodes for libdefs, tighten nodes up using generics)
-   keep working on builder functions

# packages

- flow-ast: flow typed AST nodes + builders
- flow-build: sucrase + nodemon (or chokidar) to generate lib folders
- flow-codegen: thin wrapper around prettier
- flow-coverage-report: generate coverage reports for projects including files with @noflow
