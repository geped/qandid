// src/controllers/cvController.js
const aiService = require('../services/aiService');

// Mostra la Home Page
exports.getHomePage = (req, res) => {
    res.render('index', { error: null });
};

// Gestisce la generazione del CV
exports.generateOptimizedCV = async (req, res) => {
    const { cvText, jobDescription } = req.body;

    if (!cvText || !jobDescription) {
        return res.render('index', { error: "Per favore inserisci sia il CV che la Job Description." });
    }

    try {
        // Chiama il servizio AI
        const optimizedCV = await aiService.optimizeCV(cvText, jobDescription);
        
        // Converte i ritorni a capo per l'HTML (semplificazione)
        // Nota: In produzione useremmo un parser Markdown vero e proprio (es. 'marked')
        // Qui passiamo il testo grezzo e lo formatteremo nella vista
        res.render('result', { optimizedCV });
    } catch (error) {
        res.render('index', { error: "Errore durante la generazione: " + error.message });
    }
};