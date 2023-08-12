import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://pryognxulvntjaoeghoc.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeW9nbnh1bHZudGphb2VnaG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE3MzkzODIsImV4cCI6MjAwNzMxNTM4Mn0.BlwoiV7HcZ8YELuGOjlHtYSsLzTSN_DRhmBgHB8XnaU';
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;
