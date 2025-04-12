import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://nsivdsiconlkdwiijggi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaXZkc2ljb25sa2R3aWlqZ2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzOTQ0NTUsImV4cCI6MjA1OTk3MDQ1NX0.NzaRpdwAd5-IHMYda1Jf9wBHZVBT-dRFmR03TBI7-r0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
