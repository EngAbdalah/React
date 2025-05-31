import React, { useState } from "react";
import "./LoginComponent.css";
import { useLanguage } from "../../context/LanguageContext";

const LoginComponent = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            newErrors.email = t("emailRequired");
        } else if (!emailRegex.test(email)) {
            newErrors.email = t("invalidEmailFormat");
        }

        if (!password) {
            newErrors.password = t("passwordRequired");
        } else if (password.length < 8) {
            newErrors.password = t("passwordLength");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully!");
            console.log({ email, password });
        }
    };

    return (
        <div className="login-box">
            <h2>{t("login")}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>{t("emailAddress")}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error-text">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label>{t("password")}</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="toggle-btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? t("hide") : t("show")}
                    </button>
                    {errors.password && <p className="error-text">{errors.password}</p>}
                </div>

                <button type="submit" className="submit-btn">{t("login")}</button>
            </form>
        </div>
    );
};

export default LoginComponent;
