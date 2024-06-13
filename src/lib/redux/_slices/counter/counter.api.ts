import axios from 'axios';

// Exemple of call
export const fetchCount = async () => {
    const url = '';

    const response = await axios.get(url);

    return response.data;
};
