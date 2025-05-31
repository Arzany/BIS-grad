document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const table = document.getElementById('feedback-table');
    const tbody = table.querySelector('tbody');
    const userTypeFilter = document.getElementById('filter-user-type');
    const ratingFilter = document.getElementById('filter-rating');
    const resetBtn = document.getElementById('reset-filters');
    
    // حفظ الصفوف الأصلية
    const originalRows = Array.from(tbody.querySelectorAll('tr'));
    
    // دالة تطبيق الفلاتر
    function applyFilters() {
        const userTypeValue = userTypeFilter.value;
        const ratingValue = ratingFilter.value;
        
        // إخفاء جميع الصفوف أولاً
        originalRows.forEach(row => {
            row.style.display = 'none';
        });
        
        // عرض الصفوف التي تطابق الفلاتر
        originalRows.forEach(row => {
            const userTypeMatch = userTypeValue === 'all' || 
                (userTypeValue === 'seeker' && row.querySelector('.badge.seeker')) || 
                (userTypeValue === 'employer' && row.querySelector('.badge.employer'));
            
            const ratingMatch = ratingValue === 'all' || 
                row.querySelector('.stars').textContent.includes('★'.repeat(parseInt(ratingValue)));
            
            if (userTypeMatch && ratingMatch) {
                row.style.display = '';
            }
        });

        // إعادة رسم الرسوم البيانية بعد الفلترة
        createCharts();
    }
    
    // دالة إعادة الضبط
    function resetFilters() {
        userTypeFilter.value = 'all';
        ratingFilter.value = 'all';
        originalRows.forEach(row => {
            row.style.display = '';
        });
        
        createCharts(); // كمان نحدث الرسوم بعد إعادة الضبط
    }

    // دالة لتحليل بيانات الجدول
    function analyzeTableData() {
        const rows = Array.from(document.querySelectorAll('#feedback-table tbody tr')).filter(row => row.style.display !== 'none');
        let data = {
            ratings: [0, 0, 0, 0, 0], // 1-5 نجوم
            recommend: { yes: 0, no: 0 },
            rights: { yes: 0, no: 0 },
            userTypes: { seeker: 0, employer: 0 }
        };

        rows.forEach(row => {
            // تحليل التقييم
            const stars = (row.querySelector('.stars').textContent.match(/★/g) || []).length;
            if (stars >= 1 && stars <= 5) data.ratings[stars-1]++;

            // تحليل التوصية
            const recommend = row.querySelector('td:nth-child(5) .badge').textContent.trim();
            if (recommend === 'Yes') data.recommend.yes++;
            else data.recommend.no++;

            // تحليل فهم الحقوق
            const rights = row.querySelector('td:nth-child(6) .badge').textContent.trim();
            if (rights === 'Yes') data.rights.yes++;
            else data.rights.no++;

            // تحليل نوع المستخدم
            if (row.querySelector('.badge.seeker')) data.userTypes.seeker++;
            if (row.querySelector('.badge.employer')) data.userTypes.employer++;
        });

        return data;
    }

    // دالة إنشاء الرسوم البيانية
    function createCharts() {
        const data = analyzeTableData();

        // حذف الرسوم القديمة لو موجودة
        document.querySelector("#ratingsChart").innerHTML = '<h3><i class="ph ph-chart-pie"></i> Distribution of Ratings</h3>';
        document.querySelector("#recommendationChart").innerHTML = '<h3><i class="ph ph-users"></i> Recommendation %</h3>';
        document.querySelector("#userTypesChart").innerHTML = '<h3><i class="ph ph-scales"></i>Understood rights</h3>';

        // رسم بياني للتقييمات
        new ApexCharts(document.querySelector("#ratingsChart"), {
            series: data.ratings,
            chart: { type: 'pie', height: 300 },
            labels: ['★', '★★', '★★★', '★★★★', '★★★★★'],
            colors: ['#e74c3c', '#e67e22', '#f1c40f', '#3498db', '#2ecc71'],
            legend: { position: 'right', rtl: true }
        }).render();

        // رسم بياني للتوصية
        new ApexCharts(document.querySelector("#recommendationChart"), {
            series: [data.recommend.yes, data.recommend.no],
            chart: { type: 'donut', height: 300 },
            labels:['Recommended', 'NOT recommended'],
            colors: ['#2ecc71', '#e74c3c'],
            legend: { position: 'right', rtl: true }
        }).render();

        // رسم بياني لنوع المستخدم
        new ApexCharts(document.querySelector("#userTypesChart"), {
            series: [data.userTypes.seeker, data.userTypes.employer],
            chart: { type: 'radialBar', height: 300 },
            labels: ['Job seekers', 'Companies'],
            colors: ['#3498db', '#9b59b6'],
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: { fontSize: '16px' },
                        value: { fontSize: '20px' },
                        total: {
                            show: true,
                            label: 'المجموع',
                            formatter: function() {
                                return data.userTypes.seeker + data.userTypes.employer;
                            }
                        }
                    }
                }
            }
        }).render();
    }

    // استدعاء الدالة عند تحميل الصفحة
    createCharts();

    // إضافة Event Listeners
    userTypeFilter.addEventListener('change', applyFilters);
    ratingFilter.addEventListener('change', applyFilters);
    resetBtn.addEventListener('click', resetFilters);
});
