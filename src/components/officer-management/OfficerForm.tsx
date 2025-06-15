
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { KENYA_POLICE_RANKS, PoliceRank } from "@/utils/policeRanks";

interface Officer {
  id: string;
  badge_number: string;
  full_name: string;
  rank: PoliceRank;
  station_id: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  date_joined: string;
  created_at: string;
  station?: {
    name: string;
    county: string;
  };
}

const officerSchema = z.object({
  badge_number: z.string().min(1, "Badge number is required"),
  full_name: z.string().min(1, "Full name is required"),
  rank: z.enum([...KENYA_POLICE_RANKS]),
  station_id: z.string().min(1, "Station is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  status: z.enum(['active', 'inactive', 'suspended']),
});

type OfficerFormData = z.infer<typeof officerSchema>;

interface OfficerFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingOfficer: Officer | null;
  stations: any[];
  onSubmit: (data: OfficerFormData) => void;
  onReset: () => void;
}

export const OfficerForm = ({ 
  isOpen, 
  onOpenChange, 
  editingOfficer, 
  stations, 
  onSubmit,
  onReset 
}: OfficerFormProps) => {
  const form = useForm<OfficerFormData>({
    resolver: zodResolver(officerSchema),
    defaultValues: {
      badge_number: editingOfficer?.badge_number || "",
      full_name: editingOfficer?.full_name || "",
      rank: editingOfficer?.rank || "Constable",
      station_id: editingOfficer?.station_id || "",
      phone: editingOfficer?.phone || "",
      email: editingOfficer?.email || "",
      status: editingOfficer?.status || "active",
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onReset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onReset}>
          <Plus className="h-4 w-4 mr-2" />
          Add Officer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingOfficer ? 'Edit Officer' : 'Add New Officer'}</DialogTitle>
          <DialogDescription>
            {editingOfficer ? 'Update officer information' : 'Add a new officer to the system'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="badge_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Badge Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rank</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {KENYA_POLICE_RANKS.map((rank) => (
                        <SelectItem key={rank} value={rank}>
                          {rank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="station_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Station</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.id} value={station.id}>
                          {station.name} - {station.county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {editingOfficer ? 'Update Officer' : 'Add Officer'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
