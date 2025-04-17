
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface FairProps {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  attendees: number;
  isRegistered?: boolean;
}

const FairCard = ({ fair }: { fair: FairProps }) => {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{fair.name}</CardTitle>
          {fair.isRegistered && (
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
              Registered
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 h-4 w-4 opacity-70" />
            <span>{fair.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="mr-2 h-4 w-4 opacity-70" />
            <span>{fair.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="mr-2 h-4 w-4 opacity-70" />
            <span>{fair.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="mr-2 h-4 w-4 opacity-70" />
            <span>{fair.attendees} attending</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          variant={fair.isRegistered ? "outline" : "default"}
          className="w-full"
        >
          {fair.isRegistered ? "View Details" : "Register Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FairCard;
