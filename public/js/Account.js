$(document).ready(() => {
    var user = JSON.parse(localStorage.getItem("UserName"));
    $(".Name").html(`WelCome : ` + user.tenTK);
    LoadData();
    LoadPromo();
});
function removeItem() {
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.removeItem("UserName");
}
//Load Dữ liệu account.............
function LoadData() {
    $.post("http://localhost:3000/Account/LoadData", {}, (data, status) => {
        var html = ``;
        for (i = 0; i < data.length; i++) {
            html += `
                <tr>
                <td>${data[i].TenTK}</td>
                <td>**********</td>
                <td>${data[i].CMND}</td>
                <td>${data[i].LoaiTK}</td>
                <td>
                <i class="fa-solid fa-lock" style="color: red; cursor:pointer;" onclick="BlockUSer(${data[i].MaTK},${data[i].Tinhtrang},'${data[i].LoaiTK}')"></i>
                <i class="fa-regular fa-pen-to-square" style="color: #7D8BAE; cursor:pointer;" onclick="OpenModal('${data[i].MaTK}')"></i>
                </td>
                </tr>
            `;
        }
        $("#Account").html(html);
    });
}

// Khóa tài khoản .................
function BlockUSer(id, status, Role) {
    swal({
        title: "Are you sure?",
        text: "Will you hide this product from customers !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            if (status) {
                $.post(
                    "http://localhost:3000/Account/BlockUser",
                    {
                        UserTK: id,
                        Status: status,
                        Role: Role,
                    },
                    (data, status) => {
                        if (data == "You can block Admin !!!") {
                            swal({
                                title: data,
                                icon: "warning",
                                button: "OK !",
                            }).then((willDelete) => {
                                if (willDelete) {
                                    LoadData();
                                }
                            });
                        } else {
                            swal({
                                title: data,
                                icon: "success",
                                button: "OK !",
                            }).then((willDelete) => {
                                if (willDelete) {
                                    LoadData();
                                }
                            });
                        }
                    }
                );
            } else {
                $.post(
                    "http://localhost:3000/Account/OpenBlock",
                    {
                        UserTK: id,
                        Status: status,
                        Role: Role,
                    },
                    (data, status) => {
                        if (data == "You can block Admin !!!") {
                            swal({
                                title: data,
                                icon: "warning",
                                button: "OK !",
                            }).then((willDelete) => {
                                if (willDelete) {
                                    LoadData();
                                }
                            });
                        } else {
                            swal({
                                title: data,
                                icon: "success",
                                button: "OK !",
                            }).then((willDelete) => {
                                if (willDelete) {
                                    LoadData();
                                }
                            });
                        }
                    }
                );
            }
        }
    });
}
// Mở modal ...............
function OpenModal(id) {
    $("#SOS").val(id);
    document.getElementById("myModal").style.display = "block";
    document.getElementById("myModal").style.display = "block";
}
// Thay đổi mật khẩu .........
function ChangePassword() {
    $.post(
        "http://localhost:3000/Account/ChangePassword",
        {
            MaTK: $("#SOS").val(),
            New: $("#New").val(),
            Old: $("#Old").val(),
            Repeat: $("#Repeat").val(),
        },
        (data, status) => {
            if (data == "Old Password is incorrect !!" || data == "New password does not match !!") {
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
                    title: data,
                    icon: "success",
                    button: "OK !",
                }).then((willDelete) => {
                    if (willDelete) {
                        Close();
                    }
                });
            }
        }
    );
}
// Load Mã giảm giá ..........
function LoadPromo() {
    $.post("http://localhost:3000/Account/LoadPromo", (data, status) => {
        var html = ``;
        var Status;
        for (i = 0; i < data.length; i++) {
            if (data[i].TrangThai) {
                Status = `Still Code`;
            } else {
                Status = ` Out Of Code`;
            }
            html += `
        <tr>
        <td>${data[i].MaKM}</td>
        <td>${data[i].NoiDung}</td>
        <td>${data[i].GiaTri}</td>
        <td>${Status}</td>
        <td>
        <i class="fa-solid fa-square-plus" onclick="AddPromo()" style="color:blue; cursor:pointer;"></i>
        <i class="fa-regular fa-eye" style="color:red; cursor:pointer;" onclick="TurnOffPromo('${data[i].MaKM}',${data[i].TrangThai})"></i>
        <i class="fa-regular fa-pen-to-square" style="color:pink; cursor:pointer;" onclick="UpdatePromo('${data[i].MaKM}',${data[i].GiaTri},'${data[i].NoiDung}')"></i>
        </td>
        </tr>
        `;
        }
        $("#Table-Promo").html(html);
    });
}
// Khóa Promo............
function TurnOffPromo(id, Status) {
    swal({
        title: "Are you sure?",
        text: "Will you hide this product from customers !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            var TrangThai;
            if (Status == true) {
                TrangThai = "False";
            } else {
                TrangThai = "True";
            }
            $.post(
                "http://localhost:3000/Account/Promo",
                {
                    Id: id,
                    TT: TrangThai,
                },
                (data, status) => {
                    swal({
                        title: data,
                        icon: "success",
                        button: "OK !",
                    }).then((willDelete) => {
                        if (willDelete) {
                            LoadPromo();
                        }
                    });
                }
            );
        }
    });
}
// Mở bảng Thêm ....
function AddPromo() {
    document.getElementById("Modal-Add").style.display = "block";
}
// Thêm Promotion .................
function InsertPromo() {
    if ($("#Code-Id").val() == "" || $("#Code-Content").val() == "" || $("#Code-Value").val() == "") {
        swal("Oops", "You have not filled in !!", "error");
    } else {
        $.post(
            "http://localhost:3000/Account/Add",
            {
                Id: $("#Code-Id").val(),
                Content: $("#Code-Content").val(),
                Value: $("#Code-Value").val(),
            },
            (data, status) => {
                if (data == "Error") {
                    swal("Oops", "Code Promotion Have Duplicated", "error");
                } else {
                    LoadPromo();
                    swal("Good job!", data, "success");
                    document.getElementById("Modal-Add").style.display = "none";
                }
            }
        );
    }
}
// Đóng Modal...........
function Close() {
    document.getElementById("Modal-Add").style.display = "none";
    document.getElementById("Modal-Update").style.display = "none";
    document.getElementById("myModal").style.display = "none";
}
// Upload Modal Update
function UpdatePromo(id, Value, Content) {
    $("#Update-Id").val(id);
    $("#Update-Value").val(Value);
    $("#Update-Content").val(Content);
    document.getElementById("Modal-Update").style.display = "block";
}
// Update Promo
function Update() {
    if ($("#Update-Value").val() == "" || $("#Update-Content").val() == "") {
        swal("Oops", "You have not filled in !!", "error");
    } else {
        $.post(
            "http://localhost:3000/Account/Update",
            {
                Id: $("#Update-Id").val(),
                Content: $("#Update-Content").val(),
                Value: $("#Update-Value").val(),
            },
            (data, status) => {
                LoadPromo();
                swal("Good job!", "SuccessFully", "success");
                document.getElementById("Modal-Update").style.display = "none";
            }
        );
    }
}
