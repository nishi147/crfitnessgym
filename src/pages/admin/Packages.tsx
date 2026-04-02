import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Plus, X, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { packageService } from "@/services/api";
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

export interface PackagePlan {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular: boolean;
}

const Packages = () => {
  const [packages, setPackages] = useState<PackagePlan[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PackagePlan>>({});
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await packageService.getAll();
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddNew = () => {
    setIsEditing("new");
    setFormData({ popular: false, features: [], period: "total" });
  };

  const handleEdit = (pkg: PackagePlan) => {
    setIsEditing(pkg._id || pkg.id || null);
    setFormData({ ...pkg });
  };

  const handleDelete = async (id: string) => {
    try {
      await packageService.delete(id);
      toast.success("Package deleted successfully");
      fetchPackages();
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.period) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      if (isEditing === "new") {
        await packageService.create(formData);
        toast.success("Package created successfully");
      } else if (isEditing) {
        await packageService.update(isEditing, formData);
        toast.success("Package updated successfully");
      }
      setIsEditing(null);
      fetchPackages();
    } catch (error) {
      toast.error("Failed to save package");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading mb-2">Manage Packages</h1>
          <p className="text-muted-foreground">Changes here reflect immediately on the live website.</p>
        </div>
        {!isEditing && (
          <Button onClick={handleAddNew} variant="hero" className="gap-2">
            <Plus className="w-4 h-4" /> Add Package
          </Button>
        )}
      </div>

      {isEditing ? (
        <Card className="bg-gradient-dark border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-heading mb-4">{isEditing === "new" ? "New Package" : "Edit Package"}</h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Package Name *</label>
                <input required type="text" value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 glass rounded p-3 bg-transparent border-border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Price (₹) *</label>
                <input required type="number" value={formData.price || ""} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="w-full mt-1 glass rounded p-3 bg-transparent border-border" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Billing Period *</label>
                <input required type="text" value={formData.period || ""} onChange={(e) => setFormData({...formData, period: e.target.value})} placeholder="e.g. total, per month" className="w-full mt-1 glass rounded p-3 bg-transparent border-border" />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" id="popular" checked={formData.popular || false} onChange={(e) => setFormData({...formData, popular: e.target.checked})} className="w-5 h-5 accent-primary" />
                <label htmlFor="popular" className="text-sm">Mark as "Most Popular"</label>
              </div>
            </div>

            <div className="pt-4">
              <label className="text-sm text-muted-foreground mb-2 block">Features Included</label>
              <div className="flex gap-2 mb-3">
                <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="e.g. 24/7 Access" className="flex-1 glass rounded p-3 bg-transparent border-border" />
                <Button type="button" onClick={addFeature} variant="outline" className="shrink-0 h-auto">Add</Button>
              </div>
              <ul className="space-y-2">
                {formData.features?.map((f, idx) => (
                  <li key={idx} className="flex justify-between items-center glass p-3 rounded text-sm">
                    {f}
                    <button type="button" onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-6">
              <Button type="submit" variant="hero">Save Package</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(null)}>Cancel</Button>
            </div>
          </form>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg._id || pkg.id} className={`bg-gradient-dark border-border ${pkg.popular ? 'ring-2 ring-primary border-transparent' : ''}`}>
              <CardContent className="p-6 relative">
                {pkg.popular && <span className="absolute top-0 right-4 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">Popular</span>}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-heading">{pkg.name}</h3>
                    <p className="text-2xl font-bold mt-1">₹{pkg.price} <span className="text-sm font-normal text-muted-foreground">/ {pkg.period}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(pkg)} className="w-8 h-8 rounded glass flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="w-8 h-8 rounded glass flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-card border-border text-foreground">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Package?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this package? This action cannot be undone and will remove it from the live website immediately.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-transparent border-border text-foreground hover:bg-secondary">Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete((pkg._id || pkg.id) as string)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">Features ({pkg.features.length})</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {pkg.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                    {pkg.features.length > 3 && <li>+{pkg.features.length - 3} more</li>}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
          {packages.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground glass rounded-xl">
              No packages found. Create your first pricing plan.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Packages;
