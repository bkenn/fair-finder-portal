
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, School } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  representativeName: z.string().min(2, {
    message: "Representative name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  schoolName: z.string().min(2, {
    message: "School name must be at least 2 characters.",
  }),
  schoolWebsite: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal("")),
  attendanceDate: z.date({
    required_error: "Please select a date.",
  }),
  numberOfAttendees: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid number greater than 0.",
  }),
  specialRequirements: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schools, setSchools] = useState<string[]>([
    "Springfield High School", 
    "Central Academy", 
    "Westview College"
  ]);
  const [selectedSchool, setSelectedSchool] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      representativeName: "",
      email: "",
      phoneNumber: "",
      schoolName: "",
      schoolWebsite: "",
      numberOfAttendees: "1",
      specialRequirements: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    console.log(data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Registration successful", {
        description: "Your registration for the fair has been submitted.",
      });
    }, 1500);
  }

  const handleSelectSchool = (school: string) => {
    setSelectedSchool(school);
    form.setValue("schoolName", school);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Representative Information</h2>
          
          <FormField
            control={form.control}
            name="representativeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Representative Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-2xl font-semibold">School Information</h2>
          
          {schools.length > 0 && (
            <div className="mb-4">
              <FormLabel className="block mb-2">Your Schools</FormLabel>
              <div className="flex flex-wrap gap-2">
                {schools.map((school) => (
                  <Badge 
                    key={school} 
                    variant={selectedSchool === school ? "default" : "outline"}
                    className="cursor-pointer flex items-center gap-1"
                    onClick={() => handleSelectSchool(school)}
                  >
                    <School className="h-3 w-3" />
                    {school}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Select from your existing schools or enter a new one below
              </p>
            </div>
          )}

          <FormField
            control={form.control}
            name="schoolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter school name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schoolWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.schoolwebsite.edu" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-2xl font-semibold">Fair Attendance</h2>

          <FormField
            control={form.control}
            name="attendanceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Attendance Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfAttendees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Attendees</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormDescription>
                  How many representatives from your school will attend?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requirements or accommodations needed..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Complete Registration"}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
