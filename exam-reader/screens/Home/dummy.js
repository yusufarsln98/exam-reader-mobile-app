let dummyClasses = [
  {
    id: 1,
    className: "9/A",
    exams: [
      {
        id: 1,
        examName: "Matematik",
        answerKey: "AABBCECDDEAEAABBCECDDEAEA",
        questionNumber: 25,
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
        answerKey: "AABBCECDDEAEAABBCECD",
        questionNumber: 20,
        results: [
          {
            id: 4,
            studentFullName: "Ahmet Yılmaz",
            studentNumber: 1234,
            studentAnswers: "AABBCECDDEAEAABBCECD",
            grade: 100,
          },
          {
            id: 5,
            studentFullName: "Mehmet Yılmaz",
            studentNumber: 1235,
            studentAnswers: "AABBCECDDEAEAABBCECD",
            grade: 100,
          },
          {
            id: 6,
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
    className: "CSE343 - Software",
    exams: [
      {
        id: 3,
        examName: "Midterm",
        answerKey: "AABBCECDDEAEAABBCECDDEAEA",
        questionNumber: 25,
        results: [
          {
            id: 7,
            studentFullName: "Ahmet Yılmaz",
            studentNumber: 1234,
            studentAnswers: "AABBCECDDEAEAABBCECDDEAEC",
            grade: 96,
          },
          {
            id: 8,
            studentFullName: "Mehmet Yılmaz",
            studentNumber: 1235,
            studentAnswers: "AABBCECDDEAEAABBCECDDEACC",
            grade: 92,
          },
          {
            id: 9,
            studentFullName: "Ayşe Yılmaz",
            studentNumber: 1236,
            studentAnswers: "AABBDECDDEAEAABBCECDDEACC",
            grade: 88,
          },
        ]
      },
    ]
  }
]

const getClasses = () => {
  return dummyClasses;
}

const getClass = (id) => {
  return dummyClasses.find((dummyClass) => dummyClass.id === id);
}

const getExams = () => {
  let allExams = [];
  dummyClasses.forEach((dummyClass) => {
    dummyClass.exams.forEach((exam) => {
      allExams.push({ ...exam, classId: dummyClass.id });
    });
  });
  return allExams;
}

const getExamsOfClass = (id) => {
  let exams = dummyClasses.find((dummyClass) => dummyClass.id === id).exams;
  return exams.map((exam) => { return { ...exam, classId: id } });
}

const getExam = (id, examId) => {
  return { ...dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId), classId: id };
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

const addClass = (className) => {
  dummyClasses.push({
    id: dummyClasses.length + 1,
    className: className,
    exams: []
  });
}

const addExam = (id, examName, answerKey, questionNumber) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.push({
    id: dummyClasses.find((dummyClass) => dummyClass.id === id).exams.length + 1,
    examName: examName,
    answerKey: answerKey,
    questionNumber: questionNumber,
    results: []
  });
}

const addResult = (id, examId, studentFullName, studentNumber, studentAnswers, grade) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.push({
    id: dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.length + 1,
    studentFullName: studentFullName,
    studentNumber: studentNumber,
    studentAnswers: studentAnswers,
    grade: grade
  });
}

const addExamanswerKey = (id, examId, answerKey) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).answerKey = answerKey;
}

const addExamQuestionNumber = (id, examId, questionNumber) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).questionNumber = questionNumber;
}

const updateClass = (id, className) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).className = className;
}

const updateExam = (id, examId, examName, answerKey, questionNumber) => {
  let exam = dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId);
  // remove exam from dummyClasses
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams = dummyClasses.find((dummyClass) => dummyClass.id === id).exams.filter((exam) => exam.id !== examId);
  // add exam to dummyClasses
  exam.examName = examName;
  exam.answerKey = answerKey;
  exam.questionNumber = questionNumber;
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.push(exam);
}

const updateResult = (id, examId, resultId, studentFullName, studentNumber, studentAnswers, grade) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.find((result) => result.id === resultId).studentFullName = studentFullName;
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.find((result) => result.id === resultId).studentNumber = studentNumber;
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.find((result) => result.id === resultId).studentAnswers = studentAnswers;
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.find((result) => result.id === resultId).grade = grade;
}

const deleteClass = (id) => {
  dummyClasses = dummyClasses.filter((dummyClass) => dummyClass.id !== id);
}

const deleteAllClasses = () => {
  dummyClasses = [];
}

const deleteAllExams = () => {
  dummyClasses.forEach((dummyClass) => {
    dummyClass.exams = [];
  });
}

const deleteExamsOfClass = (id) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams = [];
}

const deleteExam = (id, examId) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams = dummyClasses.find((dummyClass) => dummyClass.id === id).exams.filter((exam) => exam.id !== examId);
}

const deleteResults = (id, examId) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results = [];
}

const deleteResult = (id, examId, resultId) => {
  dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results = dummyClasses.find((dummyClass) => dummyClass.id === id).exams.find((exam) => exam.id === examId).results.filter((result) => result.id !== resultId);
}

export {
  getClasses, getClass, getExams, getExam, getResults, getResult, getExamsOfClass, getAllResults,
  addClass, addExam, addResult, addExamanswerKey, addExamQuestionNumber, updateClass, updateExam, updateResult,
  deleteClass, deleteExam, deleteResult, deleteAllClasses, deleteAllExams, deleteResults, deleteExamsOfClass
};