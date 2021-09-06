import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

const local = localStorage.getItem("Cookie");
console.log(local);

const link = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
    credentials: "include",
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    link
})

export default client;

