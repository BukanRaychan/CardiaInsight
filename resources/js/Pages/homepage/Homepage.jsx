import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage({ data }) {
    const [showForm1, setShowForm1] = useState(true);
    const [showForm2, setShowForm2] = useState(false);
    const [showForm3, setShowForm3] = useState(false);
    localStorage.setItem("userSession", JSON.stringify(data));

    const [cholesterol, setCholesterol] = useState("");
    const [systolic, setSystolic] = useState("");
    const [diastolic, setDiastolic] = useState("");
    const [glucose, setGlucose] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [smoke, setSmoke] = useState("no");
    const [sport, setSport] = useState("no");
    const [alcohol, setAlcohol] = useState("no");

    const handleButtonClick = (buttonNumber) => {
        setShowForm1(false);
        setShowForm2(false);
        setShowForm3(false);
        if (buttonNumber === 1) {
            setShowForm1(true);
        } else if (buttonNumber === 2) {
            setShowForm2(true);
        } else if (buttonNumber === 3) {
            setShowForm3(true);
        }
    };

    const handleNextButtonClickForm2 = () => {
        setShowForm2(false);
        setShowForm3(true);
    };

    const handleSubmitAllForms = async (event) => {
        event.preventDefault();

        if (
            !cholesterol ||
            !systolic ||
            !diastolic ||
            !glucose ||
            !height ||
            !weight
        ) {
            toast.error("Please fill out all required fields.");
            // console.log("error data kosong");
            return;
        }

        const formData = {
            cholesterol,
            systolic,
            diastolic,
            glucose,
            height,
            weight,
            smoke,
            sport,
            alcohol,
        };

        try {
            const response = await fetch("/patient/sendData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success("Forms submitted successfully!");
                window.location.href = "/result";
                // console.log("Forms submitted successfully : ", data);
                // Optionally, redirect or show success message
            } else {
                console.error("Forms submission failed");
                toast.error("Forms submission failed");
            }
        } catch (error) {
            console.error("Error submitting forms: ", error);
            toast.error("Error submitting forms: " + error.message);
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">
                    Press start to scan your body
                </h1>
                <div className="flex space-x-4 mb-4">
                    <button
                        className="w-12 h-12 bg-custom-green text-white rounded-full flex items-center justify-center"
                        onClick={() => handleButtonClick(1)}
                    >
                        1
                    </button>
                    <button
                        className="w-12 h-12 bg-custom-green text-white rounded-full flex items-center justify-center"
                        onClick={() => handleButtonClick(2)}
                    >
                        2
                    </button>
                    <button
                        className="w-12 h-12 bg-custom-green text-white rounded-full flex items-center justify-center"
                        onClick={() => handleButtonClick(3)}
                    >
                        3
                    </button>
                </div>

                {/* Form 2 */}
                {showForm2 && (
                    <div className="bg-white p-6 rounded-lg mb-4 max-w-lg w-full">
                        <form onSubmit={handleNextButtonClickForm2}>
                            <div className="mb-4">
                                <label
                                    htmlFor="cholesterol"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Cholesterol
                                </label>
                                <input
                                    type="text"
                                    id="cholesterol"
                                    name="cholesterol"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Mg/DL"
                                    value={cholesterol}
                                    onChange={(e) =>
                                        setCholesterol(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="systolic"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Systolic
                                </label>
                                <input
                                    type="text"
                                    id="systolic"
                                    name="systolic"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Masukkan Tekanan Darah Sistolik"
                                    value={systolic}
                                    onChange={(e) =>
                                        setSystolic(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="diastolic"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Diastolic
                                </label>
                                <input
                                    type="text"
                                    id="diastolic"
                                    name="diastolic"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Masukkan Tekanan Darah Diastolik"
                                    value={diastolic}
                                    onChange={(e) =>
                                        setDiastolic(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="glucose"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Glucose
                                </label>
                                <input
                                    type="text"
                                    id="glucose"
                                    name="glucose"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Mg/DL"
                                    value={glucose}
                                    onChange={(e) => setGlucose(e.target.value)}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleNextButtonClickForm2}
                                className="mt-2 bg-custom-green text-white py-2 px-4 rounded-full"
                            >
                                Next
                            </button>
                        </form>
                    </div>
                )}

                {/* Form 3 */}
                {showForm3 && (
                    <div className="bg-white p-6 rounded-lg mb-4 max-w-lg w-full">
                        <form onSubmit={handleSubmitAllForms}>
                            <div className="mb-4">
                                <label
                                    htmlFor="height"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Height
                                </label>
                                <input
                                    type="text"
                                    id="height"
                                    name="height"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Height (cm)"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                <label
                                    htmlFor="weight"
                                    className="block font-sans font-semibold text-lg text-gray-700 mt-5"
                                >
                                    Weight
                                </label>
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Weight (kg)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="smoke"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Do you smoke?
                                </label>
                                <select
                                    id="smoke"
                                    name="smoke"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={smoke}
                                    onChange={(e) => setSmoke(e.target.value)}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sport"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Are you active in sports or activities?
                                </label>
                                <select
                                    id="sport"
                                    name="sport"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={sport}
                                    onChange={(e) => setSport(e.target.value)}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="alcohol"
                                    className="block font-sans font-semibold text-lg text-gray-700"
                                >
                                    Do you consume alcohol?
                                </label>
                                <select
                                    id="alcohol"
                                    name="alcohol"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={alcohol}
                                    onChange={(e) => setAlcohol(e.target.value)}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="mt-2 bg-custom-green text-white py-2 px-4 rounded-full"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}

                {/* START button */}
                {showForm1 && (
                    <div className="pt-12">
                        <button
                            onClick={() => handleButtonClick(2)}
                            className="animate-pulse w-60 h-60 text-custom-green text-[40px] shadow-lg font-bold font-sans rounded-full flex items-center justify-center border-4 border-custom-green"
                        >
                            START
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default HomePage;
