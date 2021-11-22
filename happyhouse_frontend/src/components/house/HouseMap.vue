<template>
  <b-container v-show="houses" class="bv-example-row">
    <div id="map"></div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseMap",

  computed: {
    ...mapState(houseStore, ["houses"]),
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

    displayInfowindow(marker, title, house) {
      var content = `
                    <div class="overlaybox">
                        <div class="boxtitle">${title}</div>
                        <div class="close" onclick="closeOverlay()" title="닫기"></div>
                        <ul>
                            <li class="up">
                                <span class="title">건축년도</span>
                                <span class="count">${house.buildYear}</span>
                            </li>
                            <li>
                                <span class="title></span>
                                <span class="count">${house.sidoName} ${house.gugunName} ${house.dongName} ${house.jibun}</span>
                            </li>
                            <li>
                                <span class="title">최신거래금액</span>
                                <span class="count">${house.recentPrice}</span>
                            </li>
                        </ul>
                    </div>
                `;

      // var closeBtn = document.createElement("button");
      // closeBtn.src = "@/assets/ssafy_logo.png";
      // closeBtn.onclick = function () {
      //     customOverlay.setMap(null);
      // };
      // content.appendChild(closeBtn);

      var position = new kakao.maps.LatLng(
        marker.getPosition().getLat() + 0.00033,
        marker.getPosition().getLng() - 0.00003
      );
      var customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });
      customOverlay.setMap(this.map);
    },

    updateHousesMap() {
      // if (this.infowindow && this.infowindow.getMap()) {
      //     //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
      //     this.map.setCenter(this.infowindow.getPosition());
      //     return;
      // }
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
        (function (marker, map, title, code, place, displayInfowindow) {
          kakao.maps.event.addListener(marker, "click", function () {
            displayInfowindow(marker, title, place);
            console.log(title + " " + code);
          });

          kakao.maps.event.addListener(map, "click", function () {
            //console.log("asdf");
            // console.log(customOverlay);
            // customOverlay.setMap(null);
          });
        })(
          marker,
          this.map,
          this.houses[i].aptName,
          this.houses[i].aptCode,
          this.houses[i],
          this.displayInfowindow
        );

        if (i == 0) {
          this.displayInfowindow(
            marker,
            this.houses[i].aptName,
            this.houses[i]
          );
        }
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

<style></style>
