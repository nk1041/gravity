import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ldyrfftdsaujugvunsob.supabase.co';
const supabaseKey = 'sb_publishable_kOtzLDpbMcTrME_OSeOfOg_FyaZE1aN'; // Modern publishable key

export const supabase = createClient(supabaseUrl, supabaseKey);
