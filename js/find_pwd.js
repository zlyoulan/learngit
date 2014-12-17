$.validator.addMethod("emailphone", function(value, element) {
    var isemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i.test(value);
    var isphone = /^1[3,5,8,9]\d{9}$/.test(value);
    if (isemail || isphone) {
        return true;
    } else {
        return false;
    }
}, "<font>邮箱或手机号格式不正确</font>");

$("#loginForm").validate({
    debug: false,
    errorClass: "has-error",
    validClass: "has-success",
    ignore: "",
    rules: {
        findname: {
            required: true,
            email: true
        },
        findcode: {
            required: true
        }
    },
    messages: {
        findname: {
            required: "邮箱不能为空",
            email: "邮箱格式不正确"
        },
        findcode: {
            required: "验证码不能为空"
        }
    },
    highlight: function(element) {
        $(element).parent().addClass("has-error");
    },
    unhighlight: function(element) {
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


$("#codeBtn").click(function(){
    $("#codeImg").attr("src","../images/codebg.jpg?"+Math.random());
});