import axios from 'axios';

const token = localStorage.getItem('token');

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : "",
    },
    body: {
        "Placeholder": "This is a placeholder"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token)
            config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (err) => {
        return console.log(err);
    }
);