<template>
    <div id="wallets">
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item">
                    <h5 class="subtitle is-5">
                        {{ $t("Interface.FiatWallet.Title") }}
                    </h5>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <button v-if="isCurrencyListLoaded && walletAmount < 1" class="button is-theme" @click="createNew">
                        {{ $t("Interface.Wallet.New.Title") }}
                    </button>
                </div>
            </div>
        </nav>
        <div v-if="ACHProvider === '2' & !IsLoading" class="columns is-desktop">
            <div v-if="!ACHReady.ReadyForLinkAccount" class="column">
                <create-ach-account />
            </div>
            <div v-if="ACHReady.ReadyForLinkAccount && !ACHBankAccounts" class="column">
                <link-bank-message />
            </div>
        </div>
        <fiat-wallet-list />
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import FiatWalletList from "@/components/FiatWallet/List"
import NewWallet from "@/components/FiatWallet/New"
import CreateAchAccount from "@/components/Ach/CreateAchAccount"
import LinkBankMessage from "@/components/Ach/LinkBankMessage"
import { CURRENCIES_ALL_ENABLE } from "@/store/actions/currencies"
import { ORDER_CLEAR } from "@/store/actions/order"
import { ACH_READY_REQUEST, ACH_BANKACCOUNTS_REQUEST } from "@/store/actions/ach"

export default {
    name: "WalletListPage",
    components: {
        "fiat-wallet-list": FiatWalletList,
        "create-ach-account": CreateAchAccount,
        "link-bank-message": LinkBankMessage
    },
    mixins: [LoadingState],
    computed: {
        isCurrencyListLoaded () {
            return this.$store.getters.IS_CURRENCIES_LIST_LOADED
        },
        isWalletsLoaded() {
            return this.$store.getters.IS_FIAT_WALLETS_LOADED
        },
        walletAmount() {
            if (this.isWalletsLoaded)
                return this.$store.state.FiatWallet.List.length
            else
                return null
        },
        ACHProvider() {
            return process.env.VUE_APP_FEATURE_ACH_PROVIDER
        },
        ACHReady() {
            return this.$store.getters.IS_ACH_READY
        },
        ACHBankAccounts() {
            return this.$store.getters.IS_ACH_DEPOSIT_READY
        }
    },
    mounted() {
        if (process.env.VUE_APP_FEATURE_FIATWALLET && (process.env.VUE_APP_FEATURE_FIATWALLET === "true")) {
            this.switchLoading()
            this.$store.dispatch(ACH_READY_REQUEST)
                .then(result => {
                    if (result.data.ReadyForLinkAccount) {
                        if (this.ACHProvider === "2")
                            this.$store.dispatch(ACH_BANKACCOUNTS_REQUEST)
                                .finally(() => this.switchLoading())
                        else
                            this.switchLoading()
                    }
                    else
                        this.switchLoading()
                })
                .catch(() => this.switchLoading())
            this.$store.commit(ORDER_CLEAR)
            this.$store.commit(CURRENCIES_ALL_ENABLE)
        }
        else
            this.$router.push({ name: "Dashboard" })
    },
    methods: {
        createNew() {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: NewWallet,
                hasModalCard: true
            })
        }
    },
    metaInfo() {
        return {
            title: this.$t("Interface.FiatWallet.Title")
        }
    }
}
</script>
