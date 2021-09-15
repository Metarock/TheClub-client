import firebase from "./firebase-config";

const socialMediaAuth = (provider: any) => {
    return firebase.auth().signInWithPopup(provider).then((res) => {
        return res.user;
    })
        .catch((err) => {
            console.log("There is an error");
            return err;
        })
}

export default socialMediaAuth;