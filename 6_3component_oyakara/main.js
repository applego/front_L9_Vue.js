var buttonPreference = {
  props: {
    initialCount:{
      type: Number,
      required: true
    }
  },
  template: `
    <button>
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