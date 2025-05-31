import React from 'react';
import MyTitle from "../../components/MyTitle";
import { useLanguage } from "../../context/LanguageContext";

function Home(){
    const { t } = useLanguage();

    return (
        <div>
            <MyTitle myHead={t("welcomeHome")} />
            <p className="text-primary">{t("mainPageDescription")}</p>
        </div>
    );
}

export default Home;
