<template>
    <div class="verify-notification">
        <article class="message is-warning">
            <div class="message-body">
                <div class="media">
                    <template v-if="!EmailSent">
                        <div class="media-left is-hidden-mobile">
                            <span class="icon is-large">
                                <i class="mdi mdi-alert mdi-48px" />
                            </span>
                        </div>
                        <div class="media-content">
                            <h5 class="title is-5">
                                {{ $t("Interface.Dashboard.VerifyNotification.Email.Title") }}
                            </h5>
                            <p>{{ $t("Interface.Dashboard.VerifyNotification.Email.SubTitle") }}</p>
                            <button class="button" @click="confirm">
                                {{ $t("Interface.Dashboard.VerifyNotification.Email.Button") }}
                            </button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="media-left is-hidden-mobile">
                            <span class="icon is-large">
                                <i class="mdi mdi-check mdi-48px" />
                            </span>
                        </div>
                        <div class="media-content">
                            <h5 class="title is-5">
                                {{ SentTitle }}
                            </h5>
                            <p>{{ $t("Interface.Dashboard.VerifyNotification.Email.SubTitle") }}</p>
                        </div>
                    </template>
                    <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import { VERIFY_EMAIL_REQUEST } from "@/store/actions/verify"

export default {
    name: "VerifyEmail",
    mixins: [LoadingState],
    data() {
        return {
            EmailSent: false,
            SentTitle: null
        }
    },
    computed: {
        UserEmail() {
            return this.$store.state.Session.Email
        }
    },
    methods: {
        confirm() {
            this.switchLoading()
            this.$store.dispatch(VERIFY_EMAIL_REQUEST)
                .then(() => {
                    this.SentTitle = this.$tc("Message.Verify.EmailConfirmationSent", 777, { email: this.UserEmail })
                    this.EmailSent = true
                })
                .finally(() => this.switchLoading())
        }
    }
}
</script>