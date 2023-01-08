import noMobxAsyncActions from "./rules/no-mobx-async-actions"

export = {
    rules: {
        "no-mobx-async-actions": noMobxAsyncActions,
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
