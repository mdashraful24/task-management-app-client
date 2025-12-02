import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FetchLogs from "./FetchLogs";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ActivityLog = ({ logs, email }) => {
    const axiosPublic = useAxiosPublic();
    const [showLogs, setShowLogs] = useState(false);

    // Define the mutation for posting logs
    const postLogMutation = useMutation({
        mutationFn: async (logData) => {
            const response = await axiosPublic.post("/activity-logs", logData);
            return response.data;
        },
        onSuccess: (data) => {
            // console.log("Log saved:", data);
        },
        onError: (error) => {
            console.error("Error saving log:", error);
        },
    });

    useEffect(() => {
        if (logs.length > 0 && email) {
            const lastLog = logs[logs.length - 1];

            // Prepare the data to post
            const logData = {
                message: lastLog.message,
                timestamp: lastLog.timestamp,
                email,
            };

            // Use the mutation to post the log
            postLogMutation.mutate(logData);
        }
    }, [logs, email]); // Add postLogMutation to dependencies if your linter requires it

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
