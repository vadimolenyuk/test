<template>
    <nav class="navbar is-getcrypto is-fixed-top">
        <div class="container">
            <div class="navbar-brand">
                <router-link :to="{ name: 'Index' }" class="navbar-item">
                    <img class="image is-48x48" :src="this.$ThemeLogoUrl">
                    <span class="logoname subtitle is-hidden-mobile">{{ title }}</span>
                </router-link>
                <div class="navbar-menu-mobile is-hidden-desktop">
                    <router-link :to="{ name: 'Login' }" class="navbar-item is-uppercase">
                        {{ $t("Interface.Login.Title") }}
                    </router-link>
                    <router-link :to="{ name: 'Register' }" class="navbar-item is-uppercase">
                        {{ $t("Interface.Register.Title") }}
                    </router-link>
                </div>
                <svg
                    class="navbar-burger burger ham"
                    data-target="NavbarMenu"
                    viewBox="0 0 100 100"
                    width="80"
                    onclick="this.classList.toggle('active')"
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
                        <router-link :to="{ name: 'Index' }" class="navbar-item" active-class="is-active">
                            {{ $t("Guest.Nav.Home") }}
                        </router-link>
                        <router-link v-if="AppMode === 'USA'" :to="{ name: 'About' }" class="navbar-item" active-class="is-active">
                            {{ $t("Guest.Nav.About") }}
                        </router-link>
                        <router-link v-if="AppMode === 'EU'" :to="{ name: 'Legal' }" class="navbar-item" active-class="is-active">
                            {{ $t('Guest.Nav.Legal') }}
                        </router-link>
                        <router-link :to="{ name: 'Faq' }" class="navbar-item" active-class="is-active">
                            {{ $t("Guest.Nav.FAQ") }}
                        </router-link>
                        <!-- <a href="#" class="navbar-item">Learn</a>
                        <a href="#" class="navbar-item">FAQ</a>
                        <a href="#" class="navbar-item">Blog</a> -->
                    </div>
                    <div class="navbar-end is-hidden-touch">
                        <router-link :to="{ name: 'Login' }" class="navbar-item is-uppercase">
                            {{ $t("Interface.Login.Title") }}
                        </router-link>
                        <router-link :to="{ name: 'Register' }" class="navbar-item is-uppercase">
                            {{ $t("Interface.Register.Title") }}
                        </router-link>
                        <!-- <lang-select></lang-select> -->
                    </div>
                </div>
            </transition>
        </div>
    </nav>
</template>

<script>
// import LangSelect from "@/components/Shared/LangSelect"

export default {
    name: "NavbarGuest",
    components: {
        // "lang-select": LangSelect
    },
    data() {
        return {
            ChangeMenu: false,
            IsDesktop: true
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.IS_AUTHENTICATED
        },
        title() {
            return process.env.VUE_APP_TITLE
        },
        AppMode() {
            return process.env.VUE_APP_REGION
        }
    },
    mounted() {
        window.addEventListener("resize", this.handleWindowResize)
    },
    methods: {
        handleWindowResize(event) {
            this.IsDesktop = (event.currentTarget.innerWidth > 1023)
        },
        toDashboard() {
            if (this.isAuthenticated)
                this.$router.push({ name: "Dashboard" })
            else
                this.$router.push({ name: "Login" })
        }
    }
}
</script>