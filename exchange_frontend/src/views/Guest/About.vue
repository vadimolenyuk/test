<template>
    <div id="about">
        <section class="hero is-getcrypto">
            <div class="hero-head">
                <navbar />
            </div>

            <div class="hero-body">
                <div class="container">
                    <div class="getcrypto-title">
                        <h5 class="title is-5 is-rectangle">
                            {{ $t("Guest.About.Title") }}
                        </h5>
                    </div>
                    <div v-html="$t('Guest.About.Text')" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Nav from "@/components/Guest/Nav"

export default {
    name: "AboutPage",
    components: {
        navbar: Nav
    },
    metaInfo() {
        return {
            title: this.$t("Guest.About.Title"),
            meta: [
                { name: "robots", content: process.env.VUE_APP_INDEX }
            ]
        }
    }
}
</script>
