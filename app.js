/* =========================
   APPLE EMOTION ENGINE
   FULL JS (CLEAN VERSION)
========================= */

/* ========= STATE ========= */
let stats = JSON.parse(localStorage.getItem("stats")) || {
    clicks: 0,
    start: Date.now()
};

function save(){
    localStorage.setItem("stats", JSON.stringify(stats));
}

/* ========= CURSOR ========= */
const cursor = document.getElementById("cursor");

window.addEventListener("mousemove",(e)=>{
    if(cursor){
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
});

/* ========= SCREENS ========= */
function start(){
    document.getElementById("home").classList.remove("active");
    document.getElementById("main").classList.add("active");

    localStorage.setItem("started","true");
}

/* ========= TEXT ENGINE ========= */
const texts = [
    "Everything is alive in motion ✨",
    "You are inside a soft universe 🌸",
    "Every click creates energy 💖",
    "Nothing here is random",
    "You are part of something beautiful"
];

let ti = 0;

function changeText(){
    const el = document.getElementById("text");
    if(!el) return;

    el.style.opacity = 0;

    setTimeout(()=>{
        el.innerText = texts[ti];
        el.style.opacity = 1;
        ti = (ti + 1) % texts.length;
    },300);
}

setInterval(changeText, 2500);

/* ========= CANVAS SETUP ========= */
const fx = document.getElementById("fx");
const ctx = fx ? fx.getContext("2d") : null;

let w = innerWidth;
let h = innerHeight;

if(fx){
    fx.width = w;
    fx.height = h;
}

window.addEventListener("resize",()=>{
    w = innerWidth;
    h = innerHeight;
    if(fx){
        fx.width = w;
        fx.height = h;
    }
});

/* ========= PARTICLES ========= */
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

/* mouse trail */
window.addEventListener("mousemove",(e)=>{
    spawn(e.clientX, e.clientY, "white");
});

/* ========= MAIN LOOP ========= */
function animate(){
    if(!ctx) return;

    ctx.clearRect(0,0,w,h);

    for(let p of particles){
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.globalAlpha = p.life / 60;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x,p.y,2.5,0,Math.PI*2);
        ctx.fill();
    }

    particles = particles.filter(p => p.life > 0);

    requestAnimationFrame(animate);
}

animate();

/* ========= ENERGY SYSTEM ========= */
let energy = 0;

function pulse(){
    energy++;

    stats.clicks = energy;
    save();

    const statsEl = document.getElementById("stats");
    if(statsEl) statsEl.innerText = energy;

    spawn(innerWidth/2, innerHeight/2, "#ff4fd8");

    if(energy > 20){
        document.getElementById("main").classList.remove("active");
        document.getElementById("final").classList.add("active");
    }
}

/* ========= LOCAL STORAGE TIMER ========= */
function updateTime(){
    stats.timeAlive = Date.now() - stats.start;
    save();
}

setInterval(updateTime, 2000);

/* ========= FLOWERS (SAFE) ========= */
function createFlower(){
    const div = document.createElement("div");

    div.innerHTML = `
    <svg class="flower" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="10" fill="pink"/>
        <circle cx="30" cy="50" r="10" fill="violet"/>
        <circle cx="70" cy="50" r="10" fill="pink"/>
        <circle cx="50" cy="30" r="10" fill="violet"/>
        <circle cx="50" cy="70" r="10" fill="pink"/>
    </svg>`;

    div.style.position = "absolute";
    div.style.left = Math.random()*100 + "vw";
    div.style.top = Math.random()*100 + "vh";

    document.body.appendChild(div);

    setTimeout(()=>div.remove(), 15000);
}

/* limited flowers (performance safe) */
for(let i=0;i<5;i++){
    createFlower();
}

/* ========= SCROLL EFFECT ========= */
let scrollTimeout;

window.addEventListener("wheel",(e)=>{
    const scale = 1 + Math.min(Math.abs(e.deltaY)*0.0005, 0.03);
    document.body.style.transform = `scale(${scale})`;

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(()=>{
        document.body.style.transform = "scale(1)";
    },120);
});

/* ========= MUSIC ENGINE ========= */
let musicStarted = false;

function fadeIn(){
    if(musicStarted) return;
    musicStarted = true;

    const music = document.getElementById("music");
    if(!music) return;

    music.volume = 0;
    music.play();

    let v = 0;
    const fade = setInterval(()=>{
        if(v < 0.3){
            v += 0.01;
            music.volume = v;
        } else {
            clearInterval(fade);
        }
    },80);
}

window.addEventListener("click", fadeIn, { once:true });

/* ========= SAVE ON EXIT ========= */
window.addEventListener("beforeunload", save);
