<template>
    <footer id="footer" class="footer">
        <div class="content container">
            <div class="columns is-mobile is-multiline is-centered has-text-centered">
                <div v-if="AppMode === 'USA'" class="column is-3-desktop is-6-mobile">
                    <ul>
                        <li>
                            <router-link :to="{ name: 'Terms' }">
                                {{ $t("Guest.Terms.Title") }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'FeeSchedule' }">
                                {{ $t("Guest.FeeSchedule.Title") }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="AppMode === 'USA'" class="column is-3-desktop is-6-mobile">
                    <ul>
                        <li>
                            <router-link :to="{ name: 'About' }">
                                {{ $t("Guest.About.Title") }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'PrivacyPolicy' }">
                                {{ $t("Guest.PrivacyPolicy.Title") }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Faq' }">
                                {{ $t("Guest.FAQ.Title") }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="AppMode === 'USA'" class="column is-4-desktop is-12-tablet is-12-mobile">
                    <ul>
                        <li>Proudly based in the USA</li>
                        <li>800-287-0134</li>
                        <li>
                            <a href="mailto:support@bitcoinalley.com">
                                support@bitcoinalley.com
                            </a>
                        </li>
                    </ul>
                </div>

                <div v-if="AppMode === 'EU'" class="column is-6-desktop is-12-tablet is-12-mobile">
                    <ul>
                        <li>
                            <router-link :to="{ name: 'Terms' }">
                                {{ $t("Guest.Terms.Title") }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'FeeSchedule' }">
                                {{ $t("Guest.FeeSchedule.Title") }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Legal' }">
                                {{ $t("Guest.Legal.Title") }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'PrivacyPolicy' }">
                                {{ $t("Guest.PrivacyPolicy.Title") }}
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'Faq' }">
                                {{ $t("Guest.FAQ.Title") }}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="AppMode === 'EU'" class="column is-6-desktop is-12-tablet is-12-mobile">
                    <ul>
                        <li>Hermes Exchange OÜ</li>
                        <li>Registry code 14626499</li>
                        <li>Address of entrepreneur Tornimäe tn 7-132, Kesklinna linnaosa, Tallinn, Harju maakond, 10145</li>
                        <li>Telephone +372 58461868</li>
                        <li>E-mail <a href="mailto:i58461868@gmail.com">i58461868@gmail.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterNav",
    data() {
        return {
            CurrentYear: null
        }
    },
    computed: {
        AppMode() {
            return process.env.VUE_APP_REGION
        }
    },
    created() {
        this.CurrentYear = new Date().getFullYear()
    }
}
</script>
