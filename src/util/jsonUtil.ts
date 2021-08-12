export const removeBackslash = (json: string): string => {
  return json.replace(/\\"/g, "\"");
};
