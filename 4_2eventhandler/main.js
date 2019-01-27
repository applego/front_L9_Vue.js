Vue.directive("change-color", {
  bind: function(el, binding){
    el.addEventListener("click", function(){
      el.style.color = binding.value;
    });
  }
});

new Vue({
  el: "#example"
});