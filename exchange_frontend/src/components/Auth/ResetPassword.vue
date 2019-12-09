<template>
    <div class="resetpassword">
        <form @submit.prevent="newPassword">
            <b-field :label="$t('Interface.Register.Password')" :message="errors.first('Password')" :type="{ 'is-danger': errors.has('Password'), 'is-success': fields.Password && fields.Password.valid }">
                <b-input
                    ref="Password"
                    v-model="Form.Password"
                    v-validate="'required|min:8'"
                    name="Password"
                    type="password"
                    password-reveal
                />
            </b-field>
            <b-field :label="$t('Interface.Register.PasswordConfiramtion')" :message="errors.first('PasswordConfirmation')" :type="{ 'is-danger': errors.has('PasswordConfirmation'), 'is-success': fields.PasswordConfirmation && fields.PasswordConfirmation.valid }">
                <b-input
                    v-model="Form.PasswordConfirmation"
                    v-validate="'required|min:8|confirmed:Password'"
                    name="PasswordConfirmation"
                    data-vv-as="Password"
                    type="password"
                    password-reveal
                />
            </b-field>
            <button type="submit" class="button is-theme is-fullwidth">
                {{ $t("Interface.Buttons.Submit") }}
            </button>
        </form>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import { RESET_PASSWORD_REQUEST } from "@/store/actions/password"

export default {
    name: "ResetPassword",
    mixins: [LoadingState],
    data() {
        return {
            Form: {
                Password: null,
                PasswordConfirmation: null
            }
        }
    },
    mounted() {
        if (!this.$store.getters.IS_RESET_PASSWORD_READY)
            this.$router.push({ name: "ForgotPassword" })
    },
    methods: {
        newPassword() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(RESET_PASSWORD_REQUEST, this.Form.Password)
                        .then(() => {
                            this.$router.push({ name: "Login" })
                        })
                        .finally(() => this.switchLoading())
                }
            })
        }
    }
}
</script>