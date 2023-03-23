let memberId = Cookies.get("memId");
function init() {
  $.ajax({
    url: "/productcollections/" + memberId,
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
                  <td>$900</td>
                  <td><a id="addCart" class="text-primary" data-productId="${item.product.productId}">加入購物車</a></td>
                  <td><a id="deleteProduct" class="text-danger" data-collectionId="${item.collectionId}">刪除</a></td>
                </tr>`;
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

  $("tbody").on("click", "#addCart", function () {
    let productId = $(this).data("productid");
    let cartData = {
      memberId: memberId,
      product: {
        productId: productId,
      },
      productNumber: 1,
    };
    // 商品添加到購物車
    $.ajax({
      url: "/productcarts",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(cartData),
      success: function (data) {
        if (data) {
          alert("商品成功加入購物車!");
        } else {
          alert("商品已存在購物車!");
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("error");
        console.log(xhr);
      },
    });
  });

  $("tbody").on("click", "#deleteProduct", function () {
    let data = {
      collectionId: $(this).data("collectionid"),
    };
    let currentRow = $(this).closest("tr"); // 找到當前行元素
    $.ajax({
      type: "DELETE",
      url: "/productcollections",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (data) {
        // 成功處理響應
        if (data) {
          currentRow.remove(); // 刪除整個父元素
          alert("刪除成功");
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
});
