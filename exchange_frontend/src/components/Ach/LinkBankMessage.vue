<template>
    <div class="verify-notification">
        <article class="message is-info">
            <div class="message-body">
                <div class="media">
                    <div class="media-left is-hidden-mobile">
                        <span class="icon is-large">
                            <i class="mdi mdi-alert-circle mdi-48px" />
                        </span>
                    </div>
                    <div class="media-content">
                        <h5 class="title is-5">
                            {{ $t("Interface.FiatWallet.LinkBank.Title") }}
                        </h5>
                        <p>{{ $t("Interface.FiatWallet.LinkBank.SubTitle") }}</p>
                        <button class="button" @click="link()">
                            {{ $t("Interface.FiatWallet.LinkBank.Button") }}
                        </button>
                    </div>
                </div>
            </div>
        </article>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import { ACH_LINK_BANKACCOUNTS_REQUEST } from "@/store/actions/ach"

export default {
    name: "LinkBankMessage",
    mixins: [LoadingState],
    methods: {
        link() {
            this.switchLoading()
            this.$store.dispatch(ACH_LINK_BANKACCOUNTS_REQUEST)
                .then(() => this.switchLoading())
        }
    }
}
</script>