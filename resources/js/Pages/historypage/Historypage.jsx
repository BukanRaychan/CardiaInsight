// import React, { useState, useEffect } from "react";
// import Navbar from "@/Components/Navbar";
// import Footer from "@/Components/Footer";
// import { Link } from "@inertiajs/react";
// import axios from "axios";

// function HistoryPage({ userName }) {
//     const [historyData, setHistoryData] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [feedback, setFeedback] = useState("");

//     const handleDoctorFeedback = (feedback) => {
//         setFeedback(feedback);
//         setShowModal(true);
//     };

//     useEffect(() => {
//         const fetchHistory = async () => {
//             try {
//                 const response = await axios.get("/getHistory");
//                 setHistoryData(response.data);
//             } catch (error) {
//                 console.error("Error fetching history:", error);
//             }
//         };

//         fetchHistory();
//     }, []);

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar userName={userName} />
//             <div className="flex-1 container mx-auto py-8 px-4">
//                 <h1 className="text-2xl font-bold mb-6">History</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {historyData.length > 0 ? (
//                         historyData.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white p-4 rounded-lg shadow-md"
//                             >
//                                 <p className="text-lg font-semibold">
//                                     NO: {index + 1}
//                                 </p>
//                                 <p className="text-gray-700 mb-6">
//                                     Date:{" "}
//                                     {new Date(
//                                         item.created_at
//                                     ).toLocaleDateString()}
//                                 </p>
//                                 <button className="m-2 bg-custom-green text-white py-2 px-4 rounded-full">
//                                     See Result
//                                 </button>
//                                 {item.doctor_feedback && (
//                                     <button
//                                         onClick={() =>
//                                             handleDoctorFeedback(
//                                                 item.doctor_feedback
//                                             )
//                                         }
//                                         className="m-2 bg-custom-green text-white py-2 px-4 rounded-full"
//                                     >
//                                         Doctor Feedback
//                                     </button>
//                                 )}
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500 w-full">
//                             No Data Available
//                         </p>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//             {showModal && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//                     <div className="bg-white p-8 max-w-md rounded-lg shadow-md">
//                         <h2 className="text-lg font-bold mb-4">
//                             Doctor Feedback
//                         </h2>
//                         <p className="text-gray-700">{feedback}</p>
//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="mt-6 bg-custom-green text-white py-2 px-4 rounded-full"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default HistoryPage;

import React, { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import axios from "axios";
import ResultModal from "@/Components/ResultModal";
import ClipLoader from "react-spinners/ClipLoader";

function HistoryPage({ userName }) {
    const [historyData, setHistoryData] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [resultId, setResultId] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const handleDoctorFeedback = (feedback) => {
        setFeedback(feedback);
        setShowFeedbackModal(true);
    };

    const handleResultClick = (id) => {
        setResultId(id);
        setShowResultModal(true);
    };
    const formatDate = (dateString) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get("/getHistory");
                setHistoryData(response.data);
            } catch (error) {
                console.error("Error fetching history:", error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar userName={userName} />
            <div className="flex-1 container mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-6">History</h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <ClipLoader color="#4CAF50" size={50} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {historyData.length > 0 ? (
                            historyData.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow-md"
                                >
                                    <p className="text-lg font-semibold">
                                        NO: {index + 1}
                                    </p>
                                    {/* <p className="text-gray-700 mb-6">
                                        Date:{" "}
                                        {new Date(
                                            item.created_at
                                        ).toLocaleDateString()}
                                    </p> */}
                                    <p>
                                        <strong>Check-up Period:</strong>{" "}
                                        {formatDate(item.created_at)}
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleResultClick(item.id)
                                        }
                                        className="m-2 bg-custom-green text-white py-2 px-4 rounded-full"
                                    >
                                        See Result
                                    </button>
                                    {item.doctor_feedback && (
                                        <button
                                            onClick={() =>
                                                handleDoctorFeedback(
                                                    item.doctor_feedback
                                                )
                                            }
                                            className="m-2 bg-custom-green text-white py-2 px-4 rounded-full"
                                        >
                                            Doctor Feedback
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 w-full">
                                No Data Available
                            </p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
            {showFeedbackModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-8 max-w-md rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">
                            Doctor Feedback
                        </h2>
                        <p className="text-gray-700">{feedback}</p>
                        <button
                            onClick={() => setShowFeedbackModal(false)}
                            className="mt-6 bg-custom-green text-white py-2 px-4 rounded-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <ResultModal
                show={showResultModal}
                onClose={() => setShowResultModal(false)}
                resultId={resultId}
            />
        </div>
    );
}

export default HistoryPage;
