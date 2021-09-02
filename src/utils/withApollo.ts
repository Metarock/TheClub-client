import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
    uri: "https://clubwithenv.azurewebsites.net/graphql",
    credentials: "include"
});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

export default client;

