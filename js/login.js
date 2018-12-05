var btnSubmit = document.forms['login-form']['btn-submit'];
btnSubmit.onclick = function () {
    if (validateForm()) {
        // Gửi dữ liệu đi.
        doLogin();
    }
};

function validateForm() {
    var isValid = true;
    var isValidPassword = true;
    var txtUsername = document.forms["login-form"]["email"];
    var pwdPassword = document.forms["login-form"]["password"];
    var msgUsername = txtUsername.nextElementSibling;
    var msgPassword = pwdPassword.nextElementSibling;
    if (txtUsername == null || txtUsername.value.length === 0) {
        msgUsername.innerHTML = "Vui lòng nhập username.";
        msgUsername.classList.remove("msg-success");
        msgUsername.classList.add("msg-error");
        isValidPassword = false;
    }
    if (pwdPassword == null || pwdPassword.value.length === 0) {
        msgPassword.innerHTML = "Vui lòng nhập password.";
        msgPassword.classList.remove("msg-success");
        msgPassword.classList.add("msg-error");
    }
    isValid = isValidPassword;
    return isValid;
};

var btncreatesong = document.getElementsByName("btn-createsong")[0];
btncreatesong.onclick = function () {
    location.href = "create-song.html";
};
document.getElementsByName("btn-Register")[0].onclick = function () {
    alert("Register đang được phát triển.");
};

var btnloadsong = document.getElementsByName("btn-loadsong")[0];
btnloadsong.onclick = function () {
    loadSong();
};

var btnmysong = document.getElementsByName("btn-mysong")[0];
btnmysong.onclick = function () {
    mySong();
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
                htmlcontent += '<div class="song-index">' + (i + 1) + '</div>';
                htmlcontent += '<div class="song-thumbnail">';
                htmlcontent += '<img src="' + song.thumbnail + '">';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-infor">';
                htmlcontent += '<div class="song-name">' + song.name + '</div>';
                htmlcontent += '<div class="song-singer">' + song.singer + '</div>';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-control" onclick="playsong(\'' + song.link + '\')">Play Song</div>';
                htmlcontent += '<div class="song-control"><a href="#">Detail</a></div>';
                // htmlcontent += '<div class="song-control"><audio controls src="\'' + song.link + '\'"></audio></div>';
                htmlcontent += '</div>';
            }
            document.getElementById("main-content").innerHTML += htmlcontent;
        }
    };
    xhr.open('GET', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-free-songs', true);
    xhr.send();
}

function mySong() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var arraySongs = JSON.parse(xhr.responseText);
            var htmlcontent = '';
            for (var i = 0; i < arraySongs.length; i++) {
                var song = arraySongs[i];
                htmlcontent += '<div class="song-item">';
                htmlcontent += '<div class="song-index">' + (i + 1) + '</div>';
                htmlcontent += '<div class="song-thumbnail">';
                htmlcontent += '<img src="' + song.thumbnail + '">';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-infor">';
                htmlcontent += '<div class="song-name">' + song.name + '</div>';
                htmlcontent += '<div class="song-singer">' + song.singer + '</div>';
                htmlcontent += '</div>';
                htmlcontent += '<div class="song-control" onclick="playsong(\'' + song.link + '\')">Play Song</div>';
                htmlcontent += '<div class="song-control"><a href="#">Detail</a></div>';
                // htmlcontent += '<div class="song-control"><audio controls src="\'' + song.link + '\'"></audio></div>';
                htmlcontent += '</div>';
            }
            document.getElementById("main-content").innerHTML += htmlcontent;
        }
    };
    xhr.open('GET', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-mine', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('Authorization', 'Basic ' + token);
    xhr.send();
}

function doLogin() {
    var _password = document.forms['login-form']['password'].value;
    var _username = document.forms['login-form']['email'].value;

    var loginInformation = {
        password: _password,
        email: _username,
    };

    var token = localStorage.getItem('token-key');
    if (token == null || token.length === 0) {
        location.href = 'index.html';
    }
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