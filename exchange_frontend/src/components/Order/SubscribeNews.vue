<template>
    <div class="modal-card order confirm" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Order.Subscribe.Title") }}</p>
        </header>
        <section class="modal-card-body">
            {{ $t("Interface.Order.Subscribe.Text1") }}
            <br>
            {{ $t("Interface.Order.Subscribe.Text2") }}
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Close") }}
            </button>
            <button class="button is-theme" type="button" @click="$parent.close()">
                {{ $t("Interface.Order.Subscribe.Button") }}
            </button>
        </footer>
    </div>
</template>

<script>
export default {
    name: "SubscribeNews"
}
</script>
