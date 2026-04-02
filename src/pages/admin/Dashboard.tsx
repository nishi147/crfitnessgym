import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Activity, Loader2 } from "lucide-react";
import { packageService, enquiryService } from "@/services/api";

const Dashboard = () => {
  const [packagesCount, setPackagesCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [pkgs, enqs] = await Promise.all([
          packageService.getAll(),
          enquiryService.getAll()
        ]);
        setPackagesCount(pkgs.data.length);
        setEnquiriesCount(enqs.data.length);
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening at CR Fitness.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-dark border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Packages</CardTitle>
            <Activity className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-heading text-white">{packagesCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Managed dynamically</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-dark border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">New Enquiries</CardTitle>
            <Mail className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-heading text-white">{enquiriesCount}</div>
            <p className="text-xs text-green-500 mt-1">From website contact form</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
