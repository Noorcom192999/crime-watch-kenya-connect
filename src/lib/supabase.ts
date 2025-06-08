
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mjmmomhvppfsnxbzamnh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qbW1vbWh2cHBmc254YnphbW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzODcxMzksImV4cCI6MjA2NDk2MzEzOX0.4BYoVJfziPmLWCAPKtS0QxgY5sbgTGx0JUyxJW4zGC4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
