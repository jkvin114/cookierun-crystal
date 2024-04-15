function addDragEvent(){
    const fabElement = document.getElementById("exp-floating-btn");
    let oldPositionX,
    oldPositionY;
    const move = (e) => {
    if (!fabElement.classList.contains("fab-active")) {
        if (e.type === "touchmove") {
            fabElement.style.top = e.touches[0].clientY + "px";
            fabElement.style.left = e.touches[0].clientX + "px";
            e.stopPropagation()
        } else {
            fabElement.style.top = e.clientY + "px";
            fabElement.style.left = e.clientX + "px";
            e.stopPropagation()
        }
    }
    };

    const mouseDown = (e) => {
    console.log("mouse down ");
    oldPositionY = fabElement.style.top;
    oldPositionX = fabElement.style.left;
    if (e.type === "mousedown") {
        window.addEventListener("mousemove", move);
    } else {
        window.addEventListener("touchmove", move);
    }

    // fabElement.style.transition = "none";
    };

    const mouseUp = (e) => {
    console.log("mouse up");
    if (e.type === "mouseup") {
        window.removeEventListener("mousemove", move);
    } else {
        window.removeEventListener("touchmove", move);
    }
    // fabElement.style.transition = "0.3s ease-in-out left";
    };


    fabElement.addEventListener("mousedown", mouseDown);

    fabElement.addEventListener("mouseup", mouseUp);

    fabElement.addEventListener("touchstart", mouseDown);

    fabElement.addEventListener("touchend", mouseUp);

    fabElement.addEventListener("click", (e) => {
    if (
        oldPositionY === fabElement.style.top &&
        oldPositionX === fabElement.style.left
    ) {
        console.log("close")
        fabElement.classList.toggle("fab-active");
    }
    });
}