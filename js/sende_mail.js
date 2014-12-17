$("#sendBtn").click(function(){
	var num = 60;
    var stop = null;
    var $this = $(this);
    num--;
    $this.attr("disabled", "disabled").html(num + "秒");
    stop = setInterval(function() {
        num--;
        if (0 === num) {
            clearInterval(stop);
            $this.removeAttr("disabled").html( "重新发送");
        } else{
            $this.html(num + "秒");    
        }
    }, 1000); 
});