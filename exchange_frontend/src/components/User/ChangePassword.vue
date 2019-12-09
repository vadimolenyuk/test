<template>
    <div class="modal-card order confirm" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.ChangePassword.Title") }}</p>
        </header>
        <section class="modal-card-body">
            <form>
                <b-field :label="$t('Interface.ChangePassword.OldPassword')" :message="errors.first('OldPassword')" :type="{ 'is-danger': errors.has('OldPassword'), 'is-success': fields.OldPassword && fields.OldPassword.valid }">
                    <b-input v-model="Form.OldPassword" v-validate="'required|min:8'" name="OldPassword" type="password" />
                </b-field>
                <b-field :label="$t('Interface.ChangePassword.NewPassword')" :message="errors.first('Password')" :type="{ 'is-danger': errors.has('Password'), 'is-success': fields.Password && fields.Password.valid }">
                    <b-input
                        ref="Password"
                        v-model="Form.Password"
                        v-validate="'required|min:8'"
                        name="Password"
                        type="password"
                    />
                </b-field>
                <b-field :label="$t('Interface.ChangePassword.NewPasswordConfirmation')" :message="errors.first('PasswordConfirmation')" :type="{ 'is-danger': errors.has('PasswordConfirmation'), 'is-success': fields.PasswordConfirmation && fields.PasswordConfirmation.valid }">
                    <b-input
                        v-model="Form.PasswordConfirmation"
                        v-validate="'required|min:8|confirmed:Password'"
                        name="PasswordConfirmation"
                        data-vv-as="Password"
                        type="password"
                    />
                </b-field>
            </form>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Cancel") }}
            </button>
            <button class="button is-theme is-fullwidth" type="submit" @click="changePassword">
                {{ $t("Interface.ChangePassword.Button") }}
            </button>
        </footer>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />
    </div>
</template>

<script>
import notify from "@/utils/Notification"
import LoadingState from "@/mixins/LoadingState"
import { CHANGE_PASSWORD_REQUEST } from "@/store/actions/password"

export default {
    name: "ChangePassword",
    mixins: [LoadingState],
    data() {
        return {
            Form: {
                OldPassword: null,
                Password: null,
                PasswordConfirmation: null
            }
        }
    },
    methods: {
        changePassword() {
            this.$validator.validate().then(result => {
                if (result) {
                    this.switchLoading()
                    this.$store.dispatch(CHANGE_PASSWORD_REQUEST, this.Form)
                        .finally(() => {
                            this.switchLoading()
                            this.$parent.close()
                        })
                }
                else notify("is-danger", this.$t("Validation.Default"))
            })
        }
    }
}
</script>