import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "./accessToken";

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL,
    credentials: "include",
})

const authMiddleware = new ApolloLink((operation, forward) => {

    const accessToken = getAccessToken();
    console.log("accessToken ", accessToken)
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: `bearer ${accessToken}`
        }
    }));

    return forward(operation);
})

const client = new ApolloClient({
    link: from([
        new TokenRefreshLink({
            accessTokenField: "accessToken",
            isTokenValidOrUndefined: () => {
                const token = getAccessToken();

                if (!token) {
                    return true;
                }

                try {
                    const { exp }: any = jwtDecode(token);
                    if (Date.now() >= exp * 1000) {
                        return false;
                    } else {
                        return true;
                    }
                } catch {
                    return false;
                }
            },
            fetchAccessToken: () => {
                return fetch("http://localhost:4000/refresh_token", {
                    method: "POST",
                    credentials: "include"
                });
            },
            handleFetch: accessToken => {
                setAccessToken(accessToken);
            },
            handleError: err => {
                console.warn("Your refresh token is invalid. Try to relogin");
                console.error(err);
            }
        }),
        authMiddleware,
        httpLink
    ]),
    cache: new InMemoryCache(),
})

export default client;

