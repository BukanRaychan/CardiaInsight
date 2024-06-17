// import React, { useState, useEffect } from "react";
// import "../../../css/resultstyle.css";
// import ResultLayout from "@/Layouts/ResultLayout";
// import { Link } from "@inertiajs/react";
// import axios from "axios";
// import ClipLoader from "react-spinners/ClipLoader"; // Import the ClipLoader from react-spinners

// const Result = () => {
//     const [resultData, setResultData] = useState(null);
//     const [loading, setLoading] = useState(true); // Add loading state

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("/getResult");
//                 setResultData(response.data);
//             } catch (error) {
//                 console.error("Error fetching result data:", error);
//             } finally {
//                 setLoading(false); // Set loading to false after data is fetched
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return (
//             <div className="loading-container">
//                 <ClipLoader color="#4CAF50" size={50} />
//             </div>
//         );
//     }

//     if (!resultData || !resultData.data) {
//         return (
//             <ResultLayout>
//                 <div className="result-container w-full">
//                     <h1 className="result-highlight">No Data Available</h1>
//                     <div className="button-container">
//                         <Link href="/homepage" className="back-button">
//                             Back
//                         </Link>
//                     </div>
//                 </div>
//             </ResultLayout>
//         );
//     }

//     return (
//         <ResultLayout>
//             <div className="result-container w-full">
//                 <h1
//                     className={`result-highlight ${
//                         resultData.data.prediction > 0.5
//                             ? "red-text"
//                             : "green-text"
//                     }`}
//                 >
//                     {resultData.data.prediction > 0.5
//                         ? "Positive for Cardiovascular Disease"
//                         : "Negative for Cardiovascular Disease"}
//                 </h1>

//                 <div className="user-info">
//                     <p>
//                         <strong>Name:</strong> {resultData.user.fullname}
//                     </p>
//                     <p>
//                         <strong>Age:</strong>{" "}
//                         {new Date().getFullYear() -
//                             new Date(resultData.user.birthdate).getFullYear()}
//                     </p>
//                     <p>
//                         <strong>Check-up Period:</strong>{" "}
//                         {new Date(
//                             resultData.data.created_at
//                         ).toLocaleDateString()}
//                     </p>
//                 </div>

//                 <div className="user-stats">
//                     <div className="stat-item">
//                         <h3>Cholesterol Level</h3>
//                         <p
//                             className={`stat-value ${
//                                 resultData.data.cholesterol_level > 200
//                                     ? "above-normal"
//                                     : "normal"
//                             }`}
//                         >
//                             {resultData.data.cholesterol_level} mg/dL
//                         </p>
//                     </div>

//                     <div className="stat-item">
//                         <h3>Glucose Level</h3>
//                         <p
//                             className={`stat-value ${
//                                 resultData.data.glucose_level > 140
//                                     ? "well-above-normal"
//                                     : "normal"
//                             }`}
//                         >
//                             {resultData.data.glucose_level} mg/dL
//                         </p>
//                     </div>

//                     <div className="stat-item blood-pressure">
//                         <h3>Blood Pressure</h3>
//                         <div className="blood-pressure-values">
//                             <p>
//                                 <strong>SYS:</strong> {resultData.data.systole}{" "}
//                                 mmHg
//                             </p>
//                             <p>
//                                 <strong>DIA:</strong> {resultData.data.diastole}{" "}
//                                 mmHg
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="button-container">
//                     <Link href="/homepage" className="back-button">
//                         Back
//                     </Link>
//                 </div>
//             </div>
//         </ResultLayout>
//     );
// };

// export default Result;

import React, { useState, useEffect } from "react";
import "../../../css/resultstyle.css";
import ResultLayout from "@/Layouts/ResultLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import the ClipLoader from react-spinners

const Result = () => {
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/getResult");
                setResultData(response.data);
            } catch (error) {
                console.error("Error fetching result data:", error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchData();
    }, []);

    const getCholesterolRange = (level) => {
        if (level === 1) return "< 200 mg/dL";
        if (level === 2) return "200 - 239 mg/dL";
        if (level === 3) return "> 240 mg/dL";
        return "Unknown";
    };

    const getGlucoseRange = (level) => {
        if (level === 1) return "< 140 mg/dL";
        if (level === 2) return "140 - 199 mg/dL";
        if (level === 3) return "> 200 mg/dL";
        return "Unknown";
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

    if (loading) {
        return (
            <div className="loading-container">
                <ClipLoader color="#4CAF50" size={50} />
            </div>
        );
    }

    if (!resultData || !resultData.data) {
        return (
            <ResultLayout>
                <div className="result-container w-full">
                    <h1 className="result-highlight">No Data Available</h1>
                    <div className="button-container">
                        <Link href="/homepage" className="back-button">
                            Back
                        </Link>
                    </div>
                </div>
            </ResultLayout>
        );
    }

    return (
        <ResultLayout>
            <div className="result-container w-full">
                <h1
                    className={`result-highlight ${
                        resultData.data.prediction > 0.5
                            ? "red-text"
                            : "green-text"
                    }`}
                >
                    {resultData.data.prediction > 0.5
                        ? "Positive for Cardiovascular Disease"
                        : "Negative for Cardiovascular Disease"}
                </h1>

                <div className="user-info">
                    <p>
                        <strong>Name:</strong> {resultData.user.fullname}
                    </p>
                    <p>
                        <strong>Age:</strong>{" "}
                        {new Date().getFullYear() -
                            new Date(resultData.user.birthdate).getFullYear()}
                    </p>
                    {/* <p>
                        <strong>Check-up Period:</strong>{" "}
                        {new Date(
                            resultData.data.created_at
                        ).toLocaleDateString()}
                    </p> */}
                    <p>
                        <strong>Check-up Period:</strong>{" "}
                        {formatDate(resultData.data.created_at)}
                    </p>
                </div>

                <div className="user-stats">
                    <div className="stat-item">
                        <h3>Cholesterol Level</h3>
                        <p
                            className={`stat-value ${
                                resultData.data.cholesterol_level > 1
                                    ? "above-normal"
                                    : "normal"
                            }`}
                        >
                            {getCholesterolRange(
                                resultData.data.cholesterol_level
                            )}
                        </p>
                    </div>

                    <div className="stat-item">
                        <h3>Glucose Level</h3>
                        <p
                            className={`stat-value ${
                                resultData.data.glucose_level > 1
                                    ? "well-above-normal"
                                    : "normal"
                            }`}
                        >
                            {getGlucoseRange(resultData.data.glucose_level)}
                        </p>
                    </div>

                    <div className="stat-item blood-pressure">
                        <h3>Blood Pressure</h3>
                        <div className="blood-pressure-values">
                            <p>
                                <strong>SYS:</strong> {resultData.data.systole}{" "}
                                mmHg
                            </p>
                            <p>
                                <strong>DIA:</strong> {resultData.data.diastole}{" "}
                                mmHg
                            </p>
                        </div>
                    </div>
                </div>

                <div className="button-container">
                    <Link href="/homepage" className="back-button">
                        Back
                    </Link>
                </div>
            </div>
        </ResultLayout>
    );
};

export default Result;
