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
/* =========================
   LOCAL STORAGE SYSTEM
========================= */

let stats = JSON.parse(localStorage.getItem("stats")) || {
    clicks:0,
    time:Date.now()
};

function save(){
    localStorage.setItem("stats", JSON.stringify(stats));
}

/* =========================
   AUTO DARK MODE (TIME)
========================= */

function setMode(){
    const hour = new Date().getHours();
    if(hour > 18 || hour < 6){
        document.body.style.filter = "brightness(0.8) contrast(1.1)";
    }
}
setMode();

/* =========================
   SVG FLOWERS (DECOR)
========================= */

function createFlower(){
    const svg = document.createElement("div");
    svg.innerHTML = `
    <svg class="flower" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="10" fill="pink"/>
        <circle cx="30" cy="50" r="10" fill="violet"/>
        <circle cx="70" cy="50" r="10" fill="pink"/>
        <circle cx="50" cy="30" r="10" fill="violet"/>
        <circle cx="50" cy="70" r="10" fill="pink"/>
    </svg>`;
    
    svg.style.position="absolute";
    svg.style.left=Math.random()*100+"vw";
    svg.style.top=Math.random()*100+"vh";

    document.body.appendChild(svg);
}

for(let i=0;i<8;i++) createFlower();

/* =========================
   3D HEART (THREE.JS)
========================= */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha:true });

renderer.setSize(innerWidth, innerHeight);
document.getElementById("three-container").appendChild(renderer.domElement);

/* heart geometry (simple parametric illusion) */
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

const material = new THREE.MeshStandardMaterial({
    color:0xff4fd8,
    emissive:0x550033,
    roughness:0.3,
    metalness:0.7
});

const heart = new THREE.Mesh(geometry, material);
scene.add(heart);

const light = new THREE.PointLight(0xffffff, 2);
light.position.set(20,20,20);
scene.add(light);

camera.position.z = 30;

function animate3D(){
    requestAnimationFrame(animate3D);

    heart.rotation.x += 0.005;
    heart.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate3D();

/* =========================
   MUSIC ENGINE
========================= */

const music = document.getElementById("music");
music.volume = 0;

function fadeIn(){
    music.play();
    let v = 0;
    let fade = setInterval(()=>{
        if(v < 0.4){
            v += 0.01;
            music.volume = v;
        } else {
            clearInterval(fade);
        }
    },100);
}

/* start music on interaction */
window.addEventListener("click", fadeIn, { once:true });

/* =========================
   SCROLL CINEMATIC EFFECT
========================= */

window.addEventListener("wheel",(e)=>{
    const scale = 1 + Math.min(Math.abs(e.deltaY)*0.001, 0.1);
    document.body.style.transform = `scale(${scale})`;

    setTimeout(()=>{
        document.body.style.transform = "scale(1)";
    },150);
});

/* =========================
   FINAL POLISH LOOP
========================= */

function loopFix(){
    stats.time = Date.now() - stats.time;
    save();
    requestAnimationFrame(loopFix);
}
loopFix();
