<template>
    <div id="layout-default">
        <video
            id="bgvid"
            playsinline
            autoplay
            muted
            loop
        >
            <source src="/video/guest-bgvideo.webm" type="video/webm">
        </video>
        <shapka />
        <navbar />
        <section class="section appcontent">
            <div class="container">
                <slot />
            </div>
        </section>
        <foooter />
    </div>
</template>

<script>
import Header from "@/components/Shared/Header"
import Nav from "@/components/Shared/Nav"
import Footer from "@/components/Shared/Footer"

export default {
    components: {
        "shapka": Header,
        "navbar": Nav,
        "foooter": Footer
    },
    created() {
        // Для контактной формы Zendesk
        let script = document.createElement("script")
        script.type = "text/javascript"
        script.src = "https://static.zdassets.com/ekr/snippet.js?key=a0e8bfd3-f99a-4fef-b558-237622d5a608"
        script.id = "ze-snippet"
        script.onload = function() {
            if (window.zE) {
                window.zE(function () {
                    window.zE.identify({
                        name: (window.ZendeskName) ? window.ZendeskName : "",
                        email: (window.ZendeskEmail) ? window.ZendeskEmail : ""
                    })
                })
            }
        }
        document.getElementsByTagName("head")[0].appendChild(script)
    }
}
</script>