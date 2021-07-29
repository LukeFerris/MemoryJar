import { useState } from 'react';

export function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken ? userToken : null
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        console.log('saving token: ' + sessionStorage.getItem('token'));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}

export async function deleteToken() {
    sessionStorage.removeItem('token');
}