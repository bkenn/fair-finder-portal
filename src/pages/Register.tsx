
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegistrationForm from "@/components/forms/RegistrationForm";
import { School } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-2">
                <School className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Register for an Education Fair</h1>
              <p className="text-gray-600 mt-2">
                Complete the form below to register your school for an upcoming fair.
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Fair Registration Form</CardTitle>
                <CardDescription>
                  Please provide details about your school and attendance requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationForm />
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>Need help? Contact our support team at support@fairfinder.com</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
