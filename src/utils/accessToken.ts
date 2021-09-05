let accessToken = ""; //global variable


export const setAccessToken = (s: string) => {
    accessToken = s
}

export const getAccessToken = () => {
    return accessToken;
}