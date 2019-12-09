<template>
    <div class="steps">
        <div class="getcrypto-title">
            <h5 class="title is-5 is-rectangle">
                {{ $t("Guest.HowWorks.Title") }}
            </h5>
        </div>
        <div class="steps-content">
            <div class="step">
                <div class="about-step">
                    <h6 class="subtitle is-6">
                        {{ $t("Guest.HowWorks.Card1.Title") }}
                    </h6>
                    <p>{{ $t("Guest.HowWorks.Card1.Text") }}</p>
                </div>
            </div>
            <div class="step">
                <div class="about-step">
                    <h6 class="subtitle is-6">
                        {{ $t("Guest.HowWorks.Card2.Title") }}
                    </h6>
                    <p>{{ $t("Guest.HowWorks.Card2.Text") }}</p>
                </div>
            </div>
            <div class="step">
                <div class="about-step">
                    <h6 class="subtitle is-6">
                        {{ $t("Guest.HowWorks.Card3.Title") }}
                    </h6>
                    <p>{{ $t("Guest.HowWorks.Card3.Text") }}</p>
                </div>
            </div>
            <div class="step">
                <div class="about-step">
                    <h6 class="subtitle is-6">
                        {{ $t("Guest.HowWorks.Card4.Title") }}
                    </h6>
                    <p>{{ $t("Guest.HowWorks.Card4.Text") }}</p>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'Register' }" class="button is-outlined is-rounded is-theme">
            {{ $t("Guest.HowWorks.Button") }}
        </router-link>
        <!-- <button v-on:click="topFunction" class="button is-outlined is-rounded is-theme">{{$t('Guest.HowWorks.Button')}}</button> -->
    </div>
</template>

<script>
export default {
    name: "HowWorks",
    methods: {
        topFunction() {
            document.body.scrollTop = 0 // For Safari
            document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
        }
    }
}
</script>
