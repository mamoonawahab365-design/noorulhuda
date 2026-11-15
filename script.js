const CFG={price:400,was:500,cur:"Rs ",api:"",wa:"923048648741",payTo:"Mamoona Rafiqe",phone:"03048648741",
methods:[{n:"JazzCash",no:"03048648741"}]};
const IMG={
 "b1": {
  "cover": "images/b1-cover.jpg",
  "prev": [
   "images/b1-page1.jpg",
   "images/b1-page2.jpg",
   "images/b1-page3.jpg"
  ]
 },
 "b2": {
  "cover": "images/b2-cover.jpg",
  "prev": [
   "images/b2-page1.jpg",
   "images/b2-page2.jpg",
   "images/b2-page3.jpg"
  ]
 },
 "b3": {
  "cover": "images/b3-cover.jpg",
  "prev": [
   "images/b3-page1.jpg",
   "images/b3-page2.jpg",
   "images/b3-page3.jpg"
  ]
 },
 "b4": {
  "cover": "images/b4-cover.jpg",
  "prev": [
   "images/b4-page1.jpg",
   "images/b4-page2.jpg",
   "images/b4-page3.jpg"
  ]
 },
 "b5": {
  "cover": "images/b5-cover.jpg",
  "prev": [
   "images/b5-page1.jpg",
   "images/b5-page2.jpg",
   "images/b5-page3.jpg"
  ]
 },
 "b6": {
  "cover": "images/b6-cover.jpg",
  "prev": [
   "images/b6-page1.jpg",
   "images/b6-page2.jpg",
   "images/b6-page3.jpg"
  ]
 },
 "b7": {
  "cover": "images/b7-cover.jpg",
  "prev": [
   "images/b7-page1.jpg",
   "images/b7-page2.jpg",
   "images/b7-page3.jpg"
  ]
 }
};
const B=[
{id:"b7",t:"Arabic Letters Made Easy",d:"A fun and interactive Arabic alphabet workbook covering letters, sounds, pronunciation, makhraj and practice.",p:32,a:""},
{id:"b1",t:"Let’s Learn Arabic",d:"The Arabic alphabet from Alif to Ya with Learn, Trace, Color and Draw activities.",p:58,a:"Ages 3–6"},
{id:"b2",t:"Arabic Letter Shapes & Activities",d:"Letter shapes (initial, medial, final, isolated) with Learn, Recognize, Trace and Write activities.",p:30,a:"Nursery Level"},
{id:"b3",t:"Letter Shapes: Alif to Yaa",d:"Every letter shown in its four forms with picture words. [Edit title if needed]",p:29,a:"Nursery Level"},
{id:"b4",t:"Arabic Harakat & Activities",d:"Fatha, Kasra and Damma, Madd letters, tanween and word-building for each letter.",p:29,a:"Nursery Level"},
{id:"b5",t:"Arabic Letters with Short Harakat",d:"Letters with fatha, damma, kasra and sukun, taught with hand-gesture cards.",p:29,a:"Nursery Level"},
{id:"b6",t:"Arabic Letter Learners",d:"Learn, Recognize, Trace and Practice: Arabic letters, shapes, tracing and fun activities.",p:30,a:""}];
const $=s=>document.querySelector(s),F=n=>CFG.cur+n.toLocaleString("en-US");
let cart={};try{cart=JSON.parse(localStorage.getItem("nuh-cart")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("nuh-cart",JSON.stringify(cart))}catch(e){}};
const bk=id=>B.find(b=>b.id==id);
$("#fl").innerHTML=["b7","b1","b4"].map(i=>`<img src="${IMG[i].cover}" alt="${bk(i).t}">`).join("");
$("#gr").innerHTML=B.map(b=>`<article class="card rv"><div class="im" data-pv="${b.id}">${b.id=="b7"?'<span class="bs">⭐ Best Seller</span>':""}<img src="${IMG[b.id].cover}" alt="${b.t} cover" loading="lazy"></div><div class="bd"><span class="meta">${b.p} PDF pages${b.a?" · "+b.a:""}</span><h3>${b.t}</h3><p>${b.d}</p><div class="pr"><b>${F(CFG.price)}</b><s>${F(CFG.was)}</s><span>Save ${F(CFG.was-CFG.price)}</span></div><div class="ca"><button class="btn o s" data-pv="${b.id}">Preview</button><button class="btn s" data-add="${b.id}">Add to Cart</button></div></div></article>`).join("");
function toast(m){const t=$("#ts");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("on"),1800)}
const cnt=()=>Object.keys(cart).length,tot=()=>cnt()*CFG.price;
function draw(){$("#cc").textContent=cnt();const ids=Object.keys(cart);
$("#its").innerHTML=ids.length?ids.map(i=>`<div class="it"><img src="${IMG[i].cover}" alt=""><div>${bk(i).t}<small>${F(CFG.price)} each</small></div><button class="x" data-r="${i}" aria-label="Remove">🗑</button></div>`).join(""):`<div class="emp">🛒<br>Your cart is empty.<br>Add a book to get started.</div>`;
$("#cf").innerHTML=ids.length?`<div class="tot"><span>Total</span><span>${F(tot())}</span></div><button class="btn" style="width:100%;justify-content:center" data-co>Checkout</button>`:""}
const dr=o=>{$("#dr").classList.toggle("on",o);$("#ov").classList.toggle("on",o)};
function add(i){if(cart[i]){toast("Already in your cart");return}cart[i]=1;save();draw();toast("Added to cart ✓")}
let pi=0,pb=null;
function pv(i){pb=i;pi=0;showp();$("#pvd").showModal()}
function showp(){const a=IMG[pb].prev,b=bk(pb);$("#pi").src=a[pi];$("#pt").textContent=b.t;$("#pc").textContent=`Sample page ${pi+1} of ${a.length} · ${b.p} PDF pages in the full book`}
function co(){dr(false);const m=CFG.methods;$("#ck").innerHTML=`<div class="dh"><h2 style="font-size:24px">Checkout</h2><button class="x" onclick="$('#ckd').close()">×</button></div>
<form id="fm"><label>Full name<input name="n" required></label><label>WhatsApp number<input name="w" required inputmode="tel" placeholder="03XX XXXXXXX"></label><label>Email (optional)<input name="e" type="email"></label><label>Country<input name="c" required value="Pakistan"></label>
<label>Payment method<select name="m">${m.map((x,i)=>`<option value="${i}">${x.n}</option>`).join("")}</select></label>
<div class="pay" id="pd"></div><div class="tot"><span>Order total (${cnt()} book${cnt()>1?"s":""})</span><span>${F(tot())}</span></div>
<button class="btn" style="width:100%;justify-content:center">Place Order</button><p class="note">Payment is confirmed manually. You will receive your PDF after we verify it.</p></form>`;
const pd=()=>{const x=m[$("#fm").m.value];$("#pd").innerHTML=`Send <b>${F(tot())}</b> via <b>${x.n}</b> to:<br>Account name: <b>${CFG.payTo}</b><br>Number: <b>${x.no}</b>`};pd();$("#fm").m.onchange=pd;
$("#fm").onsubmit=async e=>{e.preventDefault();const f=e.target,x=m[f.m.value];let ref="NUH-"+Date.now().toString(36).slice(-5).toUpperCase(),live=false;
if(CFG.api){const bt=f.querySelector("button");bt.disabled=true;try{const j=await api("create-order",{name:f.n.value,whatsapp:f.w.value,email:f.e.value,country:f.c.value,method:x.n,items:Object.keys(cart)});if(!j.ref)throw 0;ref=j.ref;live=true}catch(err){bt.disabled=false;toast("Could not place the order. Please try again.");return}}
const lines=Object.keys(cart).map(i=>`• ${bk(i).t} × ${cart[i]}`).join("\n");
const msg=`Assalamu alaikum! Order ${ref}\nName: ${f.n.value}\nWhatsApp: ${f.w.value}\nEmail: ${f.e.value||"-"}\nCountry: ${f.c.value}\n${lines}\nTotal: ${F(tot())}\nPaid via: ${x.n}\n(Payment screenshot attached)`;
$("#ck").innerHTML=`<div style="text-align:center"><div style="font-size:48px">🌙</div><h2>Order placed!</h2><p>Your order number is <b>${ref}</b></p></div><div class="pay">1. Send <b>${F(tot())}</b> via <b>${x.n}</b> to <b>${CFG.payTo}</b> (${x.no}).<br>2. Tap the button below and send your payment screenshot on WhatsApp.<br>3. We confirm your payment.${live?"<br>4. Then open <b>My Downloads</b> in the menu, enter your order number and WhatsApp number, and download your PDFs.":" We then send you the PDF."}</div>
<a class="btn c" style="width:100%;justify-content:center" target="_blank" rel="noopener" href="https://wa.me/${CFG.wa}?text=${encodeURIComponent(msg)}">💬 Send Payment Proof on WhatsApp</a><p class="note">Keep your order number for reference.</p>`;cart={};save();draw()};
$("#ckd").showModal()}
document.addEventListener("click",e=>{const t=e.target.closest("[data-add],[data-pv],[data-m],[data-p],[data-r],[data-co]");if(!t)return;const d=t.dataset;
if(d.add)add(d.add);else if(d.pv)pv(d.pv);else if(d.m!==undefined){if(--cart[d.m]<1)delete cart[d.m];save();draw()}else if(d.p){cart[d.p]++;save();draw()}else if(d.r){delete cart[d.r];save();draw()}else if("co"in d)co()});
$("#cb").onclick=()=>dr(true);$("#cx").onclick=$("#ov").onclick=()=>dr(false);
$("#pp").onclick=()=>{pi=(pi+IMG[pb].prev.length-1)%IMG[pb].prev.length;showp()};$("#pn").onclick=()=>{pi=(pi+1)%IMG[pb].prev.length;showp()};
$("#pcl").onclick=()=>$("#pvd").close();$("#pad").onclick=()=>{add(pb);$("#pvd").close()};
$("#mb").onclick=()=>$("#nv").classList.toggle("open");document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>$("#nv").classList.remove("open"));
draw();
if("IntersectionObserver"in window){const o=new IntersectionObserver(r=>r.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll(".rv").forEach(n=>o.observe(n))}else document.querySelectorAll(".rv").forEach(n=>n.classList.add("in"));

document.querySelectorAll(".pst img").forEach(i=>i.onclick=()=>{$("#poi").src=i.src;$("#pod").showModal()});$("#pod").onclick=()=>$("#pod").close();

const api=async(p,b)=>(await fetch(CFG.api+"/"+p,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)})).json();
function dl(){dr(false);$("#dd").innerHTML=`<div class="dh"><h2 style="font-size:24px">My Downloads</h2><button class="x" onclick="$('#dld').close()">×</button></div><p class="note">After your payment is confirmed, enter your order number and WhatsApp number to download your PDFs.</p><form id="df"><label>Order number<input name="r" required placeholder="NUH-XXXXXX"></label><label>WhatsApp number used in the order<input name="w" required inputmode="tel"></label><button class="btn" style="width:100%;justify-content:center;margin-top:14px">Show my books</button></form><div id="dres"></div>`;
$("#df").onsubmit=async e=>{e.preventDefault();const f=e.target,o=$("#dres"),wa=`<a href="https://wa.me/${CFG.wa}" target="_blank" rel="noopener"><b>WhatsApp</b></a>`;
if(!CFG.api){o.innerHTML=`<div class="pay">Online download is not active yet. Please message us on ${wa} and we will send your PDF.</div>`;return}
o.innerHTML='<p class="note">Checking…</p>';let j;try{j=await api("get-downloads",{ref:f.r.value,whatsapp:f.w.value})}catch(x){j={status:"error"}}
const M={notfound:"We could not find this order. Please check the order number and WhatsApp number.",pending:"Your payment is not confirmed yet. Please send your payment screenshot on "+wa+" and we will confirm it soon.",cancelled:"This order was cancelled. Please contact us on "+wa+".",expired:"The download period for this order has ended. Please contact us on "+wa+".",error:"Something went wrong. Please try again."};
if(j.status!="paid"){o.innerHTML=`<div class="pay">${M[j.status]||M.error}</div>`;return}
o.innerHTML=`<div class="items">${j.items.map(x=>`<div class="it"><div>${x.title}</div><button class="btn s" data-dl="${x.id}">⬇ Download PDF</button></div>`).join("")}</div><p class="note">Downloads left: ${j.left}${j.expires?" · Available until "+new Date(j.expires).toLocaleDateString():""}</p>`;
o.querySelectorAll("[data-dl]").forEach(b=>b.onclick=async()=>{b.disabled=true;let k;try{k=await api("get-downloads",{ref:f.r.value,whatsapp:f.w.value,item:b.dataset.dl})}catch(x){k={}}b.disabled=false;if(k.url)location.href=k.url;else toast(k.status=="limit"?"Download limit reached. Please contact us.":"Could not download. Please try again.")})};
$("#dld").showModal()}
$("#dl-link").onclick=e=>{e.preventDefault();$("#nv").classList.remove("open");dl()};
if(CFG.api)$("#st3").textContent="Once payment is confirmed, download your PDF from My Downloads in the menu.";

$("#fpr").innerHTML=`<b>${F(CFG.price)}</b><s>${F(CFG.was)}</s><span>Save ${F(CFG.was-CFG.price)}</span>`;
