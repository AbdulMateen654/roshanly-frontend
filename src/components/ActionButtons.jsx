import axios from "axios";

function ActionButtons({
    text,
    cleanText,
    selectedSession,
    setSelectedSession,
    setSessions,
    createNewSession,
    loading,
    setLoading,
    quizLoading,
    setQuizLoading,
    setInputError,
    quizError,
    setQuizError
}) {
    const setErrorWithFade = (setter, message) => {
    setter(message);
    setTimeout(() => setter(""), 5000);
};
    const handleSummarize = async () => {
    setInputError("");

    if (!text.trim()) {
        setErrorWithFade(setInputError, "Please paste your study material first.");
        return;
    }
    if (text.trim().length < 50) {
        setErrorWithFade(setInputError, "Text is too short. Please paste meaningful study material.");
        return;
    }

    try {
        setLoading(true);

        // ✅ Reuse existing session, or create one only if none is selected
        const activeSession = (!selectedSession || selectedSession.summary?.length > 0)
    ? await createNewSession()
    : selectedSession;

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/sessions/summarize/${activeSession._id}`,
            { text: cleanText(text) }
        );

        const updated = res.data.session;
        setSelectedSession(updated);
        setSessions((prev) =>
            prev.map((s) => s._id === updated._id ? updated : s)
        );
        setLoading(false);

    } catch (err) {
        console.error(err);
        setLoading(false);
    }
};

    const handleQuiz = async () => {
        setQuizError("");

        if (!selectedSession) {
            setErrorWithFade(setQuizError, "Please select or create a session first.");
            return;
        }
        if (!selectedSession.summary || selectedSession.summary.length === 0) {
           setErrorWithFade(setQuizError, "Please generate a summary before creating a quiz.");

            return;
        }

        try {
            setQuizLoading(true);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/sessions/quiz/${selectedSession._id}`
            );

            const updated = res.data.session;
            setSelectedSession(updated);
            setSessions((prev) =>
                prev.map((s) => s._id === updated._id ? updated : s)
            );
            setQuizLoading(false);

        } catch (err) {
            console.error(err);
            setErrorWithFade(setQuizError, "Something went wrong. Please try again.");
            setQuizLoading(false);
        }
    };

    return (
        <>
            <div className="buttons">
                <button onClick={handleSummarize}>
                    {loading ? "Generating..." : "✨ Summarize"}
                </button>
                <button onClick={handleQuiz}>
                    {quizLoading ? "Generating..." : "🧠 Generate Quiz"}
                </button>
            </div>

            {quizError && (
                <div className="input-error">
                    ⚠️ {quizError}
                </div>
            )}
        </>
    );
}

export default ActionButtons;
