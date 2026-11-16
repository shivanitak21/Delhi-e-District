export const uiLangs = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
] as const;
export type UiLang = (typeof uiLangs)[number]["code"];

const en = {
  hello: "Namaste", welcome: "Here is everything about your services in one place.",
  needAction: "Needs your action", pending: "In progress", done: "Completed / compliant",
  all: "All", schemes: "Schemes you may be eligible for", schemesNote: "Based on your profile and current notified schemes. Final eligibility is decided by the department.",
  apply: "Apply", check: "Check eligibility", fix: "Fix now", view: "View", byCategory: "By category",
  listen: "Listen", profile: "Profile complete", signout: "Sign out", newService: "Apply for a new service",
  likely: "Likely eligible", tip: "Tip: tap the microphone button at the bottom to ask in your language.",
  docs: "My documents (DigiLocker)", why: "Why",
};
type Dict = typeof en;
const hi: Dict = {
  hello: "नमस्ते", welcome: "आपकी सभी सेवाओं की जानकारी एक ही जगह।",
  needAction: "आपको कार्य करना है", pending: "प्रक्रिया में", done: "पूर्ण / अनुपालन",
  all: "सभी", schemes: "योजनाएँ जिनके आप पात्र हो सकते हैं", schemesNote: "आपकी प्रोफ़ाइल और वर्तमान योजनाओं के आधार पर। अंतिम निर्णय विभाग करेगा।",
  apply: "आवेदन करें", check: "पात्रता जाँचें", fix: "अभी सुधारें", view: "देखें", byCategory: "श्रेणी अनुसार",
  listen: "सुनें", profile: "प्रोफ़ाइल पूर्ण", signout: "लॉग आउट", newService: "नई सेवा के लिए आवेदन",
  likely: "संभावित पात्र", tip: "सुझाव: अपनी भाषा में पूछने के लिए नीचे माइक बटन दबाएँ।",
  docs: "मेरे दस्तावेज़ (डिजीलॉकर)", why: "क्यों",
};
const pa: Dict = {
  hello: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", welcome: "ਤੁਹਾਡੀਆਂ ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਦੀ ਜਾਣਕਾਰੀ ਇੱਕ ਥਾਂ।",
  needAction: "ਤੁਹਾਡੀ ਕਾਰਵਾਈ ਲੋੜੀਂਦੀ", pending: "ਕਾਰਵਾਈ ਅਧੀਨ", done: "ਪੂਰਾ / ਅਨੁਪਾਲਨ",
  all: "ਸਾਰੇ", schemes: "ਯੋਜਨਾਵਾਂ ਜਿਨ੍ਹਾਂ ਲਈ ਤੁਸੀਂ ਯੋਗ ਹੋ ਸਕਦੇ ਹੋ", schemesNote: "ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ ਅਤੇ ਮੌਜੂਦਾ ਯੋਜਨਾਵਾਂ ਅਧਾਰਿਤ। ਅੰਤਿਮ ਫ਼ੈਸਲਾ ਵਿਭਾਗ ਕਰੇਗਾ।",
  apply: "ਅਰਜ਼ੀ ਦਿਓ", check: "ਯੋਗਤਾ ਜਾਂਚੋ", fix: "ਹੁਣੇ ਠੀਕ ਕਰੋ", view: "ਵੇਖੋ", byCategory: "ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ",
  listen: "ਸੁਣੋ", profile: "ਪ੍ਰੋਫ਼ਾਈਲ ਪੂਰੀ", signout: "ਲੌਗ ਆਊਟ", newService: "ਨਵੀਂ ਸੇਵਾ ਲਈ ਅਰਜ਼ੀ",
  likely: "ਸੰਭਾਵੀ ਯੋਗ", tip: "ਸੁਝਾਅ: ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛਣ ਲਈ ਹੇਠਾਂ ਮਾਈਕ ਬਟਨ ਦਬਾਓ।",
  docs: "ਮੇਰੇ ਦਸਤਾਵੇਜ਼ (ਡਿਜੀਲੌਕਰ)", why: "ਕਿਉਂ",
};
export const dict: Record<UiLang, Dict> = { en, hi, pa };
export const speechLang: Record<UiLang, string> = { en: "en-IN", hi: "hi-IN", pa: "pa-IN" };
