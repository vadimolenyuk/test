<template>
    <div class="modal-card wallet deposit" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.FiatWallet.Deposit.Title") }} "{{ walletName }}"</p>
        </header>
        <section class="modal-card-body">
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
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme" data-cy="submit" @click="startDeposit">
                {{ $t("Interface.Buttons.Deposit") }}
            </button>
        </footer>
        <div id="FrogWidget" />
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
/* eslint-disable no-undef */
import LoadingState from "@/mixins/LoadingState"
// import notify from "@/utils/Notification"
import { ACH_GET_WIDGET_REQUEST, ACH_DEPOSIT_REQUEST } from "@/store/actions/ach"

export default {
    name: "FiatWalletDeposit",
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
            Amount: null
        }
    },
    created() {
        this.loadJquery()
    },
    methods: {
        loadJquery() {
            let script = document.createElement("script")
            script.type = "text/javascript"
            script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
            document.getElementsByTagName("head")[0].appendChild(script)
        },
        showWidget() {
            var THIS = this

            Cashflow.init({ target: $("#FrogWidget") })

            Cashflow.onEnrollmentSuccess = function(accountId) {
                THIS.finishDeposit(THIS.Amount, THIS.walletId, accountId)
            }

            Cashflow.onExit = function() {
                THIS.switchLoading()
                THIS.$parent.close()
            }

            Cashflow.ready = function() {
                Cashflow.open()
                $("#open").show()
                $("#open").click(Cashflow.open)
            }
        },
        startDeposit() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store
                        .dispatch(ACH_GET_WIDGET_REQUEST)
                        .then(response => {
                            $("#FrogWidget").html(response.data)
                            this.showWidget()
                        })
                        .catch(() => {
                            this.switchLoading()
                            this.$parent.close()
                        })
                }
            })
        },
        finishDeposit(Amount, FiatAccountId, Token) {
            this.$store
                .dispatch(ACH_DEPOSIT_REQUEST, {
                    "BankAccountId": Token,
                    "Amount": Amount,
                    "WalletId": FiatAccountId
                })
                .finally(() => {
                    this.switchLoading()
                    this.$parent.close()
                })
        }
    }
}
</script>