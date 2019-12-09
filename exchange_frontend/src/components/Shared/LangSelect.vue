<template>
    <div class="navbar-item langselect">
        <multiselect
            v-model="Language"
            :options="Languages"
            :allow-empty="false"
            placeholder=""
            select-label=""
            selected-label=""
            deselect-label=""
            track-by="code"
            label="code"
        >
            <template slot="singleLabel" slot-scope="props">
                <span class="flag option-icon" :class="'flag-' + props.option.code.substr(3, 2).toLowerCase()" />
                <!-- <span class="option-title">{{ props.option.name }}</span> -->
            </template>
            <template slot="option" slot-scope="props">
                <span class="flag option-icon" :class="'flag-' + props.option.code.substr(3, 2).toLowerCase()" />
                <span class="option-title">{{ props.option.name }}</span>
            </template>
        </multiselect>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import { LANGUAGE_SET } from "@/store/actions/language"

export default {
    name: "LanguageSelector",
    components: {
        "multiselect": Multiselect
    },
    computed: {
        Languages: {
            get() {
                return this.$store.state.Language.Languages
            }
        },
        Language: {
            get() {
                return this.$store.state.Language.CurrentLanguage
            },
            set(value) {
                this.$store.commit(LANGUAGE_SET, value)
            }
        }
    }
}
</script>