import { useState } from "react";
import { ArrowRight, X, Video, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase, type TablesInsert } from "@/lib/supabase";
import { triggerCvScoring } from "@/lib/cv-scoring";

const PROFESSIONS = [
  "Customer Success Manager",
  "Virtual Assistant",
  "Data Entry Specialist",
  "Bookkeeper / Accountant",
  "Software Developer",
  "Graphic Designer",
  "Content Writer",
  "Digital Marketing Specialist",
  "Project Manager",
  "HR / Recruiter",
  "Sales Representative",
  "Others",
];

interface TalentApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  profession: "",
  profession_other: "",
  years_experience: "",
  skills: "",          // comma-separated → stored as array
  languages: "",       // comma-separated → stored as array
  loom_video_url: "",
  terms_accepted: false,
};

const TalentApplicationDialog = ({
  open,
  onOpenChange,
}: TalentApplicationDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const [cvFile, setCvFile] = useState<File | null>(null);

  const set = (field: keyof typeof INITIAL_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.terms_accepted) {
      toast({
        title: "Please accept the Terms & Conditions",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // ── Upload CV if provided ──────────────────────────────────────────
      let cv_storage_path: string | null = null;
      if (cvFile) {
        const path = `${crypto.randomUUID()}/${cvFile.name}`;
        const { data: uploadData, error: uploadError } =
          await supabase.storage
            .from("talent-cvs")
            .upload(path, cvFile, { upsert: false });
        if (uploadError) {
          toast({
            title: "CV upload failed",
            description: uploadError.message,
            variant: "destructive",
          });
          return;
        }
        cv_storage_path = uploadData.path;
      }

      // ── Build insert payload ───────────────────────────────────────────
      // Generate the UUID client-side so we have the id without needing
      // a SELECT round-trip (which would require a SELECT RLS policy for anon).
      const newApplicationId = crypto.randomUUID();
      const payload: TablesInsert<"talent_applications"> = {
        id: newApplicationId,
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        country: form.country.trim(),
        city: form.city.trim() || null,
        role_applied_for: form.profession === "Others" 
          ? form.profession_other.trim() 
          : form.profession,
        years_experience: form.years_experience
          ? Number.isNaN(parseInt(form.years_experience, 10))
            ? null
            : parseInt(form.years_experience, 10)
          : null,
        skills: form.skills
          ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : null,
        languages: form.languages
          ? form.languages.split(",").map((l) => l.trim()).filter(Boolean)
          : null,
        loom_video_url: form.loom_video_url.trim() || null,
        cv_storage_path,
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
      };

      // ── Insert with 20-second timeout ──────────────────────────────────
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const { error } = await supabase
        .from("talent_applications")
        .insert(payload)
        .abortSignal(controller.signal);

      clearTimeout(timeoutId);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Application already received",
            description:
              "We already have an active application for this email address.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Submission failed",
            description: error.message || "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Application submitted!",
        description:
          "Thank you for applying. We'll be in touch once we've reviewed your profile.",
      });

      // Trigger AI CV scoring in the background (non-blocking).
      // The score is stored in the DB and visible to admins.
      // TODO: premium gate — reveal cv_score to applicant post-payment (Phase 2)
      triggerCvScoring(newApplicationId);
      setForm(INITIAL_FORM);
      setCvFile(null);
      onOpenChange(false);
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      toast({
        title: isTimeout ? "Request timed out" : "Submission failed",
        description: isTimeout
          ? "The server took too long to respond. Please try again."
          : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            Join Our Talent Pool
          </DialogTitle>
          <DialogDescription>
            Fill in your details below. Even if not placed immediately, you
            remain in our active pool until matched with a client.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-5">
          {/* Row 1 — Name + Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="full_name" className="text-sm font-medium text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="full_name"
                className="mt-1.5"
                placeholder="Jane Doe"
                value={form.full_name}
                onChange={set("full_name")}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Email Address <span className="text-destructive">*</span>
              </label>
              <Input
                className="mt-1.5"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={set("email")}
                required
              />
            </div>
          </div>

          {/* Row 2 — Phone + Country */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                Phone Number (Preferably your WhatsApp number) <span className="text-destructive">*</span>
              </label>
              <Input
                className="mt-1.5"
                placeholder="+254 700 000 000"
                value={form.phone}
                onChange={set("phone")}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Country <span className="text-destructive">*</span>
              </label>
              <Input
                className="mt-1.5"
                placeholder="Kenya"
                value={form.country}
                onChange={set("country")}
                required
              />
            </div>
          </div>

          {/* Row 3 — City + Profession */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                City
              </label>
              <Input
                className="mt-1.5"
                placeholder="Nairobi"
                value={form.city}
                onChange={set("city")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Profession <span className="text-destructive">*</span>
              </label>
              <Select
                value={form.profession}
                onValueChange={(value) => setForm((prev) => ({ ...prev, profession: value }))}
                required
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your profession" />
                </SelectTrigger>
                <SelectContent>
                  {PROFESSIONS.map((prof) => (
                    <SelectItem key={prof} value={prof}>
                      {prof}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Profession Other - shown when Others is selected */}
          {form.profession === "Others" && (
            <div>
              <label className="text-sm font-medium text-foreground">
                Please specify your profession <span className="text-destructive">*</span>
              </label>
              <Input
                className="mt-1.5"
                placeholder="Enter your profession"
                value={form.profession_other}
                onChange={set("profession_other")}
                required
              />
            </div>
          )}

          {/* Row 4 — Experience + Languages */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                Years of Experience <span className="text-destructive">*</span>
              </label>
              <Input
                className="mt-1.5"
                type="number"
                min={0}
                max={50}
                placeholder="3"
                value={form.years_experience}
                onChange={set("years_experience")}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Languages Spoken <span className="text-destructive">*</span>
              </label>
              <Input
                className="mt-1.5"
                placeholder="English, French, Swahili"
                value={form.languages}
                onChange={set("languages")}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Separate with commas
              </p>
            </div>
          </div>

          {/* Row 5 — Skills */}
          <div>
            <label className="text-sm font-medium text-foreground">
              Key Skills <span className="text-destructive">*</span>
            </label>
            <Input
              className="mt-1.5"
              placeholder="CRM, Data Entry, Bookkeeping, Python"
              value={form.skills}
              onChange={set("skills")}
              required
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Separate with commas
            </p>
          </div>

          {/* Row 6 — CV Upload */}
          <div>
            <label htmlFor="cv_file" className="text-sm font-medium text-foreground">
              Upload CV / Résumé
            </label>
            <input
              id="cv_file"
              type="file"
              accept=".pdf,.doc,.docx"
              className="mt-1.5 block w-full cursor-pointer text-sm text-muted-foreground
                file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-4
                file:py-2 file:text-sm file:font-medium file:text-primary-foreground
                hover:file:bg-primary/90"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              PDF, DOC, or DOCX — max 5 MB
            </p>
          </div>

          {/* Row 7 — Loom Video */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Loom Video Introduction URL <span className="text-destructive">*</span>
            </label>
            
            {/* Loom Instructions Card */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Video className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">How to record your Loom video:</p>
                  <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
                    <li>Go to <a href="https://www.loom.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">loom.com <ExternalLink className="h-3 w-3" /></a> and create a free account</li>
                    <li>Click "New Video" → Select "Camera Only" (face-only recording)</li>
                    <li>Record a 1-2 minute introduction about yourself, your experience, and why you want to join</li>
                    <li>After recording, click "Share" and copy the link</li>
                    <li>Paste the link in the field below</li>
                  </ol>
                  <p className="text-xs text-muted-foreground italic">
                    Tip: Speak clearly, look at the camera, and keep it professional but friendly!
                  </p>
                </div>
              </div>
            </div>

            <Input
              className="mt-1.5"
              type="url"
              placeholder="https://www.loom.com/share/..."
              value={form.loom_video_url}
              onChange={set("loom_video_url")}
              required
            />
          </div>

          {/* T&Cs */}
          <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
            <Checkbox
              id="terms"
              checked={form.terms_accepted}
              onCheckedChange={(checked) =>
                setForm((prev) => ({
                  ...prev,
                  terms_accepted: checked === true,
                }))
              }
              className="mt-0.5"
            />
            <label
              htmlFor="terms"
              className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
            >
              I agree to the{" "}
              <span className="font-medium text-foreground">
                Terms & Conditions
              </span>{" "}
              and consent to E-Africa Services storing my information for
              recruitment purposes. I understand I may be contacted regarding
              remote work placement opportunities.{" "}
              <span className="text-destructive">*</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="brand"
              disabled={isSubmitting}
              className="group"
            >
              {isSubmitting ? "Submitting…" : "Submit Application"}
              {!isSubmitting && (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TalentApplicationDialog;
