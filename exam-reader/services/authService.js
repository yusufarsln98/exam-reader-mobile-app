import { app } from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);


function signup(fullName, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                fullName: fullName,
                email: user.email,
            });
            const userDoc = await getDoc(doc(db, "users", user.uid));
            return userDoc.data();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return errorCode;
        });
}


function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            return userDoc.data();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return errorCode;
        });

}

module.exports = {
    signup,
    login
}

