import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ldyrfftdsaujugvunsob.supabase.co'
const supabaseAnonKey = 'sb_publishable_kOtzLDpbMcTrME_OSeOfOg_FyaZE1aN'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
