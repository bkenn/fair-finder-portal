
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School, Plus, Trash2, Edit, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>John Doe</CardTitle>
                      <CardDescription>School Representative</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Email</Label>
                      <p>john.doe@example.com</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Phone</Label>
                      <p>(123) 456-7890</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Member Since</Label>
                      <p>January 15, 2025</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="flex-1">
              <Tabs defaultValue="schools" className="w-full">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="schools" className="flex gap-2 items-center">
                    <School size={16} />
                    <span>Managed Schools</span>
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex gap-2 items-center">
                    <User size={16} />
                    <span>Account Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="schools">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Your Schools</CardTitle>
                        <Button size="sm" className="flex gap-1">
                          <Plus size={16} />
                          <span>Add School</span>
                        </Button>
                      </div>
                      <CardDescription>Manage the schools you represent</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {["Springfield High School", "Central Academy", "Westview College"].map((school, i) => (
                          <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <School className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-md" />
                              <div>
                                <h3 className="font-medium">{school}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {i === 0 ? "3 representatives" : i === 1 ? "2 representatives" : "3 representatives"}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>Upcoming Fair Registrations</CardTitle>
                      <CardDescription>Your confirmed fair registrations</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">International Education Expo</h3>
                            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Confirmed
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground mb-2">
                            <p>June 15, 2025 | New York, NY</p>
                            <p>Representing: Springfield High School</p>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Update your account details</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="(123) 456-7890" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="position">Position/Title</Label>
                          <Input id="position" defaultValue="School Representative" />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button>Save Changes</Button>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Update your password</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button>Update Password</Button>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
