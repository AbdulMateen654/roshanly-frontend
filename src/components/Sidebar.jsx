function Sidebar({ sessions, selectedSession, setSelectedSession, deleteSession, createNewSession }) {
    return (
        <div className="sidebar">
            <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Book pages */}
        <path d="M12 17 Q7 15 3 17 L3 7 Q7 5 12 7Z" fill="#7F77DD" opacity="0.9"/>
        <path d="M12 17 Q17 15 21 17 L21 7 Q17 5 12 7Z" fill="#9D97E8" opacity="0.9"/>
        {/* Spine */}
        <line x1="12" y1="7" x2="12" y2="17" stroke="#534AB7" strokeWidth="1.2"/>
        {/* Sun */}
        <circle cx="12" cy="4" r="2.2" fill="#FFD060"/>
        {/* Sun rays */}
        <line x1="12" y1="1" x2="12" y2="0.2" stroke="#FFD060" strokeWidth="1" strokeLinecap="round"/>
        <line x1="14.5" y1="1.8" x2="15" y2="1.2" stroke="#FFD060" strokeWidth="1" strokeLinecap="round"/>
        <line x1="9.5" y1="1.8" x2="9" y2="1.2" stroke="#FFD060" strokeWidth="1" strokeLinecap="round"/>
    </svg>
    Roshanly
</h2>

            <button className="new-session" onClick={createNewSession}>
                + New Session
            </button>

            <h3>History</h3>

            <div className="session-list">
                {sessions.map((session) => (
                    <div
                        key={session._id}
                        className={`session-item ${selectedSession?._id === session._id ? "active" : ""}`}
                    >
                        <p onClick={() => setSelectedSession(session)}>
                            📄 {session.aiTitle || session.sessionTitle}
                        </p>
                        <span
                            className="delete-btn"
                            onClick={() => deleteSession(session._id)}
                        >
                            🗑️
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;