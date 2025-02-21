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
                    className="bg-base-200 p-4 rounded-lg shadow-md hover:shadow-lg max-w-full sm:max-w-md lg:max-w-lg mt-4"
                >
                    <div className="flex flex-row items-start justify-between gap-4 sm:gap-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{task.title}</h3>
                            {task.description && (
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
                            )}
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                                <span>Created: {format(createdAt, "MMM d, yyyy")}</span>
                                {task.dueDate && (
                                    <span className={isOverdue ? "text-red-600 font-medium" : "text-gray-500"}>
                                        Due: {format(dueDate, "MMM d, yyyy")}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-1">
                            <button onClick={() => onEdit(task)} className="p-1 text-gray-400 hover:text-gray-600 rounded">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => onDelete(task._id)} className="p-1 text-gray-400 hover:text-red-600 rounded">
                                <Trash2 size={16} />
                            </button>
                            <div
                                {...provided.dragHandleProps}
                                className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing rounded"
                            >
                                <GripVertical size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
