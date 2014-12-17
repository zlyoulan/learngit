$.validator.addMethod("emailphone", function(value, element) {
    var isemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i.test(value);
    var isphone = /^1[3,5,8,9]\d{9}$/.test(value);
    if (isemail || isphone) {
        return true;
    } else {
        return false;
    }
}, "<font>邮箱或手机号格式不正确</font>");

$("#resetPwdForm").validate({
    debug: false,
    errorClass: "has-error",
    validClass: "has-success",
    ignore: "",
    rules: {
        resetpwd: {
            required: true
        },
        resetrepwd: {
            required: true,
            equalTo: "#resetpwd"
        }
    },
    messages: {
        resetpwd: {
            required: "密码不能为空"
        },
        resetrepwd: {
            required: "确认密码不能为空",
            equalTo: "密码与确认密码不一致"
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