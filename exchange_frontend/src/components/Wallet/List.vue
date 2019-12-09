<template>
    <div class="walletlist columns is-multiline is-mobile">
        <div v-for="Wallet in Wallets" :key="Wallet.id" class="column is-4-desktop is-12-mobile">
            <div class="wallet card">
                <div class="wallet-header card-header level" style="margin-bottom:0;">
                    <div class="wallet-header-left level-left">
                        <div class="level-item">
                            <p class="card-header-title">
                                {{ Wallet.Name }}
                            </p>
                        </div>
                    </div>
                    <div class="wallet-header-right level-right">
                        <div class="level-item">
                            <span class="card-footer-item">
                                <i class="crypto-icon" :class="Wallet.Currency.toLowerCase()" />
                                &nbsp;{{ CurrencyList.find(obj => obj.Code === Wallet.Currency).Name }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <div class="content">
                        <div class="wallet-info">
                            <strong>{{ $t("Interface.Wallet.List.Balance") }}: </strong>
                            <span>{{ Wallet.Balance }} {{ Wallet.Currency }}</span>
                        </div>
                        <div class="wallet-info">
                            <strong>{{ $t("Interface.Wallet.List.Address") }}: </strong>
                            <div class="wallet-address">
                                <a :href="linkToExplorer(Wallet.Currency) + Wallet.Address" target="_blank" class="wallet__cardLink is-clipped is-flex">
                                    <b-icon class="wallet__iconLink" icon="link-variant" size="is-small" />
                                    <span>{{ Wallet.Address }}</span>
                                </a>
                                <button class="copy button is-small">
                                    <b-icon icon="content-copy" size="is-small" />
                                </button>
                            </div>
                        </div>
                        <div class="wallet-info">
                            <strong>{{ Wallet.Currency }}/USD: </strong>
                            <span>{{ $store.getters.GET_RATE(String(Wallet.Currency)+"USD") }}</span>
                            <br>
                            <a @click="showChart(String(Wallet.Currency)+'USD')">{{ $t("Interface.Rates.SeeChart") }}</a>
                        </div>
                    </div>
                </div>
                <footer class="card-footer">
                    <a v-if="Number(Wallet.Balance) > 0" class="card-footer-item" data-cy="withdraw" @click="withdraw(Wallet.Id)">{{ $t("Interface.Wallet.List.Withdraw") }}</a>
                    <a v-if="Number(Wallet.Balance) === 0" class="card-footer-item" data-cy="delete" @click="deleteWallet(Wallet.Id)">{{ $t("Interface.Buttons.Delete") }}</a>
                </footer>
            </div>
        </div>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import ClipboardJS from "clipboard"
import "@/styles/plugins/cryptocurrency-icons.css"
import Helpers from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import WithdrawWallet from "@/components/Wallet/Withdraw"
import ChartRate from "@/components/Chart/Rate"
import { WALLET_LIST_REQUEST, WALLET_DELETE_REQUEST } from "@/store/actions/wallet"
import { RATE_REQUEST } from "@/store/actions/rate"

export default {
    name: "WalletList",
    mixins: [LoadingState],
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
        }
    },
    mounted() {
        this.switchLoading()
        this.$store.dispatch(WALLET_LIST_REQUEST)
        this.$store.dispatch(RATE_REQUEST, { SellCurrency: "BTC", BuyCurrency: "USD" } )
        this.$store.dispatch(RATE_REQUEST, { SellCurrency: "ETH", BuyCurrency: "USD" } )
            .finally(() => {
                this.switchLoading()
            })
        new ClipboardJS(".copy", {
            target: function (trigger) {
                return trigger.previousElementSibling
            }
        })
    },
    methods: {
        linkToExplorer(Currency) {
            return Helpers.linkToBlockchainExplorer(Currency)
        },
        withdraw(id) {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: WithdrawWallet,
                props: {
                    wallet: this.Wallets.find(obj => obj.Id === id)
                },
                hasModalCard: true
            })
        },
        deleteWallet(id) {
            this.$buefy.dialog.confirm({
                title: "Deleting wallet",
                message: "Are you sure you want to <b>delete</b> this wallet? This action cannot be undone.",
                confirmText: "Delete wallet",
                type: "is-danger",
                hasIcon: true,
                onConfirm: () => {
                    this.switchLoading()
                    this.$store.dispatch(WALLET_DELETE_REQUEST, id)
                        .then(() => {
                            this.$store.dispatch(WALLET_LIST_REQUEST)
                                .then(() => {
                                    this.switchLoading()
                                })
                        })
                }
            })

        },
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
