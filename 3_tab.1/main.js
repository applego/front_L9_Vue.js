new Vue({
  el: "#example",
  data:{
    tabs: null,
    activeTab: null
  },
  created: function(){
    var vm = this;
    setTimeout(function(){
      var _tabs = [
        {
          id: "tabs-1",
          title: "タブ1",
          content: "タブ1の内容が入ります。"
        },
        {
          id: "tabs-2",
          title: "タブ2",
          content: "タブ2の内容が入ります。"
        },
        {
          id: "tabs-3",
          title: "タブ3",
          content: "タブ3の内容が入ります。"
        }
      ];
      vm.tabs = _tabs;
      vm.activeTab = _tabs[0];
    },2000);
  }
});