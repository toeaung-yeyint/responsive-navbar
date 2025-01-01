const menuBtn = document.querySelector(".menu-btn");
const navBar = document.querySelector(".primary-nav-bar");
const mainMenuItemsWithSubMenu = document.querySelectorAll(
	'.main-menu-item > a[aria-haspopup="true"]'
);
subMenuItems = document.querySelectorAll(".sub-menu");

/**
 * Toggles the visibility of a primary navigation bar and updates the ARIA attributes of menu button for accessibility.
 */
const toggleMenuButton = () => {
	const isPressed = menuBtn.ariaPressed === "true";
	navBar.classList.toggle("active");
	menuBtn.innerHTML = isPressed ? "&#x2630;" : "&#x2716;";
	menuBtn.setAttribute("aria-pressed", isPressed ? "false" : "true");
	menuBtn.setAttribute("aria-expanded", isPressed ? "false" : "true");
};

/**
 * Toggles the visibility of a submenu and updates the ARIA attributes of main menu items for accessibility.
 * @param {HTMLElement} item - The main menu item that was clicked to toggle the submenu.
 */
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

/**
 * Handles the Escape key press event to close a submenu.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
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

/**
 * Handles the focus out event to close a submenu.
 * This function checks if the window's inner width is greater than 901 pixels
 * and if the related target is not a descendant of the current target (a sub menu).
 * If both conditions are met, it close the submenu and updates the ARIA attributes of main menu items.
 * @param {FocusEvent} e - The focus out event object.
 */
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

/**
 * Handles the resize event for the window. If the window's inner width is greater than 901 pixels,
 * it removes the "active" class from the navigation bar, resets the menu button's inner HTML to a
 * hamburger icon, and updates the ARIA attributes for accessibility. Additionally, it iterates
 * through all main menu items with submenus, removes the "active" class from their submenus,
 * resets the submenu toggle text to "+", and updates their ARIA attributes.
 */
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
