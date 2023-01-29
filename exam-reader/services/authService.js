import { app } from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

function signup(name, surname, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            db.collection("users").doc(user.uid).set({
                id: user.uid,
                name: name,
                surname: surname,
                email: user.email,
                classes: []
            })

            return db.collection("users").doc(user.uid).get();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}


function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(db.collection("users").doc(user.uid).get());
            return db.collection("users").doc(user.uid).get();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

}

module.exports = {
    signup,
    login
}

