<template>
    <div id="app">
        <navi-bar />
        <router-view />
        <!-- <footer-bar /> -->
    </div>
</template>

<script>
import NaviBar from "./components/layout/NaviBar.vue";
// import FooterBar from "./components/layout/FooterBar.vue";

export default {
    name: "App",
    components: {
        NaviBar,
        // FooterBar,
    },
};
</script>

<style>
a:hover {
    text-decoration: none;
    font-weight: bold;
}

a.router-link-exact-active {
    color: #42b983;
}

#map {
    width: 90%;
    height: 500px;
}

.overlaybox {
    position: relative;
    width: 360px;
    height: 150px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/box_movie.png")
        no-repeat;
    padding: 15px 10px;
}
.overlaybox div,
ul {
    overflow: hidden;
    margin: 0;
    padding: 0;
}
.overlaybox li {
    list-style: none;
}
.overlaybox .close {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #888;
    width: 17px;
    height: 17px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.overlaybox .boxtitle {
    color: #fff;
    font-size: 16px;
    font-weight: bold;

    margin-bottom: 8px;
}
.overlaybox .first {
    position: absolute;
    width: 247px;
    height: 136px;
    margin-bottom: 8px;
}
.first .text {
    color: #fff;
    font-weight: bold;
}
.first .triangle {
    position: absolute;
    width: 48px;
    height: 48px;
    top: 0;
    left: 0;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/triangle.png")
        no-repeat;
    padding: 6px;
    font-size: 18px;
}
.first .movietitle {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    padding: 7px 15px;
    font-size: 14px;
}
.overlaybox ul {
    width: 247px;
}
.overlaybox li {
    position: relative;
    margin-bottom: 2px;
    background: #2b2d36;
    padding: 5px 10px;
    color: #aaabaf;
    line-height: 1;
}
.overlaybox li span {
    display: inline-block;
}
.overlaybox li .number {
    font-size: 16px;
    font-weight: bold;
}
.overlaybox li .title {
    font-size: 9px;
}
.overlaybox li .last {
    font-size: 12px;
    margin-right: 15px;
}
.overlaybox li .up {
    background-position: 0 -40px;
}
.overlaybox li .down {
    background-position: 0 -60px;
}
.overlaybox li .count {
    position: absolute;
    margin-top: 5px;
    right: 15px;
    font-size: 12px;
}
.overlaybox li:hover {
    color: #fff;
    background: #d24545;
}
.overlaybox li:hover .up {
    background-position: 0 0px;
}
.overlaybox li:hover .down {
    background-position: 0 -20px;
}
</style>
