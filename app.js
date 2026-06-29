/* =========================
   APPLE MOTION ENGINE
   PART 2
========================= */

const cursor = document.getElementById("cursor");

window.addEventListener("mousemove",(e)=>{
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

/* ===== SCREENS ===== */
function start(){
    document.getElementById("home").classList.remove("active");
    document.getElementById("main").classList.add("active");

    localStorage.setItem("started","true");
}

/* ===== TEXT ENGINE ===== */
const texts = [
"Everything is alive in motion ✨",
"You are inside a soft universe 🌸",
"Every click creates energy 💖",
"Nothing here is random"
];

let i = 0;
function changeText(){
    const el = document.getElementById("text");
    el.style.opacity = 0;

    setTimeout(()=>{
        el.innerText = texts[i];
        el.style.opacity = 1;
        i = (i+1)%texts.length;
    },300);
}
setInterval(changeText,2500);

/* ===== PARTICLE SYSTEM ===== */
const fx = document.getElementById("fx");
const ctx = fx.getContext("2d");

let w = innerWidth;
let h = innerHeight;

fx.width = w;
fx.height = h;

window.addEventListener("resize",()=>{
    w = innerWidth;
    h = innerHeight;
    fx.width = w;
    fx.height = h;
});

let particles = [];

function spawn(x,y,color){
    for(let i=0;i<6;i++){
        particles.push({
            x,
            y,
            vx:(Math.random()-0.5)*4,
            vy:(Math.random()-0.5)*4,
            life:60,
            color
        });
    }
}

window.addEventListener("mousemove",(e)=>{
    spawn(e.clientX,e.clientY,"white");
});

/* ===== MAIN LOOP ===== */
function animate(){
    ctx.clearRect(0,0,w,h);

    for(let p of particles){
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.globalAlpha = p.life/60;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x,p.y,2.5,0,Math.PI*2);
        ctx.fill();
    }

    particles = particles.filter(p=>p.life>0);

    requestAnimationFrame(animate);
}
animate();

/* ===== CLICK ENERGY ===== */
let energy = 0;

function pulse(){
    energy++;
    document.getElementById("stats").innerText = energy;

    spawn(innerWidth/2, innerHeight/2, "#ff4fd8");

    if(energy > 20){
        document.getElementById("main").classList.remove("active");
        document.getElementById("final").classList.add("active");
    }
}
