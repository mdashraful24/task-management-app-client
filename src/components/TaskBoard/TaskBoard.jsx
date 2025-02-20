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

    const { register, handleSubmit, reset } = useForm();
    const { register: editRegister, handleSubmit: editHandleSubmit, setValue, reset: resetEditForm } = useForm();

    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const { data: tasks = [], isLoading, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await axiosPublic.get("/tasks");
            return response.data;
        },
    });

    const addTaskMutation = useMutation({
        mutationFn: (newTask) => axiosPublic.post("/tasks", newTask),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            reset();
            setShowForm(false);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your task has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        },
    });

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

    const handleEditTask = async (updatedTask) => {
        if (!updatedTask.title.trim()) {
            alert("Task title is required!");
            return;
        }
        editTaskMutation.mutate({ id: editingTask._id, updatedTask });
    };

    const handleAddTask = async (newTask) => {
        if (!newTask.title.trim()) {
            alert("Task title is required!");
            return;
        }
        addTaskMutation.mutate(newTask);
    };

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
            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success"
            });
        }
    };

    // Inside TaskBoard component
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const draggedTask = active.data.current.task;
        const newCategory = over.id;

        if (draggedTask.category !== newCategory) {
            editTaskMutation.mutate({
                id: draggedTask._id,
                updatedTask: { category: newCategory },
            });
        }
    };

    return (
        <div className="container mx-auto p-6 px-2.5">
            {/* Page Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-7">Task Management Board</h1>

            {/* Show/Hide Task Form Button */}
            <div className="flex justify-center mb-8">
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                    {showForm ? "Hide Task Form" : "Add New Task"}
                </button>
            </div>

            {/* Task Form (Hidden by Default) */}
            {showForm && (
                <form onSubmit={handleSubmit(handleAddTask)} className="mb-6 rounded">
                    <input
                        {...register("title", { required: true })}
                        type="text"
                        placeholder="New Task Title"
                        className="input input-bordered w-full mb-2"
                    />
                    <select {...register("category", { required: true })} className="select select-bordered w-full mb-2">
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <textarea
                        {...register("description")}
                        placeholder="Task Description"
                        className="textarea textarea-bordered w-full mb-2"
                    />
                    <button type="submit" className="btn btn-success w-full">Add Task</button>
                </form>
            )}

            {/* Task Board with Drag-and-Drop */}
            <DndContext onDragEnd={handleDragEnd}>
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
                    <div className="bg-base-300 p-6 rounded-lg shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
                        <form onSubmit={editHandleSubmit(handleEditTask)}>
                            <input
                                {...editRegister("title", { required: true })}
                                className="input input-bordered w-full mb-2"
                            />
                            <textarea
                                {...editRegister("description")}
                                className="textarea textarea-bordered w-full mb-4"
                            />
                            <div className="flex justify-between">
                                <button type="submit" className="px-4 py-2 text-white bg-blue-700 rounded-lg">Update</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingTask(null);
                                        resetEditForm();
                                    }}
                                    className="px-4 py-2 text-white bg-red-700 rounded-lg"
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
