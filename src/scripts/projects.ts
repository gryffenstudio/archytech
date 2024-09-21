let residentialButton = document.getElementById('residential-filter-button');
let commercialButton = document.getElementById('commercial-filter-button');
let inProgressButton = document.getElementById('in-progress-filter-button');
let showAllButton = document.getElementById('show-all-filter-button');

let residentialUnderline = document.getElementById('residential-underline');
let commercialUnderline = document.getElementById('commercial-underline');
let inProgressUnderline = document.getElementById('in-progress-underline');
let showAllUnderline = document.getElementById('show-all-underline');

let residentialProjectCards = document.getElementsByClassName('residential');
let commercialProjectCards = document.getElementsByClassName('commercial');
let inProgressProjectCards = document.getElementsByClassName('in_progress');

// Store reference to the currently active link
let activeProjectLink: HTMLAnchorElement | null = null;
let touchStartX: number | null = null;
let touchStartY: number | null = null;

enum FilterSelection {
    RESIDENTIAL = 'residential',
    COMMERCIAL = 'commercial',
    IN_PROGRESS = 'in_progress',
    SHOW_ALL = 'show_all',
    LOAD = 'load',
}

// Get all the links with the hover effect
const projectLinks = document.querySelectorAll<HTMLAnchorElement>('a.relative');

// Helper function to toggle hover effect
function toggleHoverEffect(link: HTMLAnchorElement) {
    const pictureShadow = link.querySelector('picture.shadow-md') as HTMLElement;
    const pAbsolute = link.querySelector('p.absolute') as HTMLElement;
    const spanAbsolute = link.querySelector('span.absolute') as HTMLElement;

    if (pictureShadow && pAbsolute && spanAbsolute) {
        pictureShadow.classList.remove('blur-none');
        pictureShadow.classList.add('blur-sm');
        pAbsolute.classList.remove('opacity-0');
        pAbsolute.classList.add('opacity-100');
        spanAbsolute.classList.remove('bg-opacity-0');
        spanAbsolute.classList.add('bg-opacity-20');
    }

    // Update the active link reference
    activeProjectLink = link;
}

// Helper function to reset hover effect
function resetHoverEffect(link: HTMLAnchorElement) {
    const pictureShadow = link.querySelector('picture.shadow-md') as HTMLElement;
    const pAbsolute = link.querySelector('p.absolute') as HTMLElement;
    const spanAbsolute = link.querySelector('span.absolute') as HTMLElement;

    if (pictureShadow && pAbsolute && spanAbsolute) {
        pictureShadow.classList.add('blur-none');
        pictureShadow.classList.remove('blur-sm');
        pAbsolute.classList.add('opacity-0');
        pAbsolute.classList.remove('opacity-100');
        spanAbsolute.classList.add('bg-opacity-0');
        spanAbsolute.classList.remove('bg-opacity-20');
    }
}

// Add event listeners for touch events on each link
projectLinks.forEach((link) => {
    link.addEventListener('touchstart', (event: TouchEvent) => {
        // Reset previous hover effect if another link is touched
        if (activeProjectLink && activeProjectLink !== link) {
            resetHoverEffect(activeProjectLink);
        }

        // Record initial touch position
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;

        // Toggle hover effect on the current link
        toggleHoverEffect(link);
    });

    link.addEventListener('touchend', (event: TouchEvent) => {
        // Check if the link is still active and determine tap vs swipe
        if (activeProjectLink === link && touchStartX !== null && touchStartY !== null) {
            const touch = event.changedTouches[0];
            const deltaX = Math.abs(touch.clientX - touchStartX);
            const deltaY = Math.abs(touch.clientY - touchStartY);

            // Check if the touch was primarily a tap (minimal movement)
            if (deltaX < 10 && deltaY < 10) {
                // Allow navigation to the link's href
                window.location.href = link.href;
            }
        }

        // Reset touch start coordinates
        touchStartX = null;
        touchStartY = null;
    });
});

type ProjectCardElement = HTMLElement & {
    style: {
        transition: string;
    };
};

function filterProjects(filter: FilterSelection) {
    function hideCards(cards: HTMLCollectionOf<Element>) {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i] as HTMLElement;
            card.classList.add('scale-0');
            setTimeout(() => card.classList.add('hidden'), 700);
        }
    }

    function showCards(cards: HTMLCollectionOf<Element>) {
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i] as HTMLElement;
            setTimeout(() => card.classList.remove('hidden'), 700);
            setTimeout(() => card.classList.remove('scale-0'), 1000);
        }
    }

    switch (filter) {
        case FilterSelection.RESIDENTIAL:
            residentialUnderline?.classList.toggle('invisible', false);
            commercialUnderline?.classList.toggle('invisible', true);
            inProgressUnderline?.classList.toggle('invisible', true);
            showAllUnderline?.classList.toggle('invisible', true);

            residentialUnderline?.classList.toggle('after:-translate-x-full', false);
            commercialUnderline?.classList.toggle('after:-translate-x-full', true);
            inProgressUnderline?.classList.toggle('after:-translate-x-full', true);
            showAllUnderline?.classList.toggle('after:-translate-x-full', true);

            residentialButton?.classList.toggle('text-brand-gray', true);
            commercialButton?.classList.toggle('text-brand-gray', false);
            inProgressButton?.classList.toggle('text-brand-gray', false);
            showAllButton?.classList.toggle('text-brand-gray', false);

            hideCards(residentialProjectCards);
            hideCards(commercialProjectCards);
            hideCards(inProgressProjectCards);
            showCards(residentialProjectCards);
            break;

        case FilterSelection.COMMERCIAL:
            residentialUnderline?.classList.toggle('invisible', true);
            commercialUnderline?.classList.toggle('invisible', false);
            inProgressUnderline?.classList.toggle('invisible', true);
            showAllUnderline?.classList.toggle('invisible', true);

            residentialUnderline?.classList.toggle('after:-translate-x-full', true);
            commercialUnderline?.classList.toggle('after:-translate-x-full', false);
            inProgressUnderline?.classList.toggle('after:-translate-x-full', true);
            showAllUnderline?.classList.toggle('after:-translate-x-full', true);

            residentialButton?.classList.toggle('text-brand-gray', false);
            commercialButton?.classList.toggle('text-brand-gray', true);
            inProgressButton?.classList.toggle('text-brand-gray', false);
            showAllButton?.classList.toggle('text-brand-gray', false);

            hideCards(commercialProjectCards);
            hideCards(residentialProjectCards);
            hideCards(inProgressProjectCards);
            showCards(commercialProjectCards);
            break;

        case FilterSelection.IN_PROGRESS:
            residentialUnderline?.classList.toggle('invisible', true);
            commercialUnderline?.classList.toggle('invisible', true);
            inProgressUnderline?.classList.toggle('invisible', false);
            showAllUnderline?.classList.toggle('invisible', true);

            residentialUnderline?.classList.toggle('after:-translate-x-full', true);
            commercialUnderline?.classList.toggle('after:-translate-x-full', true);
            inProgressUnderline?.classList.toggle('after:-translate-x-full', false);
            showAllUnderline?.classList.toggle('after:-translate-x-full', true);

            residentialButton?.classList.toggle('text-brand-gray', false);
            commercialButton?.classList.toggle('text-brand-gray', false);
            inProgressButton?.classList.toggle('text-brand-gray', true);
            showAllButton?.classList.toggle('text-brand-gray', false);

            hideCards(inProgressProjectCards);
            hideCards(residentialProjectCards);
            hideCards(commercialProjectCards);
            showCards(inProgressProjectCards);
            break;

        case FilterSelection.SHOW_ALL:
            residentialUnderline?.classList.toggle('invisible', true);
            commercialUnderline?.classList.toggle('invisible', true);
            inProgressUnderline?.classList.toggle('invisible', true);
            showAllUnderline?.classList.toggle('invisible', false);

            residentialUnderline?.classList.toggle('after:-translate-x-full', true);
            commercialUnderline?.classList.toggle('after:-translate-x-full', true);
            inProgressUnderline?.classList.toggle('after:-translate-x-full', true);
            showAllUnderline?.classList.toggle('after:-translate-x-full', false);

            residentialButton?.classList.toggle('text-brand-gray', false);
            commercialButton?.classList.toggle('text-brand-gray', false);
            inProgressButton?.classList.toggle('text-brand-gray', false);
            showAllButton?.classList.toggle('text-brand-gray', true);

            hideCards(residentialProjectCards);
            hideCards(commercialProjectCards);
            hideCards(inProgressProjectCards);
            showCards(residentialProjectCards);
            showCards(commercialProjectCards);
            showCards(inProgressProjectCards);
            break;
        default:
            residentialUnderline?.classList.toggle('invisible', true);
            commercialUnderline?.classList.toggle('invisible', true);
            inProgressUnderline?.classList.toggle('invisible', true);
            showAllUnderline?.classList.toggle('invisible', false);

            residentialUnderline?.classList.toggle('after:-translate-x-full', true);
            commercialUnderline?.classList.toggle('after:-translate-x-full', true);
            inProgressUnderline?.classList.toggle('after:-translate-x-full', true);
            showAllUnderline?.classList.toggle('after:-translate-x-full', false);

            residentialButton?.classList.toggle('text-brand-gray', false);
            commercialButton?.classList.toggle('text-brand-gray', false);
            inProgressButton?.classList.toggle('text-brand-gray', false);
            showAllButton?.classList.toggle('text-brand-gray', true);
    }
}

// Event listener for residential filter click
document.getElementById('residential-filter-button')?.addEventListener('click', function () {
    filterProjects(FilterSelection.RESIDENTIAL);
});

// Event listener for residential filter click
document.getElementById('commercial-filter-button')?.addEventListener('click', function () {
    filterProjects(FilterSelection.COMMERCIAL);
});

// Event listener for residential filter click
document.getElementById('in-progress-filter-button')?.addEventListener('click', function () {
    filterProjects(FilterSelection.IN_PROGRESS);
});

// Event listener for show all click
document.getElementById('show-all-filter-button')?.addEventListener('click', function () {
    filterProjects(FilterSelection.SHOW_ALL);
});

window.addEventListener('load', () => {
    filterProjects(FilterSelection.LOAD);
});
