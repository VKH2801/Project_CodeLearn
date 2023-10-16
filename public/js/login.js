// <-----------> Đăng kí <---------->
function SignUp() {
    $.post(
        "http://localhost:3000/Login/SignUp",
        {
            UserName: $("#SignUp-UserName").val(),
            Password: $("#SignUp-PassWord").val(),
            Identity_Card: $("#SignUp-CMND").val(),
        },
        (data, status) => {
            if (data == "Sign Up Success") {
                swal({
                    title: data,
                    icon: "success",
                    button: "OK !",
                });
                then((willDelete) => {
                    if (willDelete) {
                        window.location.reload("/login");
                    }
                });
            } else {
                swal({
                    title: data,
                    icon: "warning",
                    button: "OK !",
                }).then((willDelete) => {
                    if (willDelete) {
                    }
                });
            }
        }
    );
}

// <-----------> Đăng nhập <---------->
function Login() {
    $.post(
        "http://localhost:3000/Login/Authentic",
        {
            UserName: $("#Login-UserName").val(),
            Password: $("#Login-Password").val(),
        },
        (data, status) => {
            if (data == "Login Fail") {
                swal({
                    title: data,
                    icon: "warning",
                    button: "OK !",
                }).then((willDelete) => {
                    if (willDelete) {
                    }
                });
            } else {
                swal({
                    title: "Send Gmail Successfully",
                    text: "Thank you for helping me",
                    icon: "success",
                    button: "OK !",
                }).then((willDelete) => {
                    if (willDelete) {
                        let infoUser = {
                            tenTK: data.User,
                            Capbac: data.Capbac,
                            LoaiTK: data.LoaiTK,
                        };
                        // storage = [infoUser];
                        localStorage.setItem("UserName", JSON.stringify(infoUser));
                        setCookie("token", data.token, 1);
                        window.location.replace("http://localhost:3000/Manage");
                    }
                });
            }
        }
    );
}

// <---------> Hàm Save cookies <------->
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function logOut() {
    localStorage.removeItem("UserName");
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.replace("/login");
}

$(document).ready(function () {
    let USER = JSON.parse(localStorage.getItem("UserName"));
    if (USER != null) {
        $("#control-link").css("display", "none");
        var dt = $(`
                <span>Welcome ${USER.tenTK}</span>
                <button class="btn-logOut" onclick="logOut()"><i class="fa-solid fa-right-from-bracket"></i></button>
            `);
        $("#control-top").append(dt);
    }
});
