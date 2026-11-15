import type { Metadata } from "next";
import "./globals.css";
import Splash from "./splash";
import SiteFooter from "./site-footer";

export const metadata: Metadata = {
  title: "Ice Bucketz",
  description: "Ice delivery in Gaborone and surrounding areas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><Splash />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
