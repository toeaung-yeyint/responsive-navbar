const menuBtn = document.querySelector(".menu-btn");
const navBar = document.querySelector(".primary-nav-bar");
const mainMenuItemsWithSubMenu = document.querySelectorAll(
	'.main-menu-item > a[aria-haspopup="true"]'
);
subMenuItems = document.querySelectorAll(".sub-menu");

const toggleMenuButton = () => {
	const isPressed = menuBtn.ariaPressed === "true";
	navBar.classList.toggle("active");
	menuBtn.innerHTML = isPressed ? "&#x2630;" : "&#x2716;";
	menuBtn.setAttribute("aria-pressed", isPressed ? "false" : "true");
	menuBtn.setAttribute("aria-expanded", isPressed ? "false" : "true");
};

const toggleSubMenu = (item) => {
	const isPressed = item.ariaPressed === "true";
	item.nextElementSibling.classList.toggle("active");
	item.querySelector("span:nth-child(2)").textContent = isPressed ? "+" : "-";
	item.setAttribute("aria-pressed", isPressed ? "false" : "true");
	item.setAttribute("aria-expanded", isPressed ? "false" : "true");
	if (window.innerWidth > 901 && !isPressed) {
		item.nextElementSibling.querySelector("a").focus();
	}
};

const handleEscapeKey = (e) => {
	if (e.key === "Escape") {
		e.currentTarget.classList.remove("active");
		e.currentTarget.previousElementSibling.querySelector(
			"span:nth-child(2)"
		).textContent = "+";
		e.currentTarget.previousElementSibling.setAttribute(
			"aria-pressed",
			"false"
		);
		e.currentTarget.previousElementSibling.setAttribute(
			"aria-expanded",
			"false"
		);
		e.currentTarget.previousElementSibling.focus();
	}
};

const handleFocusOut = (e) => {
	if (window.innerWidth > 901 && !e.currentTarget.contains(e.relatedTarget)) {
		e.currentTarget.classList.remove("active");
		e.currentTarget.previousElementSibling.setAttribute(
			"aria-pressed",
			"false"
		);
		e.currentTarget.previousElementSibling.setAttribute(
			"aria-expanded",
			"false"
		);
	}
};

const handleResize = () => {
	if (window.innerWidth > 901) {
		navBar.classList.remove("active");
		menuBtn.innerHTML = "&#x2630;";
		menuBtn.setAttribute("aria-pressed", "false");
		menuBtn.setAttribute("aria-expanded", "false");
		mainMenuItemsWithSubMenu.forEach((item) => {
			item.nextElementSibling.classList.remove("active");
			item.querySelector("span:nth-child(2)").textContent = "+";
			item.setAttribute("aria-pressed", "false");
			item.setAttribute("aria-expanded", "false");
		});
	}
};

menuBtn.addEventListener("click", toggleMenuButton);

mainMenuItemsWithSubMenu.forEach((item) => {
	item.addEventListener("click", () => toggleSubMenu(item));
});

subMenuItems.forEach((item) => {
	item.addEventListener("keydown", (e) => handleEscapeKey(e));
	item.addEventListener("focusout", (e) => handleFocusOut(e));
});

window.addEventListener("resize", handleResize);
