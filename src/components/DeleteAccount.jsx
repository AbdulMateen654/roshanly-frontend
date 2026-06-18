import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteAccount({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            setLoading(true);
            setError("");
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/auth/delete/${user.id}`
            );
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete account.");
            setLoading(false);
        }
    };

    return (
        <>
            <button className="btn-delete-account" onClick={() => setShowModal(true)}>
                🗑️ Delete Account
            </button>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-icon">⚠️</div>
                        <h3>Delete Account</h3>
                        <p>
                            This will permanently delete your account and all your
                            sessions. This action cannot be undone.
                        </p>
                        {error && <div className="modal-error">{error}</div>}
                        <div className="modal-actions">
                            <button
                                className="modal-btn-cancel"
                                onClick={() => setShowModal(false)}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-btn-confirm"
                                onClick={handleDelete}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Yes, delete my account"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteAccount;