<template>
  <div class="comment-create">
    <b-input-group :prepend="comment.userid" class="mt-3" size="">
      <b-form-textarea
        id="textarea"
        v-model="comment.content"
        :placeholder="'댓글 입력'"
        rows="3"
        max-rows="6"
      ></b-form-textarea>

      <b-input-group-append>
        <b-button size="" variant="info" @click="commentRegister"
          >등록</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { writeComment } from "@/api/comment";
const memberStore = "memberStore";

export default {
  name: "CommentCreate",
  props: {
    articleno: Number,
  },
  data() {
    return {
      comment: {
        articleno: 0,
        userid: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.comment.userid = this.userInfo.userid;
    this.comment.articleno = this.$route.params.articleno;
  },
  methods: {
    commentRegister() {
      console.log(this.comment);
      writeComment(this.comment);
      this.$router.go();
    },
  },
};
</script>
<style>
.comment-create {
  display: flex;
  width: 100%;
  margin-bottom: 3em;
}
</style>
