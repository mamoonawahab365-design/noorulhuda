import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const TITLES: Record<string, string> = {
  b1: "Let’s Learn Arabic", b2: "Arabic Letter Shapes & Activities", b3: "Letter Shapes - Alif to Yaa",
  b4: "Arabic Harakat & Activities", b5: "Arabic Letters with Short Harakat", b6: "Arabic Letter Learners", b7: "Arabic Letters Made Easy",
};
const digits = (s: unknown) => String(s || "").replace(/\D/g, "").slice(-10);
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const { ref, whatsapp, item } = await req.json();
    const { data: o } = await sb.from("orders").select("*").eq("ref", String(ref || "").trim().toUpperCase()).maybeSingle();
    // order number AND the WhatsApp number must both match
    if (!o || digits(whatsapp).length < 10 || digits(o.whatsapp) !== digits(whatsapp)) return json({ status: "notfound" }, 404);
    if (o.status !== "paid") return json({ status: o.status });           // pending / cancelled
    if (o.expires_at && new Date(o.expires_at) < new Date()) return json({ status: "expired" });
    if (!item) {
      return json({ status: "paid", left: o.max_downloads - o.downloads_used, expires: o.expires_at,
        items: o.items.map((id: string) => ({ id, title: TITLES[id] || id })) });
    }
    if (!o.items.includes(item)) return json({ status: "notfound" }, 404);
    if (o.downloads_used >= o.max_downloads) return json({ status: "limit" });
    // short-lived (2 minute) link to the private PDF
    const { data, error } = await sb.storage.from("books").createSignedUrl(`${item}.pdf`, 120, { download: `${TITLES[item] || item}.pdf` });
    if (error) throw error;
    await sb.from("orders").update({ downloads_used: o.downloads_used + 1 }).eq("id", o.id);
    return json({ status: "paid", url: data.signedUrl });
  } catch (_e) {
    return json({ status: "error" }, 500);
  }
});
