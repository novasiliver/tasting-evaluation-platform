import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "Premium Quality Certification | Tastecert",
  description: "Prestigious certificates and awards for exceptional olive oils, wines, and specialty food products. Expert evaluation, trusted seal of excellence.",
  keywords: ["product certification", "quality awards", "olive oil certification", "wine awards", "specialty food", "gourmet certification"],
  openGraph: {
    title: "Tastecert - Premium Quality Certification",
    description: "Prestigious certificates and awards for exceptional olive oils, wines, and specialty food products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tastecert - Premium Quality Certification",
    description: "Prestigious certificates and awards for exceptional specialty products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-stone-600 antialiased selection:bg-orange-100 selection:text-orange-900">
        <Script 
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          strategy="beforeInteractive"
        />
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}

