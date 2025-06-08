document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchForm = document.getElementById("search-form");
  const sortSelect = document.getElementById("sort-select");
  const tbody = document.getElementById("applicants-tbody");
  const noResults = document.getElementById("no-results");
  const applicantsCount = document.getElementById("applicants-count");

  const originalRows = Array.from(tbody.querySelectorAll("tr"));
  let currentRows = Array.from(originalRows);

  function updateResultsCount() {
    const visibleCount = Array.from(tbody.querySelectorAll("tr")).filter(
      (row) => row.style.display !== "none"
    ).length;
    applicantsCount.textContent = visibleCount;
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }

  tbody.addEventListener("click", function (e) {
    if (e.target.closest(".delete")) {
      const row = e.target.closest("tr");
      if (row) {
        row.remove();
        updateResultsCount();
      }
    }

    if (e.target.closest(".reject")) {
      const row = e.target.closest("tr");
      if (row) {
        const statusSpan = row.querySelector(".status-badge");
        statusSpan.textContent = "Rejected";
        statusSpan.className = "status-badge rejected";
      }
    }

    if (e.target.closest(".approve")) {
      const row = e.target.closest("tr");
      if (row) {
        const statusSpan = row.querySelector(".status-badge");
        statusSpan.textContent = "Approved";
        statusSpan.className = "status-badge approved";
      }
    }
  });

  function filterByStatus(status) {
    currentRows.forEach((row) => {
      if (status === "default") {
        row.style.display = "";
      } else {
        const statusClass = row.querySelector(".status-badge").className;
        console.log("______________________");
        console.log(statusClass);

        row.style.display = statusClass.includes(status) ? "" : "none";
      }
    });
    updateResultsCount();
  }

  function applySearch() {
    const searchTerm = searchInput.value.toLowerCase();

    currentRows.forEach((row) => {
      const name = row.querySelector("h3").textContent.toLowerCase();
      const location = row.querySelector("td p").textContent.toLowerCase();
      const date = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const status = row
        .querySelector(".status-badge")
        .textContent.toLowerCase();

      const matchesSearch =
        name.includes(searchTerm) ||
        location.includes(searchTerm) ||
        date.includes(searchTerm) ||
        status.includes(searchTerm);

      const currentStatusFilter = sortSelect.value;
      const statusMatch =
        currentStatusFilter === "default" ||
        row
          .querySelector(".status-badge")
          .className.includes(currentStatusFilter);

      row.style.display = matchesSearch && statusMatch ? "" : "none";
    });

    updateResultsCount();
  }

  function applySort() {
    const sortValue = sortSelect.value;

    if (["hold", "interviewed", "rejected", "hired"].includes(sortValue)) {
      filterByStatus(sortValue);
      return;
    }

    if (sortValue === "default") {
      filterByStatus("default");
      return;
    }

    const visibleRows = currentRows.filter(
      (row) => row.style.display !== "none"
    );

    visibleRows.sort((a, b) => {
      const aName = a.querySelector("h3").textContent;
      const bName = b.querySelector("h3").textContent;
      const aDate = new Date(a.querySelector("td:nth-child(2)").textContent);
      const bDate = new Date(b.querySelector("td:nth-child(2)").textContent);

      switch (sortValue) {
        case "name-asc":
          return aName.localeCompare(bName);
        case "name-desc":
          return bName.localeCompare(aName);
        case "date-asc":
          return aDate - bDate;
        case "date-desc":
          return bDate - aDate;
        default:
          return 0;
      }
    });

    tbody.innerHTML = "";
    visibleRows.forEach((row) => tbody.appendChild(row));

    const hiddenRows = currentRows.filter(
      (row) => row.style.display === "none"
    );
    hiddenRows.forEach((row) => tbody.appendChild(row));
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    applySearch();
  });

  searchInput.addEventListener("input", applySearch);

  sortSelect.addEventListener("change", function () {
    if (
      ["hold", "interviewed", "rejected", "hired", "default"].includes(
        this.value
      )
    ) {
      filterByStatus(this.value);
    } else {
      applySort();
    }
  });

  updateResultsCount();

  const modalOverlay = document.getElementById("modal-overlay");
  const modals = document.querySelectorAll(".modal");
  const createMeetingModal = document.getElementById("create-meeting-modal");
  const deleteModal = document.getElementById("delete-modal");
  let rowToDelete = null; // متغير لحفظ الصف المطلوب حذفه

  function openModal(modal) {
    modalOverlay.classList.add("active");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    modals.forEach((modal) => modal.classList.remove("active"));
    document.body.style.overflow = "auto";
  }

  modalOverlay.addEventListener("click", closeModal);

  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.querySelectorAll('[title="Create Meeting"]').forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(createMeetingModal);
    });
  });

  document.querySelectorAll('[title="Delete"]').forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      rowToDelete = this.closest("tr"); // حفظ الصف المطلوب حذفه
      openModal(deleteModal);
    });
  });

  document
    .querySelector(".confirm-delete")
    .addEventListener("click", function () {
      if (rowToDelete) {
        rowToDelete.remove();
        updateResultsCount();
        rowToDelete = null;
      }
      alert("Applicant deleted successfully!");
      closeModal();
    });

  document
    .querySelector(".modal-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Meeting scheduled successfully!");
      closeModal();
    });

  document.querySelectorAll(".btn-action").forEach((button) => {
    const title = button.getAttribute("title");
    if (title) {
      button.addEventListener("mouseenter", function () {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = title;

        const rect = button.getBoundingClientRect();
        tooltip.style.position = "fixed";
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.transform = "translateX(-50%)";
        tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        tooltip.style.color = "white";
        tooltip.style.padding = "5px 10px";
        tooltip.style.borderRadius = "4px";
        tooltip.style.fontSize = "12px";
        tooltip.style.whiteSpace = "nowrap";
        tooltip.style.zIndex = "1000";

        document.body.appendChild(tooltip);

        button.addEventListener("mouseleave", function () {
          tooltip.remove();
        });
      });
    }
  });

  document.querySelectorAll(".pagination button").forEach((button) => {
    if (!button.classList.contains("active")) {
      button.addEventListener("click", function () {
        alert("Loading page " + this.textContent);
      });
    }
  });
});
