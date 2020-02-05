let images;
let scale = 1;
let beeX = 0
let beeY = 0;
let testY = 0;
const width = 2000;
const height = 3000;
let preScaledImages = {}

const canvas = document.getElementById("canvas");
canvas.style.backgroundColor = "grey";
const ctx = canvas.getContext("2d");
onResize();

window.addEventListener("resize", onResize);

function onResize() {
    console.log("fds", window.innerWidth);
    scale = window.innerWidth / width;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    preScaledImages = {}
}

const beeImage = {name: 'bee', url: 'bee.png'};
const testImage = {name: 'test', url: 'test.png'};


function loadImages(imagesToLoad) {
    return Promise.all(imagesToLoad.map(image => loadImage(image.name, image.url))).then(images => images.reduceRight((acc, elem) => ({...acc, [elem.name]: elem.image}), {}));
} 

function loadImage(name, url) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve({name, image});
    })
}

function drawImage(image, x, y) {
    let scaledImage = preScaledImages[image.src]
    if (!scaledImage) {
        const imgWidth =  floor(image.width * scale);
        const imgHeight = floor(image.height * scale);
        const mc = document.createElement('canvas');
        mc.width = imgWidth;
        mc.height = imgHeight;
        const mctx = mc.getContext('2d');
        mctx.drawImage(image, 0 , 0, scale * imgWidth, scale * imgHeight);

        preScaledImages[image.src] = mc;
        scaledImage = mc;
    }
    ctx.drawImage(scaledImage, x , y);
}

loadImages([beeImage, testImage]).then(imgs => {images = imgs; init()});

function init() {
    console.log(images);
    setInterval(loop, 1000);
}

function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function loop() {
    reset();
    beeX += 1;
    testY += 1;
    drawImage(images.bee, beeX, beeY);
    drawImage(images.test, 0, testY);
    console.log(preScaledImages);
}

function floor(x) {
    return x | 0;
}