import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bpbcjzpxvqnemahyammv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwYmNqenB4dnFuZW1haHlhbW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3OTg2OTAsImV4cCI6MjA2NzM3NDY5MH0.rW9R6ZAiPaRSzf25WLXOPkPrCb4On_HWiIFIQr0saPM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
