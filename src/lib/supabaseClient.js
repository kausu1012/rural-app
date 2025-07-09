import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpbiceygznociogyxfdm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYmljZXlnem5vY2lvZ3l4ZmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2ODcwMTMsImV4cCI6MjA2NjI2MzAxM30.7A93OFU_xvlZAqDccffJiZEDaRUai5E2gWf3_uyIPiE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);