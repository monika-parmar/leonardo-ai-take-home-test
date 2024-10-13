import Header from "@/components/Header";
import { UserInfoProvider } from "@/context/UserInfoContext";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

// Load local fonts with specified properties
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the application
export const metadata: Metadata = {
  title: "Leonardo.Ai",
  description: "Rick 'n Morty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserInfoProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <div className='flex flex-col h-screen'>
              {/* Fixed Header */}
              <Box
                position='fixed'
                top='0'
                left='0'
                right='0'
                zIndex='10'
                bg='gray.800'
              >
                <Header />
              </Box>

              {/* Main content area */}
              <Box
                className='flex-1 overflow-y-auto'
                bgGradient='linear(to-b, gray.900, gray.600)'
                pt={{ base: "64px", md: "88px" }}
              >
                {children}
              </Box>
            </div>
          </Providers>
        </body>
      </html>
    </UserInfoProvider>
  );
}
