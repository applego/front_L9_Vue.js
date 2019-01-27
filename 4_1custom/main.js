Vue.directive("hide-async", {
  bind: function(el, binding){
    setTimeout(function(){
      el.style.display = "none";
    }, binding.value);
  }
});

new Vue({
  el: "#example"
});