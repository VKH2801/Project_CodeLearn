// Load Data .................
function LoadData() {
    $.post("http://localhost:3000/Customer/LoadData", (data, status) => {
        html = ``;
        var Sex;
        for (i = 0; i < data.length; i++) {
            if (data[i].Gioitinh) {
                Sex = "Man";
            } else {
                Sex = "Woman";
            }
            html += `
           <li>
            <div class="Customer-middle">
              <img src="/images/${data[i].Avatar}" alt="img" />
            </div>
            <div class="Customer-info">
              <a href="" class="Customer-Name">${data[i].TenKH}</a>
              <a href="" class="Customer-Date">${moment(data[i].NgSinh).format("L")}</a>
              <a href="" class="Customer-Sex">${Sex}</a>
              <a href="" class="Customer-Level">${data[i].Capbac}</a>
              <button class="button-view" onclick="ViewCustomer(${data[i].CMND})"><i class="fa-regular fa-eye"></i> View</button>
            </div>
          </li>
           `;
        }
        $(".Customer").html(html);
    });
}
// Tìm kiếm khách hàng..........
function FindCustomer() {
    $.post(
        "http://localhost:3000/Customer/FindCustomer",
        {
            Value: $("#Value-Search").val(),
            Text: $("#Input").val(),
        },
        (data, status) => {
            html = ``;
            var Sex;
            for (i = 0; i < data.length; i++) {
                if (data[i].Gioitinh) {
                    Sex = "Male";
                } else {
                    Sex = "Female";
                }
                html += `
        <li>
            <div class="Customer-middle">
              <img src="/images/${data[i].Avatar}" alt="img" />
            </div>
            <div class="Customer-info">
              <a href="" class="Customer-Name">${data[i].TenKH}</a>
              <a href="" class="Customer-Date">${moment(data[i].NgSinh).format("L")}</a>
              <a href="" class="Customer-Sex">${Sex}</a>
              <a href="" class="Customer-Level">${data[i].Capbac}</a>
              <button class="button-view" onclick="ViewCustomer('${data[i].CMND}')"><i class="fa-regular fa-eye"></i> View</button>
            </div>
          </li>
        `;
            }
            $(".Customer").html(html);
        }
    );
}
// Đăng Xuất ..........
function removeItem() {
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.removeItem("UserName");
}
// View khách hàng............
function ViewCustomer(Card) {
    console.log(Card);
    document.getElementById("myModal").style.display = "block";
    $.post(
        "http://localhost:3000/Customer/DetailProfile",
        {
            CMND: Card,
        },
        (data, status) => {
            var sex;
            if (data[0].Gioitinh) {
                sex = "Male";
            } else {
                sex = "Female";
            }
            html = `
      <span onclick="TurnOff()" class="close">&times;</span>
          <div class="grid__header">
            <h2>${data[0].TenKH}</h2>
            <span class="grid__header-note">Manage profile information</span>
          </div>
          <div class="grid__middle-left">
            <div class="grid__form">
                <div class="grid__form-label"><label>Username</label></div>
                <span class="grid__form-labellock" id="tenTK">${data[0].TenTK}</span>
            </div>
            <div class="grid__form">
                <div class="grid__form-label"><label>Password</label></div>
                <span id="Password" class="grid__form-labellock">*********</span>
            </div>
            <div class="grid__form">
                <div class="grid__form-label"><label>Full Name</label></div>
                <span class="grid__form-labellock">${data[0].TenKH}</span>
            </div>
            <div class="grid__form">
                <div class="grid__form-label"><label>Identity card</label></div>
                <span class="grid__form-labellock" id="CMND">${Card}</span>
            </div>
            <div class="grid__form">
              <div class="grid__form-label"><label>Rank</label></div>
              <span class="grid__form-labellock" style="color:red;">${data[0].Capbac}</span>
          </div>
            <div class="grid__form">
                <div class="grid__form-label"><label>Number Phone</label></div>
                <span class="grid__form-labellock">${data[0].MatKhau}</span>
            </div>
            <div class="grid__form">
                <div class="grid__form-label"><label>Address</label></div>
                <span class="grid__form-labellock">${data[0].Diachi}</span>
            </div>
            <div class="grid__form">
                <div class="grid__form-label"><label>Gender</label></div>
                <span class="grid__form-labellock">${sex}</span>
            </div>
            <div class="grid__form">
                <div class="grid__form-label"><label>Birthday</label></div>
                <span class="grid__form-labellock">${moment(data[0].NgSinh).format("L")}</span>
           </div>
        </div>`;
            $(".modal-content").html(html);
        }
    );
}
// Tắt modal
function TurnOff() {
    document.getElementById("myModal").style.display = "none";
}
$(document).ready(() => {
    var user = JSON.parse(localStorage.getItem("UserName"));
    $(".Name").html(`WelCome : ` + user.tenTK);
    LoadData();
});
