"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const no_mobx_async_actions_1 = __importDefault(require("./rules/no-mobx-async-actions"));
module.exports = {
    rules: {
        "no-mobx-async-actions": no_mobx_async_actions_1.default,
    },
    configs: {
        recommended: {
            plugins: ["paper-mobx"],
            rules: {
                "paper-mobx/no-mobx-async-actions": "error",
            },
        },
    },
};
//# sourceMappingURL=index.js.map