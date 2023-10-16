$(document).ready(() => {
    var user = JSON.parse(localStorage.getItem("UserName"));
    $(".Name").html(`WelCome : ` + user.tenTK);
    LoadData();
    RevenueMonth();
    ProductBill();
    chartline();
});
// Biểu đồ ..................
function chartline() {
    var Year = parseInt(moment().format("YYYY"));
    const labels = [Year, Year + 1, Year + 2, Year + 3, Year + 4, Year + 5];
    $.post(
        "http://localhost:3000/Sumarry/RevenueYear",
        {
            Nam: labels,
        },
        (data, status) => {
            const source = {
                labels: labels,
                datasets: [
                    {
                        label: "Year Renvenue",
                        backgroundColor: "white",
                        borderColor: "#ab8e66",
                        data: data,
                    },
                ],
            };
            const config = {
                type: "line",
                data: source,
            };
            const canvas = document.getElementById("canvas").getContext("2d");
            const chart = new Chart(canvas, config);
        }
    );
}
//Đăng Xuất ............................
function removeItem() {
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.localStorage.removeItem("UserName");
}

// Load Hóa Đơn .............
function LoadData() {
    $.post("http://localhost:3000/Sumarry/LoadData", (data, status) => {
        html = ``;
        for (i = 0; i < data.length; i++) {
            html += `
           <tr>
           <td>${data[i].MaHD}</td>
           <td>${data[i].CMND}</td>
           <td>${data[i].TongTien}</td>
           <td>${moment(data[i].NgayDat).format("L")}</td>
           <td>
           <i onclick="DetailBill(${data[i].MaHD})" class="fa-regular fa-eye" style="color: tomato; cursor:pointer;"></i>
           </td>
         </tr>
           `;
        }
        $("#Information_Bill").html(html);
    });
}
// Chi tiết hóa đơn ...........
function DetailBill(Id) {
    $.post("http://localhost:3000/Sumarry/ViewDetail", { Id: Id }, (data, status) => {
        console.log(data);
        let html = "";
        for (let i = 0; i < data.length; i++) {
            html += `
                <tr>
                   <td>${data[i].TenKH}</td>
                   <td>${data[i].TenSP}</td>
                   <td>${data[i].DiaChiGH}</td>
                   <td>${data[i].SL}</td>
                 </tr>
                `;
        }
        $("#Detail_Bill").html(html);
        document.getElementById("myModal").style.display = "block";
    });
}
function TurnOff() {
    document.getElementById("myModal").style.display = "none";
}
// Xem doanh thu theo tháng..............
function RevenueMonth() {
    $.post(
        "http://localhost:3000/Sumarry/Month",
        {
            Month: $("#Month").val(),
        },
        (data, status) => {
            if (data[0].TongTien == 0 || data[0].TongTien == null) {
                html = `Total : $0`;
            } else {
                html = `Total : $${data[0].TongTien}`;
            }
            $(".Total-Bill").html(html);
        }
    );
}
// Xem doanh thu theo sản phẩ...........
function ProductBill() {
    $.post("http://localhost:3000/Sumarry/BillProduct", (data, status) => {
        html = ``;
        for (i = 0; i < data.length; i++) {
            html += `
        <tr>
           <td>${data[i].TenSP}</td>
           <td>${data[i].XuatSu}</td>
           <td>${data[i].SL}</td>
           <td>$${data[i].TT}</td>
         </tr>
        `;
        }
        $("#Revenue-Product").html(html);
    });
}
