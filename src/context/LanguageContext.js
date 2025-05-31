import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../Redux/Acions/LangAction';

// Create translations object
export const translations = {
  EN: {
    home: "Home",
    movies: "Movies",
    favorites: "Favorites",
    login: "Login",
    register: "Register",
    search: "Search for movies...",
    popularMovies: "Popular Movies",
    myFavorites: "My Favorites",
    noFavorites: "You haven't added any movies to your favorites yet.",
    loading: "Loading...",
    noMovies: "No movies found.",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",
    movieDetails: "Movie Details",
    // New keys for forms
    emailAddress: "Email Address",
    name: "Name",
    username: "Username",
    password: "Password",
    confirmPassword: "Confirm Password",
    emailRequired: "Email is required.",
    invalidEmail: "Invalid email format.",
    nameRequired: "Name is required.",
    usernameRequired: "Username is required.",
    usernameNoSpaces: "Username must not contain spaces.",
    passwordRequired: "Password is required.",
    passwordRequirements: "Password must be at least 8 characters, include lowercase, uppercase, digit, and special character (@*%$#).",
    confirmPasswordRequired: "Confirm Password is required.",
    passwordsDoNotMatch: "Passwords do not match.",
    invalidEmailFormat: "Invalid email format. Use xxx@xxxx.com.",
    passwordLength: "Password must be at least 8 characters long.",
    show: "Show",
    hide: "Hide",
    // Home page
    welcomeHome: "Welcome to the Home Page",
    mainPageDescription: "This is the main page of our application."
  },
  AR: {
    home: "الرئيسية",
    movies: "الأفلام",
    favorites: "المفضلة",
    login: "تسجيل الدخول",
    register: "التسجيل",
    search: "البحث عن أفلام...",
    popularMovies: "الأفلام الشائعة",
    myFavorites: "أفلامي المفضلة",
    noFavorites: "لم تقم بإضافة أي أفلام إلى المفضلة بعد.",
    loading: "جاري التحميل...",
    noMovies: "لم يتم العثور على أفلام.",
    addToFavorites: "أضف إلى المفضلة",
    removeFromFavorites: "إزالة من المفضلة",
    movieDetails: "تفاصيل الفيلم",
    // New keys for forms
    emailAddress: "البريد الإلكتروني",
    name: "الاسم",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    emailRequired: "البريد الإلكتروني مطلوب.",
    invalidEmail: "صيغة البريد الإلكتروني غير صحيحة.",
    nameRequired: "الاسم مطلوب.",
    usernameRequired: "اسم المستخدم مطلوب.",
    usernameNoSpaces: "يجب ألا يحتوي اسم المستخدم على مسافات.",
    passwordRequired: "كلمة المرور مطلوبة.",
    passwordRequirements: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل، وتشمل أحرفًا صغيرة وكبيرة وأرقامًا ورموزًا خاصة (@*%$#).",
    confirmPasswordRequired: "تأكيد كلمة المرور مطلوب.",
    passwordsDoNotMatch: "كلمات المرور غير متطابقة.",
    invalidEmailFormat: "صيغة البريد الإلكتروني غير صحيحة. استخدم xxx@xxxx.com.",
    passwordLength: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    show: "إظهار",
    hide: "إخفاء",
    // Home page
    welcomeHome: "مرحبًا بك في الصفحة الرئيسية",
    mainPageDescription: "هذه هي الصفحة الرئيسية لتطبيقنا."
  }
};

// Create the context
const LanguageContext = createContext();

// Create provider component
export const LanguageProvider = ({ children }) => {
  const dispatch = useDispatch();
  const reduxLang = useSelector(state => state.language?.lang || "EN");
  
  // Initialize state from localStorage or Redux
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || reduxLang || "EN";
  });

  // Get API language code based on UI language
  const getApiLanguageCode = () => {
    return language === "EN" ? "en-US" : "ar-SA";
  };

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = language === "EN" ? "AR" : "EN";
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    dispatch(changeLanguage(newLang));
    
    // Update document direction for RTL support
    document.documentElement.dir = newLang === "AR" ? "rtl" : "ltr";
    document.body.dir = newLang === "AR" ? "rtl" : "ltr";
  };

  // Translation function
  const t = (key) => {
    return translations[language][key] || key;
  };

  // Sync with Redux on mount and when Redux changes
  useEffect(() => {
    if (reduxLang !== language) {
      setLanguage(reduxLang);
      localStorage.setItem('language', reduxLang);
      document.documentElement.dir = reduxLang === "AR" ? "rtl" : "ltr";
      document.body.dir = reduxLang === "AR" ? "rtl" : "ltr";
    }
  }, [reduxLang]);

  // Set initial direction on mount
  useEffect(() => {
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
    document.body.dir = language === "AR" ? "rtl" : "ltr";
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      toggleLanguage, 
      t,
      getApiLanguageCode 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
