<template>
    <div class="modal-card wallet walletwithdraw" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Wallet.Withdraw.Title") }}</p>
            <span>{{ walletName }}</span>
        </header>
        <section class="modal-card-body">
            <b-field
                :label="$t('Interface.FiatWallet.Withdraw.BankAccount')"
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
                    v-validate="{
                        required: true,
                        decimal: true,
                        withdrawlimit: parseFloat(walletBalance),
                        min_value: 0
                    }"
                    name="Amount"
                    type="text"
                    data-cy="amount"
                    icon="coins"
                />
            </b-field>
            <b-checkbox v-model="All" @input="setAllAmount()">
                {{ $t("Interface.Wallet.Withdraw.All") }}
            </b-checkbox>
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
            <button class="button is-theme" data-cy="submit" @click="withdraw()">
                {{ $t("Interface.Buttons.Withdraw") }}
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
    ACH_WITHDRAW_REQUEST,
    ACH_LINK_BANKACCOUNTS_REQUEST
} from "@/store/actions/ach"

export default {
    name: "FiatWalletWithdarwSynapse",
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
        },
        walletBalance: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            Amount: null,
            BankAccount: null,
            All: false,
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
        withdraw() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store
                        .dispatch(ACH_WITHDRAW_REQUEST, {
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
        setAllAmount() {
            this.Amount = this.walletBalance
        },
        link() {
            this.switchLoading()
            this.$store.dispatch(ACH_LINK_BANKACCOUNTS_REQUEST)
                .then(() => this.switchLoading())
        }
    }
}
</script>
