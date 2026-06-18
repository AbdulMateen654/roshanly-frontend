import DeleteAccount from "./DeleteAccount";

function Topbar({ user, darkMode, toggleDarkMode, handleLogout }) {
    return (
        <div className="topbar">
            {user && <h3>👋 Welcome, {user.name}</h3>}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button className="dark-toggle" onClick={toggleDarkMode}>
                    {darkMode ? "☀️ Light" : "🌙 Dark"}
                </button>
                {user && <DeleteAccount user={user} />}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Topbar;