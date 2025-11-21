import { ThemeToggle } from "@/components/ThemeToggle";
import beiersdorfLogo from "@/assets/beiersdorf-logo.png";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <img 
          src={beiersdorfLogo} 
          alt="Beiersdorf" 
          className="h-8 object-contain"
        />
        <ThemeToggle />
      </div>
    </header>
  );
}
