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


async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            return await getUserData(user.uid);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return errorCode;
        });

}

async function getUserData(uid) {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.data();
}

module.exports = {
    signup,
    login
}

