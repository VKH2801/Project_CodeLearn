function SendMail() {
    $.post(
        "http://localhost:3000/Contract/SendMail",
        {
            Email: $("#Email").val(),
            Name: $("#Name").val(),
            Card: $("#Card").val(),
            subject: $("#Subject").val(),
            substanc: $("#Substanc").val(),
        },
        (data, status) => {
            swal({
                title: "Send Gmail Successfully",
                text: "Thank you for helping me",
                icon: "success",
                button: "OK !",
            }).then((willDelete) => {
                if (willDelete) {
                    window.location.reload();
                }
            });
        }
    );
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

function logOut() {
    localStorage.removeItem("UserName");
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.replace("/login");
}
