import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you. We'll be in touch within two working days.",
    });
    setFormData({ name: "", email: "", company: "", budget: "", description: "" });
  };

  return (
    <main className="pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-7 animate-fade-up">
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">Contact</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Tell us about
              <br />
              <span className="font-editorial italic font-normal">your project.</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-12 max-w-lg">
              Share a few details and we'll get back to you within two working days. No obligation, no pressure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    required
                    maxLength={255}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm">Budget range</Label>
                  <Select onValueChange={(v) => setFormData((p) => ({ ...p, budget: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<5k">Under £5,000</SelectItem>
                      <SelectItem value="5-10k">£5,000 – £10,000</SelectItem>
                      <SelectItem value="10-25k">£10,000 – £25,000</SelectItem>
                      <SelectItem value="25k+">£25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">Project description *</Label>
                <Textarea
                  id="description"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  required
                  maxLength={2000}
                  placeholder="Tell us about your project, goals, and timeline."
                />
              </div>

              <Button type="submit" size="lg" className="mt-2">
                Send message
              </Button>
            </form>
          </div>

          <div className="md:col-span-5 md:pt-32">
            <div className="space-y-10">
              <div>
                <p className="text-sm font-medium tracking-wide uppercase mb-2">Email</p>
                <a
                  href="mailto:hello@pendolo.studio"
                  className="text-foreground hover:text-accent transition-colors text-sm"
                >
                  hello@pendolo.studio
                </a>
              </div>

              <div>
                <p className="text-sm font-medium tracking-wide uppercase mb-2">Based in</p>
                <p className="text-sm text-muted-foreground">United Kingdom · Italy</p>
              </div>

              <div>
                <p className="text-sm font-medium tracking-wide uppercase mb-2">Languages</p>
                <p className="text-sm text-muted-foreground">English · Italian · Spanish</p>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We respond to every enquiry personally. No auto-replies, no sales funnels. Just a conversation about whether we're the right fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
