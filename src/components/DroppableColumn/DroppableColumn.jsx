import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard/TaskCard";

const DroppableColumn = ({ category, tasks, onDelete, onEdit, onDrop }) => {
    const { setNodeRef } = useDroppable({
        id: category,
    });

    return (
        <div ref={setNodeRef} className="flex flex-col bg-base-300 rounded-lg min-h-[100px] h-auto p-4">
            <h2 className="font-bold text-lg">{category}</h2>
            <div className="flex-1 space-y-2">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                ) : (
                    <div className="text-gray-400 text-center py-4">No tasks in this column</div>
                )}
            </div>
        </div>
    );
};

export default DroppableColumn;
