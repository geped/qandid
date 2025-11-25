// src/services/aiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inizializza Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function optimizeCV(cvText, jobDescription) {
    try {
        // Usiamo il modello gemini-1.5-flash perché è veloce ed economico
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // --- FASE 4: OTTIMIZZAZIONE PROMPT DI SISTEMA ---
        const prompt = `
        Sei un esperto Senior HR Recruiter e Resume Writer professionale.
        
        IL TUO COMPITO:
        Riscrivi il seguente CV per ottimizzarlo specificamente per la Job Description (JD) fornita.
        
        JOB DESCRIPTION:
        "${jobDescription}"
        
        CV ORIGINALE:
        "${cvText}"
        
        REGOLE DA SEGUIRE:
        1. Mantieni la verità assoluta: non inventare esperienze non presenti nel CV originale.
        2. Enfatizza le skill e le esperienze del candidato che fanno match con la JD.
        3. Usa un tono professionale, diretto e orientato ai risultati.
        4. Usa parole chiave presenti nella JD per superare i filtri ATS (Applicant Tracking Systems).
        5. Ristruttura il CV in formato Markdown pulito, usando elenchi puntati.
        6. Aggiungi un breve "Profilo Professionale" all'inizio che riassuma perché il candidato è perfetto per QUESTO ruolo.
        
        OUTPUT:
        Restituisci solo il testo del nuovo CV in formato Markdown.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error("Errore AI:", error);
        throw new Error("Impossibile generare il CV al momento. Controlla la API Key.");
    }
}

module.exports = { optimizeCV };