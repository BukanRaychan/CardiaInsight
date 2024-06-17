import React from "react";

import profilePic from "../../js/assets/profile.jpg";
import Logo from "../../js/assets/logo2.png";
import { Link } from "@inertiajs/react";

function Navbar() {
    // const handleSmallButton = () => {
    //     // Menampilkan alert dengan tombol Yes dan No
    //     if (window.confirm("Apakah Anda yakin ingin keluar?")) {
    //         // Jika user memilih Yes
    //         alert("Anda telah keluar.");
    //         // Tambahkan kode untuk logout atau navigasi ke halaman logout di sini
    //     } else {
    //         // Jika user memilih No
    //         alert("Pembatalan logout.");
    //     }
    // };

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

    const userSession = JSON.parse(localStorage.getItem("userSession"));

    return (
        <nav className="bg-custom-green py-4 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img src={Logo} alt="Logo" className="w-40 h-auto" />
            </div>
            <div className="flex-1 flex justify-center space-x-10">
                <Link
                    href="/homepage"
                    className="text-white text-lg hover:underline font-sans"
                >
                    Home
                </Link>
                <Link
                    href="/result"
                    className="text-white text-lg hover:underline font-sans"
                >
                    Result
                </Link>
                <Link
                    href="/history"
                    className="text-white text-lg hover:underline font-sans"
                >
                    History
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleLogout}
                    className="text-white text-lg font-semibold hover:bg-red-700 rounded-md"
                >
                    Log Out
                </button>
                <span className="text-white text-lg font-semibold">
                    {userSession.username}
                </span>
                <img
                    src={profilePic}
                    alt="Profile"
                    className="w-14 h-14 rounded-full"
                />
            </div>
        </nav>
    );
}

export default Navbar;
