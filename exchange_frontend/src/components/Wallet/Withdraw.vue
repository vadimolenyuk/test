<template>
    <div class="modal-card walletwithdraw" style="width: auto">
        <header v-if="!exchange" class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Wallet.Withdraw.Title") }}</p>
            <span>{{ wallet.Name }} ({{ wallet.Currency }})</span>
            <span>{{ wallet.address }}</span>
        </header>
        <header v-else class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Wallet.Pay.Title") }}</p>
            <span>{{ wallet.Name }} ({{ wallet.Currency }})</span>
            <span>{{ wallet.address }}</span>
        </header>
        <section class="modal-card-body">
            <b-field
                :label="$t('Interface.Wallet.Withdraw.Pin')"
                :message="errors.first('Pin')"
                :type="{ 'is-danger': errors.has('Pin'), 'is-success': fields.Pin && fields.Pin.valid }"
            >
                <b-input
                    v-model="Pin"
                    v-validate="'required|pin'"
                    name="Pin"
                    type="password"
                    icon="lock-outline"
                />
            </b-field>

            <b-field
                v-if="!address"
                :label="wallet.Currency + ' ' + $t('Interface.Wallet.Withdraw.Address')"
                :message="errors.first('WithdrawAddress')"
                :type="{ 'is-danger': errors.has('WithdrawAddress'), 'is-success': fields.WithdrawAddress && fields.WithdrawAddress.valid }"
            >
                <b-input
                    v-model="WithdrawAddress"
                    v-validate="{
                        required: true,
                        ethereum: wallet.Currency === 'ETH',
                        bitcoin: wallet.Currency === 'BTC'
                    }"
                    name="WithdrawAddress"
                    type="text"
                    icon="wallet-outline"
                />
            </b-field>
            
            <b-field
                v-if="!amnt"
                :label="$t('Interface.Wallet.Withdraw.Amount')"
                :message="errors.first('Amount')"
                :type="{ 'is-danger': errors.has('Amount'), 'is-success': fields.Amount && fields.Amount.valid }"
            >
                <b-input 
                    v-model="Amount" 
                    v-validate="{ 
                        required: true, 
                        decimal: true, 
                        withdrawlimit: parseFloat(wallet.Balance), 
                        min_value: 0 
                    }" 
                    name="Amount" 
                    type="text" 
                    icon="coins" 
                    :disabled="All" 
                />
            </b-field>
            <b-checkbox v-if="!amnt" v-model="All" @input="setAllAmount()">
                {{ $t("Interface.Wallet.Withdraw.All") }}
            </b-checkbox>
            <b-field v-else :label="$t('Interface.Order.Total')">
                {{ amnt }} {{ wallet.Currency }}
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme" data-cy="submit" @click="submit">
                {{ $t("Interface.Buttons.Confirm") }}
            </button>
            <a v-if="wallet.Recoverable" class="forgotpin" @click="restorePin">Forgot pin?</a>
        </footer>
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import { sha3_512 } from "js-sha3"
import LoadingState from "@/mixins/LoadingState"
import notify from "@/utils/Notification"
import ResetWallet from "@/components/Wallet/Reset"
import { WALLET_WITHDRAW_REQUEST } from "@/store/actions/wallet"

export default {
    name: "WalletWithdraw",
    mixins: [LoadingState],
    props: {
        wallet: {
            type: Object,
            default: null
        },
        amnt: {
            type: String,
            default: null
        },
        address: {
            type: String,
            default: null
        },
        exchange: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            Amount: null,
            WithdrawAddress: null,
            Pin: null,
            All: false
        }
    },
    mounted() {
        this.Amount = (this.amnt) ? this.amnt : this.Amount
        this.WithdrawAddress = (this.address) ? this.address : this.WithdrawAddress
    },
    methods: {
        submit() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(WALLET_WITHDRAW_REQUEST, { 
                        WalletId: this.wallet.Id,
                        Amount: this.Amount, 
                        Receiver: this.WithdrawAddress, 
                        PIN: sha3_512(this.Pin) 
                    })
                        .then(response => {
                            if (!this.exchange)
                                notify(
                                    "is-success", 
                                    this.$t("Message.Wallet.Withdraw.Success1")+ " " + this.Amount + this.wallet.Currency + " "+this.$t("Message.Wallet.Withdraw.Success2")+" " + this.WithdrawAddress +
                                        "<br/>" + "<a target='_blank' class='has-text-info' href='" + this.linkToExplorer(this.wallet.Currency) + response.data + "'>"+this.$t("Message.Wallet.Withdraw.Link")+"</a>",
                                    10000
                                )
                            else
                                notify("is-success", this.$t("Message.Wallet.Payed"))
                        })
                        .finally(() => {
                            this.switchLoading()
                            this.$parent.close()
                        })
                }
            })
        },
        restorePin() {
            if (this.wallet.Recoverable) {
                this.$buefy.modal.open({
                    parent: this.$parent,
                    component: ResetWallet,
                    props: {
                        wallet: this.wallet
                    },
                    hasModalCard: true
                })
                this.$parent.close()
            }
            else notify("is-error", this.$t("Message.Wallet.Reset.NotRecoverable"))
        },
        linkToExplorer(Currency) {
            switch (Currency) {
            case "BTC":
                return "https://www.blockchain.com/btc/tx/"
            case "ETH":
                return "https://etherscan.io/tx/"
            default:
                break
            }
        },
        setAllAmount() {
            this.Amount = this.wallet.Balance
        }
    }
}
</script>
