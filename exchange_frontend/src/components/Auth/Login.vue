<template>
    <div class="login">
        <form @submit.prevent="login">
            <b-field 
                :label="$t('Interface.Login.Username')"
                :message="errors.first('Login')" 
                :type="{ 'is-danger': errors.has('Login'), 'is-success': fields.Login && fields.Login.valid }"
                label-for="form-login"
            >
                <b-input
                    id="form-login"
                    v-model="Form.Login"
                    v-validate="'required|login'"
                    name="Login"
                    type="text"
                />
            </b-field>
            <b-field 
                :label="$t('Interface.Register.Password')" 
                :message="errors.first('Password')" 
                :type="{ 'is-danger': errors.has('Password'), 'is-success': fields.Password && fields.Password.valid }"
                label-for="form-password"
            >
                <b-input
                    id="form-password"
                    v-model="Form.Password"
                    v-validate="'required|min:8'"
                    name="Password"
                    type="password"
                />
            </b-field>
            <!--<div class="field">
                <b-checkbox v-model="Form.Remember">Remember me</b-checkbox>
            </div>-->
            <button type="submit" class="button is-theme is-fullwidth">
                {{ $t("Interface.Login.Button") }}
            </button>
        </form>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import notify from "@/utils/Notification"
import { LOGIN_REQUEST } from "@/store/actions/login"

export default {
    name: "Login",
    mixins: [LoadingState],
    data () {
        return {
            Form: {
                Login: null,
                Password: null,
                Remember: false
            }
        }
    },
    methods: {
        login() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(LOGIN_REQUEST, this.Form)
                        .then(() => {
                            this.$router.push({ name: "Dashboard" })
                        })
                        .finally(() => this.switchLoading())
                }
                else notify("is-danger", this.$t("Validation.Default"))
            })
        }
    }
}
</script>