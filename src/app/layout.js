import { ClerkProvider } from "@clerk/nextjs"; // Import ClerkProvider
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Finan Smart ",
  description: "AI powered financial advisor",
};
const publishableKey = pk_test_ZGVjZW50LWJ1Y2stOS5jbGVyay5hY2NvdW50cy5kZXYk;
export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
