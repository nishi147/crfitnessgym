import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Calendar, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { enquiryService } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface EnquiryData {
  _id?: string;
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  status: "New" | "Contacted" | "Resolved";
}

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState<EnquiryData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await enquiryService.getAll();
      setEnquiries(response.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: string, status: "Contacted" | "Resolved") => {
    try {
      await enquiryService.update(id, { status });
      toast.success(`Enquiry marked as ${status}`);
      fetchEnquiries();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await enquiryService.delete(id);
      toast.info("Enquiry deleted.");
      fetchEnquiries();
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading mb-2">Recent Enquiries</h1>
        <p className="text-muted-foreground">Manage messages sent from the Contact Us form.</p>
      </div>

      <div className="grid gap-4">
        {enquiries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground glass rounded-xl">
            No enquiries found. New messages from the website will appear here.
          </div>
        ) : (
          enquiries.map((e) => (
            <Card key={e._id || e.id} className="bg-gradient-dark border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 md:flex gap-6 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <h3 className="text-xl font-heading text-foreground flex items-center gap-2">
                        {e.name}
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          e.status === 'New' ? 'bg-green-500/20 text-green-500' :
                          e.status === 'Contacted' ? 'bg-orange-500/20 text-orange-500' :
                          'bg-blue-500/20 text-blue-500'
                        }`}>
                          {e.status}
                        </span>
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground gap-1">
                        <Calendar className="w-4 h-4" /> {e.date}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        <a href={`mailto:${e.email}`} className="hover:text-primary transition-colors">{e.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        <a href={`tel:${e.phone?.replace(/[^0-9+]/g, '')}`} className="hover:text-primary transition-colors">{e.phone}</a>
                      </div>
                    </div>

                    <div className="glass p-4 rounded-lg text-sm text-muted-foreground mt-2 border-l-2 border-l-primary break-words">
                      <p className="italic text-foreground/80">"{e.message}"</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:w-48 flex flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                    <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">Actions</p>
                    <button onClick={() => updateStatus((e._id || e.id) as string, 'Contacted')} className="text-left text-sm py-2 px-3 rounded hover:bg-orange-500/10 hover:text-orange-500 transition-colors">Mark Contacted</button>
                    <button onClick={() => updateStatus((e._id || e.id) as string, 'Resolved')} className="text-left text-sm py-2 px-3 rounded hover:bg-blue-500/10 hover:text-blue-500 transition-colors">Mark Resolved</button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-left text-sm py-2 px-3 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors mt-auto flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-card border-border text-foreground">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Enquiry?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete this message? This action cannot be reversed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-transparent border-border text-foreground hover:bg-secondary">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete((e._id || e.id) as string)}>Delete Message</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Enquiries;
