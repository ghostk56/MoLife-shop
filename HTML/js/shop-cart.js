let memberId = Cookies.get("memId");
function init() {
  $.ajax({
    url: "/productcarts/" + memberId,
    type: "GET",
    dataType: "json",
    success: function (data) {
      let list_html = "";
      $.each(data, function (i, item) {
        let img = "";
        $.each(item.product.productImages, function (i, unit) {
          if (unit.productImageType == 0 && unit.productImage != null) {
            img = unit.productImage;
          }
        });

        list_html += `
              <tr>
                  <td class="align-middle">
                    <div class="image-container">
                      <img src="/productimages/${img}" alt="product image" />
                    </div>
                  </td>
                  <th scope="row">
                    ${item.product.productName}
                  </th>
                  <td>$${item.product.productPrice}</td>
                  <td>
                    <div class="input-group" style="max-width: 110px">
                      <div class="input-group-prepend">
                        <button
                          class="btn btn-outline-secondary minus-btn"
                          type="button">
                          -
                        </button>
                      </div>
                      <input
                        type="text"
                        class="form-control quantity-input"
                        value="${item.productNumber}"
                        data-productCartId="${item.productCartId}"
                        data-productQty="${item.product.productQty}"
                        data-productId="${item.product.productId}"
                        readonly="true"
                      />
                      <div class="input-group-append">
                        <button
                          class="btn btn-outline-secondary plus-btn"
                          type="button">
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td id="rowTotal"></td>
                  <td><a class="text-danger" id="deleteProduct" data-productCartId="${item.productCartId}">刪除</a></td>
                </tr>`;
      });
      $("tbody").html(list_html);
      updateTotal();
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

function updateTotal() {
  let total = 0;
  $("tbody tr").each(function () {
    let price = parseFloat(
      $(this).find("td:nth-child(3)").text().replace("$", "")
    );
    let quantity = parseInt($(this).find(".quantity-input").val());
    let rowTotal = price * quantity;
    total += rowTotal;
    $(this)
      .find("#rowTotal")
      .text("$" + rowTotal);
  });
  $("#total").text("總金額: $" + total);
}

$(function () {
  init();

  // 商品數量
  $(".cart-container").on("click", ".minus-btn", function () {
    let input = $(this).parent().parent().find(".quantity-input");
    let value = parseInt(input.val());
    if (value <= 1) return;
    let productCartId = $(this)
      .parent()
      .parent()
      .find(".quantity-input")
      .data("productcartid");
    let productQty = $(this)
      .parent()
      .parent()
      .find(".quantity-input")
      .data("productqty");
    let productId = $(this)
      .parent()
      .parent()
      .find(".quantity-input")
      .data("productid");

    let data = {
      productCartId: productCartId,
      memberId: memberId,
      product: {
        productId: productId,
      },
      productNumber: value - 1,
    };

    $.ajax({
      type: "PUT",
      url: "/productcarts",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (data) {
        // 成功處理響應
        input.val(value - 1);
        updateTotal();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // 處理錯誤
        console.log("error");
        console.log(jqXHR);
      },
    });
  });

  $(".cart-container").on("click", ".plus-btn", function () {
    let input = $(this).parent().parent().find(".quantity-input");
    let value = parseInt(input.val());
    let productCartId = $(this)
      .parent()
      .parent()
      .find(".quantity-input")
      .data("productcartid");
    let productQty = $(this)
      .parent()
      .parent()
      .find(".quantity-input")
      .data("productqty");
    let productId = $(this)
      .parent()
      .parent()
      .find(".quantity-input")
      .data("productid");

    if (value >= productQty) {
      alert("已達最大可購買數量");
      return;
    }

    let data = {
      productCartId: productCartId,
      memberId: memberId,
      product: {
        productId: productId,
      },
      productNumber: value + 1,
    };

    $.ajax({
      type: "PUT",
      url: "/productcarts",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (data) {
        // 成功處理響應
        input.val(value + 1);
        updateTotal();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // 處理錯誤
        console.log("error");
        console.log(jqXHR);
      },
    });
  });

  $(".cart-container").on("click", "#deleteProduct", function () {
    let data = {
      productCartId: $(this).data("productcartid"),
    };
    let currentRow = $(this).closest("tr"); // 找到當前行元素
    $.ajax({
      type: "DELETE",
      url: "/productcarts",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (data) {
        // 成功處理響應
        if (data) {
          currentRow.remove(); // 刪除整個父元素
          alert("刪除成功");
          updateTotal();
        } else {
          alert("刪除失敗");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // 處理錯誤
        alert("刪除錯誤");
        console.log("error");
        console.log(jqXHR);
      },
    });
  });

  $("#checkout").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/productcarts/" + memberId,
      type: "GET",
      dataType: "json",
      success: function (data) {
        if (data.length === 0) {
          alert("購物車為空!~");
        } else {
          window.location.href = "/page/shop/shop-checkout.html";
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("error");
        console.log(xhr);
      },
    });
  });
});
