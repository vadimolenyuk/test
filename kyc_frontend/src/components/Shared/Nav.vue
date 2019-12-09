<template>
    <nav class="navbar header" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <router-link :to="{ name: 'KYC' }" class="logo">
                    <img class="logo-img image" :src="Logo">
                    <span class="logo-name subtitle">{{ $t("Interface.AppName") }}</span>
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
    name: "MainHeader",
    components: {
        "user-nav": UserNav
    },
    data() {
        return {
            ChangeMenu: false,
            IsDesktop: true
        }
    },
    computed: {
        Logo() {
            let LogoURL = null
            if (this.$store.getters.IS_APPID_SET) 
                LogoURL = this.$store.state.AppDB.find(x => x.Id === this.$store.state.AppDBSet.ID).Settings.Logo
            return (this.$store.getters.IS_APPID_SET && LogoURL) ? LogoURL : "/img/logo.svg"
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
