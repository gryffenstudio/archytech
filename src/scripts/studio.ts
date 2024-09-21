// Define types
interface DropdownButton extends HTMLButtonElement {
    parentElement: HTMLElement | null;
}

// Get all dropdown buttons
const dropdownButtons: NodeListOf<DropdownButton> = document.querySelectorAll('.dropdown-button');

// Attach click event listener to each dropdown button
dropdownButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const header = getHeaderFromButton(button);
        if (header) {
            toggleDropdown(header);
        }
    });
});

function getHeaderFromButton(button: DropdownButton): HTMLHeadingElement | null {
    const parentElement = button.parentElement;
    if (parentElement && parentElement.querySelector('h3')) {
        const headerElement = parentElement.querySelector('h3') as HTMLHeadingElement;
        return headerElement;
    }
    return null;
}

function toggleDropdown(header: HTMLHeadingElement) {
    const contentDiv = document.getElementById(
        `${header.textContent}-content`,
    ) as HTMLElement | null;
    const arrowIcon = document.getElementById(
        `${header.textContent}-dropdown`,
    ) as HTMLElement | null;

    if (contentDiv && arrowIcon) {
        const isClosed =
            contentDiv.classList.contains('max-h-0') && contentDiv.style.maxHeight === '';
        // Toggle visibility with a delay to enable smooth transition
        setTimeout(() => {
            if (isClosed) {
                // Show dropdown content (slide down animation)
                contentDiv.style.maxHeight = `${contentDiv.scrollHeight}px`;
                contentDiv.classList.add('mb-2'); // Add spacing between paragraph and container
                arrowIcon.classList.add('rotate-180');
                arrowIcon.classList.remove('text-brand-black');
                header.classList.remove('text-brand-black');
                arrowIcon.classList.add('text-brand-purple');
                header.classList.add('text-brand-purple');
            } else {
                // Hide dropdown content (slide up animation)
                contentDiv.style.maxHeight = '';
                contentDiv.classList.remove('mb-2'); // Remove spacing
                arrowIcon.classList.remove('rotate-180');
                arrowIcon.classList.remove('text-brand-purple');
                header.classList.remove('text-brand-purple');
                arrowIcon.classList.add('text-brand-black');
                header.classList.add('text-brand-black');
            }
        }, 100); // Adjust delay as needed for smooth animation
    }
}
