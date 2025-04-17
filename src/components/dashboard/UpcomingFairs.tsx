
import { useState } from "react";
import { FairProps } from "./FairCard";
import FairCard from "./FairCard";

// Mock data for upcoming fairs
const mockFairs: FairProps[] = [
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
];

const UpcomingFairs = () => {
  const [fairs] = useState<FairProps[]>(mockFairs);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Upcoming Fairs</h2>
        <a href="/fairs" className="text-primary hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fairs.map((fair) => (
          <FairCard key={fair.id} fair={fair} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingFairs;
