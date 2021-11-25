<template>
    <div></div>
</template>

<script>
import { mapActions } from "vuex";

const newsStore = "newsStore";

export default {
    data() {
        return {};
    },
    created() {
        // console.log("call getNewsList!!");
        // this.getNewsList();
    },
    methods: {
        ...mapActions(newsStore, ["getNewsList"]),
    },
};
</script>

<style>
</style>