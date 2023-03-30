const NUM_CONFETTI = 250;
let COLORS = [[255, 184, 209], [255, 22, 84], [144, 70, 207], [4, 139, 168], [121, 190, 238]];
const PI_2 = 2 * Math.PI;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const toggler = document.getElementById("checkboxInput")
const pageOne = document.getElementById("pageOne")

const iconsDiv = document.getElementById("iconsDiv")
const icons = iconsDiv.querySelectorAll("a")

const nameDiv = document.getElementById("nameDiv")
const arrow = document.getElementById("arrow")

const home = document.getElementById("home")
const blog = document.getElementById("blogs")

const p2 = document.getElementById("p2")
const rArticle = document.getElementById("rArticle")
const articleGradient = document.getElementById("articleGradient")
const rPostText = document.getElementById("rPostText")

const footerBackground = document.getElementById("footerBackground")
const footerStripe = document.getElementById("footerStripe")

const html = document.getElementById("html")

let w = 0;
let h = 0;

const resizeWindow = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};

window.addEventListener('resize', resizeWindow, false);

window.onload = () => setTimeout(resizeWindow, 0);

const range = (a, b) => (b - a) * Math.random() + a;

const drawCircle = (x, y, r, style) => {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    context.fill();
};

let xpos = 0.5;

document.onmousemove = (e) => {
    xpos = e.pageX / w;
};

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    ((callback) => window.setTimeout(callback, 1000 / 60));

class Confetti {
    constructor() {
        this.style = COLORS[Math.floor(range(0, 5))];
        this.rgb = `rgba(${this.style[0]}, ${this.style[1]}, ${this.style[2]}`;
        this.r = Math.floor(range(2, 6));
        this.r2 = 2 * this.r;
        this.replace();
    }

    replace() {
        this.opacity = 0;
        this.dop = 0.03 * range(1, 4);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
            this.opacity = 1;
            this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) {
            this.replace();
        }
        if (!(0 < this.x < this.xmax)) {
            this.x = (this.x + this.xmax) % this.xmax;
        }
        drawCircle(Math.floor(this.x), Math.floor(this.y), this.r, `${this.rgb}, ${this.opacity})`);
    }
}

let confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());


toggler.addEventListener('click', (e) => {
    console.log("toggled")
    if (toggler.checked) {
        pageOne.classList.remove("bg-black")
        icons.forEach((i) => {
            i.classList.remove("bg-zinc-900")
            i.classList.remove('text-white')
        })
        nameDiv.classList.remove("text-white")
        arrow.classList.remove("text-white")

        home.classList.remove("text-zinc-600")
        home.classList.remove("hover:text-zinc-600")
        home.classList.add("text-zinc-300")
        home.classList.add("hover:text-zinc-300")

        blog.classList.remove("text-zinc-700")
        blog.classList.remove("hover:text-zinc-600")
        blog.classList.add("text-zinc-400")
        blog.classList.add("hover:text-zinc-300")

        COLORS = [[255, 184, 209], [255, 22, 84], [144, 70, 207], [4, 139, 168], [121, 190, 238]]
        confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());
        p2.classList.remove("bg-zinc-900")
        p2.classList.add("bg-pink-100")
        rArticle.classList.remove("text-white")
        rArticle.classList.remove("bg-zinc-700")
        rArticle.classList.add("bg-white")
        articleGradient.classList.remove("from-zinc-700")
        articleGradient.classList.add("from-white")
        rPostText.classList.remove("text-white")
        footerBackground.classList.add("bg-pink-100")
        footerBackground.classList.remove("bg-zinc-900")
        footerStripe.classList.add("bg-pink-200")
        footerStripe.classList.remove("bg-zinc-800")
        footerStripe.classList.add("text-zinc-400")
        footerStripe.classList.remove("text-white")


    } else {
        pageOne.classList.add("bg-black")
        icons.forEach((i) => {
            i.classList.add("bg-zinc-900")
            i.classList.add("text-white")
        })
        nameDiv.classList.add("text-white")
        arrow.classList.add("text-white")

        home.classList.remove("text-zinc-300")
        home.classList.remove("hover:text-zinc-300")
        home.classList.add("text-zinc-600")
        home.classList.add("hover:text-zinc-600")

        blog.classList.remove("text-zinc-400")
        blog.classList.remove('hover:text-zinc-300')
        blog.classList.add("text-zinc-700")
        blog.classList.add("hover:text-zinc-600")

        COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]]
        confetti = Array.from({ length: NUM_CONFETTI }, () => new Confetti());
        p2.classList.remove("bg-pink-100")
        p2.classList.add("bg-zinc-900")
        rArticle.classList.remove("bg-white")
        rArticle.classList.add("bg-zinc-700")
        rArticle.classList.add("text-white")
        articleGradient.classList.remove("from-white")
        articleGradient.classList.add("from-zinc-700")
        rPostText.classList.add("text-white")
        footerBackground.classList.remove("bg-pink-100")
        footerBackground.classList.add("bg-zinc-900")
        footerStripe.classList.remove("bg-pink-200")
        footerStripe.classList.add("bg-zinc-800")
        footerStripe.classList.remove("text-zinc-400")
        footerStripe.classList.add("text-white")

    }
})


const step = () => {
    window.requestAnimationFrame(step);
    context.clearRect(0, 0, w, h);
    confetti.forEach(c => c.draw());
};
step()

/*
canvas effect is a recreation of a codepen, originally by Linmiao Xu
Source: https://codepen.io/linrock/pen/nMadjQ
*/