<template>
  <b-container v-show="covids" class="bv-example-row">
    <div id="map"></div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import EventBus from "@/api/event-bus.js";
const covidStore = "covidStore";

export default {
  name: "CovidMap",

  computed: {
    ...mapState(covidStore, ["covids"]),
  },

  created() {
    this.updateHousesMap();
  },

  // vuex houses 변수가 변하면 맵 업데이트!
  watch: {
    covids() {
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
    EventBus.$on("callCovidInfo", (covid) => {
      this.displayInfowindow(covid);
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

    displayInfowindow(covid) {
      // var content = `
      //               <div class="overlaybox">
      //                   <div class="boxtitle">${covid.centerName}</div>
      //                   <div class="close" onclick="closeOverlay()" title="닫기"></div>
      //                   <ul>
      //                       <li class="up">
      //                           <span class="title">시설명</span>
      //                           <span class="count">시설명${covid.facilityName}</span>
      //                       </li>
      //                       <li>
      //                           <span class="title>주소</span>
      //                           <span class="count">${covid.address}</span>
      //                       </li>
      //                       <li>
      //                           <span class="title">전화번호</span>
      //                           <span class="count">${covid.phoneNumber}</span>
      //                       </li>
      //                   </ul>
      //               </div>
      //           `;

      // console.log(covid);
      var covidPosition = new kakao.maps.LatLng(covid.lat, covid.lng);
      var position = new kakao.maps.LatLng(
        covidPosition.getLat() + 0.00033,
        covidPosition.getLng() - 0.00003
      );

      var customOverlay = new kakao.maps.CustomOverlay({
        position: position,

        xAnchor: 0.3,
        yAnchor: 0.91,
      });
      this.map.setCenter(position);

      var contentEl = document.createElement("div");
      contentEl.className = "wrap1";

      var infoEl = document.createElement("div");
      infoEl.className = "info";

      var titleEl = document.createElement("div");
      titleEl.className = "title";
      titleEl.appendChild(document.createTextNode(covid.centerName));

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
      let ellipsis = "시설명 : " + covid.facilityName;
      ellipsisEl.appendChild(document.createTextNode(ellipsis));

      var addressEL = document.createElement("div");
      addressEL.className = "address";
      let address = "주소 : " + covid.address;
      addressEL.appendChild(document.createTextNode(address));

      var phoneEL = document.createElement("div");
      phoneEL.className = "address";
      let phone = "전화번호 : " + covid.phoneNumber;
      phoneEL.appendChild(document.createTextNode(phone));

      var buttonContainer = document.createElement("div");
      buttonContainer.className = "popup-buttons";

      var callBtn = document.createElement("button");
      callBtn.className = "popup-button";
      callBtn.appendChild(document.createTextNode("전화"));

      callBtn.onclick = function () {
        // location.href = "https://www.naver.com";
        location.href = "tel:" + covid.phoneNumber;
      };

      //  = function () {
      //   location.href = "www.naver.com";
      //   console.log(covid.phoneNumber);
      // };
      var closeBtn = document.createElement("button");
      closeBtn.className = "popup-button";
      closeBtn.appendChild(document.createTextNode("닫기"));
      closeBtn.onclick = function () {
        customOverlay.setMap(null);
      };

      buttonContainer.appendChild(callBtn);
      buttonContainer.appendChild(closeBtn);

      descEl.appendChild(ellipsisEl);
      descEl.appendChild(addressEL);
      descEl.appendChild(phoneEL);
      descEl.appendChild(buttonContainer);
      bodyEl.appendChild(descEl);
      infoEl.appendChild(bodyEl);

      contentEl.appendChild(infoEl);

      customOverlay.setContent(contentEl);
      customOverlay.setMap(this.map);

      // console.log(house);

      // var contentEl = document.createElement("div");
      // contentEl.className = "overlaybox";

      // var titleEl = document.createElement("div");
      // titleEl.className = "boxtitle";
      // titleEl.appendChild(document.createTextNode(title));

      // contentEl.appendChild(titleEl);

      // var buttonContainer = document.createElement("div");
      // buttonContainer.className = "popup-buttons";

      // var closeBtn = document.createElement("button");
      // closeBtn.className = "popup-button";
      // closeBtn.appendChild(document.createTextNode("취소"));
      // closeBtn.onclick = function () {
      //     customOverlay.setMap(null);
      // };

      // buttonContainer.appendChild(closeBtn);

      // contentEl.appendChild(buttonContainer);

      // customOverlay.setContent(contentEl);

      // customOverlay.setMap(this.map);
    },

    updateHousesMap() {
      if (this.covids.length == 0) {
        return;
      }

      //var fragment = document.createDocumentFragment();
      var bounds = new kakao.maps.LatLngBounds();

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      for (var i = 0; i < this.covids.length; i++) {
        var covidPosition = new kakao.maps.LatLng(
          this.covids[i].lat,
          this.covids[i].lng
        );
        var marker = this.addMarker(covidPosition, i);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(covidPosition); // 범위 크기 조절

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, covid, displayInfowindow) {
          kakao.maps.event.addListener(marker, "click", function () {
            displayInfowindow(covid);
          });
        })(
          marker,

          this.covids[i],
          this.displayInfowindow
        );

        // console.log();
        // console.log();
        // console.log();
        //  this.covids[i].aptName,
        //           this.covids[i].aptCode,
        //           this.covids[i],
        // if (i == 0) {
        //   this.displayInfowindow(
        //     marker,
        //     this.houses[i].aptName,
        //     this.houses[i]
        //   );
        // }
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
.wrap1 {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 150px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap1 .info {
  width: 286px;
  height: 140px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.info .body {
  position: relative;
  overflow: hidden;
  height: 130px;
}
</style>
