// For sidebar active link

document.addEventListener('DOMContentLoaded', function () {
    const currentFolder = window.location.pathname.split('/').slice(-2, -1)[0];
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        const linkFolder = link.getAttribute('href').split('/').slice(-2, -1)[0];
        const parent = link.closest('.dropdown');

        if (linkFolder === currentFolder) {
            // Add 'active' class to the parent sidebar item
            if (parent) {
                parent.classList.add('active');
            } else {
                link.parentElement.classList.add('active');
            }
        }
    });

    // Dropdown menu functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            const parent = this.parentElement;
            const isOpen = parent.classList.contains('active');

            // Close all dropdown menus
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });

            // If the clicked dropdown is not already open, open it
            if (!isOpen) {
                parent.classList.add('active');
            }
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
// dashboard
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop();
    const dashboardLinks = document.querySelectorAll('.dashboard-nav-button a');
    dashboardLinks.forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) {
            link.parentElement.classList.add('active');
        }
    });

    // Collapsible sections
    const latestUpdateHeaders = document.querySelectorAll('.latestupdate-header');
    latestUpdateHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const details = this.nextElementSibling;
            const isOpen = details.classList.contains('open');

            // Close all details sections
            document.querySelectorAll('.latestupdate-details').forEach(detail => {
                detail.classList.remove('open');
            });

            // Rotate all arrows to original position
            document.querySelectorAll('.latestupdate-header').forEach(header => {
                header.classList.remove('active');
            });

            // If the clicked section is not already open, open it
            if (!isOpen) {
                details.classList.add('open');
                this.classList.add('active');
            }
        });
    });
});
document.querySelectorAll('.config-main-section-sidebar ul li a').forEach(link => {
    if (link.href === window.location.href) {
        link.parentElement.classList.add('active');
    }
});

function toggleProfileMenu() {
    const profileDropdown = document.getElementById('profileDropdown');
    const caretIcon = document.querySelector('.caret-icon');

    const isOpen = profileDropdown.classList.contains('open');
    
    profileDropdown.classList.toggle('open');
    caretIcon.classList.toggle('rotate', !isOpen); // Only add if dropdown is opening
}


// Close the dropdown when clicking outside
window.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    const isClickInside = event.target.closest('.header-lastitem') || event.target.closest('#profileDropdown');

    if (!isClickInside && dropdown.classList.contains('open')) {
        dropdown.classList.remove('open');
        document.querySelector('.caret-icon').classList.remove('rotate');
    }
});

