import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../redux/provider";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Setup Your Restaurant",
  description: "A quick setup for your restaurant at dill",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
