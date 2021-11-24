<template>
    <div></div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            items: [],
        };
    },
    created() {
        // axios
        //     .get("http://rss.hankooki.com/sports/sp00_list.xml")
        //     .then((response) => {
        //         var xml = response.data;
        //         var json = convert.xml2json(xml, { compact: true });
        //         this.items = JSON.parse(json);
        //         console.log(this.items);
        //     });
        this.getNewsList();
    },
    methods: {
        getNewsList() {
            // vue cli enviroment variables 검색
            //.env.local file 생성.
            // 반드시 VUE_APP으로 시작해야 한다.
            ///const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
            //   const SERVICE_KEY =
            //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
            const SERVICE_KEY = "https://openapi.naver.com/v1/search/news.json";
            const query = "부동산";

            axios.get(SERVICE_KEY + "?query=" + query).then((response) => {
                console.log(response.data);
            });
        },
    },
};
</script>

<style>
</style>