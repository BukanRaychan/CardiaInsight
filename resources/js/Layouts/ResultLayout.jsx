import React from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const ResultLayout = ({ userName = "Empty", children }) => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar userName={userName} />
            <main className="flex-grow w-full px-4 py-8">{children}</main>
            <Footer />
        </div>
    );
};

export default ResultLayout;
