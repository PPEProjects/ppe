import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";

import Cookies from "universal-cookie";
const cookies = new Cookies();

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: cookies.get("lang") ?? "English",
    fallbackLng: "Vietnamese",
    // fallbackLng: "Japanese",
    whitelist: ["English", "Japanese", "Vietnamese"],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "/locales/add/{{lng}}/{{ns}}",
    },
  });
export default i18n;
