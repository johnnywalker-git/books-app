import Favicon from "../public/images/favicon.ico";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../app/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Books-Buzz",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} main relative`}>
                <AuthProvider>
                    <Navbar />
                    <main className="px-5 md:px-20 lg:px-40 pb-10">{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
