import { app } from '../firebaseConfig';
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

function createExam(user, className, exam) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(exam.name).set(exam);
}

function getExam(user, className, examName) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).get();
}

function updateExam(user, className, examName, data) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).update(data);
}

function removeExam(user, className, examName) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").doc(examName).delete();
}

function removeAllExams(user, className) {
    return db.collection("users").doc(user.id).collection("classes").doc(className).collection("exams").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.ref.delete();
        });
    });
}

module.exports = {
    createExam,
    getExam,
    updateExam,
    removeExam,
    removeAllExams
}
