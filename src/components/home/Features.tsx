
import { CalendarCheck, GraduationCap, Globe, UserCheck, BarChart, Clock } from "lucide-react";

const features = [
  {
    icon: <CalendarCheck className="h-10 w-10 text-primary" />,
    title: "Seamless Registration",
    description: "Intuitive process for registering your schools with minimal effort.",
    color: "bg-primary/10 dark:bg-primary/20"
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "Comprehensive Management",
    description: "Effortlessly manage multiple schools and their representatives.",
    color: "bg-primary/10 dark:bg-primary/20"
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global Reach",
    description: "Access to worldwide education fairs with detailed event insights.",
    color: "bg-primary/10 dark:bg-primary/20"
  },
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: "Advanced Tracking",
    description: "Real-time tracking of fair registrations and attendee management.",
    color: "bg-primary/10 dark:bg-primary/20"
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Performance Insights",
    description: "Deep analytics on fair performance and student engagement.",
    color: "bg-primary/10 dark:bg-primary/20"
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Smart Reminders",
    description: "Automated notifications to keep you informed and prepared.",
    color: "bg-primary/10 dark:bg-primary/20"
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Powerful Tools for School Representatives
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive suite of tools designed to streamline your education fair management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 ${feature.color}`}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
