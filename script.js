const bg = document.getElementById("bg");
const fx = document.getElementById("fx");

const b = bg.getContext("2d");
const f = fx.getContext("2d");

let w,h;
function resize(){
w = innerWidth;
h = innerHeight;
bg.width = fx.width = w;
bg.height = fx.height = h;
}
resize();
window.onresize = resize;

let energy = 0;

const messages = [
"Ty nejsi náhoda.",
"Každý okamžik se přepisuje.",
"Realita reaguje na tvoji energii.",
"Teď se něco mění.",
"Tvoje existence má váhu.",
"Všechno je propojené."
];

// TEXT ENGINE
let mi = 0;
let ci = 0;

function type(){
const el = document.getElementById("text");
let msg = messages[mi];

el.innerHTML = msg.slice(0,ci++);
if(ci <= msg.length){
requestAnimationFrame(type);
}else{
setTimeout(()=>{
ci = 0;
mi = (mi+1)%messages.length;
type();
},1200);
}
}
type();

// STARS
let stars = Array.from({length:200},()=>({
x:Math.random()*w,
y:Math.random()*h,
z:Math.random()*3
}));

function drawBg(){
b.clearRect(0,0,w,h);

for(let s of stars){
b.fillStyle = "white";
b.globalAlpha = 1 - s.z/3;
b.beginPath();
b.arc(s.x,s.y,s.z,0,Math.PI*2);
b.fill();

s.y += 0.3 + s.z*0.2;

if(s.y > h){
s.y = 0;
s.x = Math.random()*w;
}
}

requestAnimationFrame(drawBg);
}
drawBg();

// PARTICLE GOD SYSTEM
let particles = [];

function pulse(){
energy++;
document.getElementById("count").innerText = energy;

document.getElementById("click").play();

// BIG BURST
for(let i=0;i<120;i++){
particles.push({
x:w/2,
y:h/2,
vx:(Math.random()-0.5)*12,
vy:(Math.random()-0.5)*12,
life:120,
color:`hsl(${Math.random()*360},100%,60%)`
});
}
}

// MOUSE ENERGY FIELD
window.addEventListener("mousemove",(e)=>{
for(let i=0;i<3;i++){
particles.push({
x:e.clientX,
y:e.clientY,
vx:(Math.random()-0.5)*3,
vy:(Math.random()-0.5)*3,
life:40,
color:"white"
});
}
});

// LOOP
function loop(){
f.clearRect(0,0,w,h);

for(let p of particles){
p.x += p.vx;
p.y += p.vy;
p.life--;

f.globalAlpha = p.life/120;
f.fillStyle = p.color;

f.beginPath();
f.arc(p.x,p.y,3,0,Math.PI*2);
f.fill();
}

particles = particles.filter(p=>p.life>0);

requestAnimationFrame(loop);
}
loop();
