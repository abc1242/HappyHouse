<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원정보 수정</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <!-- <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            > -->
        <b-form-group label="아이디:" label-for="userid">
          <b-form-input
            id="userid"
            v-model="user.userid"
            required
            disabled
            placeholder="아이디 입력...."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="비밀번호:" label-for="userpwd">
          <b-form-input
            type="password"
            id="userpwd"
            v-model="user.userpwd"
            required
            placeholder="비밀번호 입력...."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="이름:" label-for="username">
          <b-form-input
            id="username"
            v-model="user.username"
            required
            placeholder="이름 입력...."
          ></b-form-input>
        </b-form-group>

        <b-form-group label="이메일:" label-for="email">
          <div id="emailid" class="custom-control-inline">
            <b-form-input
              id="emailid"
              v-model="emailid"
              required
              placeholder="이메일 입력...."
            ></b-form-input>
            @
            <b-form-select
              v-model="emailcom"
              :options="options"
            ></b-form-select>
          </div>
        </b-form-group>

        <b-button
          type="button"
          id="registerBtn"
          class="btn btn-outline-primary"
          @click="update"
        >
          수정
        </b-button>
        <b-button type="reset" class="btn btn-outline-danger">취소</b-button>

        <!-- </b-form>
        </b-card> -->
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { updateMember } from "@/api/member.js";
import { mapState } from "vuex";
const memberStore = "memberStore";
export default {
  name: "MemberModify",
  data() {
    return {
      user: {
        userid: "",
        userpwd: "",
        username: "",

        email: "",
      },
      emailid: "",
      emailcom: "",
      options: [
        { value: "ssafy.com", text: "싸피" },
        { value: "naver.com", text: "네이버" },
        { value: "kakao.com", text: "카카오" },
        { value: "google.com", text: "구글" },
      ],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.user.userid = this.userInfo.userid;
    this.user.userpwd = this.userInfo.userpwd;
    this.user.username = this.userInfo.username;

    var str = this.userInfo.email.split("@");
    this.emailid = str[0];
    this.emailcom = str[1];
  },
  methods: {
    update() {
      this.user.email = this.emailid + "@" + this.emailcom;
      console.log(this.user);
      updateMember(this.user); //db변경

      this.$router.push({ name: "SignIn" });
    },
  },
};
</script>

<style></style>
