<template>
    <div id="layout-auth">
        <section class="hero is-fullheight">
            <div class="hero-body">
                <div class="container">
                    <slot />
                    <div class="lang-container">
                        <!-- <lang-select></lang-select> -->
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// import LangSelect from "@/components/Shared/LangSelect"

export default {
    components: {
        // "lang-select": LangSelect
    }
}
</script>