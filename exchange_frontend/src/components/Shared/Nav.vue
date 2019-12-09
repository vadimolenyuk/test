<template>
    <nav class="navbar is-getcrypto">
        <div class="container">
            <div class="navbar-brand">
                <router-link :to="{ name: 'Index' }" class="logo navbar-item is-hidden-desktop">
                    <img class="image" :src="this.$ThemeLogoUrl">
                    <span class="logoname subtitle">{{ title }}</span>
                </router-link>
                <svg
                    class="navbar-burger burger ham"
                    data-target="NavbarMenu"
                    viewBox="0 0 100 100"
                    width="80"
                    :class="{ active: ChangeMenu }"
                    @click="ChangeMenu = !ChangeMenu"
                >
                    <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                    <path class="line middle" d="m 70,50 h -40" />
                    <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                </svg>
            </div>
            <transition name="fade" mode="out-in">
                <div v-if="ChangeMenu || IsDesktop" id="NavbarMenu" class="navbar-menu" :class="{ open: ChangeMenu }">
                    <div class="navbar-start">
                        <router-link :to="{ name: 'Dashboard' }" class="navbar-item" active-class="is-active">
                            {{ $t("Interface.Nav.Dashboard") }}
                        </router-link>
                        <router-link :to="{ name: 'Orders' }" class="navbar-item" active-class="is-active">
                            {{ $t("Interface.Nav.Orders") }}
                        </router-link>
                        <router-link :to="{ name: 'Wallets' }" class="navbar-item" active-class="is-active">
                            {{ $t("Interface.Nav.CryptocurrencyWallets") }}
                        </router-link>
                        <router-link v-if="ShowFiatWallet" :to="{ name: 'FiatWallets' }" class="navbar-item" active-class="is-active">
                            {{ $t("Interface.Nav.FiatWallets") }}
                        </router-link>
                        <router-link :to="{ name: 'Tiers' }" class="navbar-item" active-class="is-active">
                            {{ $t("Interface.Nav.Tiers") }}
                        </router-link>
                    </div>
                    <div class="navbar-end">
                        <user-nav />
                    </div>
                </div>
            </transition>
        </div>
    </nav>
</template>

<script>
import UserNav from "@/components/User/UserNav"

export default {
    name: "Navbar",
    components: {
        "user-nav": UserNav
    },
    data() {
        return {
            ChangeMenu: false,
            IsDesktop: true,
            ShowFiatWallet: (process.env.VUE_APP_FEATURE_FIATWALLET === "true")
        }
    },
    computed: {
        title() {
            return process.env.VUE_APP_TITLE
        }
    },
    mounted() {
        window.addEventListener("resize", this.handleWindowResize)
    },
    methods: {
        handleWindowResize(event) {
            this.IsDesktop = (event.currentTarget.innerWidth > 1023)
        }
    }
}
</script>
