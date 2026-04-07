import { useState } from "react";
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
    service: "",
    industry: "",
    budget: "",
    description: "",
  });
  const [showNote, setShowNote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thank you. We'll be in touch within two working days.",
    });
    setFormData({ name: "", email: "", company: "", service: "", industry: "", budget: "", description: "" });
    setShowNote(false);
  };

  return (
    <main className="pt-32 md:pt-44 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl animate-fade-up">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">CONTACT</p>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Conversational form layout inspired by reference */}
            <div className="space-y-10">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4 text-2xl md:text-3xl font-light tracking-tight">
                <span>Hello, my name is</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  maxLength={100}
                  placeholder="Your Name"
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none text-foreground placeholder:text-muted-foreground/40 pb-1 min-w-[160px] flex-shrink transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4 text-2xl md:text-3xl font-light tracking-tight">
                <span>and my email is</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  required
                  maxLength={255}
                  placeholder="Email Address"
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none text-foreground placeholder:text-muted-foreground/40 pb-1 min-w-[200px] flex-shrink transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4 text-2xl md:text-3xl font-light tracking-tight">
                <span>I represent</span>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                  maxLength={100}
                  placeholder="Company"
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none text-foreground placeholder:text-muted-foreground/40 pb-1 min-w-[140px] flex-shrink transition-colors"
                />
                <span>.</span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4 text-2xl md:text-3xl font-light tracking-tight">
                <span>We are looking for</span>
                <div className="inline-block min-w-[180px]">
                  <Select onValueChange={(v) => setFormData((p) => ({ ...p, service: v }))}>
                    <SelectTrigger className="bg-transparent border-0 border-b border-foreground/20 rounded-none text-2xl md:text-3xl font-light h-auto p-0 pb-1 focus:ring-0 focus:border-foreground/60 [&>svg]:text-muted-foreground">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brand">Brand Design</SelectItem>
                      <SelectItem value="web-design">Web Design</SelectItem>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="full">Full Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4 text-2xl md:text-3xl font-light tracking-tight">
                <span>within the</span>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData((p) => ({ ...p, industry: e.target.value }))}
                  maxLength={100}
                  placeholder="Industry"
                  className="bg-transparent border-b border-foreground/20 focus:border-foreground/60 outline-none text-foreground placeholder:text-muted-foreground/40 pb-1 min-w-[120px] flex-shrink transition-colors"
                />
                <span>sector.</span>
              </div>
            </div>

            {/* Budget */}
            <div>
              <p className="text-2xl md:text-3xl font-light tracking-tight mb-8">Our budget is around</p>
              <div className="space-y-4">
                <Select onValueChange={(v) => setFormData((p) => ({ ...p, budget: v }))}>
                  <SelectTrigger className="bg-transparent border border-border rounded-none text-sm tracking-wide h-12 focus:ring-0 focus:border-foreground/40 max-w-sm">
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

            {/* Add a note toggle */}
            {!showNote ? (
              <button
                type="button"
                onClick={() => setShowNote(true)}
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-opacity"
              >
                + Add a note
              </button>
            ) : (
              <div className="space-y-3">
                <Label htmlFor="description" className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  Project notes
                </Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  maxLength={2000}
                  placeholder="Tell us about your project, goals, and timeline."
                  className="bg-transparent border border-border rounded-none resize-none focus:border-foreground/40 focus-visible:ring-0"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-foreground text-background px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors"
            >
              Send inquiry
            </button>
          </form>
        </div>

        {/* Side info */}
        <div className="mt-28 pt-16 border-t border-border grid md:grid-cols-3 gap-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Email</p>
            <a
              href="mailto:hello@pendolo.studio"
              className="text-sm text-foreground/70 hover:text-foreground transition-opacity"
            >
              hello@pendolo.studio
            </a>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Based in</p>
            <p className="text-sm text-muted-foreground">United Kingdom · Italy</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Languages</p>
            <p className="text-sm text-muted-foreground">English · Italian · Spanish</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
