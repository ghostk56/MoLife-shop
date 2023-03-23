// 取得urlParams
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("categoryId");
const animalTypeId = urlParams.get("animalTypeId");
let memberId = Cookies.get("memId");

function initIsotopeFiltering() {
  var sortTypes = $(".type_sorting_btn");
  var sortNums = $(".num_sorting_btn");
  var sortTypesSelected = $(".sorting_type .item_sorting_btn is-checked span");
  var filterButton = $(".filter_button");

  if ($(".product-grid").length) {
    $(".product-grid").isotope({
      itemSelector: ".product-item",
      getSortData: {
        price: function (itemElement) {
          var priceEle = $(itemElement)
            .find(".product_price")
            .text()
            .replace("$", "");
          return parseFloat(priceEle);
        },
        name: ".product_name",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });

    // Short based on the value from the sorting_type dropdown
    sortTypes.each(function () {
      $(this).on("click", function () {
        $(".type_sorting_text").text($(this).text());
        var option = $(this).attr("data-isotope-option");
        option = JSON.parse(option);
        $(".product-grid").isotope(option);
      });
    });

    // Show only a selected number of items
    sortNums.each(function () {
      $(this).on("click", function () {
        var numSortingText = $(this).text();
        var numFilter = ":nth-child(-n+" + numSortingText + ")";
        $(".num_sorting_text").text($(this).text());
        $(".product-grid").isotope({ filter: numFilter });
      });
    });

    // Filter based on the price range slider
    filterButton.on("click", function () {
      $(".product-grid").isotope({
        filter: function () {
          var priceRange = $("#amount").val();
          var priceMin = parseFloat(priceRange.split("-")[0].replace("$", ""));
          var priceMax = parseFloat(priceRange.split("-")[1].replace("$", ""));
          var itemPrice = $(this)
            .find(".product_price")
            .clone()
            .children()
            .remove()
            .end()
            .text()
            .replace("$", "");

          return itemPrice > priceMin && itemPrice < priceMax;
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    });
  }
}

function init() {
  const angleDoubleRight =
    '<span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>';

  if (categoryId) {
    $(".sidebar_categories li").removeClass("active");
    $(".sidebar_categories li a span").remove();
    $(
      ".sidebar_categories li a[href='shop.html?categoryId=" + categoryId + "']"
    )
      .parent()
      .addClass("active")
      .children("a")
      .prepend(angleDoubleRight);
  }

  if (animalTypeId) {
    let petType = $(
      "#animal-type-list li[data-animalTypeId='" + animalTypeId + "'] span"
    ).text();
    $("#animal-type-span").text(petType);
  }

  $.ajax({
    url: "/products/spec",
    type: "GET",
    data: {
      productStatus: 1,
      animalTypeId: animalTypeId,
      categoryId: categoryId,
    },
    dataType: "json",
    success: function (data) {
      let list_html = "";
      $.each(data, function (i, item) {
        let img = "";
        $.each(item.productImages, function (i, unit) {
          if (unit.productImageType == 0 && unit.productImage != null) {
            img = unit.productImage;
          }
        });
        // 取得今天的日期
        const today = new Date();
        // 計算兩天前的日期
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        // 取得商品的創建日期
        const productCreateDate = new Date(item.productCreateDate);
        // 商品的創建日期在兩天之內
        let newicon = "";
        if (productCreateDate >= twoDaysAgo) {
          newicon = `<div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"><span>new</span></div>`;
        }

        list_html += `
                              <div class="product-item men">
                                <div class="product product_filter">
                                  <div class="product_image image-container">
                                  <a href="shop-product.html?id=${item.productId}"
                                  ><img src="/productimages/${img}" class="image-container"/></a>
                                  </div>
                                  <div class="favorite" data-productId="${item.productId}"></div>
                                  ${newicon}
                                  <div class="product_info">
                                    <h6 class="product_name">
                                      <a href="shop-product.html?id=${item.productId}"
                                        >${item.productName}</a
                                      >
                                    </h6>
                                    <div class="product_price">$${item.productPrice}</div>
                                  </div>
                                </div>
                                <div class="red_button add_to_cart_button">
                                  <a href="" data-productId="${item.productId}">加入購物車</a>
                                </div>
                              </div>`;
      });
      $(".product-grid").html(list_html);
      initIsotopeFiltering();
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

$(function () {
  init();

  $(".product-grid").on("click", ".add_to_cart_button a", function (event) {
    event.preventDefault();
    if (!memberId) {
      alert("請先登入在進行操作");
      return;
    }
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

  $(".product-grid").on("click", ".favorite", function () {
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
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log("error");
        console.log(xhr);
      },
    });
  });

  $("#animal-type-list li").click(function () {
    var animalTypeId = $(this).data("animaltypeid");
    categoryId == null ? (category = "") : (category = categoryId);
    window.location.href =
      "shop.html?categoryId=" + category + "&animalTypeId=" + animalTypeId;
  });
});
