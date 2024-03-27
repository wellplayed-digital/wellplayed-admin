import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()

export const supabase = createClient(config.public.supabase.url, config.public.supabase.key)
