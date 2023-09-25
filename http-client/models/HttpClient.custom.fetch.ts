// utils/fetchUtil.js
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const customFetch = async (endpoint: string, options) => {
  const response = await fetch(`${baseUrl}${endpoint}`, options);
  return response;
};
