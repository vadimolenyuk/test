<template>
    <div id="home">
        <section class="hero is-getcrypto is-medium">
            <video
                id="bgvid"
                playsinline
                autoplay
                muted
                loop
            >
                <source src="/video/guest-bgvideo.webm" type="video/webm">
            </video>

            <div class="hero-head">
                <navbar />
            </div>

            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column column-vertical-centered is-9">
                            <h1 class="title">
                                {{ $t("Guest.Index.Header") }}
                            </h1>
                            <order-create class="is-guest" />
                        </div>

                        <div class="column is-3">
                            <rates-panel />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="benefits" class="hero">
            <div class="hero-body">
                <div class="container">
                    <benefits />
                </div>
            </div>
        </section>
        <section id="howworks" class="hero is-medium">
            <div class="hero-body">
                <div class="container">
                    <how-works />
                </div>
            </div>
        </section>
        <section id="advantages" class="hero">
            <div class="hero-body">
                <div class="container">
                    <advantages />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Nav from "@/components/Guest/Nav"
import OrderCreate from "@/components/Order/Create"
import RatesPanel from "@/components/Shared/Rates"
import Benefits from "@/components/Guest/Benefits"
import HowWorks from "@/components/Guest/HowWorks"
import Advantages from "@/components/Guest/Advantages"

export default {
    name: "HomePage",
    components: {
        navbar: Nav,
        "order-create": OrderCreate,
        "rates-panel": RatesPanel,
        benefits: Benefits,
        "how-works": HowWorks,
        advantages: Advantages
    },
    metaInfo() {
        return {
            title: this.$t("Guest.Index.Title"),
            meta: [
                { name: "robots", content: process.env.VUE_APP_INDEX },
                { name: "description", content: (process.env.VUE_APP_REGION === "USA") ? this.$t("Guest.Index.MetaDescription") : this.$t("Guest.Index.MetaEUDescription") },
                { name: "keywords", content: (process.env.VUE_APP_REGION === "USA") ? this.$t("Guest.Index.MetaKeywords") : this.$t("Guest.Index.MetaEUKeywords") }
            ]
        }
    }
}
</script>
