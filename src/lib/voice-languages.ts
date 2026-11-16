export const voiceLanguages = [
  { code: "en", name: "English", label: "English", greeting: "Hello, I’m your Delhi e-District assistant. Which service can I help you with?" },
  { code: "hi", name: "Hindi", label: "हिन्दी", greeting: "नमस्ते, मैं आपका दिल्ली ई-डिस्ट्रिक्ट सहायक हूँ। आपको किस सेवा में मदद चाहिए?" },
  { code: "kn", name: "Kannada", label: "ಕನ್ನಡ", greeting: "ನಮಸ್ಕಾರ, ನಾನು ನಿಮ್ಮ ದೆಹಲಿ ಇ-ಡಿಸ್ಟ್ರಿಕ್ಟ್ ಸಹಾಯಕ. ಯಾವ ಸೇವೆಗೆ ಸಹಾಯ ಬೇಕು?" },
  { code: "ta", name: "Tamil", label: "தமிழ்", greeting: "வணக்கம், நான் உங்கள் டெல்லி இ-டிஸ்ட்ரிக்ட் உதவியாளர். எந்த சேவையில் உதவி வேண்டும்?" },
  { code: "te", name: "Telugu", label: "తెలుగు", greeting: "నమస్కారం, నేను మీ ఢిల్లీ ఇ-డిస్ట్రిక్ట్ సహాయకుడిని. ఏ సేవలో సహాయం కావాలి?" },
  { code: "bn", name: "Bengali", label: "বাংলা", greeting: "নমস্কার, আমি আপনার দিল্লি ই-ডিস্ট্রিক্ট সহায়ক। কোন পরিষেবায় সাহায্য দরকার?" },
  { code: "mr", name: "Marathi", label: "मराठी", greeting: "नमस्कार, मी तुमचा दिल्ली ई-डिस्ट्रिक्ट सहाय्यक आहे. कोणत्या सेवेसाठी मदत हवी?" },
  { code: "ml", name: "Malayalam", label: "മലയാളം", greeting: "നമസ്കാരം, ഞാൻ നിങ്ങളുടെ ഡൽഹി ഇ-ഡിസ്ട്രിക്ട് സഹായിയാണ്. ഏത് സേവനത്തിലാണ് സഹായം വേണ്ടത്?" },
] as const;
export const defaultVoiceLanguage = voiceLanguages[0];