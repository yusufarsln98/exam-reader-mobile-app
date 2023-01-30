import { app } from '../firebaseConfig';
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

function addClass(user, className) {
    return db.collection("users").doc(user.id).update({
        classes: firebase.firestore.FieldValue.arrayUnion(className)
    });
}

function removeClass(user, className) {
    return db.collection("users").doc(user.id).update({
        classes: firebase.firestore.FieldValue.arrayRemove(className)
    });
}

module.exports = {
    addClass,
    removeClass
}

