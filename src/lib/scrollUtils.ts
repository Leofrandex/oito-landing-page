const HEADER_HEIGHT = 80;

export function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - HEADER_HEIGHT;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}
