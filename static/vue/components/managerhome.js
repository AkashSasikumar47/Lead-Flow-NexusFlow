// static/vue/components/managerhome.js

const ManagerHome = Vue.component('managerhome', {
    template: `
    <main id="main" class="main">
        <div class="pagetitle">
            <h1>Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active">Dashboard</li>
                </ol>
            </nav>
        </div>

        <section class="section dashboard">
            <!-- Date Range Selector -->
            <div class="row mb-3">
                <div class="col-lg-4">
                    <select v-model="selectedDateRange" @change="fetchDashboardData" class="form-select">
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>
                <div v-if="selectedDateRange === 'custom'" class="col-lg-8">
                    <input type="date" v-model="startDate" @change="fetchDashboardData" class="form-control d-inline-block w-auto me-2">
                    <input type="date" v-model="endDate" @change="fetchDashboardData" class="form-control d-inline-block w-auto">
                </div>
            </div>

            <!-- Key Metrics Cards -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="card info-card leads-card">
                        <div class="card-body">
                            <h5 class="card-title">Total Leads</h5>
                            <div class="d-flex align-items-center">
                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i class="bi bi-people"></i>
                                </div>
                                <div class="ps-3">
                                    <h6>{{ totalLeads }}</h6>
                                    <span :class="leadGrowthRate >= 0 ? 'text-success' : 'text-danger'" class="small pt-1 fw-bold">
                                        {{ Math.abs(leadGrowthRate) }}%
                                    </span>
                                    <span class="text-muted small pt-2 ps-1">{{ leadGrowthRate >= 0 ? 'increase' : 'decrease' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card info-card conversion-card">
                        <div class="card-body">
                            <h5 class="card-title">Conversion Rate</h5>
                            <div class="d-flex align-items-center">
                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i class="bi bi-graph-up"></i>
                                </div>
                                <div class="ps-3">
                                    <h6>{{ conversionRate }}%</h6>
                                    <span :class="conversionRateChange >= 0 ? 'text-success' : 'text-danger'" class="small pt-1 fw-bold">
                                        {{ Math.abs(conversionRateChange) }}%
                                    </span>
                                    <span class="text-muted small pt-2 ps-1">{{ conversionRateChange >= 0 ? 'increase' : 'decrease' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card info-card revenue-card">
                        <div class="card-body">
                            <h5 class="card-title">Estimated Revenue</h5>
                            <div class="d-flex align-items-center">
                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i class="bi bi-currency-dollar"></i>
                                </div>
                                <div class="ps-3">
                                    <h6>{{ estimatedRevenue }}</h6>
                                    <span :class="revenueChange >= 0 ? 'text-success' : 'text-danger'" class="small pt-1 fw-bold">
                                        {{ Math.abs(revenueChange) }}%
                                    </span>
                                    <span class="text-muted small pt-2 ps-1">{{ revenueChange >= 0 ? 'increase' : 'decrease' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="card info-card customer-card">
                        <div class="card-body">
                            <h5 class="card-title">Average Deal Size</h5>
                            <div class="d-flex align-items-center">
                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i class="bi bi-cart"></i>
                                </div>
                                <div class="ps-3">
                                    <h6>{{ averageDealSize }}</h6>
                                    <span :class="dealSizeChange >= 0 ? 'text-success' : 'text-danger'" class="small pt-1 fw-bold">
                                        {{ Math.abs(dealSizeChange) }}%
                                    </span>
                                    <span class="text-muted small pt-2 ps-1">{{ dealSizeChange >= 0 ? 'increase' : 'decrease' }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Lead Trends</h5>
                            <div ref="leadTrendsChart"></div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Top Company Fields</h5>
                            <div ref="topCompanyFieldsChart"></div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Regional Distribution</h5>
                            <div ref="regionalDistributionChart"></div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Engagement Metrics</h5>
                            <div ref="engagementMetricsChart"></div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Sales Funnel</h5>
                            <div ref="salesFunnelChart"></div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Lead Source Analysis</h5>
                            <div ref="leadSourceChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    `,

    data() {
        return {
            selectedDateRange: 'week',
            startDate: null,
            endDate: null,
            totalLeads: 0,
            leadGrowthRate: 0,
            conversionRate: 0,
            conversionRateChange: 0,
            estimatedRevenue: 0,
            revenueChange: 0,
            averageDealSize: 0,
            dealSizeChange: 0,
            leadTrendsData: [],
            topCompanyFields: [],
            regionalDistribution: [],
            engagementMetrics: [],
            salesFunnelData: [],
            leadSourceData: [],
            token: localStorage.getItem('auth-token'),
            userRole: localStorage.getItem('role')
        };
    },

    mounted() {
        this.fetchDashboardData();
        document.title = "Dashboard";
    },

    methods: {
        async fetchDashboardData() {
            try {
                const queryParams = new URLSearchParams({
                    dateRange: this.selectedDateRange,
                    startDate: this.startDate,
                    endDate: this.endDate
                }).toString();

                const response = await fetch(`/api/dashboard-data?${queryParams}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authentication-Token": this.token,
                        "Authentication-Role": this.userRole,
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error fetching dashboard data: ${response.status} ${response.statusText} - ${errorText}`);
                }

                const data = await response.json();
                this.updateDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        },

        updateDashboardData(data) {
            this.totalLeads = data.totalLeads;
            this.leadGrowthRate = data.leadGrowthRate;
            this.conversionRate = data.conversionRate;
            this.conversionRateChange = data.conversionRateChange;
            this.estimatedRevenue = data.estimatedRevenue;
            this.revenueChange = data.revenueChange;
            this.averageDealSize = data.averageDealSize;
            this.dealSizeChange = data.dealSizeChange;
            this.leadTrendsData = data.leadTrendsData;
            this.topCompanyFields = data.topCompanyFields;
            this.regionalDistribution = data.regionalDistribution;
            this.engagementMetrics = data.engagementMetrics;
            this.salesFunnelData = data.salesFunnelData;
            this.leadSourceData = data.leadSourceData;

            this.renderCharts();
        },

        renderCharts() {
            this.renderLeadTrendsChart();
            this.renderTopCompanyFieldsChart();
            this.renderRegionalDistributionChart();
            this.renderEngagementMetricsChart();
            this.renderSalesFunnelChart();
            this.renderLeadSourceChart();
        },

        renderLeadTrendsChart() {
            try {
                const chart = new ApexCharts(this.$refs.leadTrendsChart, {
                    series: [{
                        name: 'Leads',
                        data: this.leadTrendsData.map(item => item.value)
                    }],
                    chart: {
                        type: 'area',
                        height: 350,
                        toolbar: {
                            show: false
                        }
                    },
                    xaxis: {
                        categories: this.leadTrendsData.map(item => item.date)
                    },
                    yaxis: {
                        title: {
                            text: 'Number of Leads'
                        }
                    },
                    fill: {
                        type: 'gradient'
                    }
                });

                chart.render();
            } catch (error) {
                console.error('Error rendering lead trends chart:', error);
            }
        },

        renderTopCompanyFieldsChart() {
            try {
                const chart = new ApexCharts(this.$refs.topCompanyFieldsChart, {
                    series: this.topCompanyFields.map(item => item.value),
                    chart: {
                        type: 'pie',
                        height: 350
                    },
                    labels: this.topCompanyFields.map(item => item.field),
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                });

                chart.render();
            } catch (error) {
                console.error('Error rendering top company fields chart:', error);
            }
        },

        renderRegionalDistributionChart() {
            try {
                const chart = new ApexCharts(this.$refs.regionalDistributionChart, {
                    series: [{
                        name: 'Leads',
                        data: this.regionalDistribution.map(item => item.value)
                    }],
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    xaxis: {
                        categories: this.regionalDistribution.map(item => item.region)
                    },
                    yaxis: {
                        title: {
                            text: 'Number of Leads'
                        }
                    }
                });

                chart.render();
            } catch (error) {
                console.error('Error rendering regional distribution chart:', error);
            }
        },

        renderEngagementMetricsChart() {
            try {
                const chart = new ApexCharts(this.$refs.engagementMetricsChart, {
                    series: this.engagementMetrics.map(item => item.value),
                    chart: {
                        type: 'radialBar',
                        height: 350
                    },
                    plotOptions: {
                        radialBar: {
                            dataLabels: {
                                name: {
                                    fontSize: '22px',
                                },
                                value: {
                                    fontSize: '16px',
                                },
                                total: {
                                    show: true,
                                    label: 'Total',
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                                    }
                                }
                            }
                        }
                    },
                    labels: this.engagementMetrics.map(item => item.metric)
                });

                chart.render();
            } catch (error) {
                console.error('Error rendering engagement metrics chart:', error);
            }
        },

        renderSalesFunnelChart() {
            try {
                console.log('Sales Funnel Data:', this.salesFunnelData);

                const chart = new ApexCharts(this.$refs.salesFunnelChart, {
                    series: [{
                        name: 'Leads',
                        data: this.salesFunnelData.map(item => item.value)
                    }],
                    chart: {
                        type: 'bar',
                        height: 350
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            dataLabels: {
                                position: 'top',
                            },
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val, opt) {
                            return opt.w.globals.labels[opt.dataPointIndex] + ': ' + val
                        },
                        dropShadow: {
                            enabled: true
                        }
                    },
                    xaxis: {
                        categories: this.salesFunnelData.map(item => item.stage)
                    }
                });

                chart.render();
            } catch (error) {
                console.error('Error rendering sales funnel chart:', error);
            }
        },

        renderLeadSourceChart() {
            try {
                const chart = new ApexCharts(this.$refs.leadSourceChart, {
                    series: this.leadSourceData.map(item => item.value),
                    chart: {
                        type: 'donut',
                        height: 350
                    },
                    labels: this.leadSourceData.map(item => item.source),
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                });

                chart.render();
            } catch (error) {
                console.error('Error rendering lead source chart:', error);
            }
        }
    }
});

export default ManagerHome;