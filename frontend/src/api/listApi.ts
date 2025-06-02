import axios from "axios";
/*
const API_URL = "http://localhost:3000";

export const fetchUserListWithDetails = async (userId: string, type: "favorites" | "travels") => {
    const response = await axios.get(`${API_URL}/lists/details/${userId}/${type}`);
    return response.data;
};

export const addCountryToList = async (
    userId: string,
    type: "favorites" | "travels",
    code: string
) => {
    const response = await axios.put(
        `${API_URL}/add/${userId}/${type}`,
        { code }
    );
    return response.data;
}

export const removeCountryFromList = async (userId: string, type: "favorites" | "travels", code: string) => {
    const response = await axios.put(`${API_URL}/remove/${userId}/${type}`, { code });
    return response.data;
}; */

const API_URL = "http://localhost:3000/api";

export const fetchUserListWithDetails = async (userId: string, type: "favorites" | "travels") => {
    const response = await axios.get(`${API_URL}/lists/details/${userId}/${type}`);
    return response.data;
};

export const addCountryToList = async (
    userId: string,
    type: "favorites" | "travels",
    code: string
) => {
    // Byter till POST för att matcha backend
    const response = await axios.post(
        `${API_URL}/lists/${userId}/${type}`,
        { code }
    );
    return response.data;
}

export const removeCountryFromList = async (userId: string, type: "favorites" | "travels", code: string) => {
    const response = await axios.delete(`${API_URL}/lists/${userId}/${type}`, { data: { code } });
    return response.data;
};

