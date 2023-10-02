document.getElementById("velocityForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const distance = parseFloat(document.getElementById("distance").value);
    const time = parseFloat(document.getElementById("time").value);
    
    if (!isNaN(distance) && !isNaN(time) && time !== 0) {
        const velocity = distance / time;
        document.getElementById("velocity").textContent = velocity.toFixed(2);
    } else {
        document.getElementById("velocity").textContent = "Invalid input";
    }
});
