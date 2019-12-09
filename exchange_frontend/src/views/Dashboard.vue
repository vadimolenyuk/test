<template>
    <div id="dashboard">
        <div v-if="isSessionReady && (!isPhoneVerified || !isEmailConfirmed)" class="columns is-desktop">
            <div v-if="!isPhoneVerified" class="column">
                <verify-phone />
            </div>
            <div v-if="!isEmailConfirmed" class="column">
                <verify-email />
            </div>
        </div>
        <div class="dashboard tile is-ancestor">
            <div class="tile is-vertical is-9">
                <div class="content-dashboard tile is-flex">
                    <div class="tile is-parent is-vertical is-2">
                        <article class="tile is-child box has-text-centered">
                            <limit-daily />
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <h1 class="subtitle is-5">
                                {{ $t("Interface.Dashboard.Exchange.Title") }}
                            </h1>
                            <order-create class="is-dashboard" />
                        </article>
                    </div>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box">
                        <total-wallets-balance />
                    </article>
                </div>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <template v-if="$store.getters.IS_WALLETS_LOADED">
                        <h5 class="subtitle is-5">
                            {{ $t("Interface.Dashboard.Wallets.CryptoTitle") }}
                        </h5>
                        <wallets-widget />
                    </template>
                    <template v-if="$store.getters.IS_FIAT_WALLETS_LOADED">
                        <h5 class="subtitle is-5">
                            {{ $t("Interface.Dashboard.Wallets.FiatTitle") }}
                        </h5>
                        <fiat-wallets-widget />
                    </template>
                    <rates-panel v-if="!$store.getters.IS_WALLETS_LOADED && !$store.getters.IS_FIAT_WALLETS_LOADED" />
                </article>
            </div>
        </div>
    </div>
</template>

<script>
import notify from "@/utils/Notification"
import OrderCreate from "@/components/Order/Create"
import LimitDaily from "@/components/Chart/LimitDaily"
import TotalWalletsBalance from "@/components/Chart/TotalWalletsBalance"
import WalletsWidget from "@/components/Wallet/Widget"
import FiatWalletsWidget from "@/components/FiatWallet/Widget"
import WalletsWizard from "@/components/Wallet/Wizard"
import RatesPanel from "@/components/Shared/Rates"
import VerifyPhoneMessage from "@/components/User/VerifyPhoneMessage"
import VerifyEmail from "@/components/User/VerifyEmail"
import { WALLET_LIST_REQUEST } from "@/store/actions/wallet"
import { FIAT_WALLET_LIST_REQUEST } from "@/store/actions/fiatwallet"

export default {
    name: "DashboardPage",
    components: {
        "order-create": OrderCreate,
        "limit-daily": LimitDaily,
        "total-wallets-balance": TotalWalletsBalance,
        "wallets-widget": WalletsWidget,
        "fiat-wallets-widget": FiatWalletsWidget,
        "rates-panel": RatesPanel,
        "verify-phone": VerifyPhoneMessage,
        "verify-email": VerifyEmail
    },
    computed: {
        CurrencyList: {
            get () {
                return (this.$store.state.Currencies.List) ? this.$store.state.Currencies.List.filter(Lis => !Lis.IsFiat) : null
            }
        },
        WalletList: {
            get () {
                return this.$store.state.Wallet.List
            }
        },
        RequiredList() {
            if (this.CurrencyList && this.WalletList) {
                let WalletsCurrencies = this.WalletList.map(function(e) {
                    return e.Currency 
                })
                let Currencies = this.CurrencyList.map(function(e) {
                    return e.Code 
                })
                let Complement = Currencies.filter(function(x) {
                    return WalletsCurrencies.indexOf(x) < 0 
                })
                // let Intersect = Currencies.filter(value => -1 !== WalletsCurrencies.indexOf(value))
                return Complement
            }
            else return null
        },
        isPhoneVerified() {
            return this.$store.getters.IS_PHONE_VERIFIED
        },
        isEmailConfirmed() {
            return this.$store.getters.IS_EMAIL_CONFIRMED
        },
        isSessionReady() {
            return this.$store.getters.IS_SESSION_READY
        }
    },
    watch: {
        RequiredList() {
            if (this.CurrencyList && this.WalletList && this.RequiredList.length > 0) {
                this.$buefy.modal.open({
                    parent: this.$parent,
                    component: WalletsWizard,
                    hasModalCard: true
                })
            }
            return this.RequiredList
        }
    },
    mounted() {
        if (process.env.VUE_APP_FEATURE_FIATWALLET && (process.env.VUE_APP_FEATURE_FIATWALLET === "true"))
            this.$store.dispatch(FIAT_WALLET_LIST_REQUEST)
        this.$store.dispatch(WALLET_LIST_REQUEST)
        if (
            this.$route && 
            this.$route.query && 
            this.$route.query.Notification &&
            this.$route.query.Notification === "EmailConfirmed" 
        ) {
            notify("is-success", this.$t("Message.Verify.EmailConfirmed"))
        }
    },
    metaInfo() {
        return {
            title: this.$t("Interface.Dashboard.Title")
        }
    }
}
</script>
