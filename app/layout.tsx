import './globals.css';
import type { Metadata } from "next";
import PageNav from './ui/PageNav';

export const metadata: Metadata = {
    title: "Justice Register - or.justice.cz",
    description: "Search for business entities in the Czech Republic public registers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <body>
                {children}
                {/* <PageNav /> */}
            </body>
        </html>
    );
} 
