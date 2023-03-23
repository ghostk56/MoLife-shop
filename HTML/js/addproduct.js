let image1 = "";
let image2 = "";
let image3 = "";

function init() {
  $.ajax({
    url: "/categorys",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let list_html = "";
      $.each(data, function (i, item) {
        list_html += `<option value="${item.categoryId}">${item.categoryName}</option>`;
      });
      $("#categoryId").html(list_html);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
  $.ajax({
    url: "/animaltypes",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let list_html = "";
      $.each(data, function (i, item) {
        list_html += `<option value="${item.animalId}">${item.animalType}</option>`;
      });
      $("#animalTypeId").html(list_html);
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

$(function () {
  bsCustomFileInput.init();
  init();

  $("#previous").click(function () {
    window.location.href = "/page/shop/admin.productlist.html";
  });

  $("#productForm").submit(function (event) {
    event.preventDefault(); // 防止表單提交
    let productName = $.trim($("input[name=productName]").val());
    let productDetails = $.trim($("textarea[name=productDetails]").val());
    let productPrice = $("input[name=productPrice]").val();
    let productQty = $("input[name=productQty]").val();
    let productStatus = $("#productStatus").val();
    let animalTypeId = $("#animalTypeId").val();
    let categoryId = $("#categoryId").val();
    if (
      productName === "" ||
      productDetails === "" ||
      productPrice === "" ||
      productQty === "" ||
      image1 === "" ||
      image2 === "" ||
      image3 === ""
    ) {
      // 若有任一變數為空值，則顯示錯誤訊息
      alert("輸入資料不完整，請確認所有欄位都已填寫。");
      return;
    }

    let formData = {
      productName: productName,
      productDetails: productDetails,
      productPrice: productPrice,
      productQty: productQty,
      productStatus: productStatus,
      animalTypeId: animalTypeId,
      categoryId: categoryId,
      productImages: [
        {
          productImageType: 0,
          productImage: image1,
        },
        {
          productImageType: 1,
          productImage: image2,
        },
        {
          productImageType: 2,
          productImage: image3,
        },
      ],
    };

    $.ajax({
      type: "POST",
      url: "/products",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (data) {
        // 成功處理響應
        alert("新增成功");
        window.location.href = "/page/shop/admin.productlist.html";
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // 處理錯誤
        console.log("error");
        console.log(jqXHR);
      },
    });
  });

  // 定義操作函數
  function uploadImage($imageInput, onSuccess) {
    $imageInput.on("change", function () {
      let formData = new FormData();
      formData.append("image", $imageInput[0].files[0]);
      $.ajax({
        url: "/productimages",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          // 處理成功回應，data是返回的圖片名稱
          if (data != null) onSuccess(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // 處理錯誤
          alert("請確認圖片為jpg格式必且小於1MB");
        },
      });
    });
  }

  // 使用操作函數處理圖片
  uploadImage($("#image1"), function (data) {
    if (data != null) {
      image1 = data;
      $("#img1").attr("src", "/productimages/" + data);
    }
  });

  uploadImage($("#image2"), function (data) {
    if (data != null) {
      image2 = data;
      $("#img2").attr("src", "/productimages/" + data);
    }
  });

  uploadImage($("#image3"), function (data) {
    if (data != null) {
      image3 = data;
      $("#img3").attr("src", "/productimages/" + data);
    }
  });

  $("#img1").on("load", function () {
    $(this).css("visibility", "visible");
  });

  $("#img2").on("load", function () {
    $(this).css("visibility", "visible");
  });

  $("#img3").on("load", function () {
    $(this).css("visibility", "visible");
  });
});
