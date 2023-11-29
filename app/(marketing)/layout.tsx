import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-wallpaper bg-wallpaperPosition">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className=" z-50 relative">
        <Navbar />
        <main className=" h-screen flex justify-center items-center flex-col self-center">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MarketingLayout;
