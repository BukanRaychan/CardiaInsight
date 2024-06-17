import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/Pages/doctorpage/Partials/docstyle.css"; // Sesuaikan dengan struktur direktori Anda

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

const App = ({ patients }) => {
    const [assignedDoctors, setAssignedDoctors] = useState({});
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");

    useEffect(() => {
        // Memuat daftar dokter dari backend saat komponen dimuat
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get("/admin/getdoctors");
            setDoctors(response.data);
        } catch (error) {
            console.error("Failed to fetch doctors:", error);
        }
    };

    const handleSelectChange = (patientId, event) => {
        const selectedDoctor = event.target.value;
        console.log(selectedDoctor);
        if (selectedDoctor) {
            const confirmation = window.confirm(
                `Are you sure you want to assign ${selectedDoctor}? This cannot be undone.`
            );
            if (confirmation) {
                setAssignedDoctors((prevState) => ({
                    ...prevState,
                    [patientId]: selectedDoctor,
                }));

                // Kirim permintaan ke backend untuk menetapkan dokter
                axios
                    .post(`/admin/assign-doctor/${patientId}`, {
                        doctorId: selectedDoctor,
                    })
                    .then((response) => {
                        console.log(
                            "Doctor assigned successfully:",
                            response.data
                        );
                    })
                    .catch((error) => {
                        console.error("Error assigning doctor:", error);
                    });
            } else {
                event.target.value = "";
            }
        }
    };

    return (
        <div>
            <div className="header">
                <h1>CARDIA INSIGHT</h1>
                <h1>Admin</h1>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="container">
                {patients.map((patient) => (
                    <div key={patient.id} className="patient-card">
                        <h3>{patient.name}</h3>
                        <p>Age: {patient.age}</p>
                        <p>PKV Status: {patient.PKVStatus}</p>
                        {assignedDoctors[patient.id] ? (
                            <p>
                                Assigned Doctor: {assignedDoctors[patient.id]}
                            </p>
                        ) : (
                            <select
                                className="doctor-select"
                                onChange={(event) =>
                                    handleSelectChange(patient.id, event)
                                }
                            >
                                <option value="" defaultValue>
                                    Select Doctor
                                </option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.fullname}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
