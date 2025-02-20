import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTasks = () => {
    const axiosPublic = useAxiosPublic();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await axiosPublic.get("/tasks");
            return res.data;
        },
    });

    return { tasks, isLoading };
};

export default useTasks;
