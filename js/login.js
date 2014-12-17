$("#loginForm").validate({
    debug: false,
    errorClass: "kkb-login-erroradd",
    validClass: "kkb-success",

    ignore: "",
    rules: {
        loginname: {
            required: true
        },
        loginpwd: {
            required: true
        }
    },
    messages: {
        loginname: {
            required: "用户名不能为空"
        },
        loginpwd: {
            required: "密码不能为空"
        }
    },
    showErrors: function(map, list) {
        var focussed = document.activeElement;
        this.currentElements.removeClass("kkb-form-error");
        $("#loginError").html("").css({height:"0px"});
        $.each(list, function(index, error) {
            $("#loginError").html(error.message).animate({height:"34px"},500);
            $(error.element).addClass("kkb-form-error");
            return false;
        });
    },
    submitHandler: function(form) {
        $("#loginbtn").attr("disabled", "disabled").val("请稍候...");
        form.submit();
        return true;
    }
});