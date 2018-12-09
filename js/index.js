var btnSubmit = document.forms['login-form']['btn-submit'];
btnSubmit.onclick = function () {
    if (validateForm()) {
        // Gửi dữ liệu đi.
        doLogin();
    }
};
var btncreatesong = document.getElementsByName("btn-createsong")[0];
btncreatesong.onclick = function () {
    location.href = "../html/create-song.html";
};
var btnregister = document.getElementsByName("btn-Register")[0];
btnregister.onclick = function () {
    location.href = "../html/tablogin.html";
};

var btnloadsong = document.getElementsByName("btn-loadsong")[0];
btnloadsong.onclick = function () {
    loadSong();
};

var btnmysong = document.getElementsByName("btn-mysong")[0];
btnmysong.onclick = function () {
    mySong();
};

function validateForm() {
    var isValid = true;
    var isValidPassword = true;
    var txtemail = document.forms["login-form"]["email"];
    var pwdPassword = document.forms["login-form"]["password"];
    var msgemail = txtemail.nextElementSibling;
    var msgPassword = pwdPassword.nextElementSibling;
    if (txtemail == null || txtemail.value.length === 0) {
        msgemail.innerHTML = "Vui lòng nhập username.";
        msgemail.classList.remove("msg-success");
        msgemail.classList.add("msg-error");
    }
    if (pwdPassword == null || pwdPassword.value.length === 0) {
        msgPassword.innerHTML = "Vui lòng nhập password.";
        msgPassword.classList.remove("msg-success");
        msgPassword.classList.add("msg-error");
        isValidPassword = false;

    }
    isValid = isValidPassword;
    return isValid;
};

function playsong(Link) {
    var audioplayer = document.getElementsByTagName('audio')[0];
    audioplayer.src = Link;
    audioplayer.play();
}

function loadSong() {
    // var htmlcontent = '';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var arraySongs = JSON.parse(xhr.responseText);
            var htmlcontent = '';
            for (var i = 0; i < arraySongs.length; i++) {
                var song = arraySongs[i];
                htmlcontent += '<div class="song-item">';
                htmlcontent += '<div class="song-index"><i class="fas fa-headphones fa-2x"></i>' + (i + 1) + '</div>';
                htmlcontent += '<div class="song-thumbnail">';
                htmlcontent += '<img src="' + song.thumbnail + '">';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-infor">';
                htmlcontent += '<div class="song-name"><i class="fas fa-bullhorn fa-2x"></i>' +  song.name + '</div>';
                htmlcontent += '<div class="song-singer"><i class="fas fa-microphone fa-2x"></i>' + song.singer + '</div>';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-control" onclick="playsong(\'' + song.link + '\')"><i class="far fa-play-circle fa-3x"></i></div>';
                htmlcontent += '<div class="song-control"><a href="#"><i class="fas fa-info-circle fa-3x"></i></a></div>';
                // htmlcontent += '<div class="song-control"><a href="#"><i class="fas fa-volume-up fa-3x"></i></a></div>';

                // htmlcontent += '<div class="song-control"><audio controls src="\'' + song.link + '\'"></audio></div>';
                htmlcontent += '</div>';
            }
            document.getElementById("main-content").innerHTML += htmlcontent;
        }
    };
    xhr.open('GET', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-free-songs', true);
    xhr.send();
}

var token = localStorage.getItem('token-key');
if (token != null || token.length != 0) {
    document.getElementsByClassName('login-wrap').style = 'display:none';
}

function mySong() {
    var xhr = new XMLHttpRequest();
    var token = localStorage.getItem('token-key');
    if (token == null || token.length == 0) {
        alert("Vui lòng đăng nhập.")
        location.href = '../html/index.html';
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var arraySongs = JSON.parse(xhr.responseText);
            var htmlcontent = '';
            for (var i = 0; i < arraySongs.length; i++) {
                var song = arraySongs[i];
                htmlcontent += '<div class="song-item">';
                htmlcontent += '<div class="song-index col-2"><i class="fas fa-headphones fa-2x"></i>' + (i + 1) + '</div>';
                htmlcontent += '<div class="song-thumbnail">';
                htmlcontent += '<img src="' + song.thumbnail + '">';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-infor">';
                htmlcontent += '<div class="song-name"><i class="fas fa-bullhorn fa-2x"></i>' +  song.name + '</div>';
                htmlcontent += '<div class="song-singer"><i class="fas fa-microphone fa-2x"></i>' + song.singer + '</div>';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-control" onclick="playsong(\'' + song.link + '\')"><i class="far fa-play-circle fa-3x"></i></div>';
                htmlcontent += '<div class="song-control"><a href="#"><i class="fas fa-info-circle fa-3x"></i></a></div>';
                // htmlcontent += '<div class="song-control"><a href="#"><i class="fas fa-volume-up fa-3x"></i></a></div>';

                // htmlcontent += '<div class="song-control"><audio controls src="\'' + song.link + '\'"></audio></div>';
                htmlcontent += '</div>';
            }
            document.getElementById("main-content").innerHTML += htmlcontent;
        }
    };
    xhr.open('GET', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-mine', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Basic ' + token);
    xhr.send();
}

function doLogin() {
    var _password = document.forms['login-form']['password'].value;
    var _email = document.forms['login-form']['email'].value;

    var loginInformation = {
        password: _password,
        email: _email,
    };
    var jsonLoginInformation = JSON.stringify(loginInformation);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 201) {
            var responseData = JSON.parse(xhr.responseText);
            alert('Login success with ID: ' + responseData.token);
            localStorage.setItem('token-key', responseData.token);
            var delform = document.getElementsByClassName("login-wrap")[0];
            delform.innerHTML = "";
        } else if (xhr.readyState == 4 && xhr.status == 400) {
            alert("Sai tên tài khoản hoặc mật khẩu, vui lòng nhập lại.");
        }
        ;
    }

    xhr.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/members/authentication', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonLoginInformation);
}
