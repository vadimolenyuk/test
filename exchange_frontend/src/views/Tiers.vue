<template>
    <div id="tiers">
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item">
                    <h5 class="subtitle is-5">
                        {{ $t("Interface.Tier.Title") }}
                    </h5>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item" />
            </div>
        </nav>
        <b-loading :is-full-page="true" :active.sync="IsLoading" :can-cancel="false" />        

        <div v-if="TierList.length > 0" class="columns is-multiline is-mobile">
            <div v-for="Tier in TierList" :key="Tier.Name" class="column is-3-desktop is-4-tablet is-12-mobile">
                <div class="card">
                    <div class="tier card-content">
                        <h4 class="tier-title title is-4">
                            {{ Tier.Name }}
                        </h4>
                        <h6 class="tier-limit subtitle is-6">
                            {{ $t("Interface.Dashboard.DailyLimit.Title") }}: ${{ Tier.Limit }}
                        </h6>
                        <ul class="tier-fields">
                            <li 
                                v-for="Field in Tier.Fields" 
                                :key="Field.Name" 
                                :class="{ 'has-text-success': Field.Status === 1 }"
                            >
                                <span class="tier-field">{{ Field.Name }}</span>
                                <span v-if="Field.Status > 0" class="tier-icon icon">
                                    <i 
                                        class="mdi"
                                        :class="{ 'mdi-checkbox-marked-circle': Field.Status === 1 }"
                                    />
                                </span>
                            </li>
                        </ul>
                        <div class="tier-buttons">
                            <kyc-button v-if="Tier.Status < 1" cclass="kycbutton is-theme is-tier" />
                            <b-icon v-else-if="Tier.Status === 1" icon="account-check" size="is-large" type="is-success" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import KYCButton from "@/components/Shared/GoToKYC"
import { TIER_LIST_REQUEST } from "@/store/actions/tier"

export default {
    name: "TiersPage",
    components: {
        "kyc-button": KYCButton
    },
    mixins: [LoadingState],
    computed: {
        TierList: {
            get() {
                return this.$store.state.Tier.List
            }
        }
    },
    mounted() {
        this.switchLoading()
        this.$store.dispatch(TIER_LIST_REQUEST)
            .finally(() => {
                this.switchLoading()
            })
    },
    metaInfo() {
        return {
            title: this.$t("Interface.Tier.Title")
        }
    }
}
</script>
