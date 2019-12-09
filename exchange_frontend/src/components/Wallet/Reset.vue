<template>
    <div class="modal-card walletwithdraw" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $tc("Interface.Wallet.Reset.Title", 777, { name: wallet.Name } ) }}</p>
        </header>
        <section class="modal-card-body">
            <b-field
                :label="$t('Interface.Verify.Code')"
                :message="errors.first('Code')"
                :type="{ 'is-danger': errors.has('Code'), 'is-success': fields.Code && fields.Code.valid }"
            >
                <b-input
                    v-model="Code"
                    v-validate="'required|numeric'"
                    name="Code"
                    type="password"
                    password-reveal
                />
            </b-field>
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
                    password-reveal
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
                    password-reveal
                />
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme" @click="submit">
                {{ $t("Interface.Buttons.Submit") }}
            </button>
        </footer>
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import { sha3_512 } from "js-sha3"
import LoadingState from "@/mixins/LoadingState"
import notify from "@/utils/Notification"
import { 
    CHANGE_WALLET_PIN_REQUEST, 
    RESET_WALLET_PIN_REQUEST
} from "@/store/actions/wallet"

export default {
    name: "WalletReset",
    mixins: [LoadingState],
    props: {
        wallet: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            Code: null,
            Pin: null,
            PinConfiramtion: null
        }
    },
    computed: {
        PhoneNumber() {
            return this.$store.state.Session.Phone
        }
    },
    mounted() {
        this.$store.dispatch(CHANGE_WALLET_PIN_REQUEST, this.wallet.Id)
            .then(() => {
                notify("is-info", this.$tc("Message.Wallet.Reset.CodeSent", 777, { phone: this.PhoneNumber }))
            })
    },
    methods: {
        submit() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(RESET_WALLET_PIN_REQUEST, { 
                        WalletId: this.wallet.Id,
                        Pin: sha3_512(this.Pin),
                        Code: this.Code
                    })
                        .finally(() => {
                            this.switchLoading()
                            this.$parent.close()
                        })
                }
            })
        }
    }
}
</script>
