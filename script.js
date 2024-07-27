// Initialize variables
let canvas, ctx, isDrawing = false, lastX = 0, lastY = 0;

window.onload = function() {
    // Get canvas element and context
    canvas = document.getElementById('signatureCanvas');
    const container = document.getElementById('container');
    
        canvas.height = container.clientHeight; // Set canvas height to the container's height
        canvas.width = container.clientWidth; // Set canvas width to the container's width
   
       
        
    if (window.innerWidth < 600) {
        canvas.height = window.innerWidth * 0.95; // Set canvas height to 95% of the viewport height
        canvas.width = window.innerWidth * 0.95; // Set canvas width to 95% of the viewport width
    } 
// 
    ctx = canvas.getContext('2d');
    ctx.fillStyle="white";
    ctx.strokeStyle='black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Add event listeners based on the device type
    if (isTouchDevice()) {
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
        canvas.addEventListener('touchcancel', stopDrawing);
    } else {
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
    }

    document.getElementById('downloadBtn').addEventListener('click', downloadSignature);
};

// Function to check if the device is a touch device
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
}

// Start drawing function
function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    [lastX, lastY] = [e.offsetX || e.touches[0].clientX, e.offsetY || e.touches[0].clientY];
}

// Draw function
function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    const x = e.offsetX || e.touches[0].clientX;
    const y = e.offsetY || e.touches[0].clientY;
    ctx.lineTo(x, y);
    // ctx.strokeStyle = '#000'; 
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

// Stop drawing function
function stopDrawing() {
    isDrawing = false;
}

// Function to download the signature as an image
function downloadSignature() {
    // Get the data URL of the canvas
    // console.log(canvas);
    const dataURL = canvas.toDataURL('image/png');
    // console.log(dataURL);
    // Create a link element
    const link = document.createElement('a');
    // Set the href attribute to the data URL
    link.href = dataURL;
    // Set the download attribute to specify the filename
    link.download = 'signature.png';
    // Trigger a click event on the link to start the download
    link.click();
}


color.addEventListener("change",()=>{
    console.log(color.value);
    ctx.strokeStyle=color.value;
})
