// 单个vue实例
var app = new Vue({
    el:'#app',
    data: {
       count: 4,
       show: true
    },
    methods: {
    	addCount:function(){
    		this.count = parseInt(this.count) +1;
    	}
    },
    computed: {
    	changeCount: function(){
    		this.count += 1; 
    	}
    }

});
















