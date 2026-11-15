import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const PRICE = 400; // Rs per book. The price is decided here on the server, never by the browser.
const IDS = ["b1", "b2", "b3", "b4", "b5", "b6", "b7"];
const digits = (s: unknown) => String(s || "").replace(/\D/g, "");
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const b = await req.json();
    const items = [...new Set((b.items || []).filter((i: string) => IDS.includes(i)))];
    const name = String(b.name || "").trim().slice(0, 100);
    if (!items.length || !name || digits(b.whatsapp).length < 10) return json({ error: "invalid" }, 400);
    const ref = "NUH-" + crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
    const { error } = await sb.from("orders").insert({
      ref, name, whatsapp: String(b.whatsapp).slice(0, 30), email: String(b.email || "").slice(0, 120),
      country: String(b.country || "").slice(0, 60), method: String(b.method || "").slice(0, 30),
      items, total: items.length * PRICE,
    });
    if (error) throw error;
    return json({ ref, total: items.length * PRICE });
  } catch (_e) {
    return json({ error: "server" }, 500);
  }
});
