<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <notice-list-row
              v-for="(article, index) in articles"
              :key="index"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>
        <div>
          <a href="#" v-for="n in this.totalpage" :key="n" @click="changePg(n)"
            >{{ n }}
          </a>
        </div>
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
  </b-container>
</template>

<script>
import NoticeListRow from "@/components/notice/child/NoticeListRow";
import { listArticle } from "@/api/notice.js";

export default {
  name: "NoticeList",
  components: {
    NoticeListRow,
  },
  data() {
    return {
      articles: [],
      pg: 1,
      spp: 5,
      totalpage: 0,
      totalcount: 0,
    };
  },
  created() {
    this.getTotalCount();

    this.getlist(this.pg);
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "NoticeWrite" });
    },
    changePg(n) {
      this.getlist(n);
    },
    getlist(n) {
      let param = {
        pg: n,
        spp: this.spp,
        key: null,
        word: null,
      };
      listArticle(
        param,
        (response) => {
          this.articles = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },

    getTotalCount() {
      let param = {
        pg: 1,
        spp: 100,
        key: null,
        word: null,
      };
      listArticle(
        param,
        (response) => {
          this.totalcount = response.data.length;
          var temp = this.totalcount % this.spp;

          if (temp == 0) {
            this.totalpage = parseInt(this.totalcount / this.spp);
          } else {
            this.totalpage = parseInt(this.totalcount / this.spp) + 1;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
