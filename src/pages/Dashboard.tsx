
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UpcomingFairs from "@/components/dashboard/UpcomingFairs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, School, FilePenLine, Users } from "lucide-react";

const dashboardStats = [
  {
    title: "Registered Fairs",
    value: "3",
    icon: <CalendarCheck className="h-6 w-6 text-primary" />,
    change: "+1 this month",
  },
  {
    title: "Schools Managed",
    value: "5",
    icon: <School className="h-6 w-6 text-primary" />,
    change: "No change",
  },
  {
    title: "Pending Applications",
    value: "2",
    icon: <FilePenLine className="h-6 w-6 text-primary" />,
    change: "-1 this week",
  },
  {
    title: "Total Representatives",
    value: "8",
    icon: <Users className="h-6 w-6 text-primary" />,
    change: "+2 this month",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="space-y-8">
            <UpcomingFairs />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4 text-sm">
                      <div className="min-w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <FilePenLine className="h-5 w-5" />
                      </div>
                      <div>
                        <p>Registration confirmed for <strong>International Education Expo</strong></p>
                        <p className="text-muted-foreground">2 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 text-sm">
                      <div className="min-w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <School className="h-5 w-5" />
                      </div>
                      <div>
                        <p>Added new school <strong>Westlake Academy</strong></p>
                        <p className="text-muted-foreground">5 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 text-sm">
                      <div className="min-w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CalendarCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <p>Applied for <strong>STEM Education Summit</strong></p>
                        <p className="text-muted-foreground">1 week ago</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Schools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-primary" />
                        <span>Springfield High School</span>
                      </div>
                      <span className="text-sm text-muted-foreground">3 reps</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-primary" />
                        <span>Central Academy</span>
                      </div>
                      <span className="text-sm text-muted-foreground">2 reps</span>
                    </li>
                    <li className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-primary" />
                        <span>Westview College</span>
                      </div>
                      <span className="text-sm text-muted-foreground">3 reps</span>
                    </li>
                    <li className="border-t pt-2 mt-2">
                      <button className="text-primary hover:underline text-sm w-full text-center">
                        + Add School
                      </button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
