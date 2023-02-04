const dummyClasses = [
{
    id: 1,
    className: "9/A",
    exams: [
        {
        id: 1,
        examName: "Matematik",
        answer_keys: "AABBCECDDEAEAABBCECDDEAEA",
        question_number: 25,
        results: [
            {
            id: 1,
            studentFullName: "Ahmet Yılmaz",
            studentNumber: 1234,
            studentAnswers: "AABBCECDDEAEAABBCECDDEAEC",
            grade: 96,
            },
            {
            id: 2,
            studentFullName: "Mehmet Yılmaz",
            studentNumber: 1235,
            studentAnswers: "AABBCECDDEAEAABBCECDDEACC",
            grade: 92,
            },
            {
            id: 3,
            studentFullName: "Ayşe Yılmaz",
            studentNumber: 1236,
            studentAnswers: "AABBDECDDEAEAABBCECDDEACC",
            grade: 88,
            },
        ]
        },
        {
        id: 2,
        examName: "Fizik",
        answer_keys: "AABBCECDDEAEAABBCECD",
        question_number: 20,
        results: [
            {
                id: 1,
                studentFullName: "Ahmet Yılmaz",
                studentNumber: 1234,
                studentAnswers: "AABBCECDDEAEAABBCECD",
                grade: 100,
            },
            {
                id: 2,
                studentFullName: "Mehmet Yılmaz",
                studentNumber: 1235,
                studentAnswers: "AABBCECDDEAEAABBCECD",
                grade: 100,
            },
            {
                id: 3,
                studentFullName: "Ayşe Yılmaz",
                studentNumber: 1236,
                studentAnswers: "AABBCECDDEAEAABBCECD",
                grade: 100,
            },
        ]
        }
    ]
    },
    {
    id: 2,
    className: "9/B",
    exams: [
        {
        id: 1,
        examName: "Kimya",
        answer_keys: "AABBCECDDEAEAABBCECDDEAEA",
        question_number: 25,
        results: [
            {
            id: 1,
            studentFullName: "Ahmet Yılmaz",
            studentNumber: 1234,
            studentAnswers: "AABBCECDDEAEAABBCECDDEAEC",
            grade: 96,
            },
            {
            id: 2,
            studentFullName: "Mehmet Yılmaz",
            studentNumber: 1235,
            studentAnswers: "AABBCECDDEAEAABBCECDDEACC",
            grade: 92,
            },
            {
            id: 3,
            studentFullName: "Ayşe Yılmaz",
            studentNumber: 1236,
            studentAnswers: "AABBDECDDEAEAABBCECDDEACC",
            grade: 88,
            },
        ]
        },
        {
        id: 2,
        examName: "Biyoloji",
        answer_keys: "AABBCECDDEAEAABBCECD",
        question_number: 20,
        results: [
            {
                id: 1,
                studentFullName: "Ahmet Yılmaz",
                studentNumber: 1234,
                studentAnswers: "AABBCECDDEAEAABBCECD",
                grade: 100,
            },
            {
                id: 2,
                studentFullName: "Mehmet Yılmaz",
                studentNumber: 1235,
                studentAnswers: "AABBCECDDEAEAABBCECD",
                grade: 100,
            },
            {
                id: 3,
                studentFullName: "Ayşe Yılmaz",
                studentNumber: 1236,
                studentAnswers: "AABBCECDDEAEAABBCECD",
                grade: 100,
            },
        ]
        }
    ]
    }
]

const getClasses = () => {
    return dummyClasses;
}

const getClass = (id) => {
    return dummyClasses.find((dummyClass) => dummyClass.id === id);
}

const getAllExams = () => {
    let allExams = [];
    dummyClasses.forEach((dummyClass) => {
        dummyClass.exams.forEach((exam) => {
            allExams.push({ ...exam, className: dummyClass.className });
        });
    });
    return allExams;
}

const getExams = (id) => {
    return dummyClasses.find((dummyClass) => dummyClass.id === id).exams;
}

const getExam = (id, examId) => {
    return dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId);
}

const getAllResults = () => {
    let allResults = [];
    dummyClasses.forEach((dummyClass) => {
        dummyClass.exams.forEach((exam) => {
            exam.results.forEach((result) => {
                allResults.push(...result);
            });
        });
    });
    return allResults;
}

const getResults = (id, examId) => {
    return dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results;
}

const getResult = (id, examId, resultId) => {
    return dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.find((result) => result.id === resultId);
}

export { getClasses, getClass, getExams, getExam, getResults, getResult, getAllExams, getAllResults };