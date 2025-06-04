// DOM elements
const candidatesList = document.getElementById("candidatesList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resultsCount = document.getElementById("resultsCount");

// Get initial candidates from HTML
const initialCandidates = Array.from(candidatesList.querySelectorAll(".candidate-item")).map(item => {
    return {
        element: item,
        name: item.getAttribute("data-name").trim(),
        title: item.getAttribute("data-title").trim(),
        company: item.getAttribute("data-company").trim(),
        rating: parseFloat(item.getAttribute("data-rating")),
        date: new Date(item.getAttribute("data-date"))
    };
});

// Function to render candidates list
function renderCandidates(list) {
    // Clear current list
    candidatesList.innerHTML = "";
    if (list.length === 0) {
        candidatesList.innerHTML = "<p>No candidates found.</p>";
    } else {
        list.forEach(candidate => {
            candidatesList.appendChild(candidate.element);
        });
    }
    resultsCount.textContent = `${list.length} Results`;
}

// Function to filter candidates
function filterCandidates() {
    const searchValue = searchInput.value.toLowerCase();
    return initialCandidates.filter(c =>
        c.name.toLowerCase().includes(searchValue) ||
        c.title.toLowerCase().includes(searchValue) ||
        c.company.toLowerCase().includes(searchValue)
    );
}

// Function to sort candidates
function sortCandidates(list) {
    const sortValue = sortSelect.value;
    let sorted = [...list];
    if (sortValue === "name-asc") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "name-desc") {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortValue === "newest") {
        sorted.sort((a, b) => b.date - a.date);
    } else if (sortValue === "oldest") {
        sorted.sort((a, b) => a.date - b.date);
    } else if (sortValue === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
}

// Initial render
renderCandidates(initialCandidates);

// Search input event
searchInput.addEventListener("input", () => {
    const filtered = filterCandidates();
    const sorted = sortCandidates(filtered);
    renderCandidates(sorted);
});

// Sort select event
sortSelect.addEventListener("change", () => {
    const filtered = filterCandidates();
    const sorted = sortCandidates(filtered);
    renderCandidates(sorted);
});
