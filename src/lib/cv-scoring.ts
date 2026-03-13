import { supabase } from "@/lib/supabase";

/**
 * Triggers AI CV parsing and scoring for the given application.
 * This is intentionally fire-and-forget — scoring failure must NEVER
 * block or affect the applicant's submission experience.
 *
 * The Edge Function will update `talent_applications.cv_score_status`
 * from 'pending' → 'processing' → 'completed' | 'failed' | 'no_cv'.
 *
 * @param applicationId  UUID of the newly inserted talent_applications row
 */
export function triggerCvScoring(applicationId: string): void {
  // TODO: premium gate — expose cv_score to applicant post-payment (Phase 2)

  console.log(
    "[cv-scoring] Triggering scoring for application:",
    applicationId,
  );

  supabase.functions
    .invoke("parse-and-score-cv", {
      body: { application_id: applicationId },
    })
    .then(({ data, error }) => {
      if (error) {
        console.error("[cv-scoring] Edge Function error:", error.message);
      } else {
        console.log("[cv-scoring] Scoring started successfully:", data);
      }
    })
    .catch((err) => {
      console.error("[cv-scoring] Network error calling Edge Function:", err);
    });
}
