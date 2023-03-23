const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id");
function init() {
  $.ajax({
    url: `/productorders/${orderId}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let statusColor = "";
      let statusName = "";
      switch (data.orderStatus) {
        case 0:
          statusColor = "text-danger";
          statusName = "待出貨";
          $("#statusdiv").html(
            `<button
                      type="button"
                      class="btn btn-primary"
                      id="previous">返回</button>
                  <button type="button" class="btn btn-primary" id="statusbutton" data-orderid="${data.orderId}" data-orderstatus="${data.orderStatus}">出貨</button>`
          );
          break;
        case 1:
          statusColor = "text-primary";
          statusName = "已出貨";
          $("#statusdiv").html(
            `<button
                      type="button"
                      class="btn btn-primary"
                      id="previous">返回</button>
                  <button type="button" class="btn btn-primary" id="statusbutton" data-orderid="${data.orderId}" data-orderstatus="${data.orderStatus}">完成訂單</button>`
          );
          break;
        case 2:
          statusColor = "text-success";
          statusName = "已完成";
          $("#statusdiv").html(
            `<button
                      type="button"
                      class="btn btn-primary"
                      id="previous">返回</button>`
          );
          break;
        case 3:
          statusColor = "text-secondary";
          statusName = "已取消";
          $("#statusdiv").html(
            `<button
                      type="button"
                      class="btn btn-primary"
                      id="previous">返回</button>`
          );
          break;
      }

      let info_html = `收貨人: ${data.orderReceiver}<br />
                             地址: ${data.orderAddress}<br />
                             聯繫方式: ${data.orderMobile}<br />`;
      $("#info").html(info_html);
      $("#orderStatus").text(statusName);
      $("#orderStatus").addClass(statusColor);
      $("#orderId").text("#" + data.orderId);
      $("#orderDate").text(
        "訂購日期 " + new Date(data.orderDate).toLocaleDateString()
      );
      $("#orderMessage").text(data.orderMessage);

      let list_html = "";
      let total = 0;
      $.each(data.items, function (i, item) {
        list_html += `
                      <tr>
                        <td>${item.productNumber}</td>
                        <td>
                          ${item.product.productName}
                        </td>
                        <td>#${item.product.productId}</td>
                        <td>
                          ${item.product.productDetails}
                        </td>
                        <td>$${item.productPrice}</td>
                      </tr>
              `;
        total += item.productPrice;
      });
      $("#list").html(list_html);
      $("#total").text("$" + total);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

$(function () {
  init();
  bsCustomFileInput.init();

  $("#statusdiv").on("click", "#previous", function () {
    window.location.href = "/page/shop/admin.productorder.html";
  });

  $("#statusdiv").on("click", "#statusbutton", function () {
    let orderId = $(this).data("orderid");
    let orderStatus = $(this).data("orderstatus");

    let cartData = {
      orderId: orderId,
      orderStatus: orderStatus + 1,
    };
    // 商品添加到購物車
    $.ajax({
      url: "/productorders",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(cartData),
      success: function (data) {
        if (data) {
          if (!orderStatus) {
            alert("出貨成功!");
          } else {
            alert("已完成訂單!");
          }
        } else {
          alert("訂單錯誤!");
        }
        location.reload();
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("error");
        console.log(xhr);
      },
    });
  });
});
