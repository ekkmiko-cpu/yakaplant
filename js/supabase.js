/**
 * YakaPlant Supabase Client
 * Initializes and exports the Supabase client
 */

const SUPABASE_URL = 'https://vvpphgjgukfldlsgfjlv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2cHBoZ2pndWtmbGRsc2dmamx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMjYwMTgsImV4cCI6MjA4NTgwMjAxOH0.6vQeLJudiPZi7wKvfjymVQVB5XkTlZ776I0Zr6GrcEA';

// Initialize the Supabase client
// CDN exports: window.supabase.createClient
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other modules
window.YakaSupabase = supabaseClient;
