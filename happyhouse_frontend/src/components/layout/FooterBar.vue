<template>
    <footer class="bg-dark mt-5 py-4">
        <b-container class="container px-5">
            <div
                class="
                    row
                    align-items-center
                    justify-content-between
                    flex-column flex-sm-row
                "
            >
                <div class="col-auto">
                    <div class="small m-0 text-white">
                        Copyright © SSAFY 6기 구미 8조 이상현, 박기성
                    </div>
                </div>
                <div class="col-auto">
                    <a class="link-light small" href="#!">Privacy</a>
                    <span class="text-white mx-1">·</span>
                    <a class="link-light small" href="#!">Terms</a>
                    <span class="text-white mx-1">·</span>
                    <a class="link-light small" href="#!">Contact</a>
                </div>
            </div>
        </b-container>
    </footer>
</template>

<script>
/* eslint-disable */
export default {
    name: "FooterBar",
};
</script>

<style>
footer {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
}
</style>