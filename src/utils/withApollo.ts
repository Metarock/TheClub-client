import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
});

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

