import React, { useState } from "react";
import lobby from "@/assets/lobby.png";
import logo2 from "@/assets/logo2.png";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        gender: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (isLogin) {
            axios
                .post(
                    "/login",
                    {
                        emailLogin: formData.email,
                        passwordLogin: formData.password,
                    },
                    {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken,
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status === "success") {
                        window.location.href = response.data.redirect;
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error.response.data);
                    alert(
                        "Login failed: " +
                            (error.response?.data?.message || "Unknown error")
                    );
                })
                .finally(() => setLoading(false));
        } else {
            axios
                .post(
                    "/register",
                    {
                        email: formData.email,
                        fullname: formData.fullname,
                        username: formData.username,
                        phonenum: formData.phoneNumber,
                        passwordRegister: formData.password,
                        gender: formData.gender,
                        birthdate: formData.dateOfBirth,
                        user_role: "patient",
                    },
                    {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken,
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    window.location.href = "/login";
                })
                .catch((error) => {
                    console.error(error.response.data);
                    alert(
                        "Registration failed: " +
                            (error.response?.data?.message || "Unknown error")
                    );
                })
                .finally(() => setLoading(false));
        }
    };

    return (
        <div className="min-h-screen flex items-stretch">
            <div className="flex md:grid-cols-2 w-full">
                <div className="relative basis-[35%]">
                    <div className="w-full h-screen overflow-hidden">
                        <img
                            src={lobby}
                            alt="Lobby"
                            className="w-full h-full object-cover object-left"
                        />
                    </div>
                    <div className="absolute left-10 top-10">
                        <img
                            src={logo2}
                            alt="Overlay"
                            className="w-full lg:w-full md:w-96 sm:w-72"
                        />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center p-8 bg-white shadow-lg">
                    <div className="mb-6 flex">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 text-lg font-bold py-2 px-4 ${
                                isLogin
                                    ? "bg-custom-green text-white"
                                    : "bg-gray-300 text-gray-700"
                            }`}
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 text-lg font-bold py-2 px-4 ${
                                !isLogin
                                    ? "bg-custom-green text-white"
                                    : "bg-gray-300 text-gray-700"
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        placeholder="Enter your Full Name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        placeholder="Enter your Username"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border bg-white rounded-md shadow-sm"
                                    >
                                        <option value="" disabled hidden>
                                            Select your gender
                                        </option>
                                        <option value="0">Male</option>
                                        <option value="1">Female</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        placeholder="YYYY-MM-DD"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        placeholder="Enter your Phone Number"
                                    />
                                </div>
                            </>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                placeholder="Enter your Email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                placeholder="Enter your password"
                            />
                        </div>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        )}
                        <div className="basis-[35%] self-center">
                            <Button
                                type="submit"
                                text={isLogin ? "Log in" : "Sign Up"}
                            />
                        </div>
                    </form>
                    {loading && (
                        <div className="flex justify-center mt-4">
                            <ClipLoader color="#4CAF50" size={35} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;
