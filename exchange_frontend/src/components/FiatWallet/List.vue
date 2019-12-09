<template>
    <div class="columns is-multiline is-mobile">
        <div v-for="Wallet in Wallets" :key="Wallet.id" class="column is-4-desktop is-12-mobile">
            <div class="card">
                <div class="card-header level" style="margin-bottom:0;">
                    <div class="level-left">
                        <div class="level-item">
                            <p class="card-header-title">
                                {{ Wallet.Name }}
                            </p>
                        </div>
                    </div>
                    <div class="level-right wallet__typeCard">
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
                        <strong>{{ $t("Interface.Wallet.List.Balance") }}: </strong>
                        <span>{{ Wallet.Balance }} {{ Wallet.Currency }}</span>
                    </div>
                </div>
                <footer class="card-footer">
                    <a
                        v-if="ACHReady.ReadyForPayment"
                        class="card-footer-item"
                        data-cy="deposit"
                        @click="(ACHProvider === '1') ? deposit(Wallet.Id, Wallet.Name) : depositSynapse(Wallet.Id, Wallet.Name)"
                    >
                        {{ $t("Interface.Buttons.Deposit") }}
                    </a>
                    <a
                        v-if="ACHReady.ReadyForPayment && Number(Wallet.Balance) > 0"
                        class="card-footer-item"
                        @click="(ACHProvider === '1') ? withdraw(Wallet.Id, Wallet.Name) : withdrawSynapse(Wallet.Id, Wallet.Name, Wallet.Balance)"
                    >
                        {{ $t("Interface.Buttons.Withdraw") }}
                    </a>
                    <div
                        v-if="!ACHReady.ReadyForPayment"
                        class="card-footer-item"
                    >
                        {{ $t("Interface.Buttons.ReadyForPayment") }}
                    </div>
                    <a
                        v-if="Number(Wallet.Balance) === 0 && Wallet.Transactions.length <= 0"
                        class="card-footer-item"
                        @click="deleteWallet(Wallet.Id)"
                    >
                        {{ $t("Interface.Buttons.Delete") }}
                    </a>
                </footer>
            </div>
        </div>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import "@/styles/plugins/cryptocurrency-icons.css"
import LoadingState from "@/mixins/LoadingState"
import DepositWallet from "@/components/FiatWallet/Deposit"
import DepositSynapseWallet from "@/components/FiatWallet/DepositSynapse"
import WithdrawSynapseWallet from "@/components/FiatWallet/WithdrawSynapse"
import { FIAT_WALLET_LIST_REQUEST, FIAT_WALLET_DELETE_REQUEST } from "@/store/actions/fiatwallet"

export default {
    name: "FiatWalletList",
    mixins: [LoadingState],
    computed: {
        CurrencyList: {
            get () {
                return this.$store.state.Currencies.List
            }
        },
        Wallets: {
            get () {
                return this.$store.state.FiatWallet.List
            }
        },
        ACHProvider() {
            return process.env.VUE_APP_FEATURE_ACH_PROVIDER
        },
        ACHReady() {
            return this.$store.getters.IS_ACH_READY
        }
    },
    mounted() {
        this.switchLoading()
        this.$store.dispatch(FIAT_WALLET_LIST_REQUEST)
            .finally(() => {
                this.switchLoading()
            })
    },
    methods: {
        deposit(WalletId, WalletName) {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: DepositWallet,
                props: {
                    walletId: WalletId,
                    walletName: WalletName
                },
                hasModalCard: true
            })
        },
        depositSynapse(WalletId, WalletName) {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: DepositSynapseWallet,
                props: {
                    walletId: WalletId,
                    walletName: WalletName
                },
                hasModalCard: true
            })
        },
        withdrawSynapse(WalletId, WalletName, WalletBalance) {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: WithdrawSynapseWallet,
                props: {
                    walletId: WalletId,
                    walletName: WalletName,
                    walletBalance: WalletBalance
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
                    this.$store.dispatch(FIAT_WALLET_DELETE_REQUEST, id)
                        .then(() => {
                            this.$store.dispatch(FIAT_WALLET_LIST_REQUEST)
                                .then(() => {
                                    this.switchLoading()
                                })
                        })
                }
            })
        }
    }
}
</script>
