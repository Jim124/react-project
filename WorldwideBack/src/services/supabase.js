import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://gcsyhhcypeisrajkyshr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdjc3loaGN5cGVpc3Jhamt5c2hyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTQ3MDg0NiwiZXhwIjoyMDM1MDQ2ODQ2fQ.5fG3iqmSmAq0PrxcmY6lmnRMnpfFoDJXmiwZfsZBrWM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
