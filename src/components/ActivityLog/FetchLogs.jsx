import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaEdit, FaExchangeAlt, FaPlusCircle, FaTrash } from "react-icons/fa";

const FetchLogs = ({ email }) => {
    const axiosPublic = useAxiosPublic();

    const { data: logs = [], isLoading, error } = useQuery({
        queryKey: ['activityLogs', email],
        queryFn: async () => {
            const response = await axiosPublic.get(`/activity-logs/${email}`);
            return response.data;
        }
    });

    return (
        <div>
            <h2 className="text-2xl font-extrabold mb-4">Activity Log</h2>

            <div className="bg-base-300 shadow-lg rounded-lg p-6 px-4">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="text-blue-700 loading loading-infinity loading-lg"></div>
                    </div>
                ) : logs.length > 0 ? (
                    <ul className="space-y-4">
                        {logs.slice().reverse().map((log, index) => {
                            let icon;

                            if (log.message.includes('created')) {
                                icon = <FaPlusCircle className="text-green-500" />;
                            } else if (log.message.includes('updated')) {
                                icon = <FaEdit className="text-yellow-500" />;
                            } else if (log.message.includes('deleted')) {
                                icon = <FaTrash className="text-red-500" />;
                            } else if (log.message.includes('moved')) {
                                icon = <FaExchangeAlt className="text-blue-500" />;
                            }

                            return (
                                <li
                                    key={index}
                                    className="flex items-start space-x-3 p-3 border-b border-gray-200 bg-base-100 rounded-lg shadow-sm transition-all duration-300 hover:bg-base-300 hover:border-black"
                                >
                                    <div className="text-xl">{icon}</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{log.message}</p>
                                        <p className="text-xs bg-base-300 px-2 py-1 rounded-lg inline-block mt-1">
                                            {log.timestamp}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-center">No activity recorded yet.</p>
                )}
            </div>
        </div>
    );
};

export default FetchLogs;
