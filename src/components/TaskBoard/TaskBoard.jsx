// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import TaskCard from "../TaskCard/TaskCard";

// const categories = ["To-Do", "In Progress", "Done"];

// const TaskBoard = () => {
//     const axiosPublic = useAxiosPublic();
//     const queryClient = useQueryClient();

//     // React Hook Form setup
//     const { register, handleSubmit, reset } = useForm();

//     const { data: tasks = [], isLoading, isError } = useQuery({
//         queryKey: ["tasks"],
//         queryFn: async () => {
//             const response = await axiosPublic.get("/tasks");
//             return response.data;
//         },
//     });

//     const handleAddTask = async (newTask) => {
//         if (!newTask.title.trim()) {
//             alert("Task title is required!");
//             return;
//         }
//         try {
//             await axiosPublic.post("/tasks", newTask);
//             reset();
//             queryClient.invalidateQueries("tasks");
//         } catch (error) {
//             alert("Error adding task!");
//         }
//     };

//     if (isLoading) return <p className="text-center">Loading tasks...</p>;
//     if (isError) return <p className="text-center text-red-500">Error loading tasks!</p>;

//     return (
//         <div className="container mx-auto p-6">
//             {/* Task Form */}
//             <form onSubmit={handleSubmit(handleAddTask)} className="mb-6">
//                 <input
//                     {...register("title", { required: true })}
//                     type="text"
//                     placeholder="New Task Title"
//                     className="input input-bordered w-full mb-2"
//                 />
//                 <textarea
//                     {...register("description")}
//                     placeholder="Task Description"
//                     className="textarea textarea-bordered w-full mb-2"
//                 />
//                 <button type="submit" className="btn btn-primary">Add Task</button>
//             </form>

//             {/* Task Board */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                 {categories.map((category, index) => (
//                     <div key={category} className="bg-gray-200 p-4 rounded-lg shadow-md">
//                         <h2 className="text-lg font-bold mb-4">{category}</h2>
//                         {tasks.filter((task) => task.category === category).map((task, idx) => (
//                             <TaskCard key={task._id} task={task} />
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TaskBoard;










import { useState } from "react";
import Swal from "sweetalert2";
import { DndContext } from "@dnd-kit/core";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DroppableColumn from "../DroppableColumn/DroppableColumn";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    // Separate form instances
    const { register, handleSubmit, reset } = useForm();
    const { register: editRegister, handleSubmit: editHandleSubmit, setValue, reset: resetEditForm } = useForm();

    const [editingTask, setEditingTask] = useState(null);

    // Fetch tasks
    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await axiosPublic.get("/tasks");
            return response.data;
        },
    });

    // Add Task Mutation
    const addTaskMutation = useMutation({
        mutationFn: (newTask) => axiosPublic.post("/tasks", newTask),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your task has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        },
    });

    // Update Task Mutation
    const editTaskMutation = useMutation({
        mutationFn: ({ id, updatedTask }) => axiosPublic.patch(`/tasks/${id}`, updatedTask),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            setEditingTask(null);
            resetEditForm();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your task has been updated",
                showConfirmButton: false,
                timer: 1500
            });
        },
    });

    // Delete Task Mutation
    const deleteTaskMutation = useMutation({
        mutationFn: (taskId) => axiosPublic.delete(`/tasks/${taskId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
        },
    });

    // Handle opening edit form
    const handleOpenEditForm = (task) => {
        setEditingTask(task);
        setValue("title", task.title);
        setValue("description", task.description);
    };

    // Handle updating a task
    const handleEditTask = async (updatedTask) => {
        if (!updatedTask.title.trim()) {
            alert("Task title is required!");
            return;
        }
        editTaskMutation.mutate({ id: editingTask._id, updatedTask });
    };

    // Handle adding a new task
    const handleAddTask = async (newTask) => {
        if (!newTask.title.trim()) {
            alert("Task title is required!");
            return;
        }
        addTaskMutation.mutate(newTask);
    };

    // Handle task deletion
    const handleDeleteTask = async (taskId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            deleteTaskMutation.mutate(taskId);

            // Success message after deleting
            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success"
            });
        }
    };

    return (
        <div className="container mx-auto p-6 px-2.5">
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

            {/* Task Board with Drag-and-Drop */}
            <DndContext>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <DroppableColumn
                            key={category}
                            category={category}
                            tasks={tasks.filter((task) => task.category === category)}
                            onDelete={handleDeleteTask}
                            onEdit={handleOpenEditForm}
                        />
                    ))}
                </div>
            </DndContext>

            {/* Edit Task Modal */}
            {editingTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 overflow-y-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
                        <form onSubmit={editHandleSubmit(handleEditTask)}>
                            <input
                                {...editRegister("title", { required: true })}
                                className="input input-bordered w-full mb-2"
                            />
                            <textarea
                                {...editRegister("description")}
                                className="textarea textarea-bordered w-full mb-2"
                            />
                            <div className="flex justify-between">
                                <button type="submit" className="btn btn-success">Update</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingTask(null);
                                        resetEditForm();
                                    }}
                                    className="btn btn-error"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskBoard;

