<template>
    <div id="terms">
        <section class="hero is-getcrypto">
            <div class="hero-head">
                <navbar />
            </div>

            <div class="hero-body">
                <div class="container">
                    <div class="getcrypto-title">
                        <h5 class="title is-5 is-rectangle">
                            {{ $t("Guest.Terms.Title") }}
                        </h5>
                    </div>
                    <div v-if="AppMode === 'USA'" v-html="$t('Guest.Terms.Text')" />
                    <div v-else-if="AppMode === 'EU'" v-html="$t('Guest.Terms.EUtext')" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Nav from "@/components/Guest/Nav"

export default {
    name: "TermsPage",
    components: {
        navbar: Nav
    },
    metaInfo() {
        return {
            title: this.$t("Guest.Terms.Title"),
            meta: [
                { name: "robots", content: "noindex, nofollow, noodp, noydir, noarchive" }
            ]
        }
    },
    computed: {
        AppMode() {
            return process.env.VUE_APP_REGION
        }
    }
}
</script>
