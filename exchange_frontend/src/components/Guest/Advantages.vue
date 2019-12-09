<template>
    <div class="advantages has-text-centered">
        <div class="getcrypto-title">
            <h5 class="title is-5 is-rectangle">
                {{ $t("Guest.Advantages.Title") }}
            </h5>
        </div>
        <div class="columns is-centered">
            <div class="column is-3-desktop is-4-tablet">
                <div class="card">
                    <div class="card-content">
                        <h5 class="subtitle is-5">
                            {{ $t("Guest.Advantages.Card1.Title") }}
                        </h5>
                        <p>{{ $t("Guest.Advantages.Card1.Text") }}</p>
                        <a href="#" class="button is-rounded is-theme" disabled>{{ $t("Guest.Advantages.Button") }}</a>
                    </div>
                </div>
            </div>
            <div class="column is-3-desktop is-4-tablet">
                <div class="card">
                    <div class="card-content">
                        <h5 class="subtitle is-5">
                            {{ $t("Guest.Advantages.Card2.Title") }}
                        </h5>
                        <p>{{ $t("Guest.Advantages.Card2.Text") }}</p>
                        <router-link :to="{ name: 'WhyBitcoin' }" class="button is-rounded is-theme">
                            {{ $t("Guest.Advantages.Button") }}
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="column is-3-desktop is-4-tablet">
                <div class="card">
                    <div class="card-content">
                        <h5 class="subtitle is-5">
                            {{ $t("Guest.Advantages.Card3.Title") }}
                        </h5>
                        <p>{{ $t("Guest.Advantages.Card3.Text") }}</p>
                        <router-link :to="{ name: 'Secure' }" class="button is-rounded is-theme">
                            {{ $t("Guest.Advantages.Button") }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>