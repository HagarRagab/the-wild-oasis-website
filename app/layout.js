import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";

import Header from "@/app/_components/Header";
import { ReservationProvider } from "@/app/_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ filter: "none" }}>
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 relative grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] antialiased`}
      >
        <Header />
        <div className="px-2 py-12 sm:px-4 md:px-8">
          <main className="mx-auto h-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
