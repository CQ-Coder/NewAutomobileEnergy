$(function() {
	$(".out-card > .layui-tab-content").css({"height": $(".layui-body").height() - 39 +"px"})//处理右侧内容高度超出滚动样式
})

var contrlMenuShow = (function() {
	var flag = true;
	var objArr = [$("#menu-left"), $(".nav-btn"), $(".layui-body, .layui-footer")];
	var hideMenu = function() {
		objArr[0].animate({"left":"-230px"});
		objArr[1].animate({"left":"50px"});
		objArr[2].animate({"left":"50px"});
		flag = false;
	}
	var showMenu = function() {
		objArr[0].animate({"left":"0"});
		objArr[1].animate({"left":"280px"});
		objArr[2].animate({"left":"280px"});
		flag = true;
	}
	return function() {
		flag?hideMenu():showMenu();
	}
})()

$(".nav-btn").on("click", function() {
	contrlMenuShow();
})
