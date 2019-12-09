<template>
    <div v-if="isCurrencyListLoaded" class="order create">
        <div style="grid-area: labelbuy" class="field">
            <label class="label">{{ $t("Interface.Order.Create.Get") }}</label>
        </div>
        <b-field
            style="grid-area: selectbuy"
            :message="errors.first('BuyCurrency')"
            :type="{ 'is-danger': errors.has('BuyCurrency'), 'is-success': fields.BuyCurrency && fields.BuyCurrency.valid }"
        >
            <multiselect
                v-model="BuyCurrency"
                v-validate="'required'"
                :options="CurrencyList"
                :allow-empty="false"
                track-by="Code"
                select-label=""
                label="Code"
                data-vv-name="BuyCurrency"
                data-vv-value-path="BuyCurrency"
                @input="selectCurrency"
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
        <b-field
            style="grid-area: valuebuy"
            :message="errors.first('BuyAmount')"
            :type="{ 'is-danger': errors.has('BuyAmount'), 'is-success': fields.BuyAmount && fields.BuyAmount.valid }"
        >
            <b-input
                v-model="BuyAmount" 
                v-validate="{ 
                    required: true, 
                    decimal: true, 
                    required_currency: BuyCurrency,
                    exchnagelimit: (isAuthenticated) ? BuyRemaining : false, 
                    min_value: 0 
                }" 
                name="BuyAmount"
                :placeholder="$t('Interface.Order.Create.InputPlaceholder')"
                type="text"
                @keyup.native="calculateOrder(false)"
            />
        </b-field>

        <div style="grid-area: labelsell" class="field">
            <label class="label">{{ $t("Interface.Order.Create.Send") }}</label>
        </div>
        <b-field
            style="grid-area: selectsell"
            :message="errors.first('SellCurrency')"
            :type="{ 'is-danger': errors.has('SellCurrency'), 'is-success': fields.SellCurrency && fields.SellCurrency.valid }"
        >
            <multiselect
                v-model="SellCurrency"
                v-validate="'required'"
                :options="CurrencyList"
                :allow-empty="false"
                track-by="Code"
                select-label=""
                label="Code"
                data-vv-name="SellCurrency"
                data-vv-value-path="SellCurrency"
                @input="selectCurrency"
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
        <b-field
            style="grid-area: valuesell"
            :message="errors.first('SellAmount')"
            :type="{ 'is-danger': errors.has('SellAmount'), 'is-success': fields.SellAmount && fields.SellAmount.valid }"
        >
            <b-input 
                v-model="SellAmount" 
                v-validate="{ 
                    required: true, 
                    decimal: true, 
                    required_currency: SellCurrency,
                    exchnagelimit: (isAuthenticated) ? SellRemaining : false,
                    min_value: 0
                }" 
                name="SellAmount" 
                :placeholder="$t('Interface.Order.Create.InputPlaceholder')"
                type="text"
                @keyup.native="calculateOrder(true)"
            />
        </b-field>

        <button
            id="swap-btn"
            style="grid-area: swap; align-self: center;"
            type="button"
            class="button is-theme is-circle is-outlined"
            :class="{ 'is-loading': IsLoading }"
            @click="swapCurrency"
        >
            <i class="mdi mdi-swap-horizontal" />
        </button>

        <div style="grid-area: button;" class="has-text-centered">
            <button
                id="submitbtn"
                type="submit"
                class="button is-theme is-rounded"
                :disabled="IsLoading"
                :class="{
                    'is-outlined': IsGuestLayout, 
                    'is-danger': errors.items.length > 0,
                    'is-success': (SellCurrency && SellAmount && BuyCurrency && BuyAmount && errors.items.length === 0)
                }"
                @click="confirmOrder"
            >
                {{ $t("Interface.Order.Create.Exchange") }}
            </button>
        </div>
        <b-message style="grid-area: message; box-shadow: none;">
            <span style="margin-right: 3px;">{{ $t("Interface.Order.Create.FeeMessage") }}: </span>
            <router-link :to="{ name: 'FeeSchedule' }">
                {{ $t("Interface.Order.Create.FeeLink") }}
            </router-link>
        </b-message>
    </div>
    <b-loading v-else :is-full-page="false" :active.sync="IsCurrencyListLoading" :can-cancel="false" />
</template>

<script>
import debounce from "lodash/debounce"
import Multiselect from "vue-multiselect"
import "@/styles/plugins/cryptocurrency-icons.css"
import router from "@/router"
import notify from "@/utils/Notification"
import LoadingState from "@/mixins/LoadingState"
import ConfirmOrder from "@/components/Order/Confirm"
import SubscribeNews from "@/components/Order/SubscribeNews"
import {
    CURRENCIES_ALL_ENABLE,
    CURRENCIES_CURRENCY_DISABLE
} from "@/store/actions/currencies"
import {
    ORDER_CHANGE_SELLCURRENCY,
    ORDER_CHANGE_SELLAMOUNT,
    ORDER_CHANGE_BUYCURRENCY,
    ORDER_CHANGE_BUYAMOUNT,
    ORDER_CHANGE_DIRECTION,
    ORDER_CALCULATE_REQUEST
} from "@/store/actions/order"

export default {
    name: "OrderCreate",
    components: {
        "multiselect": Multiselect
    },
    mixins: [LoadingState],
    data () {
        return {
            IsCurrencyListLoading: true,
            IsGuestLayout: false
        }
    },
    computed: {
        SellCurrency: {
            get () {
                return this.$store.state.Order.SellCurrency
            },
            set (value) {
                this.$store.commit(ORDER_CHANGE_SELLCURRENCY, value)
            }
        },
        SellAmount: {
            get () {
                return this.$store.state.Order.SellAmount
            },
            set (value) {
                this.$store.commit(ORDER_CHANGE_SELLAMOUNT, value)
            }
        },
        SellRemaining: {
            get () {
                if (!this.SellCurrency) return 0
                switch (this.SellCurrency.Code) {
                case "BTC":
                    return this.$store.state.Order.DailyLimit.BTC.Limit - this.$store.state.Order.DailyLimit.BTC.Used
                case "ETH":
                    return this.$store.state.Order.DailyLimit.ETH.Limit - this.$store.state.Order.DailyLimit.ETH.Used
                case "USD":
                    return this.$store.state.Order.DailyLimit.USD.Limit - this.$store.state.Order.DailyLimit.USD.Used
                default:
                    return null
                }
            }
        },
        BuyRemaining: {
            get () {
                if (!this.BuyCurrency) return 0
                switch (this.BuyCurrency.Code) {
                case "BTC":
                    return this.$store.state.Order.DailyLimit.BTC.Limit - this.$store.state.Order.DailyLimit.BTC.Used
                case "ETH":
                    return this.$store.state.Order.DailyLimit.ETH.Limit - this.$store.state.Order.DailyLimit.ETH.Used
                case "USD":
                    return this.$store.state.Order.DailyLimit.USD.Limit - this.$store.state.Order.DailyLimit.USD.Used
                default:
                    return null
                }
            }
        },
        BuyCurrency: {
            get () {
                return this.$store.state.Order.BuyCurrency
            },
            set (value) {
                this.$store.commit(ORDER_CHANGE_BUYCURRENCY, value)
            }
        },
        BuyAmount: {
            get () {
                return this.$store.state.Order.BuyAmount
            },
            set (value) {
                this.$store.commit(ORDER_CHANGE_BUYAMOUNT, value)
            }
        },
        Direction: {
            get () {
                return this.$store.state.Order.Direction
            },
            set (value) {
                this.$store.commit(ORDER_CHANGE_DIRECTION, value)
            }
        },
        CurrencyList: {
            get () {
                return this.$store.state.Currencies.List
            }
        },
        FiatWallets: {
            get() {
                return this.$store.state.FiatWallet.List
            }
        },
        isFiatWalletExist() {
            return (this.FiatWallets && this.FiatWallets.length > 0)
        },
        isCurrencyListLoaded () {
            return this.$store.getters.IS_CURRENCIES_LIST_LOADED
        },
        isAuthenticated () {
            return this.$store.getters.IS_AUTHENTICATED
        }
    },
    mounted () {
        if (this && this.$el && this.$el.classList && this.$el.classList[2] === "is-guest") this.IsGuestLayout = true
        this.restoreOrder()
    },
    methods: {
        selectCurrency (value) {
            this.$store.commit(CURRENCIES_ALL_ENABLE)
            this.$store.commit(CURRENCIES_CURRENCY_DISABLE, value.Code)

            if (this.SellCurrency && this.BuyCurrency) {
                switch (value.Code) {
                case this.SellCurrency.Code: {
                    this.$store.commit(CURRENCIES_CURRENCY_DISABLE, this.BuyCurrency.Code)
                    if (this.BuyAmount && !this.SellAmount)
                        this.calculateOrder(false)
                    else
                        this.calculateOrder(true)
                    break
                }
                case this.BuyCurrency.Code: {
                    this.$store.commit(CURRENCIES_CURRENCY_DISABLE, this.SellCurrency.Code)
                    if (this.SellAmount && !this.BuyAmount)
                        this.calculateOrder(true)
                    else
                        this.calculateOrder(false)
                    break
                }
                default:
                    break
                }

            }
        },
        swapCurrency () {
            if (this.SellCurrency && this.BuyCurrency) {
                this.BuyCurrency = [this.SellCurrency, this.SellCurrency = this.BuyCurrency][0]
                this.BuyAmount = [this.SellAmount, this.SellAmount = this.BuyAmount][0]
            }
        },
        calculateOrder: debounce(
            function(mode) {
                if ((this.SellCurrency && this.BuyCurrency) && (this.SellAmount || this.BuyAmount)) {
                    this.$validator.validate((mode) ? "SellAmount" : "BuyAmount").then(result => {
                        if (result) {
                            this.Direction = mode
                            this.switchLoading()
                            //Отправка запроса на пересчёт
                            this.$store.dispatch(ORDER_CALCULATE_REQUEST)
                                .finally(() => {
                                    this.switchLoading()
                                })
                        }
                    })
                }
            },
            process.env.VUE_APP_DEBOUNCE_TIME
        ),
        confirmOrder () {
            if (this.isAuthenticated) {
                if (this.SellCurrency && this.SellAmount && this.BuyCurrency && this.BuyAmount){
                    this.$validator.validate().then(result => {
                        if (result) {
                            if (process.env.VUE_APP_FEATURE_FIATWALLET && process.env.VUE_APP_FEATURE_FIATWALLET === "false" && this.BuyCurrency.IsFiat)
                                this.$buefy.modal.open({
                                    parent: this.$parent.$parent,
                                    component: SubscribeNews,
                                    hasModalCard: true
                                })
                            else if (
                                this.BuyCurrency.IsFiat &&
                                !this.isFiatWalletExist
                            )
                                this.$buefy.dialog.confirm({
                                    title: this.$t("Message.Order.FiatWallet.NoWalletsToReceive"),
                                    message: this.$t("Message.Order.FiatWallet.CreateWalletFirst"),
                                    confirmText: this.$t("Interface.Wallet.New.Title"),
                                    type: "is-warning",
                                    hasIcon: true,
                                    onConfirm: () => router.push({ name: "FiatWallets" })
                                })
                            else
                                this.$buefy.modal.open({
                                    parent: this,
                                    component: ConfirmOrder,
                                    hasModalCard: true
                                })
                        }
                        else
                            notify("is-danger", this.$t("Validation.Default"))
                    })
                }
                else
                    notify("is-danger", this.$t("Validation.Default"))
            }
            else // Для гостевого представления, без авторизации - сохранение заказа в localstorage
                this.saveOrderToLocalStorage()
        },
        restoreOrder () {
            if (localStorage.getItem("Order") !== null) {
                var Order = JSON.parse(localStorage.getItem("Order"))
                this.SellCurrency = Order.SellCurrency
                this.SellAmount = Order.SellAmount
                this.BuyCurrency = Order.BuyCurrency
                this.BuyAmount = Order.BuyAmount
                this.Direction = Order.Direction
                if (this.isAuthenticated)
                    notify("is-info", this.$t("Message.Order.RestoreFromLocalAuth"))
                else
                    this.$buefy.snackbar.open({
                        duration: 5000,
                        message: this.$t("Message.Order.RestoreFromLocalNoAuth"),
                        type: "is-warning",
                        position: "is-bottom",
                        actionText: "Login",
                        onAction: () => {
                            router.push({ name: "Login" })
                        }
                    })
            }
        },
        saveOrderToLocalStorage() {
            localStorage.setItem("Order", JSON.stringify({
                SellCurrency: this.SellCurrency,
                SellAmount: this.SellAmount,
                BuyCurrency: this.BuyCurrency,
                BuyAmount: this.BuyAmount,
                Direction: this.Direction
            }))
            this.$buefy.snackbar.open({
                duration: 10000,
                message: this.$t("Message.Order.SaveToLocal"),
                type: "is-warning",
                position: "is-bottom",
                actionText: "Login",
                indefinite: false,
                onAction: () => {
                    this.$router.push({ name: "Login" })
                }
            })
        }
    }
}
</script>
