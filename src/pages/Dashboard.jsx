import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TextInput from "../components/TextInput";
import ActionButtons from "../components/ActionButtons";
import ResponsePanel from "../components/ResponsePanel";

function Dashboard() {
    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [quizLoading, setQuizLoading] = useState(false);
    const [inputError, setInputError] = useState("");
    const [quizError, setQuizError] = useState("");
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    const [user] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const toggleDarkMode = () => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem("darkMode", next);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (!storedUser) return;
                const user = JSON.parse(storedUser);
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/sessions/${user.id}`
                );
                setSessions(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSessions();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const createNewSession = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/sessions/create`,
                { userId: user.id, sessionTitle: "New Session" }
            );
            setSessions((prev) => [res.data, ...prev]);
            setSelectedSession(res.data);
            setText("");
            return res.data;
        } catch (err) {
            console.error(err);
        }
    };

    const deleteSession = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/sessions/${id}`);
            setSessions((prev) => prev.filter((session) => session._id !== id));
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const cleanText = (raw) => {
        return raw
            .replace(/[•·▪▸◦‣⁃]/g, "")
            .replace(/[ \t]+/g, " ")
            .replace(/\n{2,}/g, "\n")
            .trim();
    };

    return (
        <div className={`dashboard ${darkMode ? "dark" : ""}`}>

            <Sidebar
                sessions={sessions}
                selectedSession={selectedSession}
                setSelectedSession={setSelectedSession}
                deleteSession={deleteSession}
                createNewSession={createNewSession}
            />

            <div className="main">

                <Topbar
                    user={user}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    handleLogout={handleLogout}
                />

                <TextInput
                    text={text}
                    setText={setText}
                    inputError={inputError}
                    setInputError={setInputError}
                />

                <ActionButtons
                    text={text}
                    cleanText={cleanText}
                    selectedSession={selectedSession}
                    setSelectedSession={setSelectedSession}
                    setSessions={setSessions}
                    createNewSession={createNewSession}
                    loading={loading}
                    setLoading={setLoading}
                    quizLoading={quizLoading}
                    setQuizLoading={setQuizLoading}
                    inputError={inputError}
                    setInputError={setInputError}
                    quizError={quizError}
                    setQuizError={setQuizError}
                />

                <ResponsePanel selectedSession={selectedSession} />

            </div>

        </div>
    );
}

export default Dashboard;