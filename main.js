var app = new Vue({
  el: "#example",
  data: {
    url: "https://techacademy.jp/"
  }
});
var app2 = new Vue({
  el:"#example2",
  data:{
    name: "太郎"
  }
});
var app3 = new Vue({
  el:"#example3",
  data:{
    greeting: "Hello Vue.js!2"
  }
});
var app4 = new Vue({
  el:"#example4",
  data:{
    members: ["桃太郎", "イヌ", "サル", "キジ"]
  }
});
var app5 = new Vue({
  el:"#example5",
  data:{
    characters:{
      hero: "桃太郎",
      friend: "イヌ",
      enemy: "鬼"
    }
  }
});
var app6 = new Vue({
  el: "#example6",
  data: {
    name: "太郎"
  }
});
var app7 = new Vue({
  el: "#example7",
  data:{
    height: "",
    weight: ""
  }
});
var app8 = new Vue({
  el: "#example8",
  data:{
    height:"",
    weight:""
  },
  computed:{
    bmi: function(){
      if(this.height && this.weight){
        //センチメートルをメートルにする
        var meterHeight = this.height / 100;
        
        //BMIを計算する
        var bmi = this.weight / (meterHeight * meterHeight);
        
        //小数点以下の桁数を、２桁にして返す
        return bmi.toFixed(2);
      }
      
      return "";
    }
  }
});
var app9 = new Vue({
  el: "#example9",
  data:{
    height:"",
    weight:""
  },
  methods:{
    getBmi: function(){
      if(this.height && this.weight){
        //センチメートルをメートルにする
        var meterHeight = this.height / 100;
        
        //BMIを計算する
        var bmi = this.weight / (meterHeight * meterHeight);
        
        //小数点以下の桁数を、２桁にして返す
        return bmi.toFixed(2);
      }
      
      return "";
    }
  }
});
var app10 = new Vue({
  el: "#example10",
  data: {
    count:0
  },
  computed:{
    date: function(){
      return new Date().toLocaleString();
    }
  },
  methods:{
    countUp: function(){
      this.count += 1;
    },
    getDate: function(){
      return new Date().toLocaleString();
    }
  }
});