<template>
    <b-row
        class="favlist m-2"
        @mouseover="colorChange(true)"
        @mouseout="colorChange(false)"
        :class="{ 'mouse-over-bgcolor': isColor }"
    >
        <b-col
            cols="10"
            class="text-center align-self-center"
            @click="selectFav"
        >
            {{ fav.sidoName }} {{ fav.gugunName }} {{ fav.dongName }}
        </b-col>
        <b-col cols="2" class="text-center align-self-center">
            <b-button class="btnDel" variant="outline-danger" @click="reqDelFav"
                >삭제</b-button
            >
        </b-col>
    </b-row>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const houseStore = "houseStore";

export default {
    name: "FavListRow",
    data() {
        return {
            isColor: false,
        };
    },
    computed: {
        ...mapState(memberStore, ["userInfo"]),
    },
    props: {
        fav: Object,
    },
    methods: {
        ...mapActions(houseStore, ["detailFav", "getFavList", "delFav"]),
        selectFav() {
            // House 페이지로 이동 파라미터는 동 코드
            this.$router.push({
                name: "House",
                params: { dongCode: this.fav.dongCode },
            });
        },
        colorChange(flag) {
            this.isColor = flag;
        },
        reqDelFav() {
            let favData = {
                id: this.userInfo.userid,
                dong: this.fav.dongCode,
            };
            this.delFav(favData);

            // 새로고침
            // this.$router.go();
        },
    },
};
</script>

<style scoped>
.apt {
    width: 50px;
}
.favlist {
    background-color: rgb(201, 220, 226);
}
.mouse-over-bgcolor {
    background-color: rgb(175, 204, 214);
}
.btnDel {
    margin-top: 17px;
}
</style>
