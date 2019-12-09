<template>
    <div id="404">
        <h1>{{ $t("Interface.404.Title") }}</h1>
        <router-link :to="{ name: 'Dashboard' }" class="button is-info">
            {{ $t("Interface.404.Button") }}
        </router-link>
    </div>
</template>

<script>
export default {
    created() {
        window.location.href = "/404/"
    },
    metaInfo() {
        return {
            title: this.$t("Interface.404.Title")
        }
    }
}
</script>
