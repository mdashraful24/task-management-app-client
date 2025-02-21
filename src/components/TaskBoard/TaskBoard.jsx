import { useState } from "react";
import Swal from "sweetalert2";
import { DragDropContext } from "@hello-pangea/dnd";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DroppableColumn from "../DroppableColumn/DroppableColumn";
import useAuth from "../../hooks/useAuth";

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
            <div className="flex min-h-screen justify-center items-center">
                <p className="text-xl font-bold">You must be logged in to view and manage tasks.</p>
            </div>
        );
    }

    const { register, handleSubmit, reset } = useForm();
    const { register: editRegister, handleSubmit: editHandleSubmit, setValue, reset: resetEditForm } = useForm();

    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);

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
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your task has been saved",
                showConfirmButton: false,
                timer: 1500,
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

        const taskWithEmailAndOrder = {
            ...newTask,
            email: user.email,
            order: tasks.length + 1, // Assign a new order value
        };
        addTaskMutation.mutate(taskWithEmailAndOrder);
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
            deleteTaskMutation.mutate(taskId);
            Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
            });
        }
    };

    // const handleDragEnd = async (result) => {
    //     const { destination, source, draggableId } = result;

    //     // If dropped outside of a droppable area
    //     if (!destination) return;

    //     // If the task is dropped back at the same position
    //     if (
    //         destination.droppableId === source.droppableId &&
    //         destination.index === source.index
    //     ) {
    //         return;
    //     }

    //     const draggedTask = tasks.find(task => task._id === draggableId);

    //     // Optimistically update the local state
    //     const updatedTasks = [...tasks];

    //     // Handle case when task is moved between categories
    //     if (destination.droppableId !== source.droppableId) {
    //         // Update the category of the dragged task
    //         draggedTask.category = destination.droppableId;

    //         // Reorder tasks in the source and destination categories
    //         updatedTasks
    //             .filter(task => task.category === source.droppableId)
    //             .sort((a, b) => a.order - b.order);
    //         updatedTasks
    //             .filter(task => task.category === destination.droppableId)
    //             .sort((a, b) => a.order - b.order);

    //         try {
    //             // Send API request to update task category
    //             await editTaskMutation.mutateAsync({
    //                 id: draggedTask._id,
    //                 updatedTask: { category: destination.droppableId },
    //             });
    //         } catch (error) {
    //             // Revert the optimistic update if mutation fails
    //             queryClient.setQueryData(["tasks", user.email], tasks);
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: "Something went wrong while updating the task!",
    //             });
    //         }
    //     } else {
    //         // Handle case when task is reordered within the same category
    //         const currentCategoryTasks = updatedTasks.filter(
    //             (task) => task.category === draggedTask.category
    //         );

    //         // Remove the dragged task from its previous position
    //         const draggedTaskIndex = currentCategoryTasks.findIndex(
    //             (task) => task._id === draggedTask._id
    //         );
    //         currentCategoryTasks.splice(draggedTaskIndex, 1);

    //         // Insert the dragged task in its new position
    //         currentCategoryTasks.splice(destination.index, 0, draggedTask);

    //         // Optimistically update order of tasks in the same category
    //         currentCategoryTasks.forEach((task, index) => {
    //             task.order = index + 1;
    //         });

    //         try {
    //             // Update tasks order in database
    //             await Promise.all(
    //                 currentCategoryTasks.map((task) =>
    //                     editTaskMutation.mutateAsync({
    //                         id: task._id,
    //                         updatedTask: { order: task.order },
    //                     })
    //                 )
    //             );
    //         } catch (error) {
    //             // Revert optimistic state update if mutation fails
    //             queryClient.setQueryData(["tasks", user.email], tasks);
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Oops...",
    //                 text: "Something went wrong while reordering tasks!",
    //             });
    //         }
    //     }
    // };
    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        // If dropped outside of a droppable area
        if (!destination) return;

        // If the task is dropped back at the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const draggedTask = tasks.find(task => task._id === draggableId);

        // Optimistically update the local state
        const updatedTasks = [...tasks];

        // Handle case when task is moved between categories
        if (destination.droppableId !== source.droppableId) {
            // Update the category of the dragged task
            draggedTask.category = destination.droppableId;

            // Reorder tasks in the source category
            const sourceCategoryTasks = updatedTasks
                .filter(task => task.category === source.droppableId)
                .sort((a, b) => a.order - b.order);

            // Reorder tasks in the destination category
            const destinationCategoryTasks = updatedTasks
                .filter(task => task.category === destination.droppableId)
                .sort((a, b) => a.order - b.order);

            // Remove the dragged task from the source category
            const draggedTaskIndex = sourceCategoryTasks.findIndex(
                (task) => task._id === draggedTask._id
            );
            sourceCategoryTasks.splice(draggedTaskIndex, 1);

            // Insert the dragged task into the destination category at the new position
            destinationCategoryTasks.splice(destination.index, 0, draggedTask);

            // Update the order of tasks in the source category
            sourceCategoryTasks.forEach((task, index) => {
                task.order = index + 1;
            });

            // Update the order of tasks in the destination category
            destinationCategoryTasks.forEach((task, index) => {
                task.order = index + 1;
            });

            try {
                // Send API requests to update tasks in both categories
                await Promise.all([
                    ...sourceCategoryTasks.map((task) =>
                        editTaskMutation.mutateAsync({
                            id: task._id,
                            updatedTask: { order: task.order },
                        })
                    ),
                    ...destinationCategoryTasks.map((task) =>
                        editTaskMutation.mutateAsync({
                            id: task._id,
                            updatedTask: { order: task.order, category: task.category },
                        })
                    ),
                ]);
            } catch (error) {
                // Revert the optimistic update if mutation fails
                queryClient.setQueryData(["tasks", user.email], tasks);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong while updating the task!",
                });
            }
        } else {
            // Handle case when task is reordered within the same category
            const currentCategoryTasks = updatedTasks
                .filter((task) => task.category === draggedTask.category)
                .sort((a, b) => a.order - b.order);

            // Remove the dragged task from its previous position
            const draggedTaskIndex = currentCategoryTasks.findIndex(
                (task) => task._id === draggedTask._id
            );
            currentCategoryTasks.splice(draggedTaskIndex, 1);

            // Insert the dragged task in its new position
            currentCategoryTasks.splice(destination.index, 0, draggedTask);

            // Update the order of tasks in the same category
            currentCategoryTasks.forEach((task, index) => {
                task.order = index + 1;
            });

            try {
                // Send API requests to update the order of tasks in the same category
                await Promise.all(
                    currentCategoryTasks.map((task) =>
                        editTaskMutation.mutateAsync({
                            id: task._id,
                            updatedTask: { order: task.order },
                        })
                    )
                );
            } catch (error) {
                // Revert the optimistic update if mutation fails
                queryClient.setQueryData(["tasks", user.email], tasks);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong while reordering tasks!",
                });
            }
        }
    };

    return (
        <div className="container mx-auto p-6 px-2.5">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-7">Task Management Board</h1>

            <div className="flex justify-center mb-8">
                <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
                    {showForm ? "Hide Task Form" : "Add New Task"}
                </button>
            </div>

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

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
