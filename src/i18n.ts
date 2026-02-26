import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt/translation.json";
import en from "./locales/en/translation.json";
import es from "./locales/es/translation.json";
import zh from "./locales/zh/translation.json";
import hi from "./locales/hi/translation.json";
import ar from "./locales/ar/translation.json";
import fr from "./locales/fr/translation.json";
import ru from "./locales/ru/translation.json";
import bn from "./locales/bn/translation.json";
import id from "./locales/id/translation.json";
import sw from "./locales/sw/translation.json";
import ja from "./locales/ja/translation.json";
import de from "./locales/de/translation.json";
import ko from "./locales/ko/translation.json";
import tr from "./locales/tr/translation.json";
import it from "./locales/it/translation.json";
import th from "./locales/th/translation.json";
import vi from "./locales/vi/translation.json";
import nl from "./locales/nl/translation.json";
import pl from "./locales/pl/translation.json";

export const supportedLanguages = [
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
];

const resources = {
  pt: { translation: pt },
  en: { translation: en },
  es: { translation: es },
  zh: { translation: zh },
  hi: { translation: hi },
  ar: { translation: ar },
  fr: { translation: fr },
  ru: { translation: ru },
  bn: { translation: bn },
  id: { translation: id },
  sw: { translation: sw },
  ja: { translation: ja },
  de: { translation: de },
  ko: { translation: ko },
  tr: { translation: tr },
  it: { translation: it },
  th: { translation: th },
  vi: { translation: vi },
  nl: { translation: nl },
  pl: { translation: pl },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: supportedLanguages.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "univesia_lang",
    },
  });

// Apply RTL
const applyDir = (lng: string) => {
  const isRtl = lng === "ar";
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lng;
};

applyDir(i18n.language);
i18n.on("languageChanged", applyDir);

export default i18n;
