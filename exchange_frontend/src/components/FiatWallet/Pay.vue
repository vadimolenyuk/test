<template>
    <div class="modal-card wallet withdraw" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.FiatWallet.Pay.Title") }}</p>
        </header>
        <section class="modal-card-body">
            <b-field
                v-if="FiatWallets"
                :label="$t('Interface.FiatWallet.Pay.Wallet')"
                :message="errors.first('Wallet')"
                :type="{ 'is-danger': errors.has('Wallet'), 'is-success': fields.Wallet && fields.Wallet.valid }"
            >
                <multiselect
                    v-model="Wallet"
                    v-validate="'required'"
                    :options="FiatWallets"
                    :allow-empty="false"
                    track-by="Id"
                    select-label=""
                    name="Wallet"
                    data-vv-name="Wallet"
                    data-vv-value-path="Wallet"
                    data-vv-scope="Wallets"
                >
                    <template slot="singleLabel" slot-scope="props">
                        <i v-if="props.option.Currency" class="option-icon crypto-icon" :class="props.option.Currency.toLowerCase()" />
                        <span class="option-title">{{ props.option.Name }}</span>
                        <span class="option-title"> - {{ props.option.Balance }} {{ props.option.Currency }}</span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <span class="option-title">{{ props.option.Name }}</span>
                        <span class="option-title"> - {{ props.option.Balance }} {{ props.option.Currency }}</span>
                    </template>
                </multiselect>
            </b-field>
            

            <b-field
                :label="$t('Interface.Wallet.Withdraw.Pin')"
                :message="errors.first('Pin')"
                :type="{ 'is-danger': errors.has('Pin'), 'is-success': fields.Pin && fields.Pin.valid }"
            >
                <b-input v-model="Pin" v-validate="'required|pin'" name="Pin" type="password" />
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme" data-cy="submit" @click="submit">
                {{ $t("Interface.Buttons.Confirm") }}
            </button>
        </footer>
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import "@/styles/plugins/cryptocurrency-icons.css"
import LoadingState from "@/mixins/LoadingState"
import notify from "@/utils/Notification"
import { sha3_512 } from "js-sha3"
import { FIAT_WALLET_LIST_REQUEST, FIAT_WALLET_PAY_REQUEST } from "@/store/actions/fiatwallet"

export default {
    name: "FiatWalletPay",
    components: {
        "multiselect": Multiselect
    },
    mixins: [LoadingState],
    props: {
        orderId: {
            type: String,
            default: null
        },
        price: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            Pin: null,
            Wallet: null
        }
    },
    computed: {
        FiatWallets: {
            get() {
                if (this.$store.state.FiatWallet.List) 
                    return this.$store.state.FiatWallet.List.filter(obj => obj.Balance >= this.price)
                else return null
            }
        }
    },
    mounted() {
        if (!this.$store.getters.IS_FIAT_WALLETS_LOADED) {
            this.switchLoading()
            this.$store.dispatch(FIAT_WALLET_LIST_REQUEST)
                .then(() => this.selectFirstWallet())
                .finally(() => this.switchLoading())
        }
        else 
            this.selectFirstWallet()
    },
    methods: {
        submit() {
            this.$validator.validate("Wallets.*").then(result => {
                if (!result) notify("is-danger", this.$t("Validation.SelectWallet"))
            })
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(FIAT_WALLET_PAY_REQUEST, { 
                        OrderId: this.orderId,
                        PIN: sha3_512(this.Pin),
                        AccountId: this.Wallet.Id
                    })
                        .then(() => {
                            if (this.$route.name === "Orders")
                                this.$router.go()
                            else
                                this.$router.push({ name: "Orders" })
                        })
                        .finally(() => {
                            this.switchLoading()
                            this.$parent.close()
                        })
                }
                else notify("is-danger", this.$t("Validation.Default"))
            })
        },
        selectFirstWallet() {
            if (this.$store.getters.IS_FIAT_WALLETS_LOADED)
                this.Wallet = this.FiatWallets[0]
        }
    }
}
</script>
