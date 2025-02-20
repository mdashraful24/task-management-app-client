import TaskCard from "../TaskCard/TaskCard";

const DroppableColumn = ({ category, tasks, onDelete }) => {
    return (
        <div className="p-4 bg-base-300 rounded-lg min-h-[200px]">
            <h2 className="font-bold text-lg mb-4">{category}</h2>
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default DroppableColumn;
