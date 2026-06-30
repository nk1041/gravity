import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xejgavnzizywedrdwpng.supabase.co';
const supabaseKey = 'sb_publishable_w4YfpM-iMyB6fgRUrqM-1A_SibxRJT7'; // Modern publishable key

export const supabase = createClient(supabaseUrl, supabaseKey);
