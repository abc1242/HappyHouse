<template>
    <b-container class="bv-example-row mt-3 text-center">
        <!-- <h3 class="underline-steelblue">
            <b-icon icon="house"></b-icon> Happy House
        </h3> -->
        <b-row align-v="center">
            <b-col>
                <img
                    src="@/assets/happyhouse.png"
                    class="d-inline-block align-middle"
                    width="300px"
                    alt="happyhouse"
                />
                <top-fav-list></top-fav-list>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import TopFavList from "@/components/home/TopFavList.vue";

export default {
    name: "Main",
    components: {
        TopFavList,
    },
    props: {
        msg: String,
    },
};
</script>

<style scoped>
.underline-steelblue {
    display: inline-block;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 70%,
        rgba(72, 190, 233, 0.3) 30%
    );
}
</style>
