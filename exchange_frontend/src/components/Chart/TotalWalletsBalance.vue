<template>
    <div class="totalbalance">
        <h5 class="subtitle is-5">
            {{ $t("Interface.Dashboard.TotalBalance.Title") }}&nbsp;
            ${{ TotalBalance.toFixed(2) }}
        </h5>
        <apexchart
            v-if="TotalBalance > 0"
            height="250"
            type="bar"
            :options="ChartOptions"
            :series="Series"
        />
        <b-loading v-else :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts"
import LoadingState from "@/mixins/LoadingState"
import { WALLETS_STAT_REQUEST } from "@/store/actions/wallet"

export default {
    name: "TotalWalletsBalanceChart",
    components: {
        "apexchart": VueApexCharts
    },
    mixins: [LoadingState],
    computed: {
        TotalBalance: {
            get() {
                return this.$store.state.Wallet.Stat.Total
            }
        },
        MaxValue() {
            let maximal = Math.max.apply(null, this.$store.state.Wallet.Stat.Currencies.map(a => a.data))
            return maximal + (maximal * 10 / 100)
        },
        ChartOptions() {
            return {
                chart: {
                    id: "total-wallets-balance-chart",
                    type: "bar",
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "20%"
                    // endingShape: 'arrow'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2
                },
                grid: {
                    row: {
                        colors: ["#fff", "#f8f8f8"]
                    }
                },
                yaxis: {
                    max: this.MaxValue
                },
                xaxis: {
                    categories: this.$store.state.Wallet.Stat.Currencies.map(a => a.name)
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "light",
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    }
                },
                colors: ["#B2A08C"],
                tooltip: {
                    enabled: true,
                    x: {
                        show: true
                    }
                }
            }
        },
        Series() {
            return [
                {
                    name: "US Dollar",
                    data: this.$store.state.Wallet.Stat.Currencies.map(a => a.data)
                }
            ]
        }
    },
    mounted() {
        this.switchLoading()
        this.$store.dispatch(WALLETS_STAT_REQUEST)
            .finally(() => {
                this.switchLoading()
            })
    }
}
</script>

