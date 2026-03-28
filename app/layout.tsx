import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "@/node_modules/react-modal-video/css/modal-video.css";
import "@/public/assets/css/main.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Suspense } from "react";
import Preloader from "@/components/elements/Preloader";

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
        <Suspense fallback={<Preloader />}>
          <CurrencyProvider>
            <AuthProvider>
              {children}
              <a
                href="https://wa.me/34661141131?text=Hi%20I%20want%20to%20book%20a%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-float"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                  alt="WhatsApp"
                />
              </a>
              <Toaster />
            </AuthProvider>
          </CurrencyProvider>
        </Suspense>
      </body>
    </html>
  );
}
