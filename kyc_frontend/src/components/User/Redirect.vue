<template>
    <button v-if="IsAppIDSet" class="button is-theme backbutton" @click="redirect">
        <b-icon icon="exit-to-app" />&nbsp;
        {{ $t("Interface.Button.BackTo") }} {{ ExternalLoginAppName }}
    </button>
</template>

<script>
import { APPDB_UNSET_ID } from "@/store/actions/appdb"

export default {
    name: "UserRedirect",
    computed: {
        IsAppIDSet() {
            return this.$store.getters.IS_APPID_SET
        },
        ExternalLoginFrom: {
            get() {
                return this.$store.state.AppDB.find(x => x.Id === this.$store.state.AppDBSet.ID).URL
            }
        },
        ExternalLoginAppName: {
            get() {
                return this.$store.state.AppDB.find(x => x.Id === this.$store.state.AppDBSet.ID).Name
            }
        }
    },
    methods: {
        redirect() {
            if (this.IsAppIDSet) {
                let From = this.ExternalLoginFrom
                this.$store.commit(APPDB_UNSET_ID)
                window.location.href = `${From}`
            }
        }
    }
}
</script>
