
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FairProps } from "@/components/dashboard/FairCard";
import FairCard from "@/components/dashboard/FairCard";
import { Search, Filter, CalendarCheck, GlobeIcon } from "lucide-react";

// Mock data for fairs
const allFairs: FairProps[] = [
  {
    id: "1",
    name: "International Education Expo",
    location: "New York, NY",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    attendees: 120,
    isRegistered: true,
  },
  {
    id: "2",
    name: "College Fair 2025",
    location: "Chicago, IL",
    date: "July 8, 2025",
    time: "10:00 AM - 4:00 PM",
    attendees: 85,
  },
  {
    id: "3",
    name: "STEM Education Summit",
    location: "San Francisco, CA",
    date: "August 22, 2025",
    time: "9:00 AM - 6:00 PM",
    attendees: 150,
  },
  {
    id: "4",
    name: "Global Universities Exhibition",
    location: "London, UK",
    date: "September 10, 2025",
    time: "10:00 AM - 6:00 PM",
    attendees: 200,
  },
  {
    id: "5",
    name: "Tech Education Conference",
    location: "Boston, MA",
    date: "October 5, 2025",
    time: "9:00 AM - 5:00 PM",
    attendees: 110,
  },
  {
    id: "6",
    name: "International Schools Forum",
    location: "Miami, FL",
    date: "November 15, 2025",
    time: "8:30 AM - 4:30 PM",
    attendees: 95,
  },
];

const Fairs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filterFairs = () => {
    const filtered = allFairs.filter((fair) => {
      const matchesSearch = fair.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || 
        fair.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        
      if (activeTab === "registered") {
        return matchesSearch && fair.isRegistered;
      } else if (activeTab === "upcoming") {
        // This is a simple example - in a real app, you would compare dates
        return matchesSearch && new Date(fair.date) > new Date();
      }
      
      return matchesSearch;
    });
    
    return filtered;
  };

  const filteredFairs = filterFairs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Education Fairs</h1>
            <p className="text-gray-600">
              Discover and register for upcoming education fairs for your schools.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex gap-2">
                <Filter size={18} />
                <span>Filter</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="all" className="flex gap-2 items-center">
                <GlobeIcon size={16} />
                <span>All Fairs</span>
              </TabsTrigger>
              <TabsTrigger value="registered" className="flex gap-2 items-center">
                <CalendarCheck size={16} />
                <span>Registered</span>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex gap-2 items-center">
                <CalendarCheck size={16} />
                <span>Upcoming</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredFairs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFairs.map((fair) => (
                    <FairCard key={fair.id} fair={fair} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No fairs found matching your search.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="registered">
              {filteredFairs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFairs.map((fair) => (
                    <FairCard key={fair.id} fair={fair} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">You haven't registered for any fairs yet.</p>
                  <Button variant="link" onClick={() => setActiveTab("all")}>
                    Browse all fairs
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming">
              {filteredFairs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFairs.map((fair) => (
                    <FairCard key={fair.id} fair={fair} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No upcoming fairs found matching your search.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fairs;
