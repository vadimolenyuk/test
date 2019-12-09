<template>
    <div v-if="Wallets" class="wallets columns is-multiline is-mobile">
        <div v-for="DisplayWallet in DisplayWallets" :key="DisplayWallet.id" class="column is-12">
            <div class="card">
                <div class="card-content">
                    <span class="title is-6 is-uppercase">{{ DisplayWallet.Name }}</span>
                    <br>
                    <i class="crypto-icon subtitle is-4" :class="DisplayWallet.Currency.toLowerCase()" style="position:relative;top:-2px;" />
                    <span class="subtitle is-4"> {{ DisplayWallet.Balance }} </span>
                    <span class="subtitle is-6">{{ DisplayWallet.Currency }}</span>
                    <div class="content">
                        <br>
                        {{ DisplayWallet.Currency }}/USD:
                        <span>{{ $store.getters.GET_RATE(String(DisplayWallet.Currency)+"USD") }}</span>
                        <br>
                        <a class="" @click="showChart(String(DisplayWallet.Currency)+'USD')">{{ $t("Interface.Rates.SeeChart") }}</a>
                    </div>
                </div>
            </div>
        </div>
        <b-pagination
            v-if="Wallets.length > Pagination.PerPage"
            :total="Wallets.length"
            :current.sync="Pagination.CurrentPage"
            :simple="Pagination.Simple"
            :per-page="Pagination.PerPage"
            :rounded="Pagination.Rounded"
        />
    </div>
    <b-loading v-else :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
</template>

<script>
import "@/styles/plugins/cryptocurrency-icons.css"
import LoadingState from "@/mixins/LoadingState"
import ChartRate from "@/components/Chart/Rate"
import { RATE_REQUEST } from "@/store/actions/rate"

export default {
    name: "WalletList",
    mixins: [LoadingState],
    data() {
        return {
            Pagination: {
                CurrentPage: 1,
                PerPage: 2,
                Simple: true,
                Rounded: true
            }
        }
    },
    computed: {
        CurrencyList: {
            get () {
                return this.$store.state.Currencies.List
            }
        },
        Wallets: {
            get () {
                return this.$store.state.Wallet.List
            }
        },
        DisplayWallets: {
            get () {
                return this.Wallets.slice((this.Pagination.CurrentPage - 1) * this.Pagination.PerPage, this.Pagination.PerPage + ((this.Pagination.CurrentPage - 1) * this.Pagination.PerPage))
            }
        }
    },
    mounted() {
        this.switchLoading()
        this.$store.dispatch(RATE_REQUEST, { SellCurrency: "BTC", BuyCurrency: "USD" } )
        this.$store.dispatch(RATE_REQUEST, { SellCurrency: "ETH", BuyCurrency: "USD" } )
            .finally(() => {
                this.switchLoading()
            })
    },
    methods: {
        // withdraw(id) {
        //     this.$buefy.modal.open({
        //         parent: this.$parent,
        //         component: WithdrawWallet,
        //         props: {
        //             wallet: this.Wallets.find(obj => obj.Id === id)
        //         },
        //         hasModalCard: true
        //     })
        // },
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