import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "The Pet Shelter",
  description: "Pet Web",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
