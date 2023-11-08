// Load the JSON data from publications.json
fetch('publications.json')
    .then(response => response.json())
    .then(data => {
        const publicationList = document.getElementById('publication-list');
        const modal = document.getElementById('publication-modal');
        const modalContent = document.getElementById('modal-content');
        const closeModalButton = document.getElementById('close-modal-button');

        // Loop through the publication data and create list items
        // data.forEach((year, index) => {
        for (const yearData of data) {
            for (const year in yearData) {
                const year_seperation = document.createElement("b")
                year_seperation.innerText = `${year}`
                publicationList.appendChild(year_seperation);
                // console.log(`Year: ${year}`);
                for (const publication of yearData[year]) {
                    // console.log(`Title: ${publication.title}`);
                    // console.log(`Citation: ${publication.citation}`);
                    const listItem = document.createElement('li');
                    listItem.classList.add('publication-item');
                    const bib = document.createElement("a");
                    bib.textContent = " .bib";
                    // const publication_title = document.createElement()
                    // listItem.textContent = publication.title;
                    listItem.innerHTML = publication.title;
                    listItem.appendChild(bib);

                    // Add a click event to each list item to open the modal with details
                    bib.addEventListener('click', () => {
                        const detailsHTML = `
                                <br> <div> <b>How to cite</b>: <br> ${publication.how_to_cite}</div> <br>
                                <div> <b>BibTeX</b>: <br> ${publication.citation}</div>
                            `;
                        modalContent.innerHTML = detailsHTML;
                        modal.style.display = 'block';
                    });

                    publicationList.appendChild(listItem);
                }
                const separation = document.createElement("br")
                publicationList.appendChild(separation)
                // console.log('\n'); // Add a line break between years
            }
        }

        // Add an event listener to the close button to hide the modal
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close the modal if the user clicks outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });
