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

<<<<<<< Updated upstream
    computed: {
        ...mapState(houseStore, ["houses"]),

        // house() {
        //   return this.$store.state.house;
        // },
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
        // displayMarker(markerPositions) {
        //     if (this.markers.length > 0) {
        //         this.markers.forEach((marker) => marker.setMap(null));
        //     }

        //     const positions = markerPositions.map(
        //         (position) => new kakao.maps.LatLng(...position)
        //     );

        //     if (positions.length > 0) {
        //         this.markers = positions.map(
        //             (position) =>
        //                 new kakao.maps.Marker({
        //                     map: this.map,
        //                     position,
        //                 })
        //         );

        //         const bounds = positions.reduce(
        //             (bounds, latlng) => bounds.extend(latlng),
        //             new kakao.maps.LatLngBounds()
        //         );

        //         this.map.setBounds(bounds);
        //     }
        // },
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
        updateHousesMap() {
            // if (this.infowindow && this.infowindow.getMap()) {
            //     //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
            //     this.map.setCenter(this.infowindow.getPosition());
            //     return;
            // }
            if (this.houses.length == 0) {
                return;
            }

            var bounds = new kakao.maps.LatLngBounds();

            // 지도에 표시되고 있는 마커를 제거합니다
            this.removeMarker();

            for (var i = 0; i < this.houses.length; i++) {
                var housePosition = new kakao.maps.LatLng(
                    this.houses[i].lat,
                    this.houses[i].lng
                );
                this.addMarker(housePosition, i);

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(housePosition); // 범위 크기 조절

                // 마커와 검색결과 항목에 mouseover 했을때
                // 해당 장소에 인포윈도우에 장소명을 표시합니다
                // mouseout 했을 때는 인포윈도우를 닫습니다
                // (function (marker, title, code, place) {
                //     kakao.maps.event.addListener(marker, "click", function () {
                //         displayInfowindow(marker, title, place);
                //         console.log(title + " " + code);
                //     });

                //     kakao.maps.event.addListener(map, "click", function () {
                //         console.log(customOverlay);
                //         customOverlay.setMap(null);
                //     });

                //     itemEl.onmouseover = function () {
                //         displayInfowindow(marker, title);
                //     };

                //     itemEl.onmouseout = function () {
                //         customOverlay.setMap(null);
                //     };
                // })(marker, places[i].aptName, places[i].aptCode, places[i]);

                //fragment.appendChild(itemEl);
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
=======
  computed: {
    ...mapState(houseStore, ["houses"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },

  data() {
    return {
      map: null,
      markerPositions: [
        [37.499590490909185, 127.0263723554437],
        [37.499427948430814, 127.02794423197847],
        [37.498553760499505, 127.02882598822454],
        [37.497625593121384, 127.02935713582038],
        [37.49629291770947, 127.02587362608637],
        [37.49754540521486, 127.02546694890695],
        [37.49646391248451, 127.02675574250912],
      ],
      markers: [],
      infowindow: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
      this.displayMarker(this.markerPositions);
      this.displayInfoWindow();
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
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(
          37.499590490909185,
          127.02637235544377
        ), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
>>>>>>> Stashed changes
    },
  },
};
</script>

<style scoped>
#map {
  width: 400px;
  height: 400px;
}
</style>
