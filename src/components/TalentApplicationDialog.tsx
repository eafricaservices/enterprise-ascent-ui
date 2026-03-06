import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { supabase, type TablesInsert } from "@/lib/supabase";

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
  role_applied_for: "",
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
      const payload: TablesInsert<"talent_applications"> = {
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        country: form.country.trim(),
        city: form.city.trim() || null,
        role_applied_for: form.role_applied_for.trim(),
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
                Phone Number
              </label>
              <Input
                className="mt-1.5"
                placeholder="+254 700 000 000"
                value={form.phone}
                onChange={set("phone")}
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

          {/* Row 3 — City + Role */}
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
                Role Applying For <span className="text-destructive">*</span>
              </label>
              <Input
                className="mt-1.5"
                placeholder="Customer Success Manager"
                value={form.role_applied_for}
                onChange={set("role_applied_for")}
                required
              />
            </div>
          </div>

          {/* Row 4 — Experience + Languages */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                Years of Experience
              </label>
              <Input
                className="mt-1.5"
                type="number"
                min={0}
                max={50}
                placeholder="3"
                value={form.years_experience}
                onChange={set("years_experience")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Languages Spoken
              </label>
              <Input
                className="mt-1.5"
                placeholder="English, French, Swahili"
                value={form.languages}
                onChange={set("languages")}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Separate with commas
              </p>
            </div>
          </div>

          {/* Row 5 — Skills */}
          <div>
            <label className="text-sm font-medium text-foreground">
              Key Skills
            </label>
            <Input
              className="mt-1.5"
              placeholder="CRM, Data Entry, Bookkeeping, Python"
              value={form.skills}
              onChange={set("skills")}
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
          <div>
            <label className="text-sm font-medium text-foreground">
              Loom Video Introduction URL
            </label>
            <Input
              className="mt-1.5"
              type="url"
              placeholder="https://www.loom.com/share/..."
              value={form.loom_video_url}
              onChange={set("loom_video_url")}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Record a short face-only introduction at{" "}
              <a
                href="https://www.loom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                loom.com
              </a>{" "}
              and paste the share link here.
            </p>
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
