const encode = (plain: string): string => {
  return Buffer.from(plain || "").toString("base64");
};

const decode = (encoded: string): string => {
  return Buffer.from(encoded || "", "base64").toString("utf8");
};

export const urlEncode = (plain: string): string => {
  const encoded = encode(plain);
  return encodeURIComponent(encoded);
};

export const urlDecode = (encoded: string): string => {
  encoded = decodeURIComponent(encoded);
  return decode(encoded);
};
