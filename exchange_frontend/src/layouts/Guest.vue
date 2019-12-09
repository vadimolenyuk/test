<template>
    <div id="layout-guest">
        <div class="appcontent">
            <slot />
        </div>
        <foooter />
    </div>
</template>

<script>
import Footer from "@/components/Shared/Footer"

export default {
    components: {
        "foooter": Footer
    }
}
</script>