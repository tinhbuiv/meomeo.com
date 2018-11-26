var btnSubmit = document.forms["login-form"]["btn-submit"];
btnSubmit.onclick = function () {
    var txtUsername = document.forms["login-form"]["username"];
    var pwdPassword = document.forms["login-form"]["password"];
    var msgUsername = txtUsername.nextElementSibling;
    var msgPassword = pwdPassword.nextElementSibling;
    if (txtUsername == null || txtUsername.value.length === 0) {
        msgUsername.innerHTML = "Vui lòng nhập username.";
        msgUsername.classList.remove("msg-success");
        msgUsername.classList.add("msg-error");
    }
    if (pwdPassword == null || pwdPassword.value.length === 0) {
        msgPassword.innerHTML = "Vui lòng nhập password.";
        msgPassword.classList.remove("msg-success");
        msgPassword.classList.add("msg-error");
    }
};

var btnloadsong = document.getElementsByName("btn-loadsong")[0];
btnloadsong.onclick = function () {
    loadSong();
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
                htmlcontent += '<div class="song-control" onclick="playsong(\'' + song.link + '\')">PlaySong</div>';
                htmlcontent += '<div class="song-control"><a href="#">Detail</a></div>';
                htmlcontent += '</div>';
            }
            document.getElementById("main-content").innerHTML += htmlcontent;
        }
    };
    xhr.open('GET', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs/get-free-songs', true);
    xhr.send();
}
