<template>
    <b-container v-show="houses" class="bv-example-row">
        <div id="map"></div>
    </b-container>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";

import EventBus from "@/api/event-bus.js";

const houseStore = "houseStore";

export default {
    name: "HouseMap",

    computed: {
        ...mapState(houseStore, ["houses"]),
    },

    created() {
        this.updateHousesMap();
    },

    // vuex houses 변수가 변하면 맵 업데이트!
    watch: {
        houses() {
            this.updateHousesMap();
        },
    },

    data() {
        return {
            map: null,
            markers: [],
            infowindow: null,
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement("script");
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=bb0272b6a279f08160c1221ab148b5d8";
            document.head.appendChild(script);
        }

        //As an ES6 module
        EventBus.$on("callDisplayInfowindow", (house) => {
            this.displayInfowindow(house);
        });
    },
    methods: {
        initMap() {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 5,
            };
            this.map = new kakao.maps.Map(container, options);
        },
        addMarker(position, idx) {
            var imageSrc =
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
                imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
                imgOptions = {
                    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                },
                markerImage = new kakao.maps.MarkerImage(
                    imageSrc,
                    imageSize,
                    imgOptions
                ),
                marker = new kakao.maps.Marker({
                    position: position, // 마커의 위치
                    image: markerImage,
                });

            marker.setMap(this.map); // 지도 위에 마커를 표출합니다
            this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

            return marker;
        },

        displayInfowindow(house) {
            var housePosition = new kakao.maps.LatLng(house.lat, house.lng);

            var position = new kakao.maps.LatLng(
                housePosition.getLat() + 0.00003,
                housePosition.getLng() - 0.00003
            );

            var customOverlay = new kakao.maps.CustomOverlay({
                position: position,
                xAnchor: 0.3,
                yAnchor: 0.91,
            });

            this.map.setCenter(position);

            var contentEl = document.createElement("div");
            contentEl.className = "wrap";

            var infoEl = document.createElement("div");
            infoEl.className = "info";

            var titleEl = document.createElement("div");
            titleEl.className = "title";
            titleEl.appendChild(document.createTextNode(house.aptName));

            infoEl.appendChild(titleEl);

            var bodyEl = document.createElement("div");
            bodyEl.className = "body";

            var imgDivEl = document.createElement("div");
            imgDivEl.className = "img";

            var imgEl = document.createElement("img");
            imgEl.setAttribute(
                "src",
                //"https://picsum.photos/250/250/?image=58"
                "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTlfMzIg/MDAxNTgyMTA4MjM5Mjk5.9AyII842EoUtrKfwfuUhN3F1inI-fWmNwZU-Fv_IW0wg.ZsvbUrDQubVKDbeCWnOGGPlMRhA51zDj4Q4GqS3Edn4g.JPEG.coldwell25/SE-3d8640e5-3def-4e83-bbe3-b7938a29c9e5.jpg?type=w800"
            );
            imgEl.setAttribute("width", "73");
            imgEl.setAttribute("width", "70");

            imgDivEl.appendChild(imgEl);

            bodyEl.appendChild(imgDivEl);

            var descEl = document.createElement("div");
            descEl.className = "desc";

            var ellipsisEl = document.createElement("div");
            ellipsisEl.className = "ellipsis";
            let ellipsis = "최신거래금액 : " + house.recentPrice + " (만원)";
            ellipsisEl.appendChild(document.createTextNode(ellipsis));

            var buttonContainer = document.createElement("div");
            buttonContainer.className = "popup-buttons";

            var dealBtn = document.createElement("button");
            dealBtn.className = "popup-button";
            dealBtn.appendChild(document.createTextNode("거래내역 보기"));
            dealBtn.onclick = function () {
                router.push({ name: "Deal", params: { house: house } });
            };

            var closeBtn = document.createElement("button");
            closeBtn.className = "popup-button";
            closeBtn.appendChild(document.createTextNode("닫기"));
            closeBtn.onclick = function () {
                customOverlay.setMap(null);
            };

            buttonContainer.appendChild(dealBtn);
            buttonContainer.appendChild(closeBtn);

            descEl.appendChild(ellipsisEl);
            descEl.appendChild(buttonContainer);
            bodyEl.appendChild(descEl);
            infoEl.appendChild(bodyEl);

            contentEl.appendChild(infoEl);

            customOverlay.setContent(contentEl);

            customOverlay.setMap(this.map);
        },

        updateHousesMap() {
            if (this.houses.length == 0) {
                return;
            }

            //var fragment = document.createDocumentFragment();
            var bounds = new kakao.maps.LatLngBounds();

            // 지도에 표시되고 있는 마커를 제거합니다
            this.removeMarker();

            for (var i = 0; i < this.houses.length; i++) {
                var housePosition = new kakao.maps.LatLng(
                    this.houses[i].lat,
                    this.houses[i].lng
                );
                var marker = this.addMarker(housePosition, i);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(housePosition); // 범위 크기 조절

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                (function (marker, house, displayInfowindow) {
                    kakao.maps.event.addListener(marker, "click", function () {
                        displayInfowindow(house);
                    });
                })(marker, this.houses[i], this.displayInfowindow);
            }

            // 맵 위치를 해당 범위만큼 위치로 변경
            this.map.setBounds(bounds);
        },

        removeMarker() {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers = [];
        },
    },
};
</script>

<style>
#map {
    width: 90%;
    height: 500px;
}

.wrap {
    position: absolute;
    left: 0;
    bottom: 40px;
    width: 288px;
    height: 132px;
    margin-left: -144px;
    text-align: left;
    overflow: hidden;
    font-size: 12px;
    font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
    line-height: 1.5;
}
.wrap * {
    padding: 0;
    margin: 0;
}
.wrap .info {
    width: 286px;
    height: 120px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
}
.wrap .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}
.info .title {
    padding: 5px 0 0 10px;
    height: 30px;
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
}
.info .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #888;
    width: 17px;
    height: 17px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
.info .close:hover {
    cursor: pointer;
}
.info .body {
    position: relative;
    overflow: hidden;
}
.info .desc {
    position: relative;
    margin: 13px 0 0 90px;
    height: 75px;
}
.desc .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.desc .jibun {
    font-size: 11px;
    color: #888;
    margin-top: -2px;
}
.info .img {
    position: absolute;
    top: 6px;
    left: 5px;
    width: 73px;
    height: 71px;
    border: 1px solid #ddd;
    color: #888;
    overflow: hidden;
}
.info:after {
    content: "";
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.info .link {
    color: #5085bb;
}

.popup-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background: var(--button-bg-color);
    color: var(--button-color);

    margin: 5px;
    margin-left: 0px;
    padding: 0.5rem 1rem;

    font-family: "Noto Sans KR", sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    text-align: center;
    text-decoration: none;

    border: none;
    border-radius: 4px;

    display: inline-block;
    width: auto;

    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);

    cursor: pointer;

    transition: 0.5s;

    --button-color: #ffffff;
    --button-bg-color: #0d6efd;
    --button-hover-bg-color: #025ce2;
}
</style>
