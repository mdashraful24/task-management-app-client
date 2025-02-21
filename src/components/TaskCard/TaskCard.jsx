// import { Draggable } from "@hello-pangea/dnd";
// import { Pencil, Trash2, GripVertical } from "lucide-react";
// import { FaEdit } from "react-icons/fa";
// import { format } from "date-fns";

// const TaskCard = ({ task, onDelete, onEdit, index }) => {
//     const createdAt = new Date(task.createdAt || new Date());
//     const dueDate = new Date(task.dueDate);
//     const isOverdue = dueDate < new Date();

//     return (
//         <Draggable draggableId={task._id} index={index}>
//             {(provided) => (
//                 <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     className="bg-base-200 p-4 rounded-lg border shadow-md hover:shadow-lg max-w-full sm:max-w-md lg:max-w-lg mt-4"
//                 >
//                     <div>
//                         <div>
//                             <h3 className="text-lg font-bold text-justify mb-3">{task.title}</h3> {/** truncate,  line-clamp-2 */}
//                             {task.description && (
//                                 <p className="text-sm text-justify mb-6">{task.description}</p>
//                             )}
//                             <div className="flex flex-wrap justify-between gap-2 text-xs">
//                                 <p>
//                                     <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
//                                 </p>
//                                 {task.updatedAt && (
//                                     <p>
//                                         <strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="flex justify-between items-center pt-3">
//                                 <div>
//                                     <p
//                                         className={`text-sm font-medium px-2 py-1 rounded-2xl inline-block ${task.category === 'To-Do'
//                                             ? 'bg-red-100 text-red-600'
//                                             : task.category === 'Done'
//                                                 ? 'bg-green-100 text-green-600'
//                                                 : 'bg-blue-100 text-blue-600'
//                                             }`}
//                                     >
//                                         {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
//                                     </p>
//                                 </div>

//                                 {/* Edit, Delete button */}
//                                 <div className="flex flex-row justify-end items-center md:gap-2">
//                                     <button
//                                         onClick={() => onEdit(task)}
//                                         className="p-2 rounded-full hover:bg-blue-100 transition-all"
//                                     >
//                                         <FaEdit size={18} className="text-blue-600" />
//                                         {/* <Pencil size={18} className="text-blue-600" /> */}
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(task._id)}
//                                         className="p-2 rounded-full hover:bg-red-100 transition-all"
//                                     >
//                                         <Trash2 size={18} className="text-red-600" />
//                                     </button>
//                                     <div
//                                         {...provided.dragHandleProps}
//                                         className="cursor-grab active:cursor-grabbing p-2 rounded-full hover:bg-gray-200 transition-all"
//                                     >
//                                         <GripVertical size={18} className="text-blue-600" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </Draggable>
//     );
// };

// export default TaskCard;

// //


import { Draggable } from "@hello-pangea/dnd";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";

const TaskCard = ({ task, onDelete, onEdit, index }) => {
    const createdAt = new Date(task.createdAt || new Date());
    const updatedAt = new Date(task.updatedAt || new Date()); // Extract updatedAt
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
                            {/* <div className="flex flex-wrap justify-between gap-2 text-xs">
                                <p>
                                    <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
                                </p>
                                {task.updatedAt && (
                                    <p>
                                        <strong>Last Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
                                    </p>
                                )}
                            </div> */}
                            <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs">
                                <span><strong>Created:</strong> {format(createdAt, "MMM d, yyyy, HH:mm:ss")}</span>
                                <span><strong>Updated:</strong> {format(updatedAt, "MMM d, yyyy, HH:mm:ss")}</span>
                                {task.dueDate && (
                                    <span className={isOverdue ? "text-red-600 font-medium" : "text-gray-500"}>
                                        Due: {format(dueDate, "MMM d, yyyy, HH:mm:ss")}
                                    </span>
                                )}
                            </div>
                            <div className="flex justify-between items-center pt-3">
                                <div>
                                    <p
                                        className={`text-sm font-medium px-2 py-1 rounded-2xl inline-block ${task.category === 'To-Do'
                                            ? 'bg-red-100 text-red-600'
                                            : task.category === 'Done'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-blue-100 text-blue-600'
                                            }`}
                                    >
                                        {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                                    </p>
                                </div>

                                {/* Edit, Delete button */}
                                <div className="flex flex-row justify-end items-center md:gap-2">
                                    <button
                                        onClick={() => onEdit(task)}
                                        className="p-2 rounded-full hover:bg-blue-100 transition-all"
                                    >
                                        <FaEdit size={18} className="text-blue-600" />
                                        {/* <Pencil size={18} className="text-blue-600" /> */}
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
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
