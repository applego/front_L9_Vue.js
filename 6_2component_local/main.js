var buttonPreference = {
  template: `
    <button>いいね！</button>
  `
};

var buttonEmpathy = {
  template: `
    <button>そだねー</button>
  `
};

var buttonsSns = {
  components: {
    "button-preference": buttonPreference,
    "button-empathy": buttonEmpathy
  },
  template: `
    <div>
      <button-preference></button-preference>
      <button-empathy></button-empathy>
    </div>
  `
};

new Vue({
  el: "#example",
  components: {
    "buttons-sns": buttonsSns
  }
});