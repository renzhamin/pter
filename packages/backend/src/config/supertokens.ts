import supertokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import ThirdParty from "supertokens-node/recipe/thirdparty"
import { Env } from "@/config/env"
import Dashboard from "supertokens-node/recipe/dashboard"
import UserMetadata from "supertokens-node/recipe/usermetadata"

supertokens.init({
    framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        connectionURI: Env.supertokens.uri,
        apiKey: Env.supertokens.key
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: Env.supertokens.appName,
        apiDomain: Env.backendUrl,
        websiteDomain: Env.frontendUrl,
        apiBasePath: "/api/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        UserMetadata.init(),
        ThirdParty.init({
            override: {
                functions: (originalImplementation) => {
                    return {
                        ...originalImplementation,
                        // override the thirdparty sign in / up API

                        signInUp: async function (input) {
                            let response =
                                await originalImplementation.signInUp(input)

                            if (response.status === "OK") {
                                let name =
                                    response.rawUserInfoFromProvider
                                        .fromUserInfoAPI!["given_name"]

                                let studentId =
                                    response.rawUserInfoFromProvider
                                        .fromUserInfoAPI!["family_name"]

                                const userId = response.user.id

                                // TODO: Save name and studentId in database
                                await UserMetadata.updateUserMetadata(userId, {
                                    name,
                                    studentId
                                })
                            }

                            return response
                        }
                    }
                }
            },
            signInAndUpFeature: {
                providers: [
                    {
                        config: {
                            thirdPartyId: "google",
                            clients: [
                                {
                                    clientId: Env.google.clientId,
                                    clientSecret: Env.google.clientSecret,
                                    scope: [
                                        "https://www.googleapis.com/auth/userinfo.email",
                                        "https://www.googleapis.com/auth/userinfo.profile"
                                    ]
                                }
                            ]
                        }
                    }
                ]
            }
        }),
        Session.init(),
        Dashboard.init()
    ]
})
