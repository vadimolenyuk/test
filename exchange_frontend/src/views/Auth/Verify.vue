<template>
    <div id="verify" class="column is-4 is-offset-4">
        <h3 class="title">
            {{ $t("Interface.Verify.Title") }}
        </h3>
        <div class="box">
            <verify />
        </div>
    </div>
</template>

<script>
import Verify from "@/components/Auth/Verify"

export default {
    name: "VerifyPhonePage",
    components: {
        "verify": Verify
    },
    metaInfo() {
        return {
            title: this.$t("Interface.Verify.Title")
        }
    }
}
</script>