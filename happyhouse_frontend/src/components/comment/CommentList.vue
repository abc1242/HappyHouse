<template>
  <div>
    <div :key="comment.commentno" v-for="comment in commentlist">
      <comment-list-item :comment="comment" />
    </div>
  </div>
</template>
<script>
import CommentListItem from "./CommentListItem.vue";
export default {
  name: "CommentList",
  props: {
    articleno: Number,
    commentlist: [],
  },
  components: {
    CommentListItem,
  },
};
</script>
