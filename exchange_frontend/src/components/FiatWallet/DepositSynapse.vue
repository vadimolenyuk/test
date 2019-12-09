<template>
    <div class="modal-card wallet deposit" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.FiatWallet.Deposit.Title") }} "{{ walletName }}"</p>
        </header>
        <section class="modal-card-body">
            <b-field
                :label="$t('Interface.FiatWallet.Deposit.BankAccount')"
            >
                <multiselect
                    v-model="BankAccount"
                    v-validate="'required'"
                    :options="BankAccounts"
                    :allow-empty="false"
                    :hide-selected="true"
                    track-by="Id"
                    select-label=""
                    label="BankAccount"
                    name="BankAccount"
                    data-vv-name="BankAccount"
                    data-vv-value-path="BankAccount"
                >
                    <template slot="singleLabel" slot-scope="props">
                        <img :src="props.option.BankLogo" class="bankaccount-img">
                        <span class="option-title">{{ props.option.Nickname }}</span>
                        <span class="option-title"> ({{ props.option.BankName }})</span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <img :src="props.option.BankLogo" class="bankaccount-img">
                        <span class="option-title">{{ props.option.Nickname }}</span>
                        <span class="option-title"> ({{ props.option.BankName }})</span>
                    </template>
                </multiselect>
            </b-field>
            <b-field>
                <b-button type="is-light" icon-left="bank-plus" @click="link()">
                    {{ $t("Interface.FiatWallet.LinkBank.ButtonAnother") }}
                </b-button>
            </b-field>
            <b-field
                :label="$t('Interface.FiatWallet.Deposit.Amount')"
                :message="errors.first('Amount')"
                :type="{ 'is-danger': errors.has('Amount'), 'is-success': fields.Amount && fields.Amount.valid }"
            >
                <b-input
                    v-model="Amount"
                    v-validate="'required|decimal'"
                    name="Amount"
                    type="text"
                    data-cy="amount"
                    icon="coins"
                />
            </b-field>
            <b-field>
                <b-checkbox v-model="SameDay">
                    {{ $t('Interface.FiatWallet.Deposit.SameDay') }}
                </b-checkbox>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme" data-cy="submit" @click="deposit()">
                {{ $t("Interface.Buttons.Deposit") }}
            </button>
        </footer>
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import LoadingState from "@/mixins/LoadingState"
import {
    ACH_BANKACCOUNTS_REQUEST,
    ACH_DEPOSIT_REQUEST,
    ACH_LINK_BANKACCOUNTS_REQUEST
} from "@/store/actions/ach"

export default {
    name: "FiatWalletDepositSynapse",
    components: {
        "multiselect": Multiselect
    },
    mixins: [LoadingState],
    props: {
        walletId: {
            type: Number,
            default: null
        },
        walletName: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            Amount: null,
            BankAccount: null,
            SameDay: false
        }
    },
    computed: {
        BankAccounts() {
            return this.$store.state.ACH.BankAccounts
        }
    },
    mounted() {
        if (!this.$store.getters.IS_ACH_DEPOSIT_READY) {
            this.switchLoading()
            this.$store.dispatch(ACH_BANKACCOUNTS_REQUEST)
                .catch(() => {
                    this.switchLoading()
                    this.$parent.close()
                })
                .finally(() => this.switchLoading())
        }
    },
    methods: {
        selectBankAccount(value) {
            if (value && value.Id)
                this.BankAccount = value.Id
        },
        deposit() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store
                        .dispatch(ACH_DEPOSIT_REQUEST, {
                            "BankAccountId": this.BankAccount.Id,
                            "Amount": this.Amount,
                            "SameDay": this.SameDay,
                            "WalletId": this.walletId
                        })
                        .finally(() => {
                            this.switchLoading()
                            this.$parent.close()
                        })
                }
            })
        },
        link() {
            this.switchLoading()
            this.$store.dispatch(ACH_LINK_BANKACCOUNTS_REQUEST)
                .then(() => this.switchLoading())
        }
    }
}
</script>
