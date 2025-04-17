
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TravelInfoForm from "@/components/fairs/TravelInfoForm";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  CreditCard,
  Plane,
  Hotel,
  Car,
  Edit,
  Check,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { FairProps } from "@/components/dashboard/FairCard";

// Mock data for travel information
interface TravelInfo {
  arrivalDate: string;
  departureDate: string;
  accommodationDetails: string;
  transportationDetails: string;
  additionalNotes: string;
}

// Mock data for payment information
interface PaymentInfo {
  status: "paid" | "pending" | "none";
  amount: number;
  date?: string;
  method?: string;
  transactionId?: string;
}

// Mock fairs data with additional detail
const mockFairs: (FairProps & { description: string, paymentFee: number })[] = [
  {
    id: "1",
    name: "International Education Expo",
    location: "New York, NY",
    date: "June 15, 2025",
    time: "9:00 AM - 5:00 PM",
    attendees: 120,
    isRegistered: true,
    description: "Join the premier education event bringing together schools from over 50 countries. Network with fellow representatives and showcase your institution to prospective students and partners.",
    paymentFee: 349.99
  },
  {
    id: "2",
    name: "College Fair 2025",
    location: "Chicago, IL",
    date: "July 8, 2025",
    time: "10:00 AM - 4:00 PM",
    attendees: 85,
    description: "The largest college fair in the Midwest. Connect with potential students and parents looking for quality education opportunities.",
    paymentFee: 249.99
  },
  {
    id: "3",
    name: "STEM Education Summit",
    location: "San Francisco, CA",
    date: "August 22, 2025",
    time: "9:00 AM - 6:00 PM",
    attendees: 150,
    isRegistered: true,
    description: "A specialized fair focused on science, technology, engineering, and mathematics education. Meet with students specifically interested in STEM fields.",
    paymentFee: 299.99
  },
];

// Mock payment data
const mockPayments: Record<string, PaymentInfo> = {
  "1": { status: "paid", amount: 349.99, date: "April 2, 2025", method: "Credit Card", transactionId: "TXN-12345" },
  "3": { status: "pending", amount: 299.99 },
  "2": { status: "none", amount: 249.99 }
};

// Mock travel info
const mockTravelInfo: Record<string, TravelInfo> = {
  "1": {
    arrivalDate: "June 14, 2025",
    departureDate: "June 16, 2025",
    accommodationDetails: "Hilton Garden Inn, Room booked",
    transportationDetails: "Flight AA1234 arriving 2:30 PM",
    additionalNotes: "Bringing marketing materials, will need table space"
  },
  "3": {
    arrivalDate: "August 21, 2025",
    departureDate: "August 23, 2025",
    accommodationDetails: "Pending booking",
    transportationDetails: "Will drive from local office",
    additionalNotes: ""
  }
};

const FairDetail = () => {
  const { fairId } = useParams();
  const { toast } = useToast();
  const [fair, setFair] = useState<(FairProps & { description: string, paymentFee: number }) | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [travelInfo, setTravelInfo] = useState<TravelInfo | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [editingTravel, setEditingTravel] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  useEffect(() => {
    if (!fairId) return;
    
    const foundFair = mockFairs.find(f => f.id === fairId);
    if (foundFair) {
      setFair(foundFair);
      setPaymentInfo(mockPayments[fairId] || { status: "none", amount: foundFair.paymentFee });
      setTravelInfo(mockTravelInfo[fairId] || null);
    }
  }, [fairId]);

  const handleSubmitPayment = () => {
    // In a real app, this would process the payment via Stripe or another payment processor
    if (!fair || !paymentInfo) return;
    
    setPaymentInfo({
      ...paymentInfo,
      status: "paid",
      date: new Date().toLocaleDateString(),
      method: "Credit Card",
      transactionId: `TXN-${Math.floor(Math.random() * 100000)}`
    });
    
    toast({
      title: "Payment successful",
      description: `Your payment of $${fair.paymentFee} has been processed.`
    });
    
    setPaymentDialogOpen(false);
  };

  const handleUpdateTravelInfo = (info: TravelInfo) => {
    setTravelInfo(info);
    setEditingTravel(false);
    
    toast({
      title: "Travel information updated",
      description: "Your travel details have been saved successfully."
    });
  };

  if (!fair) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Fair not found</h1>
            <p className="mb-6 text-gray-600">The fair you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/fairs">Return to Fairs</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/fairs" className="text-primary hover:underline flex items-center gap-1 mb-4">
              ← Back to Fairs
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold">{fair.name}</h1>
              {fair.isRegistered && (
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 w-fit">
                  Registered
                </Badge>
              )}
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="details" className="flex gap-2 items-center">
                <Info size={16} />
                <span>Fair Details</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex gap-2 items-center">
                <CreditCard size={16} />
                <span>Payment</span>
              </TabsTrigger>
              <TabsTrigger value="travel" className="flex gap-2 items-center">
                <Plane size={16} />
                <span>Travel Info</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>About This Fair</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{fair.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div className="flex items-start">
                        <MapPin className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p className="text-gray-600">{fair.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h4 className="font-medium">Date</h4>
                          <p className="text-gray-600">{fair.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h4 className="font-medium">Time</h4>
                          <p className="text-gray-600">{fair.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <h4 className="font-medium">Attendees</h4>
                          <p className="text-gray-600">{fair.attendees} representatives</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Registration</h3>
                        <p className={`text-sm ${fair.isRegistered ? "text-green-600" : "text-amber-600"}`}>
                          {fair.isRegistered ? 
                            "You are registered for this fair" : 
                            "Not registered"
                          }
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Payment</h3>
                        <p className={`text-sm ${
                          paymentInfo?.status === "paid" ? "text-green-600" : 
                          paymentInfo?.status === "pending" ? "text-amber-600" : 
                          "text-red-600"
                        }`}>
                          {paymentInfo?.status === "paid" ? 
                            "Paid" : 
                            paymentInfo?.status === "pending" ? 
                              "Payment pending" : 
                              "Payment required"
                          }
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Travel Information</h3>
                        <p className={`text-sm ${travelInfo ? "text-green-600" : "text-amber-600"}`}>
                          {travelInfo ? 
                            "Submitted" : 
                            "Not submitted"
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-stretch gap-3">
                    {!fair.isRegistered && (
                      <Button className="w-full">Register for Fair</Button>
                    )}
                    
                    {fair.isRegistered && paymentInfo?.status !== "paid" && (
                      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Complete Payment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Complete Your Payment</DialogTitle>
                            <DialogDescription>
                              Please review the payment details for this fair registration.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span className="font-medium">Fair Registration</span>
                                <span>${fair.paymentFee.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span>${fair.paymentFee.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmitPayment}>
                              Pay ${fair.paymentFee.toFixed(2)}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    {!travelInfo && fair.isRegistered && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setActiveTab("travel");
                          setEditingTravel(true);
                        }}
                      >
                        <Plane className="mr-2 h-4 w-4" />
                        Add Travel Information
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>
                    Registration fee for participating in {fair.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {paymentInfo?.status === "paid" ? (
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-md p-4 flex gap-3">
                        <div className="bg-green-100 rounded-full p-1.5 h-fit">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-green-800">Payment Complete</h3>
                          <p className="text-green-700 text-sm">
                            Your payment has been processed successfully.
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Payment Details</h3>
                          <table className="w-full text-sm">
                            <tbody>
                              <tr>
                                <td className="py-1.5 text-gray-600">Amount</td>
                                <td className="py-1.5 font-medium">${paymentInfo.amount.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td className="py-1.5 text-gray-600">Date</td>
                                <td className="py-1.5 font-medium">{paymentInfo.date}</td>
                              </tr>
                              <tr>
                                <td className="py-1.5 text-gray-600">Method</td>
                                <td className="py-1.5 font-medium">{paymentInfo.method}</td>
                              </tr>
                              <tr>
                                <td className="py-1.5 text-gray-600">Transaction ID</td>
                                <td className="py-1.5 font-medium">{paymentInfo.transactionId}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Need Help?</h3>
                          <p className="text-gray-600 text-sm mb-4">
                            If you have any questions about your payment or need to request a refund, please contact our support team.
                          </p>
                          <Button variant="outline" size="sm">
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className={`border rounded-md p-4 flex gap-3 ${
                        paymentInfo?.status === "pending" ? 
                          "bg-amber-50 border-amber-200" : 
                          "bg-red-50 border-red-200"
                      }`}>
                        <div className={`rounded-full p-1.5 h-fit ${
                          paymentInfo?.status === "pending" ? 
                            "bg-amber-100" : 
                            "bg-red-100"
                        }`}>
                          <Info className={`h-5 w-5 ${
                            paymentInfo?.status === "pending" ? 
                              "text-amber-600" : 
                              "text-red-600"
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-medium ${
                            paymentInfo?.status === "pending" ? 
                              "text-amber-800" : 
                              "text-red-800"
                          }`}>
                            {paymentInfo?.status === "pending" ? 
                              "Payment Pending" : 
                              "Payment Required"
                            }
                          </h3>
                          <p className={`text-sm ${
                            paymentInfo?.status === "pending" ? 
                              "text-amber-700" : 
                              "text-red-700"
                          }`}>
                            {paymentInfo?.status === "pending" ? 
                              "Your payment is being processed. This may take a few minutes." : 
                              "Please complete your payment to confirm your registration."
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">Payment Summary</h3>
                        <div className="border rounded-md divide-y">
                          <div className="p-4 flex justify-between">
                            <span>Registration Fee</span>
                            <span className="font-medium">${paymentInfo?.amount.toFixed(2)}</span>
                          </div>
                          <div className="p-4 flex justify-between font-medium">
                            <span>Total</span>
                            <span>${paymentInfo?.amount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {paymentInfo?.status === "none" && (
                        <div className="flex justify-end">
                          <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                            <DialogTrigger asChild>
                              <Button>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Pay ${paymentInfo.amount.toFixed(2)}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Complete Your Payment</DialogTitle>
                                <DialogDescription>
                                  Please review the payment details for this fair registration.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="space-y-4">
                                  <div className="flex justify-between">
                                    <span className="font-medium">Fair Registration</span>
                                    <span>${paymentInfo.amount.toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total</span>
                                    <span>${paymentInfo.amount.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleSubmitPayment}>
                                  Pay ${paymentInfo.amount.toFixed(2)}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="travel" className="mt-0 animate-fade-in">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Travel Information</CardTitle>
                    <CardDescription>
                      Your arrival, accommodation and transportation details
                    </CardDescription>
                  </div>
                  
                  {travelInfo && !editingTravel && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingTravel(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editingTravel || !travelInfo ? (
                    <TravelInfoForm
                      initialValues={travelInfo || {
                        arrivalDate: "",
                        departureDate: "",
                        accommodationDetails: "",
                        transportationDetails: "",
                        additionalNotes: ""
                      }}
                      onSubmit={handleUpdateTravelInfo}
                      onCancel={() => {
                        setEditingTravel(false);
                        if (!travelInfo) {
                          setActiveTab("details");
                        }
                      }}
                    />
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Calendar className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                            <div>
                              <h4 className="font-medium">Arrival Date</h4>
                              <p className="text-gray-600">{travelInfo.arrivalDate}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Calendar className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                            <div>
                              <h4 className="font-medium">Departure Date</h4>
                              <p className="text-gray-600">{travelInfo.departureDate}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Hotel className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                            <div>
                              <h4 className="font-medium">Accommodation</h4>
                              <p className="text-gray-600">{travelInfo.accommodationDetails || "Not specified"}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Car className="mr-2 h-5 w-5 mt-0.5 text-primary" />
                            <div>
                              <h4 className="font-medium">Transportation</h4>
                              <p className="text-gray-600">{travelInfo.transportationDetails || "Not specified"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {travelInfo.additionalNotes && (
                        <div>
                          <h4 className="font-medium mb-1">Additional Notes</h4>
                          <p className="text-gray-600">{travelInfo.additionalNotes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FairDetail;
