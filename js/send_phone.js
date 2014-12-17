$("#sendbtn").click(function() {
    var num = 60;
    var stop = null;
    var $this = $(this);
    num--;
    $this.attr("disabled", "disabled").attr("value",num + "秒");
    stop = setInterval(function() {
        num--;
        if (0 === num) {
            clearInterval(stop);
            $this.removeAttr("disabled").attr("value", "重新发送");
        } else{
            $this.attr("value",num + "秒"); 
        }
    }, 1000); 
});



$("#loginForm").validate({
    debug: false,
    errorClass: "has-error",
    validClass: "has-success",
    ignore: "",
    rules: {
        codetxt: {
            required: true
        }
    },
    messages: {
        codetxt: {
            required: "验证码不能为空"
        }
    },
    highlight: function(element,errorClass) { 
        $(element).parent().addClass("has-error");
    },
    unhighlight: function(element,errorClass) {
        $(element).parent().removeClass("has-error");
        $(element).parent().find(".form-error").remove();
        $(element).parent().append("<div class='help-block'><div class='form-ok'><span>&nbsp;</span></div></div>");
    },
    errorPlacement: function(error, element) {
        if (!!$(element).parent().find(".form-error").length) {
            
        } else {
            $(element).parent().find(".form-ok").remove();
            $(element).parent().append("<div class='help-block'><div class='form-error'><div>" + error.text() + "<em></em></div><span>&nbsp;</span></div></div>");
        }
    },
    submitHandler: function() {
        // $("#loginbtn").attr("disabled", "disabled").val("请稍候...");
        // form.submit();
        // return true;
    }
});