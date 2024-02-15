import supertokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import ThirdPartyPasswordless from "supertokens-node/recipe/thirdpartypasswordless"
import { Env } from "@/config/env"

supertokens.init({
    framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        connectionURI: Env.supertokens.uri,
        apiKey: Env.supertokens.key,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: Env.supertokens.appName,
        apiDomain: Env.backendUrl,
        websiteDomain: Env.frontendUrl,
        apiBasePath: "/api/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        ThirdPartyPasswordless.init({
            flowType: "MAGIC_LINK",
            contactMethod: "EMAIL",
            providers: [
                {
                    config: {
                        thirdPartyId: "google",
                        clients: [
                            {
                                clientId: Env.google.clientId,
                                clientSecret: Env.google.clientSecret,
                            },
                        ],
                    },
                },
                {
                    config: {
                        thirdPartyId: "github",
                        clients: [
                            {
                                clientId: "6cf2ed227435f9ab2cae",
                                clientSecret:
                                    "9216d3c33802790afbc9539f1c85e2243533e3d2",
                            },
                        ],
                    },
                },
            ],
        }),
        Session.init(),
    ],
})
