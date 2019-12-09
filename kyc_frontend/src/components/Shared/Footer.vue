
<template>
    <footer class="footer">
        <div class="content container">
            <div class="columns is-centered has-text-centered">
                <!-- <div class="column is-3">
                    <ul>
                        <li>{{$t("Interface.AppName")}} © {{ CurrentYear }}</li>
                        <li>                    
                            {{$t("Interface.Footer.Email")}}
                        </li>
                        <li>{{$t("Interface.Footer.Address")}}</li>
                    </ul>
                </div> -->
                <!-- <div class="column is-3">
                    <ul>
                        <li>
                            <a href="#">At vero eos et accusam</a>
                        </li>
                        <li>
                            <a href="#">Vero eos sit amet</a>
                        </li>
                        <li>
                            <a href="#">At vero eos et accusam</a>
                        </li>
                    </ul>
                </div>
                <div class="column is-3">
                    <ul>
                        <li>
                            <a href="#">At vero eos et accusam</a>
                        </li>
                        <li>
                            <a href="#">Lorem ipsum dolor sit amet</a>
                        </li>
                        <li>
                            <a href="#">Vero eos sit amet</a>
                        </li>
                    </ul>
                </div> -->
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterNav",
    data () {
        return {
            CurrentYear: null
        }
    },
    created() {
        this.CurrentYear = new Date().getFullYear()
    }
}
</script>