
const ManagerHome = Vue.component('managerhome', {
    template: `<main id="main" class="main">

    <div class="pagetitle">
        <h1>Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section dashboard">
        <div class="row">

            <!-- Left side columns -->
            <div class="col-lg-8">
                <div class="row">

                    <!-- Leads Card -->
                    <div class="col-xxl-4 col-md-6">
                        <div class="card info-card leads-card">

                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i
                                        class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Leads <span>| Today</span></h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-people"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>256</h6>
                                        <span class="text-success small pt-1 fw-bold">15%</span> <span
                                            class="text-muted small pt-2 ps-1">increase</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- End Leads Card -->

                    <!-- Confirmed Card -->
                    <div class="col-xxl-4 col-md-6">
                        <div class="card info-card revenue-card">

                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i
                                        class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Confirmed <span>| Today</span></h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-person"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>64</h6>
                                        <span class="text-success small pt-1 fw-bold">8%</span> <span
                                            class="text-muted small pt-2 ps-1">increase</span>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div><!-- End Confirmed Card -->

                    <!-- Revenue Card -->
                    <div class="col-xxl-4 col-xl-12">

                        <div class="card info-card customers-card">

                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i
                                        class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Revenue <span>| Today</span></h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-currency-dollar"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6>$12,044</h6>
                                        <span class="text-danger small pt-1 fw-bold">12%</span> <span
                                            class="text-muted small pt-2 ps-1">decrease</span>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div><!-- End Revenue Card -->

                    <!-- Reports -->
                    <div class="col-12">
                        <div class="card">

                            <div class="filter">
                                <a class="icon" href="#" data-bs-toggle="dropdown"><i
                                        class="bi bi-three-dots"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li class="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    <li><a class="dropdown-item" href="#">Today</a></li>
                                    <li><a class="dropdown-item" href="#">This Month</a></li>
                                    <li><a class="dropdown-item" href="#">This Year</a></li>
                                </ul>
                            </div>

                            <div class="card-body">
                                <h5 class="card-title">Reports <span>/ Today</span></h5>

                                <!-- Report Data -->
                                <div class="report-data">
                                    <div class="report-item">
                                        <h6>Total Leads</h6>
                                        <p class="value">256</p>
                                    </div>
                                    <div class="report-item">
                                        <h6>Contacted</h6>
                                        <p class="value">120</p>
                                    </div>
                                    <div class="report-item">
                                        <h6>Confirmed</h6>
                                        <p class="value">85</p>
                                    </div>
                                    <div class="report-item">
                                        <h6>Total Revenue</h6>
                                        <p class="value">$15,000</p>
                                    </div>
                                </div>
                                <!-- End Report Data -->

                                <!-- Line Chart -->
                                
                                <div ref="chart"></div>
                                
                                <!-- End Line Chart -->

                            </div>

                        </div>
                    </div>
                    <!-- End Reports -->

                </div>
            </div><!-- End Left side columns -->

            <!-- Right side columns -->
            <div class="col-lg-4">

                <!-- Website Traffic -->
                <div class="card">
                    <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                                <h6>Filter</h6>
                            </li>
                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                    </div>

                    <div class="card-body pb-0">
                        <h5 class="card-title">Website Traffic <span>| Today</span></h5>

                        <div ref="chart2" style="min-height: 375px;" class="echart"></div>
                        
                        
                    </div>
                </div><!-- End Website Traffic -->

                <!-- Website Traffic -->
                <div class="card">
                    <div class="filter">
                        <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li class="dropdown-header text-start">
                                <h6>Filter</h6>
                            </li>
                            <li><a class="dropdown-item" href="#">Today</a></li>
                            <li><a class="dropdown-item" href="#">This Month</a></li>
                            <li><a class="dropdown-item" href="#">This Year</a></li>
                        </ul>
                    </div>

                    <div class="card-body pb-0">
                        <h5 class="card-title">Website Traffic <span>| Today</span></h5>

                        <div ref="chart2" style="min-height: 375px;" class="echart"></div>
                        
                        
                    </div>
                </div><!-- End Website Traffic -->

            </div>

        </div>
    </section>

</main><!-- End Main -->`,

    data() {
        return {
            chartOptions: {
                series: [
                    {
                        name: 'Leads',
                        data: [31, 40, 28, 51, 42, 82, 56],
                    },
                    {
                        name: 'Contacted',
                        data: [22, 33, 15, 28, 40, 32, 26],
                    },
                    {
                        name: 'Confirmed',
                        data: [12, 22, 16, 12, 18, 24, 20],
                    },
                    {
                        name: 'Revenue',
                        data: [10000, 12000, 8000, 9000, 15000, 11000, 13000],
                    },
                ],
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false,
                    },
                },
                markers: {
                    size: 4,
                },
                colors: ['#4154f1', '#2eca6a', '#ff771d', '#ff2e63'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.3,
                        opacityTo: 0.4,
                        stops: [0, 90, 100],
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        '2018-09-19T00:00:00.000Z',
                        '2018-09-19T01:30:00.000Z',
                        '2018-09-19T02:30:00.000Z',
                        '2018-09-19T03:30:00.000Z',
                        '2018-09-19T04:30:00.000Z',
                        '2018-09-19T05:30:00.000Z',
                        '2018-09-19T06:30:00.000Z',
                    ],
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
                    },
                },
            },
        };
    },
    mounted() {
        this.renderChart();
        this.renderChart2();
        document.title = "Home";
    },
    methods: {
        renderChart() {
            // Wait for the DOM to ensure the element is available

            new ApexCharts(this.$refs.chart, {
                ...this.chartOptions,
            }).render();

        },

        renderChart2() {

            const chart2 = echarts.init(this.$refs.chart2);
            chart2.setOption({
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    top: '5%',
                    left: 'center',
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '18',
                                fontWeight: 'bold',
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            { value: 50, name: 'Call' },
                            { value: 15, name: 'Email' },
                            { value: 75, name: 'Social Media' },
                            { value: 35, name: 'WhatsApp' },
                            { value: 10, name: 'Referral' },
                            { value: 5, name: 'Google Ad' },
                        ],
                    },
                ],
            });

        },


    },






});

export default ManagerHome;