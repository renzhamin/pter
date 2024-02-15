import Session from "supertokens-auth-react/recipe/session"
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless"
import supertokensCSS from "@/css/supertokens.css?inline"
import { Env } from "./env"
import { SuperTokensConfig } from "supertokens-auth-react/lib/build/types"

export const supertokensConfig: SuperTokensConfig = {
    appInfo: {
        appName: Env.supertokens.appName,
        apiDomain: Env.backendUrl + "/api",
        websiteDomain: Env.domain,
        apiBasePath: "/api/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        ThirdPartyPasswordless.init({
            style: supertokensCSS,
            contactMethod: "EMAIL",
            signInUpFeature: {
                providers: [
                    ThirdPartyPasswordless.Google.init(),
                    ThirdPartyPasswordless.Github.init(),
                ],
            },
        }),
        Session.init(),
    ],
}
