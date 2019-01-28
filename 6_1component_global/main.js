Vue.component("button-preference",{
  data: function(){
    return {count: 0};
  },
  methods: {
    countUp: function(){
      this.count += 1;
    }
  },
  template: `
    <button v-on:click="countUp">
      {{ count }} いいね!
    </button>
  `
});

Vue.component("button-empathy",{
  template:`
    <button>そだねー</button>
  `
});

Vue.component("buttons-sns",{
  template:`
    <div>
      <button-preference></button-preference>
      <button-empathy></button-empathy>
    </div>
  `
});

new Vue({
  el: "#example"
});