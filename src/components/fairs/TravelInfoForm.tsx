
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plane, Hotel, Car, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TravelInfo {
  arrivalDate: string;
  departureDate: string;
  accommodationDetails: string;
  transportationDetails: string;
  additionalNotes: string;
}

interface TravelInfoFormProps {
  initialValues: TravelInfo;
  onSubmit: (info: TravelInfo) => void;
  onCancel: () => void;
}

const TravelInfoForm = ({ initialValues, onSubmit, onCancel }: TravelInfoFormProps) => {
  const [formData, setFormData] = useState<TravelInfo>(initialValues);
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(
    initialValues.arrivalDate ? new Date(initialValues.arrivalDate) : undefined
  );
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    initialValues.departureDate ? new Date(initialValues.departureDate) : undefined
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      arrivalDate: arrivalDate ? format(arrivalDate, 'MMMM d, yyyy') : '',
      departureDate: departureDate ? format(departureDate, 'MMMM d, yyyy') : ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="arrivalDate" className="flex items-center gap-1">
              <Plane className="h-4 w-4" /> Arrival Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="arrivalDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !arrivalDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {arrivalDate ? format(arrivalDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={arrivalDate}
                  onSelect={setArrivalDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="departureDate" className="flex items-center gap-1">
              <Plane className="h-4 w-4" /> Departure Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="departureDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !departureDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accommodationDetails" className="flex items-center gap-1">
              <Hotel className="h-4 w-4" /> Accommodation Details
            </Label>
            <Input
              id="accommodationDetails"
              name="accommodationDetails"
              value={formData.accommodationDetails}
              onChange={handleInputChange}
              placeholder="Hotel name, booking reference, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transportationDetails" className="flex items-center gap-1">
              <Car className="h-4 w-4" /> Transportation Details
            </Label>
            <Input
              id="transportationDetails"
              name="transportationDetails"
              value={formData.transportationDetails}
              onChange={handleInputChange}
              placeholder="Flight number, rental car, etc."
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleInputChange}
          placeholder="Any special requirements or information"
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Travel Information
        </Button>
      </div>
    </form>
  );
};

export default TravelInfoForm;
