// @noflow
const path = require("path");
const {transform} = require("sucrase");

module.exports = {
    process(src, filename, config, options) {
        return transform(src, {transforms: ["flow", "imports"]}).code;
    },
};
