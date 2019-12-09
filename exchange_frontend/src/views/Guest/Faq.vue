<template>
    <div id="faq">
        <section class="hero is-getcrypto">
            <div class="hero-head">
                <navbar />
            </div>

            <div class="hero-body">
                <div class="container">
                    <div class="getcrypto-title">
                        <h5 class="title is-5 is-rectangle">
                            {{ $t("Guest.FAQ.Title") }}
                        </h5>
                    </div>
                    <div v-html="$t('Guest.FAQ.Text')" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Nav from "@/components/Guest/Nav"

export default {
    name: "Faq",
    components: {
        navbar: Nav
    },
    metaInfo() {
        return {
            title: this.$t("Guest.FAQ.Title"),
            meta: [
                { name: "robots", content: "noindex, nofollow, noodp, noydir, noarchive" }
            ]
        }
    }
}
</script>
