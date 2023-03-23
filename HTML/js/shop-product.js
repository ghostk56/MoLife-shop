// 取得商品ID
let urlParams = new URLSearchParams(window.location.search);
let productId = urlParams.get("id");
let image1 = null;
let image2 = null;
let image3 = null;
let memberId = Cookies.get("memId");

function init() {
  $.ajax({
    url: "/products/" + productId,
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("#productName").text(data.productName);
      $("#productDetails").text(data.productDetails);
      $(".product_price").text("$" + data.productPrice);
      $(".product_favorite").attr("data-productid", data.productId);
      $("#quantity_value").attr("data-productqty", data.productQty);

      $.each(data.productImages, function (i, item) {
        switch (item.productImageType) {
          case 0:
            image1 = item.productImage;
            break;
          case 1:
            image2 = item.productImage;
            break;
          case 2:
            image3 = item.productImage;
            break;
        }
      });

      $(".single_product_image_background").css(
        "background-image",
        "url(/productimages/" + (image1 === null ? "" : image1) + ")"
      );

      $("#img1").attr({
        src: "/productimages/" + (image1 === null ? "" : image1),
        "data-image": "/productimages/" + (image1 === null ? "" : image1),
      });

      $("#img2").attr({
        src: "/productimages/" + (image2 === null ? "" : image2),
        "data-image": "/productimages/" + (image2 === null ? "" : image2),
      });

      $("#img3").attr({
        src: "/productimages/" + (image3 === null ? "" : image3),
        "data-image": "/productimages/" + (image3 === null ? "" : image3),
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

$(function () {
  init();

  $("#addCart").on("click", function (event) {
    event.preventDefault();
    if (!memberId) {
      alert("請先登入在進行操作");
      return;
    }
    let cartData = {
      memberId: memberId,
      product: {
        productId: productId,
      },
      productNumber: $("#quantity_value").text(),
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

  let favorite = 0;
  $(".product_favorite").on("click", function () {
    if (!memberId) {
      alert("請先登入在進行操作");
      return;
    }
    let productId = $(this).data("productid");
    let favoriteData = {
      memberId: memberId,
      product: {
        productId: productId,
      },
    };
    if (favorite == 1) return;
    // 商品加入收藏
    $.ajax({
      url: "/productcollections",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(favoriteData),
      success: function (data) {
        if (data) {
          alert("商品成功加入收藏!");
        } else {
          alert("商品已移除收藏!");
          if (favorite == 0) {
            favorite++;
            $(".product_favorite").click();
          }
        }
        favorite += 2;
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("error");
        console.log(xhr);
      },
    });
  });

  // 監控數量值變化事件
  $("#plus").on("click", function () {
    // 轉換數字
    let num = parseInt($("#quantity_value").text()); // 取得原始值
    let productQty = parseInt($("#quantity_value").attr("data-productqty"));
    console.log(num);
    console.log(productQty);
    // 檢查qty
    if (num > productQty) {
      // 如果大於最大購買數量，禁止繼續操作
      alert("已達最大購買數量！");
      $("#quantity_value").text(productQty);
      return false;
    }
  });
});
