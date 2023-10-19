import type { Metadata } from "next";
import "./styles/globals.scss";
import Header from "./components/Header/Header";

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty character viewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        
        </body>
    </html>
  );
}
