import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hnaaksrircfeohsmpdea.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuYWFrc3JpcmNmZW9oc21wZGVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNTU0MzcsImV4cCI6MjAyODgzMTQzN30.7e9TNINr2Kuvi04qM7VaAflTkapqFLOR19tP2uVClTQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
