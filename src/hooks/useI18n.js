export const useI18n = (obj, lang) => {
  return obj[lang] || obj.en;
};
