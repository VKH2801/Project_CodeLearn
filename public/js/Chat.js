function removeItem() {
    var user = localStorage.getItem("UserName");
    // Xóa ra khỏi danh sách online khi người dùng ngắt kết nối
    socket.emit("disconnected", user);
    DS();
    window.localStorage.removeItem("UserName");
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
// Nhận danh sách online
function DS() {
    socket.on("Send-DS", (arr) => {
        ds = "";
        arr.forEach((row) => {
            ds += `
            <p><i class="fas fa-signal"></i> ${row}</p>
            `;
        });
        $("#ds").html(ds);
    });
}

$(document).ready(() => {
    var user = JSON.parse(localStorage.getItem("UserName"));
    $(".Name").html(`WelCome : ` + user.tenTK);
    socket.emit("User", user.tenTK);
    DS();
});
// Thông qua cổng port 3000 để nhận biết người dùng có hoạt động không
var socket = io("http://localhost:3000/");
// Event người dùng chat hiện lên client
socket.on("Send-Client", (data) => {
    dt = `<li><span id="user">${data.tk}</span> : ${data.nd}</li>`;
    $("#Mess").append(dt);
});
// Gửi tin nhắn lên sever
function sendMess() {
    socket.emit("Send-Messenger", $("#input-Send").val());
    $("#input-Send").val("");
}
