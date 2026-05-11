import { useState } from "react";
import { LanguagesContext } from "../context/LanguagesContext";

function LanguagesProvider({ children }) {
  const [lang, setLang] = useState("en");

  return (
    <LanguagesContext.Provider value={{ lang, setLang }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguagesContext.Provider>
  );
}

export default LanguagesProvider;