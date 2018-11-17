var btnSubmit = document.forms["main-login"]["btn-submit"];
btnSubmit.onclick = function () {
    var txtusername = document.forms["main-login"]["username"];
    var txtphone = document.forms["main-login"]["phone"];

    var parentOfText = txtusername.parentNode;
    console.log(parentOfText.lastChild);
    var parentOfText = txtphone.parentNode;
    console.log(parentOfText.lastChild);
    var msgusername = txtusername.nextElementSibling;
    var msgphone = txtphone.nextElementSibling;
    if (txtusername == null || txtusername.value.length == 0) {
        msgusername.innerHTML = "Vui lòng nhập username.";
        msgusername.classList.remove("msg-success");
        msgusername.classList.add("msg-error");
    }
    else if (txtusername.value.length < 5) {
        msgusername.innerHTML = "Username quá ngắn, vui lòng nhập ít nhất 5 ký tự.";
        msgusername.classList.remove("msg-success");
        msgusername.classList.add("msg-error");
    } else {
        msgusername.innerHTML = "Hợp lệ.";
        msgusername.classList.remove("msg-error");
        msgusername.classList.add("msg-success");
    }
    if (txtphone == null || txtphone.value.length == 0) {
        msgphone.innerHTML = "Vui lòng nhập Số di động hoặc email.";
        msgphone.classList.remove("msg-success");
        msgphone.classList.add("msg-error");
    }
    else if (txtphone.value.length < 5) {
        msgphone.innerHTML = "Số di động hoặc email quá ngắn, vui lòng nhập ít nhất 8 ký tự.";
        msgphone.classList.remove("msg-success");
        msgphone.classList.add("msg-error");
    } else {
        msgphone.innerHTML = "Hợp lệ.";
        msgphone.classList.remove("msg-error");
        msgphone.classList.add("msg-success");
    }
}