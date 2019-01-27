// Flickr API key
const API_KEY ="074312228d4120d45c3a03b5f9e86acf";

// 状態の定数
var IS_INITIALIZED = "IS_INITIALIZED"; // 最初の状態
var IS_FETCHING = "IS_FETCHING"; // APIからデータを取得中
var IS_FAILED = "IS_FAILED"; // APIからデータを取得できなかった
var IS_NOT_FOUND = "IS_NOT_FOUND"; // 検索テキストに該当する写真データがない
var IS_FOUND = "IS_FOUND"; // APIから写真データを取得できた


//v-tooltipというカスタムディレクティブを登録しています。
Vue.directive("tooltip", {
  bind: function(el, binding) {
    $(el).tooltip({
      title: binding.value,
      placement: "bottom"
    });
  }
});

new Vue({
  el: "#app",
  data: {
    photos: [],
    currentState: IS_INITIALIZED
  },
  computed: {
    isInitalized: function() {
      return this.currentState === IS_INITIALIZED;
    },
    isFetching: function() {
      return this.currentState === IS_FETCHING;
    },
    isFailed: function() {
      return this.currentState === IS_FAILED;
    },
    isNotFound: function() {
      return this.currentState === IS_NOT_FOUND;
    },
    isFound: function() {
      return this.currentState === IS_FOUND;
    }
  },
  methods: {
    // 状態を変更する
    toInitialized: function() {
      this.currentState = IS_INITIALIZED;
    },
    toFetching: function() {
      this.currentState = IS_FETCHING;
    },
    toFailed: function() {
      this.currentState = IS_FAILED;
    },
    toNotFound: function() {
      this.currentState = IS_NOT_FOUND;
    },
    toFound: function() {
      this.currentState = IS_FOUND;
    },
    
    // photoオブジェクトから画像のURLを作成して返す
    getFlickrImageURL: function(photo, size) {
      var url =
        "https://farm" +
        photo.farm +
        ".staticflickr.com/" +
        photo.server +
        "/" +
        photo.id +
        "_" +
        photo.secret;
      if (size) {
        // サイズ指定ありの場合
        url += "_" + size;
      }
      url += ".jpg";
      return url;
    },
    // photoオブジェクトからページのURLを作成して返す
    getFlickrPageURL: function(photo) {
      return "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
    },
    // photoオブジェクトからaltテキストを生成して返す
    getFlickrText: function(photo) {
      var text = "\"" + photo.title + "\" by " + photo.ownername;
      if (photo.license == "4") {
        // Creative Commons Attribution（CC BY）ライセンス
        text += " / CC BY";
      }
      return text;
    },
    fetchImagesFromFlickr: function(event) {
      var vm = this;
      var searchText = event.target.elements.search.value;
      var parameters = $.param({
        method: "flickr.photos.search",
        api_key: API_KEY,
        text: searchText, // 検索テキスト
        sort: "interestingness-desc", // 興味深さ順
        per_page: 12, // 取得件数
        license: "4", // Creative Commons Attributionのみ
        extras: "owner_name,license", // 追加で取得する情報
        format: "json", // レスポンスをJSON形式に
        nojsoncallback: 1 // レスポンスの先頭に関数呼び出しを含めない
      });
      var flickr_url = "https://api.flickr.com/services/rest/?" + parameters;
      
      // APIからデータを取得中の場合、再度リクエストしない
      if(this.isFetching){
        return;
      }
      
      this.toFetching();
      $.getJSON(flickr_url, function(data) {
        if(data.stat !== "ok"){
          vm.toFailed();
          return;
        }
        
        var _photos = data.photos.photo;
        if(_photos.length === 0){
          vm.toNotFound();
          return;
        }
        
        vm.photos = _photos.map(function(photo){
          return{
            id: photo.id,
            imageURL: vm.getFlickrImageURL(photo, "q"),
            pageURL: vm.getFlickrPageURL(photo),
            text: vm.getFlickrText(photo)
          };
        });
        vm.toFound();
        
        // if (data.stat === "ok") {
        //   vm.photos = data.photos.photo.map(function(photo) {
        //     return {
        //       id: photo.id,
        //       imageURL: vm.getFlickrImageURL(photo, "q"),
        //       pageURL: vm.getFlickrPageURL(photo),
        //       text: vm.getFlickrText(photo)
        //     };
        //   });
        // }
      }).fail(function(){
        vm.toFailed();
      });
    }
  }
});