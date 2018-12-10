// var btnSubmit =
document.forms["main-login"]["submit"].onclick = function () {
    if (check()) {
        if (savename()) {
            alert("đăng kí thành công.");
            location.href="../html/index.html";
        }
    }
};
document.forms["main-login"]["btn-music"].onclick = function () {
    location.href="../html/index.html";
};

function savename() {
    var firstname = document.forms['main-login']['firstname'].value;
    var lastname = document.forms['main-login']['lastname'].value;
    var phone = document.forms['main-login']['phone'].value;
    var email = document.forms['main-login']['email'].value;
    var password = document.forms['main-login']['password'].value;
    var date = '1997-08-03';
    var gender = document.forms['main-login']['gender'].value;
    var avatar = document.forms['main-login']['avatar'].value;
    var address = document.forms['main-login']['address'].value;
    var tablogin = {
        firstName: firstname,
        lastName: lastname,
        phone: phone,
        email: email,
        password: password,
        birthday: date,
        avatar: avatar,
        gender: gender,
        address: address,
    }
    var abc = JSON.stringify(tablogin);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {//khi trang thai thay doi// thuowng duoc gan bang mot ham vo danh
        if (xhr.readyState == 4 && xhr.status == 201) {
            alert('save success');
        } else if (xhr.readyState == 4) {
            text = JSON.parse(xhr.responseText).error.email;
            var msgemail = document.forms['main-login']['email'].nextElementSibling;
            msgemail.innerHTML = "Email " + text;
            msgemail.classList.remove("msg-success");
            msgemail.classList.add("msg-error");
            alert('Register fails, please try again! ' + text);
        }
    };
    xhr.open('POST', 'https://2-dot-backup-server-003.appspot.com/_api/v2/members', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(abc);
};

function check() {
    var isvalid = true;
    var isvalidfirstname = true;
    var isvalidlastname = true;
    var isvalidphone = true;
    var isvalidemail = true;
    var isvalidpassword = true;
    var isvalidcomfirmpassword = true;
    var isvalidavatar = true;
    var isvalidaddress = true;
    var firstname = document.forms['main-login']['firstname'];
    var lastname = document.forms['main-login']['lastname'];
    var phone = document.forms['main-login']['phone'];
    var email = document.forms['main-login']['email'];
    var password = document.forms['main-login']['password'];
    var comfirmpassword = document.forms['main-login']['comfirm-password'];
    // var date = '1997-08-03';
    // var gender = document.forms['main-login']['gender'];
    var avatar = document.forms['main-login']['avatar'];
    var address = document.forms['main-login']['address'];

    var msgfirstname = firstname.nextElementSibling;
    if (firstname == null || firstname.value.length === 0) {
        msgfirstname.innerHTML = "Vui lòng nhập firstname.";
        msgfirstname.classList.remove("msg-success");
        msgfirstname.classList.add("msg-error");
        isvalidfirstname = false;
    }
    else {
        msgfirstname.innerHTML = "Firstname hợp lệ.";
        msgfirstname.classList.remove("msg-error");
        msgfirstname.classList.add("msg-success");
    }

    var msglastname = lastname.nextElementSibling;
    if (lastname == null || lastname.value.length === 0) {
        msglastname.innerHTML = "Vui lòng nhập lastname.";
        msglastname.classList.remove("msg-success");
        msglastname.classList.add("msg-error");
        isvalidlastname = false;
    }
    else {
        msglastname.innerHTML = "Lastname hợp lệ.";
        msglastname.classList.remove("msg-error");
        msglastname.classList.add("msg-success");
    }

    var msgphone = phone.nextElementSibling;
    if (phone == null || phone.value.length === 0) {
        msgphone.innerHTML = "Vui lòng nhập phone.";
        msgphone.classList.remove("msg-success");
        msgphone.classList.add("msg-error");
        isvalidphone = false;
    } else if (phone.value.length < 5) {
        msgphone.innerHTML = "Phone quá ngắn, vui lòng nhập ít nhất 5 ký tự.";
        msgphone.classList.remove("msg-success");
        msgphone.classList.add("msg-error");
        isvalidphone = false;
    } else {
        msgphone.innerHTML = "Phone hợp lệ.";
        msgphone.classList.remove("msg-error");
        msgphone.classList.add("msg-success");
    }

    var msgpassword = password.nextElementSibling;
    if (password == null || password.value.length === 0) {
        msgpassword.innerHTML = "Vui lòng nhập password mới.";
        msgpassword.classList.remove("msg-success");
        msgpassword.classList.add("msg-error");
        isvalidpassword = false;
    } else if (password.value.length < 6) {
        msgpassword.innerHTML = "password quá ngắn, vui lòng nhập ít nhất 6 kí tự ";
        msgpassword.classList.remove("msg-success");
        msgpassword.classList.add("msg-error");
        isvalidpassword = false;
    } else {
        msgpassword.innerHTML = "Password hợp lệ.";
        msgpassword.classList.remove("msg-error");
        msgpassword.classList.add("msg-success");
    }

    var msgcomfirmpassword = comfirmpassword.nextElementSibling;
    if (comfirmpassword == null || comfirmpassword.value != password.value || comfirmpassword.value.length == 0) {
        msgcomfirmpassword.innerHTML = "Sai mật khẩu mới";
        msgcomfirmpassword.classList.remove("msg-success");
        msgcomfirmpassword.classList.add("msg-error");
        isvalidcomfirmpassword = false;
    } else {
        msgcomfirmpassword.innerHTML = "Hợp lệ.";
        msgcomfirmpassword.classList.remove("msg-error");
        msgcomfirmpassword.classList.add("msg-success");
    }

    var msgemail = email.nextElementSibling;
    if (email == null || email.value.length === 0) {
        msgemail.innerHTML = "Vui lòng nhập email.";
        msgemail.classList.remove("msg-success");
        msgemail.classList.add("msg-error");
        isvalidemail = false;
    } else if (email.value.length < 5) {
        msgemail.innerHTML = "email không hợp lệ hoặc đã được sử dụng";
        msgemail.classList.remove("msg-success");
        msgemail.classList.add("msg-error");
        isvalidemail = false;
    } else {
        msgemail.innerHTML = "Email hợp lệ.";
        msgemail.classList.remove("msg-error");
        msgemail.classList.add("msg-success");
    }

    var msgavatar = avatar.nextElementSibling;
    if (avatar == null || avatar.value.length === 0) {
        msgavatar.innerHTML = "Vui lòng đăng tải avatar của bạn lên đây.";
        msgavatar.classList.remove("msg-success");
        msgavatar.classList.add("msg-error");
        isvalidavatar = false;
    } else {
        msgavatar.innerHTML = "Avatar hợp lệ.";
        msgavatar.classList.remove("msg-error");
        msgavatar.classList.add("msg-success");
    }

    var msgaddress = address.nextElementSibling;
    if (address == null || address.value.length === 0) {
        msgaddress.innerHTML = "Vui lòng nhập address.";
        msgaddress.classList.remove("msg-success");
        msgaddress.classList.add("msg-error");
        isvalidaddress = false;
    } else {
        msgaddress.innerHTML = "Address hợp lệ.";
        msgaddress.classList.remove("msg-error");
        msgaddress.classList.add("msg-success");
    }
    isvalid = isvalidfirstname && isvalidlastname && isvalidpassword && isvalidcomfirmpassword && isvalidphone && isvalidemail && isvalidavatar && isvalidaddress;
    return isvalid;

}
