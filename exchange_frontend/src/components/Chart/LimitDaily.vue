<template>
    <div class="limit daily has-text-centered">
        <div v-if="DailyLimit != null && DailyLimit >= 0">
            <div class="limit-header">
                <span class="limit-gtitle subtitle is-5">{{ $t("Interface.Dashboard.DailyLimit.Title") }}</span>
                <span class="limit-gvalue subtitle is-5">${{ DailyLimit.toFixed(0) }}</span>
            </div>
            <div class="limit-grid">
                <div style="grid-area: remaining">
                    <h5 class="limit-value subtitle is-6">
                        ${{ DailyRemaining.toFixed(0) }}
                    </h5>
                    <h6 class="limit-title subtitle is-6">
                        {{ $t("Interface.Dashboard.DailyLimit.Remaining") }}
                    </h6>
                </div>
                <div style="grid-area: chart" class="limit-container">
                    <apexchart
                        class="limit-chart"
                        height="150"
                        type="bar"
                        :options="ChartOptions"
                        :series="Series"
                    />
                </div>
                <div style="grid-area: used">
                    <h5 class="limit-value subtitle is-6">
                        ${{ DailyUsed.toFixed(0) }}
                    </h5>
                    <h6 class="limit-title subtitle is-6">
                        {{ $t("Interface.Dashboard.DailyLimit.Used") }}
                    </h6>
                </div>
            </div>
            <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
        </div>
        <kyc-button cclass="kycbutton is-theme is-limit" />
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts"
import LoadingState from "@/mixins/LoadingState"
import KYCButton from "@/components/Shared/GoToKYC"
import { ORDER_DAILYLIMIT_REQUEST } from "@/store/actions/order"

export default {
    name: "LimitDailyChart",
    components: {
        "apexchart": VueApexCharts,
        "kyc-button": KYCButton
    },
    mixins: [LoadingState],
    computed: {
        DailyLimit: {
            get() {
                return this.$store.state.Order.DailyLimit.USD.Limit
            }
        },
        DailyUsed: {
            get() {
                return this.$store.state.Order.DailyLimit.USD.Used
            }
        },
        DailyRemaining: {
            get() {
                return ((this.$store.state.Order.DailyLimit.USD.Limit - this.$store.state.Order.DailyLimit.USD.Used) > 0) ? this.$store.state.Order.DailyLimit.USD.Limit - this.$store.state.Order.DailyLimit.USD.Used : 0
            }
        },
        ChartOptions() {
            return {
                chart: {
                    id: "dailylimit-chart",
                    type: "bar",
                    stacked: false,
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        // endingShape: "rounded",
                        colors: {
                            backgroundBarColors: ["#ffffff"],
                            backgroundBarOpacity: 1
                        }
                    }
                },
                yaxis: {
                    max: this.$store.state.Order.DailyLimit.USD.Limit
                },
                tooltip: {
                    enabled: false,
                    x: {
                        show: false
                    }
                },
                colors: ["#B2A08C"],
                states: {
                    hover: {
                        filter: {
                            type: "none"
                        }
                    }
                }
            }
        },
        Series() { 
            return [
                {
                    name: "Used",
                    data: [this.$store.state.Order.DailyLimit.USD.Used]
                }
            ]
        }
    },
    mounted() {
        this.switchLoading()
        this.$store.dispatch(ORDER_DAILYLIMIT_REQUEST)
            .finally(() => {
                this.switchLoading()
            })
    }
}
</script>
