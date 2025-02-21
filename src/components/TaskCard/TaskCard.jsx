import { Draggable } from "@hello-pangea/dnd";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { format } from "date-fns";

const TaskCard = ({ task, onDelete, onEdit, index }) => {
    const createdAt = new Date(task.createdAt || new Date());
    const dueDate = new Date(task.dueDate);
    const isOverdue = dueDate < new Date();

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-base-200 p-4 rounded-lg border shadow-md hover:shadow-lg max-w-full sm:max-w-md lg:max-w-lg mt-4"
                >
                    <div>
                        <div>
                            <h3 className="text-lg font-bold text-justify mb-3">{task.title}</h3> {/** truncate,  line-clamp-2 */}
                            {task.description && (
                                <p className="text-sm text-justify mb-6">{task.description}</p>
                            )}
                            <div className="flex flex-wrap justify-between gap-2 text-sm">
                                <p>
                                    Created: {new Date(task.createdAt).toLocaleString()}
                                </p>
                                {task.updatedAt && (
                                    <p>
                                        Last Updated: {new Date(task.updatedAt).toLocaleString()}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-row justify-end items-center gap-2">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="p-2 rounded-full hover:bg-blue-100 transition-all"
                                >
                                    <Pencil size={18} className="text-blue-600" />
                                </button>
                                <button
                                    onClick={() => onDelete(task._id)}
                                    className="p-2 rounded-full hover:bg-red-100 transition-all"
                                >
                                    <Trash2 size={18} className="text-red-600" />
                                </button>
                                <div
                                    {...provided.dragHandleProps}
                                    className="cursor-grab active:cursor-grabbing p-2 rounded-full hover:bg-gray-200 transition-all"
                                >
                                    <GripVertical size={18} className="text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;

//