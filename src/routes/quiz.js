const express = require('express');
const { getCacheQuiz, generateMockQuiz } = require('../utils/mockQuizGenerator');
const router = express.Router();

// POST /generate-quiz
router.post('/generate-quiz', (req, res) => {
    const { tutorialsId, n, force_regen } = req.body;

    if(!tutorialsId || !n) {
        return res.status(400).json({ error: "Missing tutorialsId or n in request body." });
    }

    // cek cache
    const cachedQuiz = getCacheQuiz(tutorialsId);

    // jika ada dicache dan force_regen bukan true, kirim cache
    if (cachedQuiz && !force_regen) {
        console.log(`[CACHE HIT] Mengambil kuis dari cache untuk ID: ${tutorialsId}`);
        return res.status(200).json(cachedQuiz);
    }

    // panggil generator
    const newQuiz = generateMockQuiz(tutorialsId, n);

    if (newQuiz) {
        console.log(`[GENERATED] Kuis baru dibuat untuk ID: ${tutorialsId}`);
        return res.status(200).json(newQuiz);
    } else {
        return res.status(404).json({ error: "Tutorial ID not found or content is empty." });
    }
});

// GET /quiz/:sub_id
router.get('/quiz/:sub_id', (req, res) => {
    const tutorialId = req.params.sub_id;
    const quiz = getCacheQuiz(tutorialId);

    if(quiz) {
        return res.status(200).json(quiz);
    } else {
        return res.status(404).json({ error: `Quiz for Tutorial ID ${tutorialId} not found. Generate it first using POST /generate-quiz.`});
    }
});

// POST /grade
router.post('/grade', (req, res) => {
    const { question, selected_indices } = req.body;

    if(!question || !selected_indices) {
        return res.status(400).json({ error: "Missing question or selected_indices in request body." });
    }

    const correctIndices = question.correct_indices || [];
    const options = question.options || [];

    if (correctIndices.length !== selected_indices.length) {
        return res.status(200).json({
            correct: false,
            feedbacks: selected_indices.map(index => options[index].feedback),
            correct_indices: correctIndices
        });
    }

    // Cek apakah semua elemen di selected_indices ada di correctIndices
    const isCorrect = selected_indices.every(index => correctIndices.includes(index));

    // ambil feedback hanya untuk opsi yang dipilih siswa
    const selectedFeedbacks = selected_indices.map(index => {
        // Pastikan indeks ada sebelum mengambil feedback
        return options[index] ? options[index].feedback : "Feedback not available.";
    });

    return res.status(200).json({
        correct: isCorrect,
        feedbacks: selectedFeedbacks,
        correct_indices: correctIndices
    });
});

module.exports = router;
