<template>
    <div class="chart rate">
        <apexchart
            type="area"
            width="100%"
            height="600"
            :options="ChartOptions"
            :series="Series"
        />
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts"
import HTTP from "@/http"
import LoadingState from "@/mixins/LoadingState"

export default {
    name: "RatesChart",
    components: {
        "apexchart": VueApexCharts
    },
    mixins: [LoadingState],
    props: {
        currencyPair: {
            type: String,
            default: "BTCUSD"
        }
    },
    data() {
        return {
            Dates: [],
            Rates: [],

            ChartOptions: {
                chart: {
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: false,
                            zoomout: false,
                            pan: true,
                            reset: true
                        }
                    },
                    sparkline: {
                        enabled: false
                    },
                    zoom: {
                        enabled: true,
                        type: "xy"
                    },
                    fontFamily: "\"Exo 2\", BlinkMacSystemFont, -apple-system, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif",
                    foreColor: "#504941"
                },
                title: {
                    text: this.currencyPair,
                    style: {
                        fontSize: "20px"
                    }
                },
                subtitle: {
                    text: "Monthly chart",
                    style: {
                        fontSize: "16px"
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    type: "datetime",
                    tooltip: {
                        enabled: false
                    }
                    // labels: {
                    //     style: {
                    //         fontSize: '14px'
                    //     }
                    // }
                },
                yaxis: {
                    opposite: true
                    // labels: {
                    //     style: {
                    //         fontSize: '14px'
                    //     }
                    // }
                },
                legend: {
                    horizontalAlign: "left"
                },
                colors: ["#B2A08C"],
                tooltip: {
                    style: {
                        fontSize: "14px"
                    },
                    x: {
                        show: true,
                        format: "MM/dd/yyyy  hh:mm tt"
                    }
                }
            },
            Series: []
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        this.setChartHeight(window.innerWidth)
        window.addEventListener("resize", this.handleWindowResize)
    },
    methods: {
        fillData() {
            this.ChartOptions = {
                labels: this.Dates
            }
            this.Series = [
                {
                    name: this.currencyPair,
                    data: this.Rates
                }
            ]
        },
        getData() {
            this.switchLoading()
            this.Rates = []
            this.Dates = []
            this.ChartData = null
            HTTP({
                method: "get",
                url: "https://apiv2.bitcoinaverage.com/indices/global/history/" + this.currencyPair,
                params: {
                    period: "monthly",
                    format: "json"
                }
            })
                .then(response => {
                    for (let i = response.data.length; i--; ) {
                        this.Rates.push(response.data[i].average)
                        this.Dates.push(response.data[i].time)
                    }
                    this.fillData()
                    this.switchLoading()
                })
        },
        setChartHeight(width) {
            if (width <= 768)
                this.ChartOptions = {
                    chart: {
                        height: "400px"
                    }
                }
        },
        handleWindowResize(event) {
            this.setChartHeight(event.currentTarget.innerWidth)
        }
    }
}
</script>