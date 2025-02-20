// import { Pencil, Trash2, GripVertical } from "lucide-react";
// import { format } from "date-fns";

// const TaskCard = ({ task, onDelete, onEdit, handleCategoryChange }) => {
//     const createdAt = new Date(task.createdAt || new Date());
//     const dueDate = new Date(task.dueDate);
//     const isOverdue = dueDate < new Date();

//     return (
//         <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//             <div>
//                 <div className="flex items-start justify-between gap-2">
//                     <div className="flex-1 min-w-0">
//                         <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
//                         {task.description && (
//                             <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
//                         )}
//                         <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
//                             <span>
//                                 Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
//                             </span>
//                             {task.dueDate && (
//                                 <span
//                                     className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}
//                                 >
//                                     Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
//                                 </span>
//                             )}
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-1">
//                         <button
//                             onClick={() => onEdit(task)}
//                             className="p-1 text-gray-400 hover:text-gray-600 rounded"
//                         >
//                             <Pencil size={16} />
//                         </button>
//                         <button
//                             onClick={() => onDelete(task.id)}
//                             className="p-1 text-gray-400 hover:text-red-600 rounded"
//                         >
//                             <Trash2 size={16} />
//                         </button>
//                         <div className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing rounded">
//                             <GripVertical size={16} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-5 flex justify-between items-center gap-2">
//                     <button
//                         onClick={() => handleCategoryChange('To-Do')}
//                         className={`btn btn-sm ${task.category === 'To-Do' ? 'btn-primary' : 'btn-secondary'}`}
//                     >
//                         To-Do
//                     </button>
//                     <button
//                         onClick={() => handleCategoryChange('In Progress')}
//                         className={`btn btn-sm ${task.category === 'In Progress' ? 'btn-primary' : 'btn-secondary'}`}
//                     >
//                         In Progress
//                     </button>
//                     <button
//                         onClick={() => handleCategoryChange('Done')}
//                         className={`btn btn-sm ${task.category === 'Done' ? 'btn-primary' : 'btn-secondary'}`}
//                     >
//                         Done
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskCard;










import { Pencil, Trash2, GripVertical } from "lucide-react";
import { format } from "date-fns";

const TaskCard = ({ task, onDelete, onEdit, handleCategoryChange }) => {
    const createdAt = new Date(task.createdAt || new Date());
    const dueDate = new Date(task.dueDate);
    const isOverdue = dueDate < new Date();

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4 max-w-full sm:max-w-md lg:max-w-lg">
            <div className="flex flex-row items-start justify-between gap-4 sm:gap-2">
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
                    {task.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                        <span>
                            Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
                        </span>
                        {task.dueDate && (
                            <span
                                className={isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'}
                            >
                                Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-1">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                    >
                        <Trash2 size={16} />
                    </button>
                    <div className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing rounded">
                        <GripVertical size={16} />
                    </div>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-between items-center gap-2">
                <button
                    onClick={() => handleCategoryChange('To-Do')}
                    className={`btn btn-sm w-full lg:w-32 ${task.category === 'To-Do' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    To-Do
                </button>
                <button
                    onClick={() => handleCategoryChange('In Progress')}
                    className={`btn btn-sm w-full lg:w-32 ${task.category === 'In Progress' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    In Progress
                </button>
                <button
                    onClick={() => handleCategoryChange('Done')}
                    className={`btn btn-sm w-full lg:w-32 ${task.category === 'Done' ? 'btn-primary' : 'btn-secondary'}`}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
