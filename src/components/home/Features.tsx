
import { CalendarCheck, GraduationCap, Globe, UserCheck, BarChart, Clock } from "lucide-react";

const features = [
  {
    icon: <CalendarCheck className="h-10 w-10 text-primary" />,
    title: "Easy Registration",
    description:
      "Streamlined process for registering your schools for upcoming education fairs.",
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: "School Management",
    description:
      "Manage multiple schools and their representatives from a single dashboard.",
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global Opportunities",
    description:
      "Access to education fairs worldwide with detailed information about each event.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: "Attendance Tracking",
    description:
      "Track which fairs your schools are registered for and manage attendees.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Performance Analytics",
    description:
      "Detailed insights on fair performance and student engagement metrics.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Reminder System",
    description:
      "Never miss a registration deadline with our automated reminder system.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Tools for School Representatives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage your schools' participation in education fairs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
