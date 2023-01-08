import noMobxAsyncActions from "./rules/no-mobx-async-actions"

export = {
    rules: {
        "no-mobx-async-action": noMobxAsyncActions,
    },
    configs: {
        recommended: {
            plugins: ["paper-mobx"],
            rules: {
                "paper-mobx/no-mobx-async-action": "error",
            },
        },
    },
};
