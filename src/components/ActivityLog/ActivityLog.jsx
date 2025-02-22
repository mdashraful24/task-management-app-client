import { useEffect, useState } from "react";
import FetchLogs from "./FetchLogs";

const ActivityLog = ({ logs, email }) => {
    const [showLogs, setShowLogs] = useState(false);

    useEffect(() => {
        if (logs.length > 0 && email) {
            const lastLog = logs[logs.length - 1];

            fetch("https://task-management-app-server-eta.vercel.app/activity-logs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: lastLog.message,
                    timestamp: lastLog.timestamp,
                    email,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log("Log saved:", data);
                })
                .catch((error) => {
                    console.error("Error saving log:", error);
                });
        }
    }, [logs, email]);

    return (
        <div className="mt-10">
            <button
                onClick={() => setShowLogs(!showLogs)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                {showLogs ? "Hide Activity Logs" : "Show Activity Logs"}
            </button>

            {showLogs && (
                <div className="mt-6">
                    <FetchLogs email={email} />
                </div>
            )}
        </div>
    );
};

export default ActivityLog;
