
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <School className="h-10 w-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Connect</span> Your Schools to the Best Education Fairs
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            FairFinder makes it easy for school representatives to discover, register, and manage participation in education fairs worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="text-md px-8">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-md px-8">
              <Link to="/fairs">Browse Fairs</Link>
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500">
            <p>Trusted by representatives from over 2,000 schools globally</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default HeroSection;
