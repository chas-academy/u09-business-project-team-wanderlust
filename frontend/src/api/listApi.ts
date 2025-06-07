import axios from "axios";
import type { Country } from "../types/Country";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchUserListWithDetails = async (
  userId: string,
  type: "favorites" | "travels"
): Promise<{ userId: string; type: string; countries: Country[] }> => {
  const response = await axios.get<{ userId: string; type: string; countries: Country[] }>(
    `${API_BASE_URL}/lists/details/${userId}/${type}`
  );
  return response.data;
};

export const addCountryToList = async (
  userId: string,
  type: "favorites" | "travels",
  code: string
): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/lists/${userId}/${type}`, { code });
  return response.data;
};

export const removeCountryFromList = async (
  userId: string,
  type: "favorites" | "travels",
  code: string
): Promise<any> => {
  const response = await axios.delete(
    `${API_BASE_URL}/lists/${userId}/${type}`, 
    { data: { code } } as any
  );
  return response.data;
};

export const moveCountryBetweenLists = async (
  userId: string,
  fromType: "favorites" | "travels",
  toType: "favorites" | "travels",
  code: string
): Promise<any> => {
  const response = await axios.post(`${API_BASE_URL}/lists/${userId}/move`, {
    fromType,
    toType,
    code,
  });
  return response.data;
};
