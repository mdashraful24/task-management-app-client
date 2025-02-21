import { useState } from "react";
import Swal from "sweetalert2";
import { DragDropContext } from "@hello-pangea/dnd";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DroppableColumn from "../DroppableColumn/DroppableColumn";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();


    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="text-blue-700 loading loading-infinity loading-lg"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen justify-center items-center text-center">
                <p className="text-xl font-bold">You must be logged in to view and manage tasks.</p>
            </div>
        );
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { register: editRegister, handleSubmit: editHandleSubmit, setValue, reset: resetEditForm } = useForm();

    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [activityLog, setActivityLog] = useState([]);

    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ["tasks", user.email],
        queryFn: async () => {
            const response = await axiosPublic.get(`/tasks/${user.email}`);
            return response.data;
        },
    });

    const addTaskMutation = useMutation({
        mutationFn: (newTask) => axiosPublic.post("/tasks", newTask),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            reset();
            setShowForm(false);
            toast.success("Task added successfully", {
                position: "top-right",
            });
        },
    });

    const editTaskMutation = useMutation({
        mutationFn: ({ id, updatedTask }) => axiosPublic.patch(`/tasks/${id}`, updatedTask),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            setEditingTask(null);
            resetEditForm();
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (taskId) => axiosPublic.delete(`/tasks/${taskId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
        },
    });

    const handleOpenEditForm = (task) => {
        setEditingTask(task);
        setValue("title", task.title);
        setValue("description", task.description);
    };



    const handleAddTask = async (newTask) => {
        if (!newTask.title.trim()) {
            toast.error("Task title is required!", { position: "top-right" });
            return;
        }

        const taskWithMetadata = {
            ...newTask,
            email: user.email,
            order: tasks.length + 1,
            category: "To-Do",
            updatedAt: new Date().toISOString(),
        };

        // Log task creation
        setActivityLog((prevLog) => [
            ...prevLog,
            {
                message: `Task "${newTask.title}" created`,
                timestamp: new Date().toLocaleString(),
            },
        ]);

        addTaskMutation.mutate(taskWithMetadata);
    };

    // const handleEditTask = async (updatedTask) => {
    //     if (!updatedTask.title.trim()) {
    //         toast.error("Task title is required!", { position: "top-right" });
    //         return;
    //     }

    //     // Log task update
    //     setActivityLog((prevLog) => [
    //         ...prevLog,
    //         {
    //             message: `Task "${updatedTask.title}" updated`,
    //             timestamp: new Date().toLocaleString(),
    //         },
    //     ]);

    //     editTaskMutation.mutate({
    //         id: editingTask._id,
    //         updatedTask: {
    //             ...updatedTask,
    //             updatedAt: new Date().toISOString(),
    //         },
    //     });
    //     toast.success("Your task has been updated.", { position: "top-right" });
    // };

    const handleEditTask = async (updatedTask) => {
        if (!updatedTask.title.trim()) {
            toast.error("Task title is required!", { position: "top-right" });
            return;
        }

        // Check if any changes were made
        if (
            updatedTask.title === editingTask.title &&
            updatedTask.description === editingTask.description
        ) {
            toast.error("No changes made to the task.", { position: "top-right" });
            return;
        }

        // Log task update
        setActivityLog((prevLog) => [
            ...prevLog,
            {
                message: `Task "${updatedTask.title}" updated`,
                timestamp: new Date().toLocaleString(),
            },
        ]);

        editTaskMutation.mutate({
            id: editingTask._id,
            updatedTask: {
                ...updatedTask,
                updatedAt: new Date().toISOString(),
            },
        });

        toast.success("Your task has been updated.", { position: "top-right" });
    };


    const handleDeleteTask = async (taskId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            // Log task deletion
            setActivityLog((prevLog) => [
                ...prevLog,
                {
                    message: `Task "${taskId}" deleted`,
                    timestamp: new Date().toLocaleString(),
                },
            ]);

            deleteTaskMutation.mutate(taskId);
            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
            });
        }
    };


    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const draggedTask = tasks.find(task => task._id === draggableId);
        const updatedTasks = [...tasks];

        // if (destination.droppableId !== source.droppableId) {
        //     draggedTask.category = destination.droppableId;
        // }

        if (destination.droppableId !== source.droppableId) {
            draggedTask.category = destination.droppableId;

            // Log the task movement
            setActivityLog((prevLog) => [
                ...prevLog,
                {
                    message: `Task "${draggedTask.title}" moved to ${destination.droppableId}`,
                    timestamp: new Date().toLocaleString(),
                },
            ]);
        }

        // Sort and update orders
        const categoryTasks = updatedTasks
            .filter(task => task.category === draggedTask.category)
            .sort((a, b) => a.order - b.order);

        categoryTasks.splice(categoryTasks.findIndex(task => task._id === draggedTask._id), 1);
        categoryTasks.splice(destination.index, 0, draggedTask);

        categoryTasks.forEach((task, index) => {
            task.order = index + 1;
            task.updatedAt = new Date().toISOString(); // Update time
        });

        try {
            await Promise.all(categoryTasks.map(task =>
                editTaskMutation.mutateAsync({
                    id: task._id,
                    updatedTask: { order: task.order, category: task.category, updatedAt: task.updatedAt }
                })
            ));

            // Show success message after task is moved
            toast.success("Task dropped successfully.", { position: "top-right" });
        } catch (error) {
            queryClient.setQueryData(["tasks", user.email], tasks);
            Swal.fire({ icon: "error", title: "Oops...", text: "Error updating task!" });
        }
    };


    return (
        <div className="container mx-auto p-6 px-2.5">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-7">Task Management Board</h1>

            <div className="flex justify-center mb-8">
                <button onClick={() => setShowForm(!showForm)} className="btn bg-blue-600 hover:bg-blue-700 text-white">
                    {showForm ? "Hide Task Form" : "Add New Task"}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit(handleAddTask)} className="mb-6 rounded">
                    <label className="block mb-1">Title</label>
                    <input
                        {...register("title", {
                            required: "Title is required",
                            maxLength: {
                                value: 50,
                                message: "Title cannot exceed 50 characters",
                            },
                        })}
                        type="text"
                        placeholder="New Task Title"
                        className="input input-bordered w-full mb-2"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
                    )}

                    <label className="block mb-1">Description</label>
                    <textarea
                        {...register("description", {
                            maxLength: {
                                value: 200,
                                message: "Description cannot exceed 200 characters",
                            },
                        })}
                        placeholder="Task Description (optional)"
                        className="textarea textarea-bordered w-full mb-2"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mb-2">{errors.description.message}</p>
                    )}
                    <button type="submit" className="btn btn-success w-full">Add Task</button>
                </form>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <DroppableColumn
                            key={category}
                            category={category}
                            tasks={tasks
                                .filter((task) => task.category === category)
                                .sort((a, b) => a.order - b.order)}
                            onDelete={handleDeleteTask}
                            onEdit={handleOpenEditForm}
                        />
                    ))}
                </div>
            </DragDropContext>

            {editingTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2 overflow-y-auto">
                    <div className="bg-base-300 p-4 md:p-6 rounded-lg shadow-md border w-full max-w-2xl mx-auto">
                        <h2 className="text-lg md:text-2xl font-semibold text-center mb-4">Edit Task</h2>
                        <form onSubmit={editHandleSubmit(handleEditTask)}>
                            <label className="block mb-1.2">Title</label>
                            <input
                                {...editRegister("title", {
                                    required: "Title is required",
                                    maxLength: {
                                        value: 50,
                                        message: "Title cannot exceed 50 characters",
                                    },
                                })}
                                className="input input-bordered w-full mb-5"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
                            )}
                            <label className="block mb-1.5">Description</label>
                            <textarea
                                {...editRegister("description", {
                                    maxLength: {
                                        value: 200,
                                        message: "Description cannot exceed 200 characters",
                                    },
                                })}
                                className="textarea textarea-bordered w-full mb-4"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mb-2">{errors.description.message}</p>
                            )}
                            <div className="flex justify-between">
                                <button type="submit" className="px-4 py-1.5 text-white bg-blue-700 rounded-lg">Update</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingTask(null);
                                        resetEditForm();
                                    }}
                                    className="px-4 py-1.5 text-white bg-red-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Activity Log Section */}
            {activityLog.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-2">Activity Log</h2>
                    <div className="bg-base-200 p-4 rounded-lg">
                        {activityLog.length > 0 ? (
                            <ul className="space-y-2">
                                {activityLog.map((log, index) => (
                                    <li key={index} className="text-sm">
                                        <span className="font-semibold">{log.timestamp}</span>: {log.message}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center">No activity yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskBoard;

//


