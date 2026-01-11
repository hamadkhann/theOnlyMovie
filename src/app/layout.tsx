import Header from "@/components/Header";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "CineScope Pro",
  description: "Discover movies with clean UI and real data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
