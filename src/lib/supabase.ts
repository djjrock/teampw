import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnnallxwkgptopnneeax.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubmFsbHh3a2dwdG9wbm5lZWF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MTY0NjYsImV4cCI6MjA0ODA5MjQ2Nn0.ufhKFdYX-4SPljcaq8hri_hxlDmKfhpDXhA4-_-xK9U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);