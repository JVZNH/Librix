export function initHeaderScrollEffect() {
  window.addEventListener("scroll", () => {
    const contact = document.querySelector(".contact-section");
    const header = document.querySelector(".header-container");

    if (!contact || !header) return;

    const rect = contact.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.25 && rect.bottom > 100) {
      header.classList.add("header-on-contact");
    } else {
      header.classList.remove("header-on-contact");
    }
  });
}
