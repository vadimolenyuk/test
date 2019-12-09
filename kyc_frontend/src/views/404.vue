<template>
    <div id="404" class="notfound">
        <h1 class="glitch" data-text="404">
            404
        </h1>
        <h6 class="sub subtitle is-5">
            {{ $t("Interface.404.Title") }}
        </h6>
        <router-link :to="{ name: 'KYC' }" class="button is-theme is-small is-outlined">
            {{ $t("Interface.404.Button") }}
        </router-link>
    </div>
</template>