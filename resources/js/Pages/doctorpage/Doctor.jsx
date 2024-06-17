// import React from "react";
// import { usePage } from "@inertiajs/react";
// import Footer from "@/Components/Footer";
// import "@/Pages/doctorpage/Partials/docstyle.css"; // Import CSS file
// import { Link } from "@inertiajs/react";

// const handleLogout = async () => {
//     const response = await fetch(route("logout"), {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "X-CSRF-Token": document
//                 .querySelector('meta[name="csrf-token"]')
//                 .getAttribute("content"),
//         },
//     });

//     if (response.ok) {
//         console.log("Logout successful");
//         localStorage.removeItem("userSession");
//         window.location.href = "/login";
//     } else {
//         console.error("Logout failed");
//     }
// };

// function DoctorPage() {
//     const { user, patient_data: historyData } = usePage().props;

//     // console.log(user);
//     // console.log(historyData);

//     return (
//         <div className="min-h-screen flex flex-col">
//             <nav className="header">
//                 <div className="text-lg font-bold">
//                     Welcome, {user.fullname}
//                 </div>
//                 <button onClick={handleLogout} className="logout-button">
//                     Logout
//                 </button>
//             </nav>
//             <div className="flex-1 container">
//                 <h1 className="text-2xl font-bold mb-6">Patient Data</h1>
//                 <div className="card-container">
//                     {historyData.length > 0 ? (
//                         historyData.map((item, index) => (
//                             <div key={index} className="patient-card">
//                                 <p className="text-lg font-semibold">
//                                     Nama: {item.fullname}
//                                 </p>
//                                 <p className="text-gray-700">
//                                     Tanggal Pengecekan:{" "}
//                                     {new Date(
//                                         item.created_at
//                                     ).toLocaleDateString()}
//                                 </p>
//                                 <p className="text-gray-700 mb-4">
//                                     Status PKV:{" "}
//                                     {item.prediction > 0.5
//                                         ? "Positif"
//                                         : "Negatif"}
//                                 </p>
//                                 <Link
//                                     // href={`/result/${item.id}`}
//                                     className="go-to-result-button"
//                                 >
//                                     Go to Result
//                                 </Link>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500 w-full">
//                             No Patient Data Available
//                         </p>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default DoctorPage;

import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import "@/Pages/doctorpage/Partials/docstyle.css"; // Import CSS file
import { Link } from "@inertiajs/react";
// import PatientDetailModal from "@/Pages/doctorpage/Partials/PatientDetailModal"; // Import modal
import PatientDetailModal from "@/Components/PatientDetailModal";

const handleLogout = async () => {
    const response = await fetch(route("logout"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content"),
        },
    });

    if (response.ok) {
        console.log("Logout successful");
        localStorage.removeItem("userSession");
        window.location.href = "/login";
    } else {
        console.error("Logout failed");
    }
};

function DoctorPage() {
    const { user, patient_data: historyData } = usePage().props;
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleShowDetail = (item) => {
        setSelectedPatient(item);
    };

    const handleCloseModal = () => {
        setSelectedPatient(null);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <nav className="header">
                <div className="text-lg font-bold">
                    Welcome, {user.fullname}
                </div>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </nav>
            <div className="flex-1 container">
                <h1 className="text-2xl font-bold mb-6">Patient Data</h1>
                <div className="card-container">
                    {historyData.length > 0 ? (
                        historyData.map((item, index) => (
                            <div key={index} className="patient-card">
                                <p className="text-lg font-semibold">
                                    Nama: {item.fullname}
                                </p>
                                <p className="text-gray-700">
                                    Tanggal Pengecekan:{" "}
                                    {new Date(
                                        item.created_at
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 mb-4">
                                    Status PKV:{" "}
                                    {item.prediction > 0.5
                                        ? "Positif"
                                        : "Negatif"}
                                </p>
                                <button
                                    onClick={() => handleShowDetail(item)}
                                    className="go-to-result-button"
                                >
                                    Go to Result
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 w-full">
                            No Patient Data Available
                        </p>
                    )}
                </div>
            </div>
            <Footer />
            {selectedPatient && (
                <PatientDetailModal
                    item={selectedPatient}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default DoctorPage;
