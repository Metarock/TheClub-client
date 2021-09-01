import { ApolloClient, ApolloLink, createHttpLink, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const link = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "same-origin"
});

const authMiddleware = new ApolloLink((operation, forward) => {

    operation.setContext(({ headers = { } }) => ({
        headers: {
            ...headers,
        }
    }));

    return forward(operation);
})


// // cached storage for the user token
// let token = '';
// const withToken = setContext(() => {
//     // if you have a cached value, return it immediately
//     if (token) {
//         console.log('found token');
//         return { token }
//     };

// });


// const authFlowLink = withToken.concat(resetToken);


const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

export default client;

