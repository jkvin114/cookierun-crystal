function addDragEvent() {
	const fabElement = document.getElementById("exp-floating-btn")
	const closeElement = document.getElementById("close-floating-btn")
    let margin = 20

	let oldPositionX, oldPositionY
	const move = (e) => {
		if (!fabElement.classList.contains("fab-active")) {
			let x, y
			if (e.type === "touchmove") {
				fabElement.style.top = e.touches[0].clientY + "px"
				fabElement.style.left = e.touches[0].clientX + "px"
				x = e.touches[0].clientX
				y = e.touches[0].clientY
				e.stopPropagation()
			} else {
				fabElement.style.top = e.clientY + "px"
				fabElement.style.left = e.clientX + "px"
				x = e.clientX
				y = e.clientY
				e.stopPropagation()
			}
			const rect = closeElement.getBoundingClientRect()
			$removeClass("#close-floating-btn", "active")

            if (rect.top-margin < y && rect.bottom+margin > y && rect.left-margin < x && rect.right+margin > x) {
				$addClass("#close-floating-btn", "active")
			}
		}
	}

	const mouseDown = (e) => {
		console.log("mouse down ")
		oldPositionY = fabElement.style.top
		oldPositionX = fabElement.style.left
		if (e.type === "mousedown") {
			window.addEventListener("mousemove", move)
		} else {
			window.addEventListener("touchmove", move)
		}			
        $removeClass("#close-floating-btn", "active")

		closeElement.style.display = "block"
		// fabElement.style.transition = "none";
	}

	const mouseUp = (e) => {
		console.log("mouse up")
		if (e.type === "mouseup") {
			window.removeEventListener("mousemove", move)
		} else {
			window.removeEventListener("touchmove", move)
		}

		let x, y
        console.log(e.changedTouches)
		if (e.type === "touchend") {
			x = e.changedTouches[0].clientX
			y = e.changedTouches[0].clientY
		} else {
			x = e.clientX
			y = e.clientY
		}
    console.log(x,y)
		const rect = closeElement.getBoundingClientRect()
		$removeClass("#close-floating-btn", "active")
		if (rect.top-margin < y && rect.bottom+margin > y && rect.left-margin < x && rect.right+margin > x) {
			console.log("close")
			fabElement.style.display = "none"
		}

		closeElement.style.display = "none"

		// fabElement.style.transition = "0.3s ease-in-out left";
	}

	fabElement.addEventListener("mousedown", mouseDown)

	fabElement.addEventListener("mouseup", mouseUp)

	fabElement.addEventListener("touchstart", mouseDown)

	fabElement.addEventListener("touchend", mouseUp)

	fabElement.addEventListener("click", (e) => {
		if (oldPositionY === fabElement.style.top && oldPositionX === fabElement.style.left) {
			console.log("close")
			fabElement.classList.toggle("fab-active")
		}
	})
}
