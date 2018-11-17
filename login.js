var btnSubmit = document.forms["login-form"]["btn-submit"];
btnSubmit.onclick = function () {
    var txtUsername = document.forms["login-form"]["username"];
    var parentOfText = txtUsername.parentNode;
    console.log(parentOfText.lastChild);
// var pwdPassword = document.forms["login-form"]["password"];
var msgUsername = txtUsername.nextElementSibling;
// var msgPassword = pwdPassword.nextElementSibling;
if (txtUsername == null || txtUsername.value.length == 0) {
    msgUsername.innerHTML = "Vui lòng nhập username.";
    msgUsername.classList.remove("msg-success");
    msgUsername.classList.add("msg-error");
}