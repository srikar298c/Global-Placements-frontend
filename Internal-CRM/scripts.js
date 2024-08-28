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
//Projects folder
let projectData = [];

// Fetch project data
fetch('../../../../Internal-CRM/project_data.json')
    .then(response => response.json())
    .then(data => {
        projectData = data;
        populateProjectTable(projectData);
        populateCountryFilter(projectData);
    })
    .catch(error => console.error('Error loading project data:', error));

// Populate the table with project data
function populateProjectTable(data) {
    const tableBody = document.querySelector('#projectTable tbody');
    tableBody.innerHTML = '';

    data.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="checkbox"></td>
            <td>${project.country}</td>
            <td>${project.projectName}</td>
            <td>
                <div class="project-label-container">
                    <span class="label-date">${project.label}</span>
                    <span class="label-${project.status.toLowerCase()}">${project.status}</span>
                </div>
            </td>
            <td>
                ${project.activeMembers.map(member =>
            `<span class="member-name">${member.name}</span>
                    <span class="member-phone">${member.phone}</span>`
        ).join('<br>')}
            </td>
            <td>
                <span class="member-name">${project.createdBy.name}</span>
                <span class="member-phone">${project.createdBy.phone}</span>
            </td>
            <td>
                <span class="icon stats-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                        <path fill="currentColor" d="M1.75 13.25V1.5H.5v12a1.24 1.24 0 0 0 1.22 1H15.5v-1.25z"/>
                        <path fill="currentColor" d="M3.15 8H4.4v3.9H3.15zm3.26-4h1.26v7.9H6.41zm3.27 2h1.25v5.9H9.68zm3.27-3.5h1.25v9.4h-1.25z"/>
                    </svg>
                </span>
                <span class="icon details-icon" data-country="${project.country}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                        <g fill="currentColor">
                            <path d="M25 5h-.17v2H25a1 1 0 0 1 1 1v20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.17V5H7a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3"/>
                            <path d="M23 3h-3V0h-8v3H9v6h14zm-2 4H11V5h3V2h4v3h3z"/>
                            <path d="M10 13h12v2H10zm0 5h12v2H10zm0 5h12v2H10z" class="ouiIcon__fillSecondary"/>
                        </g>
                    </svg>
                </span>
            </td>
        `;
        tableBody.appendChild(row);
    });


}




// Populate the country filter dropdown
function populateCountryFilter(data) {
    const countryFilter = document.getElementById('countryFilter');
    const countries = [...new Set(data.map(project => project.country))];
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
    });
}
// Add an event listener to the country filter dropdown
document.getElementById('countryFilter').addEventListener('change', filterTable);

// Filter the table based on selected country
function filterTable() {
    const selectedCountry = document.getElementById('countryFilter').value;
    const filteredData = selectedCountry
        ? projectData.filter(project => project.country === selectedCountry)
        : projectData;
    populateProjectTable(filteredData);
}
// Show popup with project details
// Show popup with project details
function showPopup(country) {
    const project = projectData.find(p => p.country === country);
    if (!project) return;

    const popup = document.getElementById('popup');
    const popupHeader = popup.querySelector('.project-popup-header');

    popupHeader.querySelector('.country').innerHTML         = ` 📍${project.country}`;
    popupHeader.querySelector('.project-name').innerHTML = `
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M29.29 5H27v2h2v25H7V7h2V5H7a1.75 1.75 0 0 0-2 1.69v25.62A1.7 1.7 0 0 0 6.71 34h22.58A1.7 1.7 0 0 0 31 32.31V6.69A1.7 1.7 0 0 0 29.29 5" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M26 7.33A2.34 2.34 0 0 0 23.67 5h-1.8a4 4 0 0 0-7.75 0h-1.79A2.34 2.34 0 0 0 10 7.33V11h16ZM24 9H12V7.33a.33.33 0 0 1 .33-.33H16V6a2 2 0 0 1 4 0v1h3.67a.33.33 0 0 1 .33.33Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11 14h14v2H11z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="M11 18h14v2H11z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M11 22h14v2H11z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="M11 26h14v2H11z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg> ${project.projectName}`;
    popupHeader.querySelector('.project-status').innerHTML = `
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m20 12l-3.58 5.073q-.314.439-.79.683T14.616 18h-9q-.672 0-1.144-.472T4 16.385v-8.77q0-.67.472-1.143Q4.944 6 5.616 6h9q.557 0 1.024.264q.466.263.78.701zm-1.22 0l-3.203-4.5q-.154-.212-.413-.356Q14.904 7 14.616 7h-9q-.231 0-.424.192T5 7.616v8.769q0 .23.192.423t.423.192h9q.289 0 .549-.144q.259-.144.413-.356zM5 12v5V7z"/></svg> ${project.label} <span class="label-${project.status.toLowerCase()}">${project.status}</span>`;

    popup.classList.add('active');
    showTabContent('eligibility', project);
}

// Show content for the selected tab in popup
function showTabContent(tab, project) {
    const tabContent = document.getElementById('tabContent');
    let content = '';

    switch (tab) {
        case 'eligibility':
            content = `
                <h3>Eligibility Criteria</h3>
                <table class="content-table">
                    <tbody>
                        ${Object.entries(project.eligibilityCriteria).map(([key, value]) => `
                            <tr>
                                <td><strong>${key}</strong></td>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            break;
        case 'perks':
            content = `
                <h3>Perks & Salary</h3>
                <table class="content-table">
                    <tbody>
                        ${Object.entries(project.perksAndSalary).map(([key, value]) => `
                            <tr>
                                <td><strong>${key}</strong></td>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            break;
        case 'procedure':
            content = `
                <h3>Standard Procedure</h3>
                <table class="content-table">
                    <tbody>
                        ${project.standardProcedure.map((step, index) => `
                            <tr>
                                <td><strong>${index + 1}</strong></td>
                                <td>${step}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            break;
        case 'charges':
            content = `
                <h3>Service Charges</h3>
                <table class="content-table">
                    <tbody>
                        ${Object.entries(project.serviceCharges).map(([key, value]) => `
                            <tr>
                                <td><strong>${key}</strong></td>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            break;
    }

    tabContent.innerHTML = content;
}

// Event listeners for the projects page
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');

    // Show popup on clicking the project details icon
    document.querySelector('#projectTable tbody').addEventListener('click', (e) => {
        const detailsIcon = e.target.closest('.details-icon');
        if (detailsIcon) {
            const country = detailsIcon.dataset.country;
            showPopup(country);
        }
    });

    // Close popup when clicking the close button
    popup.querySelector('.project-popup-close').addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // Handle tab switching
    popup.querySelector('.project-popup-tabs').addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.project-popup-tab');
        if (tabBtn) {
            document.querySelectorAll('.project-popup-tab').forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');
            const tab = tabBtn.dataset.tab;
            const country = popup.querySelector('.country').textContent.trim().slice(2); // Remove the 📍 emoji
            const project = projectData.find(p => p.country === country);
            showTabContent(tab, project);
        }
    });

    // Close popup when clicking outside the popup content
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the button and popup elements
    const addCandidateButton = document.getElementById("addCandidate");
    const popupOverlay = document.getElementById("addACandidatePopupOverlay");
    const closePopupButton = document.querySelector(".closeAddACandidate");

    // Function to open the popup
    function openPopup() {
        popupOverlay.style.display = "block";
    }

    // Function to close the popup
    function closePopup() {
        popupOverlay.style.display = "none";
    }

    // Add event listener to the "Add Candidate" button
    addCandidateButton.addEventListener("click", openPopup);

    // Add event listener to the close button inside the popup
    closePopupButton.addEventListener("click", closePopup);

    // Optional: Close the popup when clicking outside the popup content
    popupOverlay.addEventListener("click", function(event) {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });
});
document.getElementById('sameAddress').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('permanentAddress').value = document.getElementById('presentAddress').value;
        document.getElementById('permanentCity').value = document.getElementById('presentCity').value;
        document.getElementById('permanentState').value = document.getElementById('presentState').value;
        document.getElementById('permanentCountry').value = document.getElementById('presentCountry').value;
        document.getElementById('permanentPincode').value = document.getElementById('presentPincode').value;
    } else {
        document.getElementById('permanentAddress').value = '';
        document.getElementById('permanentCity').value = '';
        document.getElementById('permanentState').value = '';
        document.getElementById('permanentCountry').value = '';
        document.getElementById('permanentPincode').value = '';
    }
});
// Get references to the elements
const countryContainer = document.getElementById('countryContainer');
const countryInput = document.getElementById('countryInput');

// Function to create a new label
function addCountryLabel(countryName) {
    const label = document.createElement('div');
    label.className = 'country-label';
    
    const span = document.createElement('span');
    span.textContent = countryName;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
        countryContainer.removeChild(label);
    });

    label.appendChild(span);
    label.appendChild(removeButton);
    countryContainer.appendChild(label);
}

// Event listener for adding a country on pressing Enter
countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && countryInput.value.trim() !== '') {
        addCountryLabel(countryInput.value.trim());
        countryInput.value = '';
    }
});

document.querySelectorAll('#projectTable th').forEach(headerCell => {
    headerCell.addEventListener('click', () => {
        const columnIndex = headerCell.cellIndex;
        const isAscending = headerCell.classList.contains('th-sort-asc');

        sortTable(columnIndex, !isAscending);
    });
});


function sortTable(columnIndex, ascending) {
    const tbody = document.querySelector('#projectTable tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${columnIndex + 1})`).textContent.trim();

        return ascending ? aColText.localeCompare(bColText) : bColText.localeCompare(aColText);
    });

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    tbody.append(...rows);

    document.querySelectorAll('#projectTable th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    document.querySelector(`#projectTable th:nth-child(${columnIndex + 1})`).classList.toggle('th-sort-asc', ascending);
    document.querySelector(`#projectTable th:nth-child(${columnIndex + 1})`).classList.toggle('th-sort-desc', !ascending);
}

let candidatesData = [];

async function fetchData() {
    try {
        const response = await fetch('../../../../Internal-CRM/global-data.json');
        candidatesData = await response.json();
        populateFilterOptions();
        populateGlobalDatabaseTable(candidatesData);
        setupFiltersAndSearch();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createCandidateTableRow(data) {
    const tr = document.createElement('tr');
    tr.className = 'leads-candidate-data';

    tr.innerHTML = `
        <td><input type="checkbox" class="checkbox"></td>
        <td class="caret-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path fill="currentColor" d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"/></svg></td>
        <td>
            <img src="${data['display picture']}" alt="${data.name}" class="candidate-image">
            ${data.id}
        </td>
        <td>${data.name}</td>
        <td>${data.mobileNumber}</td>
        <td>${data.email}</td>
        <td>${data.experience}</td>
        <td>${data.department}</td>
        <td>${data.qualification}</td>
        <td>
            <select class="status-select">
                <option value="active" ${data.status === 'Active' ? 'selected' : ''}>Active</option>
                <option value="inactive" ${data.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
        </td>
        <td>
            <div class="action-dots"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C14.787 4 17.263 5.257 19.026 6.813C19.911 7.594 20.64 8.471 21.154 9.344C21.659 10.201 22 11.13 22 12C22 12.87 21.66 13.799 21.154 14.656C20.64 15.529 19.911 16.406 19.026 17.187C17.263 18.743 14.786 20 12 20C9.213 20 6.737 18.743 4.974 17.187C4.089 16.406 3.36 15.529 2.846 14.656C2.34 13.799 2 12.87 2 12C2 11.13 2.34 10.201 2.846 9.344C3.36 8.471 4.089 7.594 4.974 6.813C6.737 5.257 9.214 4 12 4ZM12 6C9.816 6 7.792 6.993 6.298 8.312C5.554 8.968 4.966 9.685 4.569 10.359C4.163 11.049 4 11.62 4 12C4 12.38 4.163 12.951 4.569 13.641C4.966 14.315 5.554 15.031 6.298 15.688C7.792 17.007 9.816 18 12 18C14.184 18 16.208 17.007 17.702 15.688C18.446 15.031 19.034 14.315 19.431 13.641C19.837 12.951 20 12.38 20 12C20 11.62 19.837 11.049 19.431 10.359C19.034 9.685 18.446 8.969 17.702 8.312C16.208 6.993 14.184 6 12 6ZM12 9C12.088 9 12.175 9.00367 12.261 9.011C12.0439 9.39185 11.9579 9.8335 12.0163 10.268C12.0747 10.7025 12.2743 11.1057 12.5843 11.4157C12.8943 11.7257 13.2975 11.9253 13.732 11.9837C14.1665 12.0421 14.6081 11.9561 14.989 11.739C15.0416 12.3412 14.911 12.9452 14.6145 13.4719C14.3179 13.9986 13.8692 14.4234 13.327 14.6907C12.7849 14.958 12.1746 15.0553 11.5762 14.9699C10.9778 14.8844 10.4192 14.6202 9.97357 14.2118C9.52792 13.8034 9.21603 13.27 9.07876 12.6813C8.94149 12.0926 8.98524 11.4762 9.20429 10.9128C9.42334 10.3495 9.80746 9.8654 10.3063 9.52407C10.8052 9.18274 11.3955 9.00008 12 9Z" fill="#005F6B"/>
</svg>
</div>
        </td>
    `;

    const additionalInfoRow = document.createElement('tr');
    additionalInfoRow.className = 'additional-info';
    additionalInfoRow.style.display = 'none';
    additionalInfoRow.innerHTML = `
    <td colspan="11">
    <div class = 'additional-info-row'>

            <div class="info-group"><span class="info-label">Gender:</span>${data.gender}</div>
            <div class="info-group"><span class="info-label">Passport:</span>${data.passportNumber || 'Not Available'}</div>
            <div class="info-group"><span class="info-label">Client Label:</span>${data.clients.label}</div>
            <div class="info-group"><span class="info-label">Client Status:</span>${data.clients.clientStatus}</div>
    <div class="button-group">
               <button class="icon-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z"/>
                        </svg></button>
                <button class="icon-button assign-client-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><rect width="20" height="20" fill="none"/><path fill="currentColor" d="M9.467 0c3.184 0 5.765 2.566 5.765 5.732a5.7 5.7 0 0 1-2.02 4.358q.405.2.738.403q.716.435 1.49 1.079a.685.685 0 0 1 .086.969a.694.694 0 0 1-.975.086a11 11 0 0 0-1.322-.96a11 11 0 0 0-1.405-.703a5.8 5.8 0 0 1-2.357.5a5.8 5.8 0 0 1-2.58-.605l-.042.02c-1.95.756-3.373 1.874-4.292 3.358c-.922 1.489-1.299 3.153-1.13 5.014a.69.69 0 0 1-.628.746a.69.69 0 0 1-.75-.623c-.195-2.152.249-4.113 1.33-5.858c.95-1.536 2.347-2.73 4.174-3.582a5.7 5.7 0 0 1-1.846-4.202C3.703 2.566 6.283 0 9.467 0m7.401 12.693c.38 0 .688.31.688.691v1.752h1.752a.69.69 0 0 1 .692.689a.69.69 0 0 1-.692.687h-1.752v1.753a.69.69 0 0 1-.688.691a.69.69 0 0 1-.688-.691v-1.753h-1.752a.69.69 0 0 1-.692-.687c0-.38.31-.688.692-.688l1.752-.001v-1.752a.69.69 0 0 1 .688-.691m-7.4-11.317c-2.42 0-4.382 1.95-4.382 4.356s1.962 4.357 4.381 4.357s4.381-1.95 4.381-4.357s-1.961-4.356-4.38-4.356"/></svg></button>
                <button class="icon-button graph-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 100 100">
                <path fill="currentColor" d="M46.05 60.163H31.923c-.836 0-1.513.677-1.513 1.513V83.61c0 .836.677 1.513 1.513 1.513H46.05c.836 0 1.512-.677 1.512-1.513V61.675c0-.836-.677-1.512-1.512-1.512m22.027-45.285H53.95c-.836 0-1.513.677-1.513 1.513v67.218c0 .836.677 1.513 1.513 1.513h14.127c.836 0 1.513-.677 1.513-1.513V16.391c0-.836-.677-1.513-1.513-1.513m22.14 20.421H76.09c-.836 0-1.513.677-1.513 1.513v46.797c0 .836.677 1.513 1.513 1.513h14.126c.836 0 1.513-.677 1.513-1.513V36.812c0-.835-.677-1.513-1.512-1.513m-66.307 0H9.783c-.836 0-1.513.677-1.513 1.513v46.797c0 .836.677 1.513 1.513 1.513H23.91c.836 0 1.513-.677 1.513-1.513V36.812c0-.835-.677-1.513-1.513-1.513"/>
                </svg></button>
                <button class="icon-button flag-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
            <path fill="currentColor" d="M42.76 50A8 8 0 0 0 40 56v168a8 8 0 0 0 16 0v-44.23c26.79-21.16 49.87-9.75 76.45 3.41c16.4 8.11 34.06 16.85 53 16.85c13.93 0 28.54-4.75 43.82-18a8 8 0 0 0 2.76-6V56a8 8 0 0 0-13.27-6c-28 24.23-51.72 12.49-79.21-1.12C111.07 34.76 78.78 18.79 42.76 50M216 172.25c-26.79 21.16-49.87 9.74-76.45-3.41c-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16 49.87-9.75 76.45 3.4c25 12.35 52.82 26.13 83.55 8.4Z"/>
            </svg></button>
                <button class="icon-button reject-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
             <path fill="currentColor" d="M15 13h1.5v2.82l2.44 1.41l-.75 1.3L15 16.69zm8 3c0 3.87-3.13 7-7 7c-1.91 0-3.64-.76-4.9-2H8c-1.1 0-2-.9-2-2V7h12v2.29c2.89.86 5 3.54 5 6.71M9 16c0-3.87 3.13-7 7-7H8v10h1.67c-.43-.91-.67-1.93-.67-3m7-5c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m-.5-7H19v2H5V4h3.5l1-1h5z"/>
            </svg></button>
                <button class="icon-button add-new-task-button"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.03 11.03a.75.75 0 1 0-1.06-1.06L11 14.94l-1.97-1.97a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0zm-1.036-6.946A2.25 2.25 0 0 0 13.75 2h-3.5a2.25 2.25 0 0 0-2.236 2H6.25A2.25 2.25 0 0 0 4 6.25v13.5A2.25 2.25 0 0 0 6.25 22h11.5A2.25 2.25 0 0 0 20 19.75V6.25A2.25 2.25 0 0 0 17.75 4h-1.764zm0 .012L16 4.25q0-.078-.005-.154M10.25 6.5h3.5c.78 0 1.467-.397 1.871-1h2.129a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H6.25a.75.75 0 0 1-.75-.75V6.25a.75.75 0 0 1 .75-.75h2.129c.404.603 1.091 1 1.871 1m0-3h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1 0-1.5"/></svg></button>
                <button class="icon-button add-new-reminder-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
             <path fill="currentColor" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z"/>
                </svg></button>
                
                <button class="submit-button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68zm-13 5l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"/>
            </svg>Submit</button>
            </div>
            </div>
            <div class="comments-section">
            <input type="text" class="comments-input" placeholder="Comments">
            <span class="timestamp">12:34 PM</span>
        </div>
        </td>
    `;

    const caretIcon = tr.querySelector('.caret-icon');
    caretIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        additionalInfoRow.style.display = additionalInfoRow.style.display === 'none' ? 'table-row' : 'none';
        caretIcon.classList.toggle('open');
    });

    const checkbox = tr.querySelector('.checkbox');
    checkbox.addEventListener('change', updateSelectAllCheckbox);

    return [tr, additionalInfoRow];
}

function populateGlobalDatabaseTable(candidatesData) {
    const table = document.getElementById('candidateTable');
    const tbody = table.querySelector('tbody') || table.createTBody();

    tbody.innerHTML = ''; // Clear existing rows

    candidatesData.forEach(data => {
        const [candidateRow, additionalInfoRow] = createCandidateTableRow(data);
        tbody.appendChild(candidateRow);
        tbody.appendChild(additionalInfoRow);
    });

    const selectAllCheckbox = document.getElementById('selectAll');
    selectAllCheckbox.addEventListener('change', function () {
        const checkboxes = tbody.querySelectorAll('.checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.checkbox');
    selectAllCheckbox.checked = Array.from(checkboxes).every(checkbox => checkbox.checked);
}


function populateFilterOptions() {
    const filters = {
        'statusFilter': 'status',
        'genderFilter': 'gender',
        'ageFilter': 'age',
        'qualificationFilter': 'qualification',
        'departmentFilter': 'department',
        'degreeFilter': 'degree',
        'examStatusFilter': 'examStatus',
        'experienceFilter': 'experience'
    };

    Object.entries(filters).forEach(([filterId, dataKey]) => {
        const filterElement = document.getElementById(filterId);
        const uniqueValues = [...new Set(candidatesData.map(candidate => candidate[dataKey]))];

        // Keep the first option (e.g., "Status", "Gender", etc.)
        const firstOption = filterElement.options[0];
        filterElement.innerHTML = '';
        filterElement.appendChild(firstOption);

        // Add other options
        uniqueValues.forEach(value => {
            if (value && value !== firstOption.textContent) {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                filterElement.appendChild(option);
            }
        });
    });
}
function applyFilters() {
    const filters = {
        status: document.getElementById('statusFilter').value,
        gender: document.getElementById('genderFilter').value,
        age: document.getElementById('ageFilter').value,
        qualification: document.getElementById('qualificationFilter').value,
        department: document.getElementById('departmentFilter').value,
        degree: document.getElementById('degreeFilter').value,
        examStatus: document.getElementById('examStatusFilter').value,
        experience: document.getElementById('experienceFilter').value
    };

    const searchKeyword = document.getElementById('searchInput').value.toLowerCase();

    const filteredData = candidatesData.filter(candidate => {
        return Object.entries(filters).every(([key, value]) =>
            value === '' || candidate[key] === value
        ) && (searchKeyword === '' || JSON.stringify(candidate).toLowerCase().includes(searchKeyword));
    });

    updateFilterCount(filteredData.length);
    populateGlobalDatabaseTable(filteredData);
}

function updateFilterCount(count) {
    document.querySelector('.filter-count').textContent = count;
}function setupFiltersAndSearch() {
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => select.addEventListener('change', applyFilters));

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', applyFilters);

    const filterBtn = document.getElementById('filterBtn');
    filterBtn.addEventListener('click', applyFilters);
}

function setupPopups() {
    const assignAClientPopup = document.getElementById('assignAClientPopupOverlay');
const assignAClientCloseButton = document.getElementById('closeAssignAClientPopup');
    const graphPopup = document.getElementById('graphPopupOverlay');
    const graphCloseButton = document.getElementById('closeGraphPopup');
    
    const flagPopup = document.getElementById('flagPopupOverlay');
    const flagCloseButton = document.getElementById('closeFlagPopup');
    const rejectPopup = document.getElementById('rejectPopupOverlay');
    const rejectCloseButton = document.getElementById('closeRejectPopup');
    const addNewTaskPopup = document.getElementById('addNewTaskPopupOverlay');
    const addNewTaskCloseButton = document.getElementById('closeAddNewTaskPopup');
    const addNewReminderPopup = document.getElementById('addNewReminderPopupOverlay');
    const addNewReminderCloseButton = document.getElementById('closeAddNewReminderPopup');

    if (assignAClientPopup && assignAClientCloseButton) {
    // Use event delegation for assign-a-client buttons
    document.addEventListener('click', function(event) {
        if (event.target.closest('.assign-client-button')) {
            assignAClientPopup.style.display = 'block';
        }
    });

    assignAClientCloseButton.addEventListener('click', () => assignAClientPopup.style.display = 'none');
    
    assignAClientPopup.addEventListener('click', (event) => {
        if (event.target === assignAClientPopup) assignAClientPopup.style.display = 'none';
    });
} else {
    console.error('Assign-a-client popup elements not found');
    }
    
    if (graphPopup && graphCloseButton) {
        // Use event delegation for graph buttons
        document.addEventListener('click', function(event) {
            if (event.target.closest('.graph-button')) {
                graphPopup.style.display = 'block';
            }
        });

        graphCloseButton.addEventListener('click', () => graphPopup.style.display = 'none');
        graphPopup.addEventListener('click', (event) => {
            if (event.target === graphPopup) graphPopup.style.display = 'none';
        });
    } else {
        console.error('Graph popup elements not found');
    }

    if (flagPopup && flagCloseButton) {
        // Use event delegation for flag buttons
        document.addEventListener('click', function(event) {
            if (event.target.closest('.flag-button')) {
                flagPopup.style.display = 'block';
            }
        });

        flagCloseButton.addEventListener('click', () => flagPopup.style.display = 'none');
        flagPopup.addEventListener('click', (event) => {
            if (event.target === flagPopup) flagPopup.style.display = 'none';
        });
    } else {
        console.error('Flag popup elements not found');
    }

    if (rejectPopup && rejectCloseButton) {
        // Use event delegation for reject buttons
        document.addEventListener('click', function(event) {
            if (event.target.closest('.reject-button')) {
                rejectPopup.style.display = 'block';
            }
        });

        rejectCloseButton.addEventListener('click', () => rejectPopup.style.display = 'none');
        rejectPopup.addEventListener('click', (event) => {
            if (event.target === rejectPopup) rejectPopup.style.display = 'none';
        });
    } else {
        console.error('Reject popup elements not found');
    }

    if (addNewTaskPopup && addNewTaskCloseButton) {
        // Use event delegation for add new task buttons
        document.addEventListener('click', function(event) {
            if (event.target.closest('.add-new-task-button')) {
                addNewTaskPopup.style.display = 'block';
            }
        });

        addNewTaskCloseButton.addEventListener('click', () => addNewTaskPopup.style.display = 'none');
        addNewTaskPopup.addEventListener('click', (event) => {
            if (event.target === addNewTaskPopup) addNewTaskPopup.style.display = 'none';
        });
    } else {
        console.error('Add new task popup elements not found');
    }

    if (addNewReminderPopup && addNewReminderCloseButton) {
        // Use event delegation for add new reminder buttons
        document.addEventListener('click', function(event) {
            if (event.target.closest('.add-new-reminder-button')) {
                addNewReminderPopup.style.display = 'block';
            }
        });

        addNewReminderCloseButton.addEventListener('click', () => addNewReminderPopup.style.display = 'none');
        addNewReminderPopup.addEventListener('click', (event) => {
            if (event.target === addNewReminderPopup) addNewReminderPopup.style.display = 'none';
        });
    } else {
        console.error('Add new reminder popup elements not found');
    }

    const advancedFilterBtn = document.getElementById('advancedFilterBtn');
    const advancedPopup = document.querySelector('.advanced-popup-overlay');
    const advancedCloseButton = document.getElementById('advancedClosePopup');
    
    if (advancedFilterBtn && advancedPopup && advancedCloseButton) {
        setupPopup(advancedFilterBtn, advancedPopup, advancedCloseButton);
    } else {
        console.error('Advanced filter popup elements not found');
    }

    setupAdvancedFilterSidebar(); // Call this function to set up the sidebar functionality
}

function setupPopup(openButton, popup, closeButton) {
    openButton.addEventListener('click', () => {
        popup.style.display = 'block';
        if (popup.id === 'advancedPopupOverlay') {
            positionAdvancedPopup(openButton, popup);
        }
    });

    closeButton.addEventListener('click', () => popup.style.display = 'none');
    popup.addEventListener('click', (event) => {
        if (event.target === popup) popup.style.display = 'none';
    });
}

function setupAdvancedFilterSidebar() {
    const sidebarItems = document.querySelectorAll('.advanced-filter-sidebar li');
    const contentSections = document.querySelectorAll('.advanced-filter-content-section');

    if (sidebarItems.length > 0 && contentSections.length > 0) {
        // Set the first sidebar item and corresponding content section as active by default
        sidebarItems[0].classList.add('active');
        contentSections[0].classList.add('active');

        sidebarItems.forEach(function (item, index) {
            item.addEventListener('click', function () {
                // Remove 'active' class from all content sections
                contentSections.forEach(function (section) {
                    section.classList.remove('active');
                });

                // Add 'active' class to the clicked section
                const filterId = this.getAttribute('data-filter') + 'Filter';
                document.getElementById(filterId).classList.add('active');

                // Remove 'active' class from all sidebar items
                sidebarItems.forEach(function (li) {
                    li.classList.remove('active');
                });

                // Add 'active' class to the clicked sidebar item
                this.classList.add('active');
            });
        });
    } else {
        console.error('Sidebar items or content sections not found');
    }
}


function initializeApp() {
    fetchData().then(() => {
        populateGlobalDatabaseTable(candidatesData);
        setupPopups();
        setupFiltersAndSearch();
        updateSelectAllCheckbox();
    });
}


document.addEventListener('DOMContentLoaded', initializeApp);

