<template>
    <div class="modal-card order confirm" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ $t("Interface.Order.Details.Title") }}</p>
        </header>
        <section class="modal-card-body">
            <order-details :order="order" />
        </section>
        <footer class="modal-card-foot">
            <button class="button is-theme is-outlined" type="button" @click="$parent.close()">
                {{ $t("Interface.Buttons.Close") }}
            </button>
            <button class="button is-theme" @click="toOrders">
                {{ $t("Interface.Order.Details.ToOrders") }}
            </button>
        </footer>
    </div>
</template>

<script>
import router from "@/router"
import DetailsOrder from "@/components/Order/Details"

export default {
    name: "OrderDetailsModal",
    components: {
        "order-details": DetailsOrder
    },
    props: {
        order: {
            type: Object,
            default: null
        }
    },
    methods: {
        toOrders() {
            router.push({ name: "Orders" })
            this.$parent.close()
        }
    }
}
</script>