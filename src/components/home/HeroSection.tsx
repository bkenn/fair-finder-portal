
import { Button } from "@/components/ui/button";
import { School, BookOpen, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6 space-x-4">
            <School className="h-12 w-12 text-primary" />
            <BookOpen className="h-12 w-12 text-primary" />
            <Globe className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
            Empowering <span className="text-primary">School Representatives</span> Worldwide
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            FairFinder simplifies global education fair management, connecting schools with opportunities across continents.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="text-md px-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <Link to="/register">Get Started</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-md px-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to="/fairs">Explore Fairs</Link>
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
            <p>Trusted by representatives from over 2,000 schools globally</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
    </div>
  );
};

export default HeroSection;
