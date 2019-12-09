<template>
    <div id="layout-default" class="layout">
        <navbar />
        <section class="section appcontent">
            <div class="container">
                <slot />
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from "@/components/Shared/Nav"

export default {
    components: {
        "navbar": Navbar
    }
}
</script>