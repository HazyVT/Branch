import { createClient } from "@supabase/supabase-js";

export const supabase = createClient('https://uybacwgvozpepdtwekyu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5YmFjd2d2b3pwZXBkdHdla3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2NDg0MzYsImV4cCI6MjAxMzIyNDQzNn0.8JemoRHIIoxl6jhskP8oquX5O8lmxdIRr3ACvdr9mKI');

const rand = Math.floor(Math.random() * 100000).toString();

export const channel = supabase.channel(rand, {
  config: {
    broadcast: {
      self: true
    }
  }
})