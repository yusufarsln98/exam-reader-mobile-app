import { app } from '../firebaseConfig';
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

function create(user) {
    return db.collection("users").doc(user.id).set(user);
}

function get(id) {
    return db.collection("users").doc(id).get();
}

function update(id, data) {
    return db.collection("users").doc(id).update(data);
}

function remove(id) {
    return db.collection("users").doc(id).delete();
}



module.exports = {
    getAll,
    create,
    get,
    update,
    remove,
    removeAll
}


