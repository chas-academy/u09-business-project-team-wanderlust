import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllCountries = async () => {
    const response = await axios.get(`${API_URL}/countries`);
    return response.data;
};
