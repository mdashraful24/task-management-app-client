import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://task-management-app-server-eta.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
