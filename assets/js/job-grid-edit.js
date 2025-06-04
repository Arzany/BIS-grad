// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


const jobsData = [
    {
        companyLogo: "assets/images/company/8.png",
        companyName: "Rockstar Games New York",
        jobTitle: "Full Stack Developer",
        location: "Las Vegas, USA",
        postedDate: "2 days ago",
        tags: ["Part-Time", "Web Design"],
        price: "$100 - $120",
        period: "/hour"
    },
    {
        companyLogo: "assets/images/company/7.png",
        companyName: "GlobalTech Partners",
        jobTitle: "Senior DevOps Engineer",
        location: "California, USA",
        postedDate: "2 days ago",
        tags: ["Part-Time", "Web Design"],
        price: "$60 - $80",
        period: "/day"
    },
    {
        companyLogo: "assets/images/company/7.png",
        companyName: "GlobalTech Partners",
        jobTitle: "Senior UI/UX Designer",
        location: "California, USA",
        postedDate: "4 days ago",
        tags: ["Part-Time", "Web Design"],
        price: "$60 - $80",
        period: "/day"
    },
    {
        companyLogo: "assets/images/company/7.png",
        companyName: "GlobalTech Partners",
        jobTitle: "Social Media Marketing",
        location: "California, USA",
        postedDate: "2 days ago",
        tags: ["Part-Time", "Web Design"],
        price: "$60 - $80",
        period: "/day"
    },
    {
        companyLogo: "assets/images/company/7.png",
        companyName: "GlobalTech Partners",
        jobTitle: "Mobile App Developer",
        location: "California, USA",
        postedDate: "1 days ago",
        tags: ["Part-Time", "Web Design"],
        price: "$60 - $80",
        period: "/day"
    },
    {
        companyLogo: "assets/images/company/7.png",
        companyName: "GlobalTech Partners",
        jobTitle: "Digital Marketing",
        location: "California, USA",
        postedDate: "3 days ago",
        tags: ["Part-Time", "Web Design"],
        price: "$60 - $80",
        period: "/day"
    }
];

const jobsContainer = document.getElementById("jobs-list");

function renderJobs(jobs) {
    jobsContainer.innerHTML = jobs.map(job => `
      <div class="job-item">
        <div class="job-header">
          <img src="${job.companyLogo}" alt="Company Logo">
          <div class="job-info">
            <span class="company">${job.companyName}</span>
            <a href="../jobs detail edit/index.html"><h3>${job.jobTitle}</h3></a>
            <div class="job-meta">
              <span><i>📍</i> ${job.location}</span>
              <span><i>📅</i> ${job.postedDate}</span>
            </div>
          </div>
          <button class="save-btn">❤</button>
        </div>
        <div class="job-footer">
          <div class="job-tags">
            ${job.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <div class="job-price">
            <span>${job.price}</span>
            <span>${job.period}</span>
          </div>
        </div>
      </div>
    `).join('');
    
    addSaveButtonEvents(); 
}

function addSaveButtonEvents() {
    const saveBtns = document.querySelectorAll('.save-btn');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('saved');
            btn.innerHTML = btn.classList.contains('saved') ? '❤️' : '❤';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderJobs(jobsData);

});
document.getElementById('search-input').addEventListener('keyup', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredJobs = jobsData.filter(job =>
        job.jobTitle.toLowerCase().includes(searchTerm)
    );

    renderJobs(filteredJobs);
});

function parsePostedDate(dateStr) {
    const num = parseInt(dateStr);
    return isNaN(num) ? Infinity : num; 
}

document.getElementById('sort-select').addEventListener('change', (e) => {
    const value = e.target.value;

    let sortedJobs = [...jobsData];

    if (value === 'newest') {
        sortedJobs.sort((a, b) => parsePostedDate(a.postedDate) - parsePostedDate(b.postedDate));
    } else if (value === 'oldest') {
        sortedJobs.sort((a, b) => parsePostedDate(b.postedDate) - parsePostedDate(a.postedDate));
    }

    renderJobs(sortedJobs);
});

