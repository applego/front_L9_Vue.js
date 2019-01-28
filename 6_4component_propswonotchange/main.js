var buttonPreference = {
  props: ["initialCount"],
  data: function(){
    return{ count: this.initialCount };
  },
  methods: {
    countUp: function() {
      this.initialCount += 1;
    }
  },
  template: `
    <button v-on:click="countUp">
      {{ initialCount }} いいね！
    </button>
  `
};

new Vue({
  el: "#example",
  components: {
    "button-preference": buttonPreference
  }
});