import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2';
import OpenAI from 'npm:openai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    const { type, formData } = await req.json();

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    let prompt = '';
    if (type === 'iep') {
      prompt = `Act as an expert special educator. Draft a formal IEP from these goals and observations: ${JSON.stringify(formData)}`;
    } else if (type === 'itp') {
      prompt = `Act as an expert special educator. Draft a formal Individualized Transition Plan (ITP) from these goals and observations: ${JSON.stringify(formData)}`;
    } else if (type === 'lesson_plan') {
      prompt = `Act as an expert special educator. Create a structured lesson plan from this criteria: ${JSON.stringify(formData)}`;
    } else {
      prompt = `Act as an expert special educator. Create a professional document based on this: ${JSON.stringify(formData)}`;
    }

    let generatedContent = '';
    if (!Deno.env.get('OPENAI_API_KEY')) {
       generatedContent = `[MOCK GENERATED ${type.toUpperCase()}]\n\nBased on your inputs:\n${JSON.stringify(formData, null, 2)}\n\n(Please set OPENAI_API_KEY in your Supabase project dashboard to enable real AI generation).`;
    } else {
       const completion = await openai.chat.completions.create({
         messages: [{ role: 'user', content: prompt }],
         model: 'gpt-4o-mini',
       });
       generatedContent = completion.choices[0].message.content || '';
    }

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
