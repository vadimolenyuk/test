<template>
    <div class="verify">
        <form @submit.prevent="verify">
            <b-field :label="$t('Interface.Verify.Code')" :message="errors.first('Code')" :type="{ 'is-danger': errors.has('Code'), 'is-success': fields.Code && fields.Code.valid }">
                <b-field>
                    <b-input
                        v-model="Text"
                        v-validate="'required|numeric'"
                        name="Code"
                        type="text"
                        expanded
                    />
                    <p class="control">
                        <button type="button" class="button is-theme is-outlined" :disabled="!Resend" @click="resend">
                            <template v-if="Resend">
                                Resend
                            </template>
                            <template v-else>
                                <b-icon icon="timer" size="is-small" />
                                <span>{{ Timeout }}</span>
                            </template>
                        </button>
                    </p>
                </b-field>
            </b-field>
            <button type="submit" class="button is-theme is-fullwidth">
                {{ $t("Interface.Verify.Button") }}
            </button>
        </form>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import router from "@/router"
import notify from "@/utils/Notification"
import LoadingState from "@/mixins/LoadingState"
import { VERIFY_REQUEST, VERIFY_CHECK } from "@/store/actions/verify"

export default {
    name: "VerifyPhone",
    mixins: [LoadingState],
    data() {
        return {
            Text: null,
            Resend: false,
            Timeout: null,
            Timer: null
        }
    },
    mounted() {
        if (this.$store.getters.IS_PHONE_VERIFIED) {
            router.push({ name: "Dashboard" })
            notify("is-info", this.$t("Message.Verify.Already"))
        }
        else
            this.resend()
    },
    beforeDestroy() {
        clearInterval(this.Timer)
    },
    methods: {
        verify() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(VERIFY_CHECK, this.Text)
                        .then(() => {
                            this.$router.push({ name: "Dashboard" })
                        })
                        .finally(() => this.switchLoading())
                }
                else notify("is-danger", this.$t("Validation.Default"))
            })
        },
        resend() {
            this.Resend = false
            this.Timeout = 180
            this.$store.dispatch(VERIFY_REQUEST)
                .then(() => this.Timer = setInterval(this.makeResendAvailable, 1000))
        },
        makeResendAvailable() {
            this.Timeout--
            if (this.Timeout <= 0) {
                this.Resend = true
                clearInterval(this.Timer)
            }
        }
    }
}
</script>