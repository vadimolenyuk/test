<template>
    <div class="modal-card wallet new" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Wallet.New.Title") }}</p>
        </header>
        <section class="modal-card-body">
            <div class="columns is-mobile is-multiline">
                <div class="column is-6-desktop is-12-mobile">
                    <b-field
                        :label="$t('Interface.Wallet.New.Name')"
                        :message="errors.first('Name')"
                        :type="{ 'is-danger': errors.has('Pin'), 'is-success': fields.Name && fields.Name.valid }"
                    >
                        <b-input v-model="Name" v-validate="'required'" name="Name" type="text" />
                    </b-field>
                </div>
                <div class="column is-6-desktop is-12-mobile">
                    <b-field
                        :label="$t('Interface.Wallet.New.Currency')"
                        :message="errors.first('WalletCurrency')"
                        :type="{ 'is-danger': errors.has('WalletCurrency'), 'is-success': fields.WalletCurrency && fields.WalletCurrency.valid }"
                    >
                        <multiselect
                            v-model="WalletCurrency"
                            v-validate="'required'"
                            :options="CurrencyList"
                            :allow-empty="false"
                            track-by="Code"
                            select-label=""
                            label="Code"
                            data-vv-name="WalletCurrency"
                            data-vv-value-path="WalletCurrency"
                        >
                            <template slot="singleLabel" slot-scope="props">
                                <i class="option-icon crypto-icon" :class="props.option.Code.toLowerCase()" />
                                <span class="option-title">{{ props.option.Name }}</span>
                            </template>
                            <template slot="option" slot-scope="props">
                                <i class="option-icon crypto-icon" :class="props.option.Code.toLowerCase()" />
                                <span class="option-title">{{ props.option.Name }}</span>
                            </template>
                        </multiselect>
                    </b-field>
                </div>
                <div class="column is-6-desktop is-12-mobile">
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
                </div>
                <div class="column is-6-desktop is-12-mobile">
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
                </div>
                <div class="column is-12-desktop is-12-mobile">
                    <b-field>
                        <b-checkbox v-model="Recoverable" name="Restorable">
                            Recoverable wallet
                        </b-checkbox>
                    </b-field>
                    <b-message v-if="!Recoverable" type="is-danger">
                        {{ $t("Interface.Wallet.New.Danger.Text1") }}
                        <br>
                        {{ $t("Interface.Wallet.New.Danger.Text2") }}
                        <br>
                        <span class="is-uppercase">{{ $t("Interface.Wallet.New.Danger.Text3") }}</span>
                    </b-message>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme" data-cy="submit" @click="submit">
                {{ $t("Interface.Buttons.Create") }}
            </button>
        </footer>
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import notify from "@/utils/Notification"
import Multiselect from "vue-multiselect"
import "@/styles/plugins/cryptocurrency-icons.css"
import { WALLET_CREATE_REQUEST, WALLET_LIST_REQUEST } from "@/store/actions/wallet"
import { sha3_512 } from "js-sha3"

export default {
    name: "WalletNew",
    components: {
        "multiselect": Multiselect
    },
    mixins: [LoadingState],
    data() {
        return {
            Name: null,
            WalletCurrency: null,
            Pin: null,
            PinConfiramtion: null,
            Recoverable: true
        }
    },
    computed: {
        CurrencyList: {
            get () {
                return this.$store.state.Currencies.List.filter(Lis => !Lis.IsFiat)
            }
        }
    },
    methods: {
        submit() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(WALLET_CREATE_REQUEST, { 
                        Name: this.Name, 
                        Currency: this.WalletCurrency.Code, 
                        PIN: sha3_512(this.Pin),
                        Recoverable: this.Recoverable
                    })
                        .then(() => {
                            this.$store.dispatch(WALLET_LIST_REQUEST)
                                .then(() => {
                                    this.switchLoading()
                                    notify("is-success", this.$t("Message.Wallet.Created"))
                                    this.$parent.close()
                                })
                        })
                        .catch(() => {
                            this.switchLoading()
                            this.$parent.close()
                        })
                }
            })
        }
    }
}
</script>
