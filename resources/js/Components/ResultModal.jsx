// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ClipLoader from "react-spinners/ClipLoader"; // Import the ClipLoader from react-spinners

// const ResultModal = ({ show, onClose, resultId }) => {
//     const [resultData, setResultData] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (show && resultId) {
//             const fetchData = async () => {
//                 setLoading(true);
//                 try {
//                     const response = await axios.get(
//                         `/getResultById/${resultId}`
//                     );
//                     setResultData(response.data[0]); // Accessing the first result
//                 } catch (error) {
//                     console.error("Error fetching result data:", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchData();
//         }
//     }, [show, resultId]);

//     if (!show) {
//         return null;
//     }

//     return (
//         <div style={styles.overlay}>
//             <div style={styles.modal}>
//                 {loading ? (
//                     <div style={styles.loaderContainer}>
//                         <ClipLoader color="#4CAF50" size={50} />
//                     </div>
//                 ) : (
//                     resultData && (
//                         <div style={styles.resultContainer}>
//                             <h1
//                                 style={{
//                                     ...styles.resultHighlight,
//                                     color:
//                                         resultData.prediction > 0.5
//                                             ? "red"
//                                             : "green",
//                                 }}
//                             >
//                                 {resultData.prediction > 0.5
//                                     ? "Positive for Cardiovascular Disease"
//                                     : "Negative for Cardiovascular Disease"}
//                             </h1>

//                             <div style={styles.userInfo}>
//                                 <p>
//                                     <strong>Name:</strong>{" "}
//                                     {resultData.user.fullname}
//                                 </p>
//                                 <p>
//                                     <strong>Age:</strong>{" "}
//                                     {new Date().getFullYear() -
//                                         new Date(
//                                             resultData.user.birthdate
//                                         ).getFullYear()}
//                                 </p>
//                                 <p>
//                                     <strong>Check-up Period:</strong>{" "}
//                                     {new Date(
//                                         resultData.created_at
//                                     ).toLocaleDateString()}
//                                 </p>
//                             </div>

//                             <div style={styles.userStats}>
//                                 <div style={styles.statItem}>
//                                     <h3>Cholesterol Level</h3>
//                                     <p
//                                         style={{
//                                             ...styles.statValue,
//                                             color:
//                                                 resultData.cholesterol_level >
//                                                 200
//                                                     ? "red"
//                                                     : "green",
//                                         }}
//                                     >
//                                         {resultData.cholesterol_level} mg/dL
//                                     </p>
//                                 </div>

//                                 <div style={styles.statItem}>
//                                     <h3>Glucose Level</h3>
//                                     <p
//                                         style={{
//                                             ...styles.statValue,
//                                             color:
//                                                 resultData.glucose_level > 140
//                                                     ? "red"
//                                                     : "green",
//                                         }}
//                                     >
//                                         {resultData.glucose_level} mg/dL
//                                     </p>
//                                 </div>

//                                 <div style={styles.statItem}>
//                                     <h3>Blood Pressure</h3>
//                                     <div style={styles.bloodPressureValues}>
//                                         <p>
//                                             <strong>SYS:</strong>{" "}
//                                             {resultData.systole} mmHg
//                                         </p>
//                                         <p>
//                                             <strong>DIA:</strong>{" "}
//                                             {resultData.diastole} mmHg
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div style={styles.buttonContainer}>
//                                 <button
//                                     onClick={onClose}
//                                     style={styles.closeButton}
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     )
//                 )}
//             </div>
//         </div>
//     );
// };

// const styles = {
//     overlay: {
//         position: "fixed",
//         inset: "0",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.75)",
//     },
//     modal: {
//         backgroundColor: "white",
//         padding: "2rem",
//         borderRadius: "0.5rem",
//         maxWidth: "500px",
//         width: "100%",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     },
//     loaderContainer: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100%",
//     },
//     resultContainer: {
//         width: "100%",
//     },
//     resultHighlight: {
//         fontSize: "1.5rem",
//         marginBottom: "1rem",
//     },
//     userInfo: {
//         marginBottom: "1rem",
//     },
//     userStats: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//     },
//     statItem: {
//         marginBottom: "1rem",
//     },
//     statValue: {
//         fontSize: "1.2rem",
//     },
//     bloodPressureValues: {
//         display: "flex",
//         justifyContent: "space-between",
//     },
//     buttonContainer: {
//         marginTop: "1rem",
//         display: "flex",
//         justifyContent: "center",
//     },
//     closeButton: {
//         backgroundColor: "#4CAF50",
//         color: "white",
//         padding: "0.5rem 1rem",
//         borderRadius: "0.25rem",
//         cursor: "pointer",
//         border: "none",
//     },
// };

// export default ResultModal;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import the ClipLoader from react-spinners

const ResultModal = ({ show, onClose, resultId }) => {
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (show && resultId) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `/getResultById/${resultId}`
                    );
                    console.log(response.data);
                    setResultData(response.data[0]); // Accessing the first result
                } catch (error) {
                    console.error("Error fetching result data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [show, resultId]);

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

    if (!show) {
        return null;
    }

    const formatDate = (dateString) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {loading ? (
                    <div style={styles.loaderContainer}>
                        <ClipLoader color="#4CAF50" size={50} />
                    </div>
                ) : (
                    resultData && (
                        <div style={styles.resultContainer}>
                            <h1
                                style={{
                                    ...styles.resultHighlight,
                                    color:
                                        resultData.prediction > 0.5
                                            ? "red"
                                            : "green",
                                }}
                            >
                                {resultData.prediction > 0.5
                                    ? "Positive for Cardiovascular Disease"
                                    : "Negative for Cardiovascular Disease"}
                            </h1>

                            <div style={styles.userInfo}>
                                <p>
                                    <strong>Name:</strong>{" "}
                                    {resultData.user.fullname}
                                </p>
                                <p>
                                    <strong>Age:</strong>{" "}
                                    {new Date().getFullYear() -
                                        new Date(
                                            resultData.user.birthdate
                                        ).getFullYear()}
                                </p>
                                {/* <p>
                                    <strong>Check-up Period:</strong>{" "}
                                    {new Date(
                                        resultData.created_at
                                    ).toLocaleDateString()}
                                </p> */}
                                <p>
                                    <strong>Check-up Period:</strong>{" "}
                                    {formatDate(resultData.created_at)}
                                </p>
                            </div>

                            <div style={styles.userStats}>
                                <div style={styles.statItem}>
                                    <h3>Cholesterol Level</h3>
                                    <p
                                        style={{
                                            ...styles.statValue,
                                            color:
                                                resultData.cholesterol_level > 1
                                                    ? "red"
                                                    : "green",
                                        }}
                                    >
                                        {getCholesterolRange(
                                            resultData.cholesterol_level
                                        )}
                                    </p>
                                </div>

                                <div style={styles.statItem}>
                                    <h3>Glucose Level</h3>
                                    <p
                                        style={{
                                            ...styles.statValue,
                                            color:
                                                resultData.glucose_level > 1
                                                    ? "red"
                                                    : "green",
                                        }}
                                    >
                                        {getGlucoseRange(
                                            resultData.glucose_level
                                        )}
                                    </p>
                                </div>

                                <div style={styles.statItem}>
                                    <h3>Blood Pressure</h3>
                                    <div style={styles.bloodPressureValues}>
                                        <p>
                                            <strong>SYS:</strong>{" "}
                                            {resultData.systole} mmHg
                                        </p>
                                        <p>
                                            <strong>DIA:</strong>{" "}
                                            {resultData.diastole} mmHg
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.buttonContainer}>
                                <button
                                    onClick={onClose}
                                    style={styles.closeButton}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    modal: {
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    resultContainer: {
        width: "100%",
    },
    resultHighlight: {
        fontSize: "1.5rem",
        marginBottom: "1rem",
    },
    userInfo: {
        marginBottom: "1rem",
    },
    userStats: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    statItem: {
        marginBottom: "1rem",
    },
    statValue: {
        fontSize: "1.2rem",
    },
    bloodPressureValues: {
        display: "flex",
        justifyContent: "space-between",
    },
    buttonContainer: {
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
    },
    closeButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        cursor: "pointer",
        border: "none",
    },
};

export default ResultModal;
