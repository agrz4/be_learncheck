const { submoduleContent } = require('../data/mockSubmodule')

const quizCache = {};

function generateMockQuiz(tutorialId, n = 3) {
    const content = submoduleContent[tutorialId];
    if(!content) {
        return null;
    }

    const mockQuizResponse = {
        tutorials_id: tutorialId,
        topic: content.topic,
        objectives: content.objectives,
        questions: []
    };

    // Generate kuis simulasi
    for (let i = 0; i < n; i++) {
        mockQuizResponse.questions.push({
            stem: `Apa inti utama dari library React dan bagaimana data dikelola melalui props? (Soal ke-${i + 1})`,
            options: [
                { text: "React berpusat pada komponen fungsional dan kelas.", feedback: "Ini benar, komponen adalah inti React." },
                { text: "Props dapat diubah oleh komponen penerima.", feedback: "Ini salah. Props bersifat read-only." },
                { text: "Functional Component menggunakan Hooks untuk state.", feedback: "Ini benar. Hooks (useState, useEffect, dll.) digunakan di functional components." },
                { text: "React dikembangkan oleh Google.", feedback: "Ini salah. React dikembangkan oleh Facebook." }
            ],
            correct_indices: [0,2],
            difficulty: i % 2 === 0 ? "medium" : "easy",
            bloom: "understand",
            source_spans: ["Inti dari React adalah Komponen.", "Props bersifat read-only dan tidak boleh dimodifikasi."]
        });
    }

    // simpan hasil ke cache
    quizCache[tutorialId] = mockQuizResponse;
    return mockQuizResponse;
}

// mengambil kuis dari cache
function getCacheQuiz(tutorialId) {
    return quizCache[tutorialId];
}

module.exports = { generateMockQuiz, getCacheQuiz, quizCache };