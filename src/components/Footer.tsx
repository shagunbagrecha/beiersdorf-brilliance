import beiersdorfLogo from "@/assets/beiersdorf-logo.png";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border py-4">
      <div className="container mx-auto px-6 flex justify-center">
        <img 
          src={beiersdorfLogo} 
          alt="Beiersdorf" 
          className="h-6 object-contain opacity-70"
        />
      </div>
    </footer>
  );
}
