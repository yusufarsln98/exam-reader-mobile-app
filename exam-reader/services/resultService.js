import { app } from '../firebaseConfig';
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

function createResult(user, className, examName, result) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).collection("results").doc(result.id).set(result);
}

function getResult(user, className, examName, resultId) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).collection("results").doc(resultId).get();
}

function updateResult(user, className, examName, resultId, data) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).collection("results").doc(resultId).update(data);
}

function removeResult(user, className, examName, resultId) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).collection("results").doc(resultId).delete();
}

function removeAllResults(user, className, examName) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).collection("results").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });
    });
}

module.exports = {
    createResult,
    getResult,
    updateResult,
    removeResult,
    removeAllResults
}
