<template>
    <article :id="'Order' + order.ProcessingOrderId" class="orderdetails">
        <figure v-if="order.OrderStatus === 'Waiting' && order.PaymentAddress" class="orderdetails-qr">
            <qriously :value="getQrCodeString" :size="128" />
        </figure>

        <div class="orderdetails-content">
            <div class="orderdetails-header">
                <h5 class="orderdetails-title subtitle is-5">
                    {{ $t("Interface.Order.Details.OrderNumber") }}{{ order.ProcessingOrderId }} - {{ order.OrderStatus }}
                </h5>
                <small class="orderdetails-date">
                    {{ order.Created ? new Date(order.Created).toLocaleDateString() + " " + new Date(order.Created).toLocaleTimeString() : "" }}
                </small>
            </div>

            <div class="orderdetails-block">
                <span class="orderdetails-block-text">{{ $t("Interface.Order.Details.Send") }}:</span>
                <div class="orderdetails-block-amount">
                    <span>{{ order.Price }}</span>
                    <span> {{ order.From }}</span>
                </div>

                <template v-if="order.PaymentAddress">
                    <span class="orderdetails-block-text">{{ $t("Interface.Order.Details.To") }} </span>
                    <a class="orderdetails-block-address" :href="linkToExplorer(order.From) + order.PaymentAddress" target="_blank">{{ order.PaymentAddress }}</a>
                    <button class="orderdetails-block-button copy button">
                        <b-icon icon="content-copy" size="is-small" />
                    </button>
                </template>

                <template v-else-if="order.From === 'USD' && order.OrderStatus ==='Waiting'">
                    <button type="button" class="button is-theme" :class="{ 'is-loading': IsLoading }" @click="toBridgePay(order.ProcessingOrderId, order.Price)">
                        {{ $t("Interface.Order.Confirm.PayBridgePay") }}
                    </button>
                    <button 
                        v-if="ShowFiatWallet"
                        type="button"
                        class="button is-theme"
                        :class="{ 'is-loading': LoadingFiatWallets }"
                        :disabled="!isPayACHAvailable"
                        @click="payFiatWallet()"
                    >
                        {{ $t("Interface.Order.Confirm.PayACH") }}
                    </button>
                </template>
            </div>

            <b-icon icon="arrow-down" />

            <div class="orderdetails-block">
                <span class="orderdetails-block-text">{{ $t("Interface.Order.Details.Get") }}:</span>
                <div class="orderdetails-block-amount">
                    <span>{{ order.Amount }}</span>
                    <span> {{ order.To }}</span>
                </div>
                <span class="orderdetails-block-text">{{ $t("Interface.Order.Details.On") }}</span>
                <template v-if="order.To === 'BTC' || order.To === 'ETH'">
                    <a class="orderdetails-block-address" :href="linkToExplorer(order.To) + order.ReceiverAddress" target="_blank">{{ order.ReceiverAddress }}</a>
                    <button class="orderdetails-block-button copy button">
                        <b-icon icon="content-copy" size="is-small" />
                    </button>
                </template>
                <template v-else>
                    {{ order.ReceiverAddress }}
                </template>
            </div>
            <div v-if="order.OrderStatus === 'Delivering' || order.OrderStatus === 'Completed'" class="orderdetails-tx">
                <template v-if="TxHash">
                    {{ $t("Interface.Order.Details.Tx") }}:
                </template>
                <a v-if="TxHash" :href="TxLink + TxHash" target="_blank" class="orderdetails-tx-address">{{ TxHash }}</a>
                <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
            </div>
        </div>
    </article>
</template>

<script>
import ClipboardJS from "clipboard"
import Helpers from "@/utils/Helpers"
import notify from "@/utils/Notification"
import LoadingState from "@/mixins/LoadingState"
import PayFiatWallet from "@/components/FiatWallet/Pay"
import { BRIDGEPAY_TOKEN_REQUEST } from "@/store/actions/bridgepay"
import { ORDER_TX_REQUEST } from "@/store/actions/order"
import { FIAT_WALLET_LIST_REQUEST } from "@/store/actions/fiatwallet"

export default {
    name: "OrderDetails",
    mixins: [LoadingState],
    props: {
        order: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            TxHash: null,
            TxLink: null,
            LoadingFiatWallets: false,
            ShowFiatWallet: (process.env.VUE_APP_FEATURE_FIATWALLET === "true")
        }
    },
    computed: {
        getQrCodeString() {
            let CurrencyScheme = (this.order.From === "BTC") ? "bitcoin:" : ""
            let CurrencyAmount = (this.order.From === "BTC") ? "?amount=" + this.order.Price : ""
            return CurrencyScheme + this.order.PaymentAddress + CurrencyAmount
        },
        BridgepayToken: {
            get() {
                return this.$store.state.Bridgepay.Token
            }
        },
        UserID: {
            get() {
                return this.$store.state.Session.Id
            }
        },
        FiatWallets: {
            get() {
                return this.$store.state.FiatWallet.List
            }
        },
        isPayACHAvailable() {
            if (this.$store.state.FiatWallet.List) 
                return (this.$store.state.FiatWallet.List.filter(obj => obj.Balance >= this.order.Price).length > 0)
            else return false
        }
    },
    mounted() {
        new ClipboardJS(".copy", {
            target: function (trigger) {
                return trigger.previousElementSibling
            }
        })

        this.getTx()

        if (process.env.VUE_APP_FEATURE_FIATWALLET && (process.env.VUE_APP_FEATURE_FIATWALLET === "true") && this.order.From === "USD" && !this.$store.getters.IS_FIAT_WALLETS_LOADED) {
            this.LoadingFiatWallets = true
            this.$store.dispatch(FIAT_WALLET_LIST_REQUEST)
                .finally(() => this.LoadingFiatWallets = false)
        }
    },
    methods: {
        toBridgePay(OrderID, Amount) {
            this.switchLoading()
            this.$store.dispatch(BRIDGEPAY_TOKEN_REQUEST, {
                amount: Math.trunc(Amount * 100),
                purchaserInfo: this.UserID,
                transactionInfo: OrderID
            })
                .then(response => {
                    if (response.data)
                        Helpers.toBridgePay(OrderID, this.BridgepayToken, Amount, this.UserID)
                })
                .finally(() => {
                    this.switchLoading()
                })
        },
        payFiatWallet() {
            if (this.FiatWallets && this.FiatWallets.length < 1) {
                notify("is-danger", this.$t("Message.Order.FiatWallet.NoWallets"), 10000)
                this.$router.push({ name: "FiatWallets" })
            }
            else if (!this.isPayACHAvailable)
                notify("is-danger", this.$t("Message.Order.FiatWallet.NotEnoughOnWallets"), 10000)
            else {
                this.$buefy.modal.open({
                    parent: this.$parent,
                    component: PayFiatWallet,
                    props: {
                        orderId: this.order.ProcessingOrderId,
                        price: this.order.Price
                    },
                    hasModalCard: true
                })
            }
        },
        getTx() {
            if (this.order.OrderStatus === "Delivering" || this.order.OrderStatus === "Completed") {
                this.switchLoading()
                this.$store.dispatch(ORDER_TX_REQUEST, this.order.ProcessingOrderId)
                    .then(response => {
                        if (response.data) {
                            this.TxHash = response.data
                            this.TxLink = Helpers.linkToBlockchainTx(this.order.To)
                        }
                    })
                    .finally(() => this.switchLoading())
            }
        },
        linkToExplorer(Currency) {
            return Helpers.linkToBlockchainExplorer(Currency)
        }
    }
}
</script>
