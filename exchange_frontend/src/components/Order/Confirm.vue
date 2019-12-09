<template>
    <div class="modal-card orderconfirm" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Order.Confirm.Title.Part1") }} {{ BuyAmount }} {{ BuyCurrency.Code }} {{ $t("Interface.Order.Confirm.Title.Part2") }} {{ SellAmount }} {{ SellCurrency.Code }}</p>
        </header>
        <section class="modal-card-body">
            <b-field
                v-if="SellWallets && SellWallets.length > 1"
                :label="$t('Interface.Order.Confirm.WalletPay')"
            >
                <multiselect
                    v-model="SellWallet"
                    v-validate="'required'"
                    :options="SellWallets"
                    :allow-empty="false"
                    :hide-selected="true"
                    track-by="Id"
                    select-label=""
                    label="Address"
                    name="SellWallet"
                    data-vv-name="SellWallet"
                    data-vv-value-path="SellWallet"
                    data-vv-scope="Wallets"
                >
                    <template slot="singleLabel" slot-scope="props">
                        <i v-if="props.option.Currency" class="option-icon crypto-icon" :class="props.option.Currency.toLowerCase()" />
                        <span class="option-title">{{ props.option.Name }}</span>
                        <span v-if="props.option.Balance" class="option-title"> - {{ props.option.Balance }} {{ props.option.Currency }}</span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <span class="option-title">{{ props.option.Name }}</span>
                        <span v-if="props.option.Balance" class="option-title"> - {{ props.option.Balance }} {{ props.option.Currency }}</span>
                        <br v-if="props.option.Currency">
                        <i v-if="props.option.Currency" class="option-icon crypto-icon" :class="props.option.Currency.toLowerCase()" />
                        <span v-if="props.option.Address" class="option-title">{{ props.option.Address }}</span>
                    </template>
                </multiselect>
            </b-field>
            <b-field v-else :label="$t('Interface.Order.Confirm.PayCurrency')">
                {{ SellCurrency.Name }}
            </b-field>

            <b-field
                v-if="BuyWallets && ((BuyWallets.length > 1 && BuyCurrency.IsFiat === false) || (BuyWallets.length > 0 && BuyCurrency.IsFiat === true))"
                :label="$t('Interface.Order.Confirm.WalletReceive')"
            >
                <multiselect
                    v-model="BuyWallet"
                    v-validate="'required'"
                    :options="BuyWallets"
                    :allow-empty="false"
                    :hide-selected="true"
                    track-by="Id"
                    select-label=""
                    label="Address"
                    name="BuyWallet"
                    data-vv-name="BuyWallet"
                    data-vv-value-path="BuyWallet"
                    data-vv-scope="Wallets"
                    :preselect-first="(BuyCurrency.IsFiat === true) ? true : false"
                    @input="selectBuyWallet"
                >
                    <template slot="singleLabel" slot-scope="props">
                        <i v-if="props.option.Currency" class="option-icon crypto-icon" :class="props.option.Currency.toLowerCase()" />
                        <span class="option-title">{{ props.option.Name }}</span>
                        <span class="option-title"> - {{ props.option.Balance }} {{ props.option.Currency }}</span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <span class="option-title">{{ props.option.Name }}</span>
                        <span class="option-title"> - {{ props.option.Balance }} {{ props.option.Currency }}</span>
                        <br v-if="props.option.Currency && props.option.Address">
                        <i v-if="props.option.Currency && props.option.Address" class="option-icon crypto-icon" :class="props.option.Currency.toLowerCase()" />
                        <span v-if="props.option.Address" class="option-title">{{ props.option.Address }}</span>
                    </template>
                </multiselect>
            </b-field>
            <b-field
                v-if="BuyWallets && ((BuyWallets.length < 2 && BuyCurrency.IsFiat === false) || (BuyWallets.length < 1 && BuyCurrency.IsFiat === true)) || BuyWallet && BuyWallet.Id === 0 || !BuyWallets"
                :label="BuyCurrency.Name + ' ' + $t('Interface.Order.Confirm.AddressReceive')"
                :message="errors.first('Address')"
                :type="{ 'is-danger': errors.has('Address'), 'is-success': fields.Address && fields.Address.valid }"
            >
                <b-input
                    v-model="Address"
                    v-validate="{
                        required: true,
                        ethereum: BuyCurrency.Code === 'ETH',
                        bitcoin: BuyCurrency.Code === 'BTC'
                    }"
                    name="Address"
                    type="text"
                />
            </b-field>
            <hr>
            <b-field style="margin-bottom:0;">
                <h4 class="subtitle is-4">
                    <b>{{ $t("Interface.Order.Total") }}: </b>{{ SellAmount }} {{ SellCurrency.Code }}
                </h4>
            </b-field>
            <small class="hint">{{ $t("Interface.Order.Confirm.RateWarning") }}</small>
            <template v-if="SellCurrency.IsFiat && !isPayACHAvailable">
                <b-message v-if="isNoFiatWallets" type="is-warning" style="margin-top:1rem;">
                    {{ $t("Message.Order.FiatWallet.NoWallets") }}
                </b-message>
                <b-message v-else-if="isNotEnoughMoneyOnFiatWallets" type="is-warning" style="margin-top:1rem;">
                    {{ $t("Message.Order.FiatWallet.NotEnoughOnWallets") }}
                </b-message>
            </template>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button v-if="SellCurrency.Code !== 'USD'" class="button is-theme" data-cy="submit" @click="submit">
                {{ $t("Interface.Buttons.Confirm") }}
            </button>
            <template v-else>
                <button class="button is-theme" data-cy="submit-bridgepay" @click="submit('bridgepay')">
                    {{ $t("Interface.Order.Confirm.PayBridgePay") }}
                </button>
                <button 
                    v-if="ShowFiatWallet"
                    class="button is-theme"
                    data-cy="submit-fiatwalletpay"
                    :class="{ 'is-loading': LoadingFiatWallets }"
                    :disabled="!isPayACHAvailable"
                    @click="submit('ach')"
                >
                    {{ $t("Interface.Order.Confirm.PayACH") }}
                </button>
            </template>
        </footer>
        <b-loading :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import "@/styles/plugins/cryptocurrency-icons.css"
import Helpers from "@/utils/Helpers"
import notify from "@/utils/Notification"
import LoadingState from "@/mixins/LoadingState"
import DetailsOrderModal from "@/components/Order/DetailsModal"
import WithdrawWallet from "@/components/Wallet/Withdraw"
import PayFiatWallet from "@/components/FiatWallet/Pay"
import { ORDER_CREATE_REQUEST, ORDER_CHANGE_ADDRESS } from "@/store/actions/order"
import { BRIDGEPAY_TOKEN_REQUEST } from "@/store/actions/bridgepay"
import { FIAT_WALLET_LIST_REQUEST } from "@/store/actions/fiatwallet"

export default {
    name: "OrderConfirm",
    components: {
        "multiselect": Multiselect
    },
    mixins: [LoadingState],
    data() {
        return {
            SellWallet: null,
            BuyWallet: null,
            LoadingFiatWallets: false,
            ShowFiatWallet: (process.env.VUE_APP_FEATURE_FIATWALLET === "true")
        }
    },
    computed: {
        SellCurrency: {
            get() {
                return this.$store.state.Order.SellCurrency
            }
        },
        SellAmount: {
            get() {
                return this.$store.state.Order.SellAmount
            }
        },
        SellCentsAmount() {
            if (this.SellCurrency && this.SellCurrency.IsFiat && this.SellAmount)
                return Math.trunc(this.SellAmount * 100)
            else
                return null
        },
        BuyCurrency: {
            get() {
                return this.$store.state.Order.BuyCurrency
            }
        },
        BuyAmount: {
            get() {
                return this.$store.state.Order.BuyAmount
            }
        },
        Address: {
            get() {
                return this.$store.state.Order.Address
            },
            set(value) {
                this.$store.commit(ORDER_CHANGE_ADDRESS, value)
            }
        },
        SellWallets: {
            get() {
                if (this.$store.state.Wallet.List) {
                    let Wallets = this.$store.state.Wallet.List.filter(obj => obj.Currency === this.SellCurrency.Code && obj.Balance > this.SellAmount)
                    Wallets.push({
                        Id: 0,
                        Name: this.$t("Interface.Order.Confirm.WalletPayAnother")
                    })
                    return Wallets
                }
                else return null
            }
        },
        BuyWallets: {
            get() {
                if (!this.BuyCurrency.IsFiat) {
                    if (this.$store.state.Wallet.List) {
                        let Wallets = this.$store.state.Wallet.List.filter(obj => obj.Currency === this.BuyCurrency.Code)
                        Wallets.push({
                            Id: 0,
                            Name: this.$t("Interface.Order.Confirm.WalletReceiveAnother")
                        })
                        return Wallets
                    }
                    else return null
                }
                else {
                    if (this.$store.state.FiatWallet.List)
                        return this.$store.state.FiatWallet.List.filter(obj => obj.Currency === this.BuyCurrency.Code)
                    else return null
                }
            }
        },
        FiatWallets: {
            get() {
                return this.$store.state.FiatWallet.List
            }
        },
        isPayACHAvailable() {
            if (this.FiatWallets) 
                return (this.FiatWallets.filter(obj => obj.Balance >= this.SellAmount).length > 0)
            else return false
        },
        isNoFiatWallets() {
            return (this.FiatWallets && this.FiatWallets.length < 1)
        },
        isNotEnoughMoneyOnFiatWallets() {
            return (this.FiatWallets && this.FiatWallets.length > 0 && this.FiatWallets.filter(obj => obj.Balance >= this.SellAmount).length < 1)
        },
        isWalletsLoaded() {
            return this.$store.getters.IS_WALLETS_LOADED
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
        }
    },
    mounted() {
        if (process.env.VUE_APP_FEATURE_FIATWALLET && (process.env.VUE_APP_FEATURE_FIATWALLET === "true") && (this.SellCurrency.IsFiat || this.BuyCurrency.IsFiat)  && !this.$store.getters.IS_FIAT_WALLETS_LOADED) {
            this.LoadingFiatWallets = true
            this.$store.dispatch(FIAT_WALLET_LIST_REQUEST)
                .finally(() => this.LoadingFiatWallets = false)
        }
    },
    methods: {
        selectBuyWallet(value) {
            if (value && value.Currency && (value.Currency === "BTC" || value.Currency === "ETH"))
                this.Address = value.Address
            else if (value && value.Currency && value.Id)
                this.Address = value.Id
        },
        submit(type) {
            this.$validator.validate("Wallets.*")
                .then(result => {
                    if (!result)
                        notify("is-danger", this.$t("Validation.SelectWallet"))
                    else {
                        this.$validator.validate().then(result => {
                            if (result) {
                                this.switchLoading()
                                this.$store.dispatch(ORDER_CREATE_REQUEST)
                                    .then((response) => {
                                        if (response && response.data) {
                                            // Удаление заказа из localstorage
                                            if (localStorage.getItem("Order") !== null)
                                                localStorage.removeItem("Order")
        
                                            // Если валюта оплаты - фиат
                                            if (this.SellCurrency.IsFiat) {
                                                if (type === "bridgepay")
                                                    this.payBridgePay(response.data.ProcessingOrderId)
                                                else if (type === "ach") 
                                                    this.payFiatWallet(response.data.ProcessingOrderId, response.data.Price)
                                            }
        
                                            // Если в качестве оплаты был выбран наш кошелёк, загружаем компонент вывода средств с кошелька
                                            else if (this.SellWallet && this.SellWallet.Id !== 0)
                                                this.payCryptoWallet(response.data.Price, response.data.PaymentAddress)
        
                                            // Иначе долнительных действий не требуется, сразу отображается окно с деталями заказа
                                            else 
                                                this.showOrderDetails(response.data)
                                        }
                                    })
                            }
                            else notify("is-danger", this.$t("Validation.Default"))
                        })
                    }
                })
        },
        payBridgePay(ProcessingOrderId) {
            this.$store.dispatch(BRIDGEPAY_TOKEN_REQUEST, {
                amount: this.SellCentsAmount,
                purchaserInfo: this.UserID,
                transactionInfo: ProcessingOrderId
            })
                .then(() => {
                    Helpers.toBridgePay(ProcessingOrderId, this.BridgepayToken, this.SellAmount, this.UserID)
                    this.$parent.close()
                })
                .finally(() => this.switchLoading())
        },
        payFiatWallet(ProcessingOrderId, Price) {
            if (this.FiatWallets && this.FiatWallets.length < 1) {
                notify("is-danger", this.$t("Message.Order.FiatWallet.NoWallets"), 10000)
                this.$router.push({ name: "FiatWallets" })
            }
            else if (this.FiatWallets && this.FiatWallets.filter(obj => obj.Balance > Price).length < 1)
                notify("is-danger", this.$t("Message.Order.FiatWallet.NotEnoughOnWallets"), 10000)
            else {
                this.$buefy.modal.open({
                    parent: this.$parent,
                    component: PayFiatWallet,
                    props: {
                        orderId: ProcessingOrderId,
                        price: Price
                    },
                    hasModalCard: true
                })
            }
            this.switchLoading()
            this.$parent.close()
        },
        payCryptoWallet(Price, PaymentAddress) {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: WithdrawWallet,
                props: {
                    exchange: true,
                    wallet: this.SellWallet,
                    amnt: Price,
                    address: PaymentAddress
                },
                hasModalCard: true
            })
            this.switchLoading()
            this.$parent.close()
        },
        showOrderDetails(OrderData) {
            this.$buefy.modal.open({
                parent: this.$parent.$parent,
                component: DetailsOrderModal,
                hasModalCard: true,
                props: {
                    order: OrderData
                }
            })
            this.switchLoading()
            this.$parent.close()
        }
    }
}
</script>
