// Flickr API key
const API_KEY ="074312228d4120d45c3a03b5f9e86acf";

var flickrGalleryImages = {
  props: {
    photos: {
      type: Array,
      requried: true
    }
  },
  template: `
   <div
     class="image-gallery__items"
   >
     <div
       v-for="photo in photos"
       class="image-gallery__item"
     >
       <a
         v-bind:key="photo.id"
         v-bind:href="photo.pageURL"
         v-tooltip="photo.text"
         class="flickr-link"
         target="_blank"
       >
         <img
           v-bind:src="photo.imageURL"
           v-bind:alt="photo.text"
           class="image-gallery__img"
           width="150"
           height="150"
         />
       </a>
     </div>
   </div>
   `
};

Vue.directive("tooltip",{
  bind: function(el, binding){
    $(el).tooltip({
      title: binding.value,
      placement: "bottom"
    });
  }
});

new Vue({
  el:"#gallery",
  data: {
    // photos: []
    cats: [],
    dogs: []
  },
  components:{
    "flickr-gallery-images":flickrGalleryImages
  },
  methods:{
    getFlickrImageURL: function(photo, size){
      var url =
        "https://farm" +
        photo.farm +
        ".staticflickr.com/" +
        photo.server +
        "/" +
        photo.id +
        "_" +
        photo.secret;
      if(size){
        url += "_" + size;
      }
      url += ".jpg";
      return url;
    },
    getFlickrPageURL: function(photo){
      return "https://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
    },
    getFlickrText: function(photo){
      var text = "\"" + photo.title + "\" by " + photo.ownername;
      if (photo.license == "4") {
        // Creative Commons Attribution（CC BY）ライセンス
        text += " / CC BY";
      }
      return text;
    },
    fetchImageFromFlickr: function(v_text,num){
    //getFlickrURL: function(v_text,num){
      var vm = this;
      var parameters = $.param({
        method: "flickr.photos.search",
        api_key: API_KEY,
        text: v_text, // 検索テキスト
        sort: "interestingness-desc", // 興味深さ順
        per_page: num, // 取得件数
        license: "4", // Creative Commons Attributionのみ
        extras: "owner_name,license", // 追加で取得する情報
        format: "json", // レスポンスをJSON形式に
        nojsoncallback: 1 // レスポンスの先頭に関数呼び出しを含めない
      });
      var flickr_url = "https://api.flickr.com/services/rest/?" + parameters;
      
      $.getJSON(flickr_url, function(data){
        if(data.stat === "ok"){
          vm[v_text] = data.photos.photo.map(function(photo){
          // vm.photos = data.photos.photo.map(function(photo){
            return {
              id: photo.id,
              imageURL: vm.getFlickrImageURL(photo, "q"),
              pageURL: vm.getFlickrPageURL(photo),
              text: vm.getFlickrText(photo)
            };
          });
        }
      });
    }
  },
  created: function(){
    var vm = this;
    vm.fetchImageFromFlickr("cats",4);
    vm.fetchImageFromFlickr("dogs",4);
  }
});