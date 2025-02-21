import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard/TaskCard";

const DroppableColumn = ({ category, tasks, onDelete, onEdit }) => {
    return (
        <Droppable droppableId={category}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col bg-base-300 rounded-lg min-h-[100px] h-auto p-4"
                >
                    <h2 className="font-extrabold text-xl mb-1">{category}</h2>
                    <div className="flex-1">
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    index={index}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
                                />
                            ))
                        ) : (
                            <div className="text-center py-4">No tasks in this column</div>
                        )}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableColumn;
