import React, { useState } from "react";
import "./RegisterComponent.css"; 
import { useLanguage } from "../../context/LanguageContext";

const RegisterComponent = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^\S+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@*%$#]).{8,}$/;

    if (!formData.email) {
      newErrors.email = t("emailRequired");
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t("invalidEmail");
    }

    if (!formData.name) {
      newErrors.name = t("nameRequired");
    }

    if (!formData.username) {
      newErrors.username = t("usernameRequired");
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = t("usernameNoSpaces");
    }

    if (!formData.password) {
      newErrors.password = t("passwordRequired");
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = t("passwordRequirements");
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("confirmPasswordRequired");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("passwordsDoNotMatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Registration successful!", formData);
    }
  };

  return (
    <div className="login-box">
      <h2>{t("register")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t("emailAddress")}</label>
          <input type="email" name="email" onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>{t("name")}</label>
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>{t("username")}</label>
          <input type="text" name="username" onChange={handleChange} />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>{t("password")}</label>
          <input type="password" name="password" onChange={handleChange} />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>{t("confirmPassword")}</label>
          <input type="password" name="confirmPassword" onChange={handleChange} />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">{t("register")}</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
