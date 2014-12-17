$(".ps-mltsourcebtn").click(function(){
	var $this = $(this);
	var ul = $this.parent().parent().find("ul");
	if(ul.is(":visible")){
		$this.html("展开");//.parent().removeClass("open");
	} else{
		$this.html("收起");//.parent().addClass("open");
	}
	ul.slideToggle(); 
});