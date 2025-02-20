import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TaskCard from "../TaskCard/TaskCard";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    // React Hook Form setup
    const { register, handleSubmit, reset } = useForm();

    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await axiosPublic.get("/tasks");
            return response.data;
        },
    });

    const handleAddTask = async (newTask) => {
        if (!newTask.title.trim()) {
            alert("Task title is required!");
            return;
        }
        try {
            await axiosPublic.post("/tasks", newTask);
            reset();
            queryClient.invalidateQueries("tasks");
        } catch (error) {
            alert("Error adding task!");
        }
    };

    if (isLoading) return <p className="text-center">Loading tasks...</p>;
    if (isError) return <p className="text-center text-red-500">Error loading tasks!</p>;

    return (
        <div className="container mx-auto p-6">
            {/* Task Form */}
            <form onSubmit={handleSubmit(handleAddTask)} className="mb-6">
                <input
                    {...register("title", { required: true })}
                    type="text"
                    placeholder="New Task Title"
                    className="input input-bordered w-full mb-2"
                />
                <textarea
                    {...register("description")}
                    placeholder="Task Description"
                    className="textarea textarea-bordered w-full mb-2"
                />
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>

            {/* Task Board */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div key={category} className="bg-gray-200 p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">{category}</h2>
                        {tasks.filter((task) => task.category === category).map((task, idx) => (
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskBoard;