import React, { useState } from "react";

const PatientDetailModal = ({ item, onClose }) => {
    const [feedback, setFeedback] = useState(item.doctor_feedback || "");

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmitFeedback = async () => {
        try {
            const response = await fetch(`doctor/addFeedback/${item.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({ doctor_feedback: feedback }),
            });

            if (response.ok) {
                alert("Feedback submitted successfully");
                onClose();
                window.location.reload(); // Perbarui halaman
            } else {
                alert("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Error submitting feedback");
        }
    };

    if (!item) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-8 max-w-md rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Patient Detail</h2>
                <p>
                    <strong>Name:</strong> {item.fullname ?? "N/A"}
                </p>
                <p>
                    <strong>Check-up Date:</strong>{" "}
                    {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "N/A"}
                </p>
                <p>
                    <strong>Cholesterol Level:</strong> {item.cholesterol_level}
                </p>
                <p>
                    <strong>Glucose Level:</strong> {item.glucose_level}
                </p>
                <p>
                    <strong>Blood Pressure:</strong> {item.systole}/
                    {item.diastole}
                </p>
                <p>
                    <strong>Weight:</strong> {item.weight}
                </p>
                <p>
                    <strong>Height:</strong> {item.height}
                </p>
                <p>
                    <strong>Is Smoking:</strong>{" "}
                    {item.is_smoking ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Is Exercising:</strong>{" "}
                    {item.is_exercising ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Prediction:</strong>{" "}
                    {item.prediction > 0.5 ? "Positive" : "Negative"}
                </p>
                <p>
                    <strong>Doctor Feedback:</strong> {item.doctor_feedback}
                </p>
                <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    className="w-full p-2 border rounded mt-2"
                    rows="4"
                    placeholder="Enter your feedback here"
                ></textarea>
                <button
                    onClick={handleSubmitFeedback}
                    className="mt-6 bg-custom-green text-white py-2 px-4 rounded-full"
                >
                    Submit Feedback
                </button>
                <button
                    onClick={onClose}
                    className="mt-2 bg-gray-500 text-white py-2 px-4 rounded-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PatientDetailModal;

// import React, { useState } from "react";

// const PatientDetailModal = ({ item, onClose }) => {
//     const [feedback, setFeedback] = useState(item.doctor_feedback || "");

//     const handleFeedbackChange = (e) => {
//         setFeedback(e.target.value);
//     };

//     const handleSubmitFeedback = async () => {
//         try {
//             const response = await fetch(`/doctor/addFeedback/${item.id}`, {
//                 // Pastikan URL benar
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-CSRF-Token": document
//                         .querySelector('meta[name="csrf-token"]')
//                         .getAttribute("content"),
//                 },
//                 body: JSON.stringify({ doctor_feedback: feedback }),
//             });

//             if (response.ok) {
//                 alert("Feedback submitted successfully");
//                 onClose();
//             } else {
//                 alert("Failed to submit feedback");
//             }
//         } catch (error) {
//             console.error("Error submitting feedback:", error);
//             alert("Error submitting feedback");
//         }
//     };

//     if (!item) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//             <div className="bg-white p-8 max-w-md rounded-lg shadow-md">
//                 <h2 className="text-lg font-bold mb-4">Patient Detail</h2>
//                 <p>
//                     <strong>Name:</strong> {item.fullname ?? "N/A"}
//                 </p>
//                 <p>
//                     <strong>Check-up Date:</strong>{" "}
//                     {item.created_at
//                         ? new Date(item.created_at).toLocaleDateString()
//                         : "N/A"}
//                 </p>
//                 <p>
//                     <strong>Cholesterol Level:</strong> {item.cholesterol_level}
//                 </p>
//                 <p>
//                     <strong>Glucose Level:</strong> {item.glucose_level}
//                 </p>
//                 <p>
//                     <strong>Blood Pressure:</strong> {item.systole}/
//                     {item.diastole}
//                 </p>
//                 <p>
//                     <strong>Weight:</strong> {item.weight}
//                 </p>
//                 <p>
//                     <strong>Height:</strong> {item.height}
//                 </p>
//                 <p>
//                     <strong>Is Smoking:</strong>{" "}
//                     {item.is_smoking ? "Yes" : "No"}
//                 </p>
//                 <p>
//                     <strong>Is Exercising:</strong>{" "}
//                     {item.is_exercising ? "Yes" : "No"}
//                 </p>
//                 <p>
//                     <strong>Prediction:</strong>{" "}
//                     {item.prediction > 0.5 ? "Positive" : "Negative"}
//                 </p>
//                 <p>
//                     <strong>Doctor Feedback:</strong> {item.doctor_feedback}
//                 </p>
//                 <textarea
//                     value={feedback}
//                     onChange={handleFeedbackChange}
//                     className="w-full p-2 border rounded mt-2"
//                     rows="4"
//                     placeholder="Enter your feedback here"
//                 ></textarea>
//                 <button
//                     onClick={handleSubmitFeedback}
//                     className="mt-6 bg-custom-green text-white py-2 px-4 rounded-full"
//                 >
//                     Submit Feedback
//                 </button>
//                 <button
//                     onClick={onClose}
//                     className="mt-2 bg-gray-500 text-white py-2 px-4 rounded-full"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PatientDetailModal;
