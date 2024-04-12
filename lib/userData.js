import { getToken } from './authenticate';  // Adjust path as necessary

const API_URL = process.env.NEXT_PUBLIC_API_URL; // to shorten the fetch req

// Function to add to favourites
export async function addToFavourites(id) {
    const response = await fetch(`${API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

// Function to remove from favourites
export async function removeFromFavourites(id) {
    const response = await fetch(`${API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

// Function to get all favourites
export async function getFavourites() {
    const response = await fetch(`${API_URL}/favourites`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

// Function to add to history
export async function addToHistory(id) {
    const response = await fetch(`${API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

// Function to remove from history
export async function removeFromHistory(id) {
    const response = await fetch(`${API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}

// Function to get all history
export async function getHistory() {
    const response = await fetch(`${API_URL}/history`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${getToken()}`
        }
    });

    return response.status === 200 ? await response.json() : [];
}
