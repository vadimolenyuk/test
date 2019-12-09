<template>
    <div class="modal-card wallet new" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Wallet.Wizard.Title") }}</p>
        </header>
        <section class="modal-card-body">
            <p class="title is-6">
                {{ $t("Interface.Wallet.Wizard.WelcomeText") }}
            </p>
            <b-message type="is-danger">
                {{ $t("Interface.Wallet.New.Danger.Text1") }}
                <br>
                {{ $t("Interface.Wallet.New.Danger.Text2") }}
                <br>
                <span class="is-uppercase">{{ $t("Interface.Wallet.New.Danger.Text3") }}</span>
            </b-message>
            <b-field
                :label="$t('Interface.Wallet.New.Pin')"
                :message="errors.first('Pin')"
                :type="{ 'is-danger': errors.has('Pin'), 'is-success': fields.Pin && fields.Pin.valid }"
            >
                <b-input
                    ref="Pin"
                    v-model="Pin"
                    v-validate="'required|pin'"
                    name="Pin"
                    type="password"
                />
            </b-field>
            <b-field
                :label="$t('Interface.Wallet.New.PinConfirmation')"
                :message="errors.first('PinConfiramtion')"
                :type="{ 'is-danger': errors.has('PinConfiramtion'), 'is-success': fields.PinConfiramtion && fields.PinConfiramtion.valid }"
            >
                <b-input
                    v-model="PinConfiramtion"
                    v-validate="'required|pin|confirmed:Pin'"
                    name="PinConfiramtion"
                    data-vv-as="Pin"
                    type="password"
                />
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme" @click="submit">
                {{ $t("Interface.Buttons.Create") }}
            </button>
        </footer>
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import notify from "@/utils/Notification"
import { WALLET_CREATE_REQUEST, WALLET_LIST_REQUEST } from "@/store/actions/wallet"
import { sha3_512 } from "js-sha3"

export default {
    name: "WalletWizard",
    mixins: [LoadingState],
    data() {
        return {
            Pin: null,
            PinConfiramtion: null
        }
    },
    computed: {
        CurrencyList: {
            get () {
                return this.$store.state.Currencies.List.filter(Lis => !Lis.IsFiat)
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
        }
    },
    methods: {
        submit() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    Promise.all( this.RequiredList.map(element => this.$store.dispatch(WALLET_CREATE_REQUEST, { Name: element + " wallet", Currency: element, PIN: sha3_512(this.Pin) } )) )
                        .then(results => {
                            // console.log(results)
                            this.$store.dispatch(WALLET_LIST_REQUEST)
                                .then(() => {
                                    this.switchLoading()
                                    if (results.length > 1) notify("is-success", this.$t("Message.Wallet.MultipleCreated"))
                                    else notify("is-success", this.$t("Message.Wallet.Created"))
                                    this.$parent.close()
                                })
                        })
                }
            })
        }
    }
}
</script>
