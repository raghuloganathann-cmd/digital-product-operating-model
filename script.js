const LAYERS=[
{n:"Strategy and portfolio",s:"Where to invest",d:"Turns company goals into a small set of product bets and keeps funding tied to outcomes.",
 p:["Outcome-based OKRs","Quarterly portfolio review","Value stream mapping"],r:["Chief Product Officer","Portfolio lead","Business sponsor"],m:["Share of spend on top bets","Time to fund a new bet","OKR attainment"]},
{n:"Product management",s:"What to build",d:"Owns discovery, the roadmap and the product vision for each product or value stream.",
 p:["Continuous discovery","Outcome roadmaps","Customer interviews and experiments"],r:["Product manager","Product designer","Product analyst"],m:["Adoption and retention","NPS or CSAT","Experiments run per quarter"]},
{n:"Delivery and engineering",s:"How to build",d:"Cross-functional teams ship small changes safely and often, owning what they release.",
 p:["Agile and DevOps","CI/CD pipelines","Trunk-based development"],r:["Engineering manager","Tech lead","QA and SRE engineers"],m:["Deployment frequency","Lead time for changes","Change failure rate"]},
{n:"Platform and data",s:"What teams share",d:"Shared services, tooling and data that let product teams move quickly without rebuilding basics.",
 p:["Internal developer platform","Shared design system","Governed data products"],r:["Platform product manager","Data engineer","Architect"],m:["Platform adoption","Time to first deploy","Data quality score"]},
{n:"Governance and funding",s:"How to steer",d:"Lightweight guardrails for risk, security and budget, with funding that follows persistent teams.",
 p:["Persistent product funding","Risk and security guardrails","Architecture decision records"],r:["Finance partner","Risk and compliance lead","Steering group"],m:["Cost per outcome","Audit findings closed","Decision cycle time"]},
{n:"People and culture",s:"Who and how",d:"Organisation design, skills and ways of working that keep teams empowered and accountable.",
 p:["Stable, long-lived teams","Skills and career paths","Blameless retrospectives"],r:["Head of people","Agile coach","Team leads"],m:["Engagement score","Team stability","Skill coverage"]}
];
const STAGES=[[0,2,"Ad hoc","Pick one product and name a single accountable owner."],
[2,3,"Emerging","Standardise discovery and delivery practices across two or three teams."],
[3,4,"Defined","Connect funding and the roadmap to outcomes, not projects."],
[4,4.6,"Managed","Invest in the shared platform and measure outcomes consistently."],
[4.6,5.1,"Optimised","Keep experimenting and review the model each quarter."]];
const $=id=>document.getElementById(id);
const stack=$("layers"),detail=$("detail");
function show(i){
  [...stack.children].forEach((b,j)=>b.setAttribute("aria-pressed",j===i));
  const L=LAYERS[i],li=a=>a.map(x=>`<li>${x}</li>`).join("");
  detail.innerHTML=`<h2>${L.n}</h2><p>${L.d}</p><div class="cols"><div><h3>Practices</h3><ul>${li(L.p)}</ul></div><div><h3>Roles</h3><ul>${li(L.r)}</ul></div><div><h3>Measures</h3><ul>${li(L.m)}</ul></div></div>`;
}
LAYERS.forEach((L,i)=>{
  const b=document.createElement("button");
  b.type="button";b.innerHTML=`<strong>${L.n}</strong><small>${L.s}</small>`;
  b.onclick=()=>show(i);stack.appendChild(b);
});
const vals=LAYERS.map(()=>3);
LAYERS.forEach((L,i)=>{
  const r=document.createElement("div");r.className="row";
  r.innerHTML=`<label for="s${i}">${L.n}</label><input id="s${i}" type="range" min="1" max="5" step="1" value="3"><span id="v${i}">3</span>`;
  $("rows").appendChild(r);
  r.querySelector("input").oninput=e=>{vals[i]=+e.target.value;$("v"+i).textContent=e.target.value;calc()};
});
function calc(){
  const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
  const st=STAGES.find(s=>avg>=s[0]&&avg<s[1])||STAGES[4];
  $("score").textContent=avg.toFixed(1);
  $("stage").textContent=st[2]+" stage";
  const low=LAYERS[vals.indexOf(Math.min(...vals))].n;
  $("next").textContent=st[3]+" Weakest layer: "+low+".";
  $("fill").style.width=(avg/5*100)+"%";
}
show(0);calc();
