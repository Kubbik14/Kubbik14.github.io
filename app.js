/* =========================
   APPLE EMOTION ENGINE
   NO LOADER VERSION
========================= */

/* ========= SAFE SELECTOR ========= */
const $ = (id) => document.getElementById(id);

/* ========= STATE ========= */
let stats = JSON.parse(localStorage.getItem("stats")) || {
    clicks: 0,
    start: Date.now()
};

function save(){
    localStorage.setItem("stats", JSON.stringify(stats));
}

/* ========= CURSOR ========= */
const cursor = $("cursor");

window.addEventListener("mousemove",(e)=>{
    if(!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

/* ========= SCREENS ========= */
function start(){
    const home = $("home");
    const main = $("main");

    if(home) home.classList.remove("active");
    if(main) main.classList.add("active");

    localStorage.setItem("started","true");
}

/* ========= TEXT ENGINE ========= */
const texts = [
    "Everything is alive in motion ✨",
    "You are inside a soft universe 🌸",
    "Every click creates energy 💖",
    "Nothing here is random",
    "You are safe here"
];

let ti = 0;

function changeText(){
    const el = $("text");
    if(!el) return;

    el.style.opacity = 0;

    setTimeout(()=>{
        el.innerText = texts[ti];
        el.style.opacity = 1;
        ti = (ti + 1) % texts.length;
    },300);
}

setInterval(changeText, 2500);

/* ========= PARTICLES ========= */
const fx = $("fx");
const ctx = fx ? fx.getContext("2d") : null;

let w = innerWidth;
let h = innerHeight;

function resize(){
    if(!fx) return;
    w = innerWidth;
    h = innerHeight;
    fx.width = w;
    fx.height = h;
}

window.addEventListener("resize", resize);
resize();

let particles = [];

function spawn(x,y,color){
    for(let i=0;i<5;i++){
        particles.push({
            x,
            y,
            vx:(Math.random()-0.5)*3,
            vy:(Math.random()-0.5)*3,
            life:50,
            color
        });
    }
}

window.addEventListener("mousemove",(e)=>{
    spawn(e.clientX, e.clientY, "white");
});

/* ========= ANIMATION LOOP ========= */
function animate(){
    if(!ctx) return;

    ctx.clearRect(0,0,w,h);

    for(let p of particles){
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.globalAlpha = p.life / 50;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x,p.y,2,0,Math.PI*2);
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

    const statsEl = $("stats");
    if(statsEl) statsEl.innerText = energy;

    spawn(innerWidth/2, innerHeight/2, "#ff4fd8");

    if(energy > 20){
        const main = $("main");
        const final = $("final");

        if(main) main.classList.remove("active");
        if(final) final.classList.add("active");
    }
}

/* ========= FLOWERS ========= */
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

    setTimeout(()=>div.remove(), 12000);
}

/* light decoration */
for(let i=0;i<5;i++){
    createFlower();
}

/* ========= SCROLL EFFECT ========= */
let scrollTimer;

window.addEventListener("wheel",(e)=>{
    const scale = 1 + Math.min(Math.abs(e.deltaY)*0.0004, 0.02);

    document.body.style.transform = `scale(${scale})`;

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(()=>{
        document.body.style.transform = "scale(1)";
    },100);
});

/* ========= MUSIC ========= */
let musicStarted = false;

function fadeIn(){
    if(musicStarted) return;
    musicStarted = true;

    const music = $("music");
    if(!music) return;

    music.volume = 0;

    music.play().catch(()=>{});

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

/* ========= SAVE ========= */
window.addEventListener("beforeunload", save);
