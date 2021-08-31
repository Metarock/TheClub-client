import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: process.env.PORT,
    credentials: "include"
});


const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default client;