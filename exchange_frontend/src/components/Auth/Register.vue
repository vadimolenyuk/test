<template>
    <div class="register">
        <form @submit.prevent="register">
            <b-field :label="$t('Interface.Register.Email')" :message="errors.first('Login')" :type="{ 'is-danger': errors.has('Login'), 'is-success': fields.Login && fields.Login.valid }">
                <b-input v-model="Form.Email" v-validate="'required|email'" name="Login" type="text" />
            </b-field>
            <b-field :label="$t('Interface.Register.Phone')" :message="errors.first('Phone')" :type="{ 'is-danger': errors.has('Phone'), 'is-success': fields.Phone && fields.Phone.valid }">
                <cleave
                    v-model="Form.Phone"
                    v-validate="'required|phone'"
                    class="input"
                    :class="{ 'is-danger': errors.has('Phone'), 'is-success': fields.Phone && fields.Phone.valid }"
                    :options="CustomPhone"
                    name="Phone"
                    type="text"
                />
            </b-field>
            <b-field :label="$t('Interface.Register.Password')" :message="errors.first('Password')" :type="{ 'is-danger': errors.has('Password'), 'is-success': fields.Password && fields.Password.valid }">
                <b-input
                    ref="Password"
                    v-model="Form.Password"
                    v-validate="'required|min:8'"
                    name="Password"
                    type="password"
                />
            </b-field>
            <b-field :label="$t('Interface.Register.PasswordConfiramtion')" :message="errors.first('PasswordConfirmation')" :type="{ 'is-danger': errors.has('PasswordConfirmation'), 'is-success': fields.PasswordConfirmation && fields.PasswordConfirmation.valid }">
                <b-input
                    v-model="Form.PasswordConfirmation"
                    v-validate="'required|min:8|confirmed:Password'"
                    name="PasswordConfirmation"
                    data-vv-as="Password"
                    type="password"
                />
            </b-field>
            <b-field :message="errors.first('TermsOfUse')" :type="{ 'is-danger': errors.has('TermsOfUse'), 'is-success': fields.TermsOfUse && fields.TermsOfUse.valid }">
                <b-checkbox v-model="Form.Terms" v-validate="'required:true'" name="TermsOfUse">
                    {{ $t("Interface.Register.CheckboxAgree") }} 
                    <router-link :to="{ name: 'Terms' }" target="_blank">
                        {{ $t("Guest.Terms.Title") }}
                    </router-link>
                </b-checkbox>
            </b-field>
            <b-field :message="errors.first('PrivacyPolicy')" :type="{ 'is-danger': errors.has('PrivacyPolicy'), 'is-success': fields.PrivacyPolicy && fields.PrivacyPolicy.valid }">
                <b-checkbox v-model="Form.PrivacyPolicy" v-validate="'required:true'" name="PrivacyPolicy">
                    {{ $t("Interface.Register.CheckboxAgree") }} 
                    <router-link :to="{ name: 'PrivacyPolicy' }" target="_blank">
                        {{ $t("Guest.PrivacyPolicy.Title") }}
                    </router-link>
                </b-checkbox>
            </b-field>
            <button type="submit" class="button is-theme is-fullwidth">
                {{ $t("Interface.Register.Button") }}
            </button>
        </form>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import Cleave from "vue-cleave-component"
// eslint-disable-next-line no-unused-vars
import CleavePhone from "cleave.js/dist/addons/cleave-phone.i18n"
import notify from "@/utils/Notification"
import LoadingState from "@/mixins/LoadingState"
import { REGISTER_REQUEST } from "@/store/actions/register"

export default {
    name: "Register",
    components: {
        Cleave
    },
    mixins: [LoadingState],
    data () {
        return {
            CustomPhone: {
                phone: true,
                prefix: "+",
                numericOnly: true
            },
            Form: {
                Email: null,
                Phone: 11,
                Password: null,
                PasswordConfirmation: null,
                TermsOfUse: false,
                PrivacyPolicy: false
            },
            Host: (window.location.hostname && window.location.hostname.length) ? window.location.hostname : null,
            Locale: (navigator.languages && navigator.languages.length) ? navigator.languages : null
        }
    },
    methods: {
        register() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(REGISTER_REQUEST, this.Form)
                        .then(() => {
                            notify("is-success", this.$t("Message.Register.Success"))
                        })
                        .catch(error => {
                            notify("is-danger", error.response.data.error)
                        })
                        .finally(() => this.switchLoading())
                }
                else notify("is-danger", this.$t("Validation.Default"))
            })
        },
        getLink(FileName) {
            let Addr = process.env.VUE_APP_API_EXCHANGE_URL.substring(0, process.env.VUE_APP_API_EXCHANGE_URL.length - 4)
            return Addr + "staticfiles/" + FileName
        }
    }
}
</script>