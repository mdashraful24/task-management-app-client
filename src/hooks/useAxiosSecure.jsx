import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://task-management-app-server-eta.vercel.app'
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure; 