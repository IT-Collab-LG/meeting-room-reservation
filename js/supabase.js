const SUPABASE_URL =
    "https://ykgoxiheuloqzgqpgfle.supabase.co";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZ294aWhldWxvcXpncXBnZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxODE5NzYsImV4cCI6MjEwODc1Nzk3Nn0.W9Vyt3PfvLrXM65b1yLRVdACfCpsjoo09Gy8Yl1EE8k";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );