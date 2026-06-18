function ResponsePanel({ selectedSession }) {
    return (
        <div className="response">
            {selectedSession ? (
                <>
                    <h3>{selectedSession.aiTitle || selectedSession.sessionTitle}</h3>

                    {/* SUMMARY */}
                    {selectedSession.summary?.length > 0 && (
                        <ul>
                            {selectedSession.summary.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}

                    {/* QUIZ */}
                    {selectedSession.quiz?.length > 0 && (
                        <>
                            <h3 style={{ marginTop: "24px" }}>🧠 Quiz</h3>
                            {selectedSession.quiz.map((q, index) => (
                                <div key={index} className="quiz-question">
                                    <p>Q{index + 1}: {q.question}</p>
                                    <ul>
                                        {q.options.map((option, i) => (
                                            <li key={i}>{option}</li>
                                        ))}
                                    </ul>
                                    <p className="quiz-answer">✅ Answer: {q.answer}</p>
                                </div>
                            ))}
                        </>
                    )}
                </>
            ) : (
                <p>AI generated summary or quiz will appear here...</p>
            )}
        </div>
    );
}

export default ResponsePanel;