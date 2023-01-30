import { app } from '../firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { AppContext } from '../App';
import React from 'react';

const db = getFirestore(app);



function addClass(user, className) {
    const uid = React.useContext(AppContext).value.userData.id;
    
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

