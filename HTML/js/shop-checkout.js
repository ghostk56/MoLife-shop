let memberId = Cookies.get("memId");
function init() {
  $.ajax({
    url: "/productcarts/" + memberId,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let list_html = "";
      let total = 0;
      $.each(data, function (i, item) {
        list_html += `
                          <li
                            class="list-group-item d-flex justify-content-between align-items-center">
                            ${item.product.productName}
                            <span>
                              ${item.productNumber}&nbsp;&nbsp;
                              $${
                                item.product.productPrice * item.productNumber
                              }</span>
                          </li>`;
        total += item.product.productPrice * item.productNumber;
      });
      $("#cart").html(list_html);
      $("#total").text("總金額: $" + total);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

$(function () {
  init();

  $("#order").on("click", function (e) {
    e.preventDefault();
    let orderReceiver = $.trim($("#receiver").val());
    let orderAddress = $.trim($("#address").val());
    let orderMobile = $.trim($("#mobile").val());
    let orderMessage = $.trim($("#message").val());
    if (
      orderReceiver === "" ||
      orderAddress === "" ||
      orderMobile === "" ||
      orderMessage === ""
    ) {
      // 若有任一變數為空值，則顯示錯誤訊息
      alert("輸入資料不完整，請確認所有欄位都已填寫。");
      return;
    }
    let formData = {
      memberId: memberId,
      orderStatus: 0,
      orderReceiver: orderReceiver,
      orderAddress: orderAddress,
      orderMobile: orderMobile,
      orderMessage: orderMessage,
    };

    $.ajax({
      type: "POST",
      url: "/productorders",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (data) {
        if (data) {
          alert("訂購成功!");
          window.location.href = "/page/shop/shop-orders.html";
        } else {
          alert("訂購失敗!");
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        alert("格式輸入錯誤!");
        console.log("error");
        console.log(xhr);
      },
    });
  });
});
