document.getElementById('save-more').onclick = function () {
    if (checksong()) {
        saveSong();
    }
};
document.forms["song-form"]["backtomusic"].onclick = function () {
    location.href = "../html/index.html";
};

function saveSong() {
    var name = document.forms['song-form']['Name'].value;
    var singer = document.forms['song-form']['Singer'].value;
    var author = document.forms['song-form']['Author'].value;
    var thumbnail = document.forms['song-form']['Thumbnail'].value;
    var link = document.forms['song-form']['link'].value;
    var song = {
        thumbnail: thumbnail,
        name: name,
        singer: singer,
        author: author,
        link: link,
    };
    var sendData = JSON.stringify(song);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {//khi trang thai thay doi// thuowng duoc gan bang mot ham vo danh
        if (xhr.readyState == 4 && xhr.status == 201) {
            alert('save success');
            document.forms('song-form').reset();
        }
    };
    xhr.open('POST', 'https://2-dot-backup-server-002.appspot.com/_api/v2/songs', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Basic ' + localStorage.getItem('token-key'));
    xhr.send(sendData);
}

function checksong() {
    var txtname = document.forms['song-form']['Name'];
    var txtsinger = document.forms['song-form']['Singer'];
    var txtauthor = document.forms['song-form']['Author'];
    var txtthumbnail = document.forms['song-form']['Thumbnail'];
    var txtlink = document.forms['song-form']['link'];

    var token = localStorage.getItem('token-key');
    if (token == null || token.length == 0) {
        alert("Vui lòng đăng nhập.")
        location.href = '../html/index.html';
    } else {
        document.getElementsByClassName('login-wrap').style = 'display:none';

    }
    var msgname = txtname.nextElementSibling;
    if (txtname == null || txtname.value.length === 0) {
        msgname.innerHTML = "Vui lòng nhập tên bài hát";
        msgname.classList.remove("msg-success");
        msgname.classList.add("msg-error");
        return false;
    } else {
        msgname.innerHTML = "  ";
    }

    var msgsinger = txtsinger.nextElementSibling;
    if (txtsinger == null || txtsinger.value.length === 0) {
        msgsinger.innerHTML = "Vui lòng nhập tên ca sĩ";
        msgsinger.classList.remove("msg-success");
        msgsinger.classList.add("msg-error");
        return false;
    } else {
        msgsinger.innerHTML = "  ";
    }

    var msgauthor = txtauthor.nextElementSibling;
    if (txtauthor == null || txtauthor.value.length === 0) {
        msgauthor.innerHTML = "Vui lòng nhập tên tác giả";
        msgauthor.classList.remove("msg-success");
        msgauthor.classList.add("msg-error");
        return false;
    } else {
        msgauthor.innerHTML = "  ";
    }

    var msgthumbnail = txtthumbnail.nextElementSibling;
    if (txtthumbnail == null || txtthumbnail.value.length === 0) {
        msgthumbnail.innerHTML = "Vui lòng nhập link ảnh bìa bài hát";
        msgthumbnail.classList.remove("msg-success");
        msgthumbnail.classList.add("msg-error");
        return false;
    } else {
        msgthumbnail.innerHTML = "";
    }

    var msglink = txtlink.nextElementSibling;
    if (txtlink == null || txtlink.value.length === 0) {
        msglink.innerHTML = "Vui lòng nhập link bài hát";
        msglink.classList.add("msg-error");
        return false;
    } else {
        msglink.innerHTML = "";
    }
    return true;
}