let memberId = Cookies.get("memId");
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id");
function init() {
  if (!orderId) {
    window.location.href = "/page/shop/shop-orders.html";
  }
  $.ajax({
    url: `/productorders/${orderId}`,
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (memberId != data.memberId) {
        window.location.href = "/page/shop/shop-orders.html";
      }
      let statusColor = "";
      let statusName = "";
      switch (data.orderStatus) {
        case 0:
          statusColor = "text-danger";
          statusName = "待出貨";
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
      let info_html = `收貨人: ${data.orderReceiver}<br />
                             地址: ${data.orderAddress}<br />
                             聯繫方式: ${data.orderMobile}<br />`;
      $("#info").html(info_html);
      $("#orderStatus").text(statusName);
      $("#orderStatus").addClass(statusColor);
      $("#orderId").text("訂單#" + data.orderId);
      $("#orderDate").text(new Date(data.orderDate).toLocaleDateString());
      $("#orderMessage").text("訂單留言: " + data.orderMessage);

      let list_html = "";
      let total = 0;
      $.each(data.items, function (i, item) {
        list_html += `
                <tr>
                  <td class="align-middle">
                    <div class="image-container">
                      <img src="/productimages/${item.product.productImages[0].productImage}" alt="product image">
                    </div>
                  </td>
                  <th class="ps-4 py-5 align-middle">
                    ${item.product.productName}
                  </th>
                  <td class="py-5 align-middle">$${item.product.productPrice}</td>
                  <td class="py-5 align-middle">${item.productNumber}</td>
                  <td class="py-5 align-middle">$${item.productPrice}</td>
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
      window.location.href = "/page/shop/shop-orders.html";
    },
  });
}

$(function () {
  init();
});
