const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

const stars = document.getElementById("stars");
const sctx = stars.getContext("2d");

let w = window.innerWidth;
let h = window.innerHeight;

canvas.width = w;
canvas.height = h;
stars.width = w;
stars.height = h;

window.onresize = () => {
w = window.innerWidth;
h = window.innerHeight;
canvas.width = w;
canvas.height = h;
stars.width = w;
stars.height = h;
};

let count = 0;

const messages = [
"Jsi přesně tam, kde máš být.",
"Každá sekunda je nový začátek.",
"Svět potřebuje tvoji energii.",
"Nic není ztracené.",
"Tohle je tvoje chvíle.",
"Jsi silnější než chaos.",
"Klid je taky síla."
];

// typing effect
let msgIndex = 0;
let charIndex = 0;

function type(){
const text = document.getElementById("text");
const msg = messages[msgIndex];

text.innerHTML = msg.slice(0,charIndex);

charIndex++;

if(charIndex <= msg.length){
requestAnimationFrame(type);
}else{
setTimeout(()=>{
charIndex = 0;
msgIndex = (msgIndex+1)%messages.length;
type();
},2000);
}
}
type();

// stars background
const starArray = [];
for(let i=0;i<150;i++){
starArray.push({
x:Math.random()*w,
y:Math.random()*h,
r:Math.random()*1.5
});
}

function drawStars(){
sctx.clearRect(0,0,w,h);
sctx.fillStyle="white";

for(let s of starArray){
sctx.beginPath();
sctx.arc(s.x,s.y,s.r,0,Math.PI*2);
sctx.fill();

s.y += 0.2;
if(s.y>h){
s.y=0;
s.x=Math.random()*w;
}
}

requestAnimationFrame(drawStars);
}
drawStars();

// particles
let particles = [];

function boom(){
count++;
document.getElementById("count").innerText = count;

document.getElementById("clickSound").play();

for(let i=0;i<80;i++){
particles.push({
x:w/2,
y:h/2,
vx:(Math.random()-0.5)*8,
vy:(Math.random()-0.5)*8,
life:100
});
}
}

function update(){
ctx.clearRect(0,0,w,h);

for(let p of particles){
p.x += p.vx;
p.y += p.vy;
p.life--;

ctx.fillStyle = `rgba(255,100,150,${p.life/100})`;
ctx.beginPath();
ctx.arc(p.x,p.y,3,0,Math.PI*2);
ctx.fill();
}

particles = particles.filter(p=>p.life>0);

requestAnimationFrame(update);
}
update();

// mouse aura
window.addEventListener("mousemove",(e)=>{
for(let i=0;i<2;i++){
particles.push({
x:e.clientX,
y:e.clientY,
vx:(Math.random()-0.5)*2,
vy:(Math.random()-0.5)*2,
life:30
});
}
});
