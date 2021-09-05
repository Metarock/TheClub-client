import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NODE_ENV === "production" ? "https://clubwithenv.azurewebsites.net/graphql" : "http://localhost:4000/graphql",
        credentials: "include"
    }),
    cache: new InMemoryCache(),
})

export default client;

