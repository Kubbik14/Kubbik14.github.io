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

let loveEnergy = 0;

const messages = [
"Jsi něčí nejhezčí myšlenka 💖",
"Svět je hezčí, když jsi tady 🌸",
"Nezapomeň, jak jsi výjimečná ✨",
"Kdyby hvězdy mohly mluvit, mluvily by o tobě 🌙",
"Tvá energie je jemná magie 🫶",
"Jsi důvod, proč někdo věří na krásu 💕"
];

// typing
let mi=0, ci=0;
function type(){
let el=document.getElementById("text");
let msg=messages[mi];

el.innerHTML=msg.slice(0,ci++);

if(ci<=msg.length){
requestAnimationFrame(type);
}else{
setTimeout(()=>{
ci=0;
mi=(mi+1)%messages.length;
type();
},2500);
}
}
type();

// soft stars background
let stars = Array.from({length:120},()=>({
x:Math.random()*w,
y:Math.random()*h,
r:Math.random()*1.5
}));

function draw(){
b.clearRect(0,0,w,h);

b.fillStyle="rgba(255,192,203,0.8)";
for(let s of stars){
b.beginPath();
b.arc(s.x,s.y,s.r,0,Math.PI*2);
b.fill();

s.y += 0.2;
if(s.y>h){
s.y=0;
s.x=Math.random()*w;
}
}

requestAnimationFrame(draw);
}
draw();

// particles
let particles=[];

function love(){
loveEnergy++;
document.getElementById("count").innerText=loveEnergy;

document.getElementById("sound").play();

// heart burst
for(let i=0;i<70;i++){
particles.push({
x:w/2,
y:h/2,
vx:(Math.random()-0.5)*6,
vy:(Math.random()-0.5)*6,
life:100,
color:`hsl(${300+Math.random()*40},100%,70%)`
});
}
}

// mouse magic
window.addEventListener("mousemove",(e)=>{
for(let i=0;i<2;i++){
particles.push({
x:e.clientX,
y:e.clientY,
vx:(Math.random()-0.5)*2,
vy:(Math.random()-0.5)*2,
life:40,
color:"pink"
});
}
});

// render
function loop(){
f.clearRect(0,0,w,h);

for(let p of particles){
p.x+=p.vx;
p.y+=p.vy;
p.life--;

f.globalAlpha=p.life/100;
f.fillStyle=p.color;

f.beginPath();
f.arc(p.x,p.y,3,0,Math.PI*2);
f.fill();
}

particles=particles.filter(p=>p.life>0);

requestAnimationFrame(loop);
}
loop();
