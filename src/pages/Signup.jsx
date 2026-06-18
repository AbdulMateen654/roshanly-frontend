import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { validateName, validateEmail, validatePassword } from "../utils/validation";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [serverError, setServerError] = useState("");

    const navigate = useNavigate();

    const handleSignup = async () => {

        // validate all fields
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setErrors({ name: nameError, email: emailError, password: passwordError });

        // stop if any error
        if (nameError || emailError || passwordError) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/signup`,
                { name, email, password }
            );

            setServerError("");
            setMessage(response.data.message);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setTimeout(() => navigate("/dashboard"), 1000);

        } catch (err) {
            setMessage("");
            setServerError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="brand">
                    <div className="brand-logo">
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
                    </div>
                    <div className="brand-name">Roshanly</div>
                    <div className="brand-tagline">Making Every Lesson Brighter.</div>
                </div>

                <h2 className="form-title">Create your account</h2>

                {message && <div className="message-success">{message}</div>}
                {serverError && <div className="message-error">{serverError}</div>}

                <div className="form-group">
                    <label>Full name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                        }}
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                <button className="btn-primary" onClick={handleSignup}>Sign up</button>
                <div className="divider">or</div>
                <button className="btn-secondary" onClick={() => navigate("/login")}>
                    Already a user? Log in
                </button>

            </div>
        </div>
    );
}

export default Signup;