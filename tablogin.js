// var btnSubmit =
document.forms["main-login"]["submit"].onclick = function () {
    check();
    savename();
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
            // document.forms('song-form').reset();
        }
    };
    xhr.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/members', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(abc);
};

function check() {
    var firstname = document.forms['main-login']['firstname'];
    var lastname = document.forms['main-login']['lastname'];
    var phone = document.forms['main-login']['phone'];
    var email = document.forms['main-login']['email'];
    var password = document.forms['main-login']['password'];
    var date = '1997-08-03';
    var gender = document.forms['main-login']['gender'];
    var avatar = document.forms['main-login']['avatar'];
    var address = document.forms['main-login']['address'];

    var msgfirstname = firstname.nextElementSibling;
    if (firstname == null || firstname.value.length === 0) {
        msgfirstname.innerHTML = "Vui lòng nhập firstname.";
        msgfirstname.classList.remove("msg-success");
        msgfirstname.classList.add("msg-error");
    }
    // else if (firstname.value.length < 5) {
    //     msgfirstname.innerHTML = "Username quá ngắn, vui lòng nhập ít nhất 5 ký tự.";
    //     msgfirstname.classList.remove("msg-success");
    //     msgfirstname.classList.add("msg-error");
    else {
        msgfirstname.innerHTML = "Hợp lệ.";
        msgfirstname.classList.remove("msg-error");
        msgfirstname.classList.add("msg-success");
    }

    var msglastname = lastname.nextElementSibling;
    if (lastname == null || lastname.value.length === 0) {
        msglastname.innerHTML = "Vui lòng nhập lastname.";
        msglastname.classList.remove("msg-success");
        msglastname.classList.add("msg-error");
    }
    // else if (firstname.value.length < 5) {
    //     msglastname.innerHTML = "Username quá ngắn, vui lòng nhập ít nhất 5 ký tự.";
    //     msglastname.classList.remove("msg-success");
    //     msglastname.classList.add("msg-error");
    else {
        msglastname.innerHTML = "Hợp lệ.";
        msglastname.classList.remove("msg-error");
        msglastname.classList.add("msg-success");
    }

    var msgphone = phone.nextElementSibling;
    if (phone == null || phone.value.length === 0) {
        msgphone.innerHTML = "Vui lòng nhập phone.";
        msgphone.classList.remove("msg-success");
        msgphone.classList.add("msg-error");
    } else if (phone.value.length < 5) {
        msgphone.innerHTML = "Phone quá ngắn, vui lòng nhập ít nhất 5 ký tự.";
        msgphone.classList.remove("msg-success");
        msgphone.classList.add("msg-error");
    } else {
        msgphone.innerHTML = "Hợp lệ.";
        msgphone.classList.remove("msg-error");
        msgphone.classList.add("msg-success");
    }

    var msgpassword = password.nextElementSibling;
    if (password == null || password.value.length === 0) {
        msgpassword.innerHTML = "Vui lòng điền password mới.";
        msgpassword.classList.remove("msg-success");
        msgpassword.classList.add("msg-error");
    } else if (password.value.length < 6) {
        msgpassword.innerHTML = "password quá ngắn, vui lòng nhập ít nhất 6 kí tự ";
        msgpassword.classList.remove("msg-success");
        msgpassword.classList.add("msg-error");
    } else {
        msgpassword.innerHTML = "Hợp lệ.";
        msgpassword.classList.remove("msg-error");
        msgpassword.classList.add("msg-success");
    }

    var msgemail = email.nextElementSibling;
    if (email == null || email.value.length === 0) {
        msgemail.innerHTML = "Vui lòng nhập email.";
        msgemail.classList.remove("msg-success");
        msgemail.classList.add("msg-error");
    } else if (email.value.length < 5) {
        msgemail.innerHTML = "email không hợp lệ hoặc đã được sử dụng";
        msgemail.classList.remove("msg-success");
        msgemail.classList.add("msg-error");
    } else {
        msgemail.innerHTML = "Hợp lệ.";
        msgemail.classList.remove("msg-error");
        msgemail.classList.add("msg-success");
    }
}
