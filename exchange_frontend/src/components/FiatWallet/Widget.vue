<template>
    <div v-if="Wallets" class="wallets columns is-multiline is-mobile">
        <div v-for="DisplayWallet in DisplayWallets" :key="DisplayWallet.id" class="column is-12">
            <div class="card">
                <div class="card-content">
                    <span class="title is-6 is-uppercase">{{ DisplayWallet.Name }}</span>
                    <br>
                    <i class="crypto-icon subtitle is-4" :class="DisplayWallet.Currency.toLowerCase()" style="position:relative;top:-2px;" />
                    <span class="subtitle is-4"> {{ DisplayWallet.Balance }} </span>
                    <span class="subtitle is-6">{{ DisplayWallet.Currency }}</span>
                </div>
            </div>
        </div>
        <b-pagination
            v-if="Wallets.length > Pagination.PerPage"
            :total="Wallets.length"
            :current.sync="Pagination.CurrentPage"
            :simple="Pagination.Simple"
            :per-page="Pagination.PerPage"
            :rounded="Pagination.Rounded"
        />
    </div>
    <b-loading v-else :is-full-page="false" :active.sync="IsLoading" :can-cancel="false" />
</template>

<script>
import "@/styles/plugins/cryptocurrency-icons.css"

export default {
    name: "FiatWalletListWidget",
    data() {
        return {
            Pagination: {
                CurrentPage: 1,
                PerPage: 2,
                Simple: true,
                Rounded: true
            }
        }
    },
    computed: {
        CurrencyList: {
            get () {
                return this.$store.state.Currencies.List
            }
        },
        Wallets: {
            get () {
                return this.$store.state.FiatWallet.List
            }
        },
        DisplayWallets: {
            get () {
                return this.Wallets.slice((this.Pagination.CurrentPage - 1) * this.Pagination.PerPage, this.Pagination.PerPage + ((this.Pagination.CurrentPage - 1) * this.Pagination.PerPage))
            }
        }
    }
}
</script>