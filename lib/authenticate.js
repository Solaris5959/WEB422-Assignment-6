import { jwtDecode } from 'jwt-decode';

export async function authenticateUser(user, password) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password }),
        headers: {
            'content-type': 'application/json',
        }
    });

    const data = await response.json();

    if (response.status === 200) {
        setToken(data.token); // Save the token in localStorage
        return true;
    } else {
        throw new Error(data.message);
    }
}

// Set the token in localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Get the token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Remove the token from localStorage
export const removeToken = () => {
    localStorage.removeItem('token');
};

// Decode the token to read the information
export const readToken = () => {
    try { 
        const token = getToken();
        return token ? jwtDecode(token) : null;
    } catch (err) {
        return null;
    }
};

export const isAuthenticated = () => {
    const token = readToken();
    return token ? true : false;
};

export async function registerUser(user, password, password2) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ userName: user, password, password2 })
    });

    const data = await response.json();

    if (response.status === 200) {
        // Successfully registered, do not set the token
        return true;
    } else {
        // Throw an error with the message provided by the server
        throw new Error(data.message);
    }
}
