let memberId = Cookies.get("memId");
function init() {
  $.ajax({
    url: `/productorders/${memberId}/orders`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let list_html = "";
      $.each(data, function (i, item) {
        let statusColor = "";
        let statusName = "";
        let status = "disabled";
        switch (item.orderStatus) {
          case 0:
            statusColor = "text-danger";
            statusName = "待出貨";
            status = "";
            break;
          case 1:
            statusColor = "text-primary";
            statusName = "已出貨";
            break;
          case 2:
            statusColor = "text-success";
            statusName = "已完成";
            break;
          case 3:
            statusColor = "text-secondary";
            statusName = "已取消";
            break;
        }
        list_html += `
                <tr>
                  <th class="ps-4 py-5 align-middle"># ${item.orderId}</th>
                  <td class="py-5 align-middle">${new Date(
                    item.orderDate
                  ).toLocaleDateString()}</td>
                  <td class="py-5 align-middle">$${item.total}</td>
                  <td class="py-5 align-middle">
                    <span class="badge ${statusColor}">${statusName}</span>
                  </td>
                  <td class="py-5 align-middle">
                    <a
                      class="btn btn-outline-dark btn-sm"
                      href="/page/shop/shop-order.html?id=${item.orderId}"
                      >查看</a
                    >
                  </td>
                  <td class="py-5 align-middle">
                    <button
                      id="cancel"
                      class="btn btn-outline-dark btn-sm"
                      data-orderid="${item.orderId}"
                      data-orderstatus="${item.orderStatus}"
                      ${status}
                      >取消</button
                    >
                  </td>
                </tr>
              `;
      });
      $("tbody").html(list_html);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

$(function () {
  init();

  $("tbody").on("click", "#cancel", function (e) {
    e.preventDefault();
    let orderId = $(this).data("orderid");
    let orderStatus = $(this).data("orderstatus");

    if (orderStatus > 0) {
      alert("訂單已完成出貨程序 請聯繫客服人員!");
      return;
    }

    let result = confirm("確定要取消訂單 #" + orderId + " 嗎？");
    if (result === false) return;

    let data = {
      orderId: orderId,
      orderStatus: 3,
    };

    $.ajax({
      type: "PUT",
      url: "/productorders",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (data) {
        // 成功處理響應
        if (data) alert("成功取消訂單!");
        location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // 處理錯誤
        console.log("error");
        console.log(jqXHR);
      },
    });
  });
});
