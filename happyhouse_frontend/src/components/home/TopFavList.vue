<template>
    <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
        <template #header>행복한 우리집</template>
        <hr class="my-4" />
        <p>&lt;&lt; HappyHouse <b>최고관심지역 TOP 5</b> &gt;&gt;</p>

        <table class="table table-dark">
            <tbody>
                <tr v-for="(fav, index) in topfavs" :key="index">
                    <td>
                        {{ index + 1 }}
                    </td>
                    <td>
                        {{ fav.sidoName }}
                    </td>
                    <td>
                        {{ fav.gugunName }}
                    </td>
                    <td>
                        {{ fav.dongName }}
                    </td>
                    <td>관심지역 등록 횟수 : {{ fav.favCnt }} 회</td>
                    <td>
                        <a class="text-blue" @click="selectFav(fav.dongCode)"
                            >바로가기</a
                        >
                    </td>
                </tr>
            </tbody>
        </table>
    </b-jumbotron>
</template>

<script>
import { mapState, mapActions } from "vuex";

const houseStore = "houseStore";

export default {
    data() {
        return {};
    },
    created() {
        this.getTopFavList();
    },
    methods: {
        ...mapActions(houseStore, ["getTopFavList"]),

        selectFav(dongCode) {
            // House 페이지로 이동 파라미터는 동 코드
            this.$router.push({
                name: "House",
                params: { dongCode: dongCode },
            });
        },
    },
    computed: {
        ...mapState(houseStore, ["topfavs"]),
    },
};
</script>

<style>
</style>