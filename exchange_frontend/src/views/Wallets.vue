<template>
    <div id="wallets">
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item">
                    <h5 class="subtitle is-5">
                        {{ $t("Interface.Wallet.List.Title") }}
                    </h5>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <button v-if="isCurrencyListLoaded" class="button is-theme" data-cy="newwallet" @click="createNew">
                        {{ $t("Interface.Wallet.New.Title") }}
                    </button>
                </div>
            </div>
        </nav>
        <wallet-list />
    </div>
</template>

<script>
import WalletList from "@/components/Wallet/List"
import NewWallet from "@/components/Wallet/New"
import { CURRENCIES_ALL_ENABLE } from "@/store/actions/currencies"
import { ORDER_CLEAR } from "@/store/actions/order"

export default {
    name: "WalletListPage",
    components: {
        "wallet-list": WalletList
    },
    computed: {
        isCurrencyListLoaded () {
            return this.$store.getters.IS_CURRENCIES_LIST_LOADED
        }
    },
    mounted() {
        this.$store.commit(ORDER_CLEAR)
        this.$store.commit(CURRENCIES_ALL_ENABLE)
    },
    methods: {
        createNew() {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: NewWallet,
                hasModalCard: true,
                width: 600
            })
        }
    },
    metaInfo() {
        return {
            title: this.$t("Interface.Wallet.List.Title")
        }
    }
}
</script>
