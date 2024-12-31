const menuBtn = document.querySelector(".menu-btn");
const navBar = document.querySelector(".primary-nav-bar");

const toggleMenuButton = () => {
	const isPressed = menuBtn.ariaPressed === "true";
	navBar.classList.toggle("active");
	menuBtn.innerHTML = isPressed ? "&#x2630;" : "&#x2716;";
	menuBtn.setAttribute("aria-pressed", isPressed ? "false" : "true");
};
menuBtn.addEventListener("click", toggleMenuButton);

const mainItems = document.querySelectorAll(
	'.main-menu-item > a[aria-haspopup="true"]'
);

const toggleSubMenu = (item) => {
	const isPressed = item.ariaPressed === "true";
	item.nextElementSibling.classList.toggle("active");
	item.setAttribute("aria-pressed", isPressed ? "false" : "true");
	item.setAttribute("aria-expanded", isPressed ? "false" : "true");
	item.querySelector("span:nth-child(2)").textContent = isPressed ? "+" : "-";
};

mainItems.forEach((item) => {
	item.addEventListener("click", () => toggleSubMenu(item));
});

const handleResize = () => {
	if (window.innerWidth > 901) {
		navBar.classList.remove("active");
		menuBtn.innerHTML = "&#x2630;";
		menuBtn.setAttribute("aria-pressed", "false");
		mainItems.forEach((item) => {
			const submenu = item.nextElementSibling;
			submenu.classList.remove("active");
			item.setAttribute("aria-pressed", "false");
			item.setAttribute("aria-expanded", "false");
			item.querySelector("span:nth-child(2)").textContent = "+";
		});
	}
};

window.addEventListener("resize", handleResize);
