import { useState, useEffect } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "../TaskCard/TaskCard";

const DroppableColumn = ({ category, tasks, onDelete, onEdit }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [tasks]);

    return (
        <Droppable droppableId={category}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col bg-base-300 rounded-lg h-fit p-4"
                >
                    <h2 className="font-extrabold text-xl mb-2">{category}</h2>
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex h-full justify-center items-center py-4">
                                <span className="loading loading-infinity loading-lg text-blue-500"></span>
                            </div>
                        ) : tasks.length > 0 ? (
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
                            <div className="flex h-full font-medium justify-center items-center text-center pt-3 pb-5">
                                <p>No tasks in this column</p>
                            </div>
                        )}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableColumn;
