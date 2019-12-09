<template>
    <order-list />
</template>

<script>
import OrderList from "@/components/Order/List"

export default {
    name: "OrderListPage",
    components: {
        "order-list": OrderList
    },
    metaInfo() {
        return {
            title: this.$t("Interface.Order.List.Title")
        }
    }
}
</script>