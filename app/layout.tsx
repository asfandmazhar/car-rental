import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "@/node_modules/react-modal-video/css/modal-video.css";
import "@/public/assets/css/main.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

const urbanist = Urbanist({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "luxentina - Book Car rental Barcelona",
  description: "luxentina - Book Car rental Barcelona",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={urbanist.variable}>
        <CurrencyProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
