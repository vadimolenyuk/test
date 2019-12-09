<template>
    <div id="rates-panel">
        <div class="columns is-multiline is-mobile">
            <div class="column is-6-mobile is-12-tablet">
                <div class="card">
                    <div class="card-content">
                        <h5 class="rates-title subtitle is-5">
                            {{ $t("Interface.Currency.BTC.Title") }}
                            <i class="crypto-icon btc" />
                        </h5>
                        <div class="rates-fiat">
                            <small>USD: {{ BTCUSD }}</small>
                            <!-- <br/>
                            <small>EUR: {{BTCEUR}}</small> -->
                        </div>
                        <div class="rates-chartlink has-text-right">
                            <a class="is-uppercase" @click="showChart('BTCUSD')">{{ $t("Interface.Rates.SeeChart") }}</a>
                        </div>
                    </div>
                    <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
                </div>
            </div>
            <div class="column is-6-mobile is-12-tablet">
                <div class="card">
                    <div class="card-content">
                        <h5 class="rates-title subtitle is-5">
                            {{ $t("Interface.Currency.ETH.Title") }}
                            <i class="crypto-icon eth" />
                        </h5>
                        <div class="rates-fiat">
                            <small>USD: {{ ETHUSD }}</small>
                            <!-- <br/>
                            <small>EUR: {{ETHEUR}}</small> -->
                        </div>
                        <div class="rates-chartlink has-text-right">
                            <a class="is-uppercase" @click="showChart('ETHUSD')">{{ $t("Interface.Rates.SeeChart") }}</a>
                        </div>
                    </div>
                    <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import ChartRate from "@/components/Chart/Rate"
import { RATE_REQUEST } from "@/store/actions/rate"

export default {
    name: "RatesPanel",
    mixins: [LoadingState],
    computed: {
        BTCUSD: {
            get () {
                return this.$store.state.Rate.Rates["BTCUSD"]
            }
        },
        BTCEUR: {
            get () {
                return this.$store.state.Rate.Rates["BTCEUR"] 
            }
        },
        ETHUSD: {
            get () {
                return this.$store.state.Rate.Rates["ETHUSD"] 
            }
        },
        ETHEUR: {
            get () {
                return this.$store.state.Rate.Rates["ETHEUR"]
            }
        }
    },
    mounted() {
        this.switchLoading()
        // this.$store.dispatch(RATE_REQUEST, { SellCurrency: "BTC", BuyCurrency: "EUR" } )
        // this.$store.dispatch(RATE_REQUEST, { SellCurrency: "ETH", BuyCurrency: "EUR" } )
        this.$store.dispatch(RATE_REQUEST, { SellCurrency: "BTC", BuyCurrency: "USD" } )
        this.$store.dispatch(RATE_REQUEST, { SellCurrency: "ETH", BuyCurrency: "USD" } )
            .finally(() => {
                this.switchLoading()
            })
    },
    methods: {
        showChart(CurrencyPair) {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: ChartRate,
                width: "100%",
                props: {
                    currencyPair: CurrencyPair
                }
            })
        }
    }
}
</script>