<template>
    <div id="login">
        <login />
    </div>
</template>

<script>
import Login from "@/components/Auth/Login"

export default {
    name: "LoginPage",
    components: {
        "login": Login
    }
}
</script>