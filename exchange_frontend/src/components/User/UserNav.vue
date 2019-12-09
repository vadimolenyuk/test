<template>
    <div v-if="isSessionReady" class="navbar-item has-dropdown" @click="ChangeMenu = !ChangeMenu">
        <a id="usernav" class="navbar-link">
            <b-icon icon="account-circle" style="margin-right:0;" />
            {{ sessionUserInfo.Name }}
        </a>

        <transition name="fade" mode="out-in">
            <div v-if="ChangeMenu" class="navbar-dropdown">
                <a id="changepwd" class="navbar-item" @click.prevent="changePassword">
                    <b-icon icon="key-change" size="is-small" />
                    <span>{{ $t("Interface.ChangePassword.Button") }}</span>
                </a>
                <a id="logout" class="navbar-item" @click="logout">
                    <b-icon icon="logout" size="is-small" />
                    <span>{{ $t("Interface.Nav.Logout") }}</span>
                </a>
            </div>
        </transition>
    </div>
</template>

<script>
import ChangePassword from "@/components/User/ChangePassword"
import { LOGIN_LOGOUT } from "@/store/actions/login"

export default {
    name: "UserNav",
    data() {
        return {
            ChangeMenu: false
        }
    },
    computed: {
        sessionUserInfo() {
            return this.$store.state.Session
        },
        isSessionReady() {
            return this.$store.getters.IS_SESSION_READY
        }
    },
    methods: {
        logout() {
            this.$store.dispatch(LOGIN_LOGOUT)
        },
        changePassword() {
            this.$buefy.modal.open({
                parent: this.$parent,
                component: ChangePassword,
                hasModalCard: true
            })
        }
    }
}
</script>