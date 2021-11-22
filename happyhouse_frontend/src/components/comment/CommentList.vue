<template>
  <div>
    <div :key="item.comment_id" v-for="item in comments">
      <CommentListItem :commentObj="item" />
    </div>
    <CommentCreate :contentId="contentId" :reloadComments="reloadComments" />
  </div>
</template>
<script>
import data from "@/components/comment/dat.js";
import CommentListItem from "@/components/comment/CommentListItem";
import CommentCreate from "@/components/comment/CommentCreate";

export default {
  name: "CommentList",
  props: {
    contentId: Number,
  },
  components: {
    CommentListItem,
    CommentCreate,
  },
  data() {
    return {
      comments: data.Comment.filter(
        (item) => item.content_id === this.contentId
      ),
    };
  },
  methods: {
    reloadComments() {
      this.comments = data.Comment.filter(
        (item) => item.content_id === this.contentId
      );
    },
  },
};
</script>
