<template>
    <div id="whybit">
        <section class="hero is-getcrypto">
            <div class="hero-head">
                <navbar />
            </div>

            <div class="hero-body">
                <div class="container">
                    <div class="getcrypto-title">
                        <h5 class="title is-5 is-rectangle">
                            {{ $t("Guest.Secure.Title") }}
                        </h5>
                    </div>
                    <div v-html="$t('Guest.Secure.Text')" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Nav from "@/components/Guest/Nav"

export default {
    name: "FeeSchedule",
    components: {
        navbar: Nav
    },
    metaInfo() {
        return {
            title: this.$t("Guest.Secure.Title"),
            meta: [
                { name: "robots", content: process.env.VUE_APP_INDEX }
            ]
        }
    }
}
</script>
