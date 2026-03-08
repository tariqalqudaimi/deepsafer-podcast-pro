import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./_lib/providers";
import { FloatingNav } from "./_components/floating-nav";
import { FloatingPlayer } from "./_components/floating-player";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DeepSefar | Future of Audio",
  description: "Bento-style podcast dashboard for the modern explorer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#050505] text-white h-screen overflow-hidden selection:bg-blue-500/30 antialiased`}>
        <Providers>
        
          <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0" />

        
          <FloatingNav />
          
          <main className="absolute inset-0 xl:pl-[120px] overflow-y-auto scroll-smooth custom-scrollbar z-10">
            <div className="max-w-[1400px] mx-auto p-6 md:p-12 pb-48">
              {children}
            </div>
          </main>

          <FloatingPlayer />
        </Providers>
      </body>
    </html>
  );
}