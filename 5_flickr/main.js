// Flickr API key
var apiKey ="074312228d4120d45c3a03b5f9e86acf";

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
  el: "#main",
  data: {
    total: 0,
    photos: []
  },
  created: function() {
    var vm = this;
    var parameters = $.param({
      method: "flickr.photos.search",
      api_key: apiKey,
      text: "cat", // 検索テキスト
      sort: "interestingness-desc", // 興味深さ順
      per_page: 12, // 取得件数
      license: "4", // Creative Commons Attributionのみ
      extras: "owner_name,license", // 追加で取得する情報
      format: "json", // レスポンスをJSON形式に
      nojsoncallback: 1 // レスポンスの先頭に関数呼び出しを含めない
    });
    var flickr_url = "https://api.flickr.com/services/rest/?" + parameters;
    // photoオブジェクトから画像のURLを作成して返す
    function getFlickrImageURL(photo, size) {
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
    }
    // photoオブジェクトからページのURLを作成して返す
    function getFlickrPageURL(photo) {
      return "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
    }
    // photoオブジェクトからaltテキストを生成して返す
    function getFlickrText(photo) {
      var text = "\"" + photo.title + "\" by " + photo.ownername;
      if (photo.license == "4") {
        // Creative Commons Attribution（CC BY）ライセンス
        text += " / CC BY";
      }
      return text;
    }

    $.getJSON(flickr_url, function(data) {
      if (data.stat === "ok") {
        vm.total = data.photos.total;
        vm.photos = data.photos.photo.map(function(photo) {
          return {
            id: photo.id,
            imageURL: getFlickrImageURL(photo, "q"),
            pageURL: getFlickrPageURL(photo),
            text: getFlickrText(photo)
          };
        });
      }
    });
  }
});