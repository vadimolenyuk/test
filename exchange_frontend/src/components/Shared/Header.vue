<template>
    <header class="header is-hidden-touch">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <router-link :to="{ name: 'Dashboard' }" class="logo">
                        <img class="logo-img image" :src="this.$ThemeLogoUrl">
                        <span class="logo-name subtitle">{{ title }}</span>
                    </router-link>
                </div>
                <div class="level-right">
                    <!-- <lang-select></lang-select> -->
                </div>
            </div>
        </div>
    </header>
</template>

<script>
// import LangSelect from "@/components/Shared/LangSelect"

export default {
    name: "MainHeader",
    components: {
        // "lang-select": LangSelect
    },
    computed: {
        title() {
            return process.env.VUE_APP_TITLE
        }
    }
}
</script>
