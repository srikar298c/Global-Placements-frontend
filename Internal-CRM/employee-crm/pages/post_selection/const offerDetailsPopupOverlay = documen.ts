 const offerDetailsPopupOverlay = document.getElementById('acceptedOfferDetailsPopupOverlay');
        const offerDetailsPopupCloseButton = document.getElementById('closeAcceptedOfferPopup');

        // Check if popup elements exist
        if (offerDetailsPopupOverlay && offerDetailsPopupCloseButton) {
            // Open Popup Event
            document.addEventListener('click', function (event) {
                if (event.target.closest('.accepted-offer-details-button')) {
                    offerDetailsPopupOverlay.style.display = 'block';
                }
            });

            // Close Popup Event
            offerDetailsPopupCloseButton.addEventListener('click', () => {
                offerDetailsPopupOverlay.style.display = 'none';
            });

            // Close Popup When Clicking Outside the Content
            offerDetailsPopupOverlay.addEventListener('click', (event) => {
                if (event.target === offerDetailsPopupOverlay) {
                    offerDetailsPopupOverlay.style.display = 'none';
                }
            });
        } else {
            console.error('Offer Details Popup elements not found.');
        }

        // Input and Save Button Elements
        const saveOfferDetailsButton = document.querySelector('.confirm-button'); // Save Button
        const offerDetailsHeadingList = document.querySelector('.offer-heading-list'); // List container

        // Ensure all elements exist
        if (saveOfferDetailsButton && offerDetailsHeadingList) {
            saveOfferDetailsButton.addEventListener('click', function () {
                // Get input values
                const inputLabelName = document.getElementById('labelName').value.trim();
                const inputDetails = document.getElementById('details').value.trim();

                // Validate Inputs
                if (inputLabelName === '' || inputDetails === '') {
                    alert('Please fill in both Label Name and Details.');
                    return;
                }

                // Create New List Item
                const newHeadingItem = document.createElement('li');
                newHeadingItem.innerHTML = `
            <div class="heading-row">
                <p class="heading-title">${inputLabelName}:</p>
                <p class="heading-text">${inputDetails}</p>
            </div>
        `;

                // Append New Item to the List
                offerDetailsHeadingList.appendChild(newHeadingItem);

                // Clear Input Fields
                document.getElementById('labelName').value = '';
                document.getElementById('details').value = '';

                // Make List Scrollable if More than 2 Items
                if (offerDetailsHeadingList.children.length > 2) {
                    offerDetailsHeadingList.style.maxHeight = '200px'; // Adjust as needed
                    offerDetailsHeadingList.style.overflowY = 'auto';
                }
            });
        } else {
            console.error('Save button or Heading List not found.');
        }
        // Popup Elements for Reject Offer
        const rejectedOfferDetailsPopupOverlay = document.getElementById('rejectedOfferDetailsPopupOverlay');
        const rejectedOfferDetailsCloseButton = document.getElementById('closeRejectedOfferPopup');

        // Check if popup elements exist
        if (rejectedOfferDetailsPopupOverlay && rejectedOfferDetailsCloseButton) {
            // Open Popup Event
            document.addEventListener('click', function (event) {
                if (event.target.closest('.rejected-offer-details-button')) {
                    rejectedOfferDetailsPopupOverlay.style.display = 'block';
                }
            });

            // Close Popup Event
            rejectedOfferDetailsCloseButton.addEventListener('click', () => {
                rejectedOfferDetailsPopupOverlay.style.display = 'none';
            });

            // Close Popup When Clicking Outside the Content
            rejectedOfferDetailsPopupOverlay.addEventListener('click', (event) => {
                if (event.target === rejectedOfferDetailsPopupOverlay) {
                    rejectedOfferDetailsPopupOverlay.style.display = 'none';
                }
            });
        } else {
            console.error('Reject Offer Popup elements not found.');
        }

        // Input and Save Button Elements
        const saveRejectedOfferButton = document.getElementById('saveRejectedOfferButton'); // Save Button
        const rejectedOfferHeadingList = document.getElementById('rejectedOfferHeadingList'); // List container

        // Ensure all elements exist
        if (saveRejectedOfferButton && rejectedOfferHeadingList) {
            saveRejectedOfferButton.addEventListener('click', function () {
                // Get input values
                const rejectedLabelName = document.getElementById('rejectedLabelName').value.trim();
                const rejectedDetails = document.getElementById('rejectedDetails').value.trim();

                // Validate Inputs
                if (rejectedLabelName === '' || rejectedDetails === '') {
                    alert('Please fill in both Label Name and Details.');
                    return;
                }

                // Create New List Item
                const newRejectedHeadingItem = document.createElement('li');
                newRejectedHeadingItem.innerHTML = `
            <div class="heading-row">
                <p class="heading-title">${rejectedLabelName}:</p>
                <p class="heading-text">${rejectedDetails}</p>
            </div>
        `;

                // Append New Item to the List
                rejectedOfferHeadingList.appendChild(newRejectedHeadingItem);

                // Clear Input Fields
                document.getElementById('rejectedLabelName').value = '';
                document.getElementById('rejectedDetails').value = '';

                // Make List Scrollable if More than 2 Items
                if (rejectedOfferHeadingList.children.length > 2) {
                    rejectedOfferHeadingList.style.maxHeight = '200px'; // Adjust as needed
                    rejectedOfferHeadingList.style.overflowY = 'auto';
                }
            });
        } else {
            console.error('Save button or Rejected Heading List not found.');
        }