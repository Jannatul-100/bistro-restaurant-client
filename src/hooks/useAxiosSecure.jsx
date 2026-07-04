import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'https://bistro-restaurant-server-phi.vercel.app'
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();
    //request interceptors to add authorization header for every secure call to the api
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access-token');
                config.headers.authorization = `Bearer ${token}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    await logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [logout, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;