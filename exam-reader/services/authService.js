import { app } from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase-admin/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);


function signup(fullName, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            const user = userCredential.user;

            setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                fullName: fullName,
                email: user.email,
            });

            return getDoc(doc(db, "users", user.uid));
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

