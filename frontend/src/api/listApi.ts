import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchUserListWithDetails = async (userId: string, type: "favorites" | "travels") => {
    const response = await axios.get(`${API_URL}/lists/details/${userId}/${type}`);
    return response.data;
};
