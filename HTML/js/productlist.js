function init() {
  $.ajax({
    url: "/products",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let list_html = "";
      $.each(data, function (i, item) {
        let productStatus = "";
        let statusColor = "";
        if (item.productStatus == 0) {
          productStatus = "未上架";
          statusColor = "text-secondary";
        } else {
          productStatus = "上架中";
          statusColor = "text-success";
        }

        let img = "";
        $.each(item.productImages, function (i, unit) {
          if (unit.productImageType == 0 && unit.productImage != null) {
            img = unit.productImage;
          }
        });

        list_html += `
      <tr>
        <td class="align-middle">
          <div class="image-container">
            <img src="/productimages/${img}" alt="product image">
          </div>
        </td>
        <td class="align-middle">
              ${item.productName}
        </td>
        <td class="align-middle">
          ${item.productDetails}
        </td>
        <td class="align-middle">${item.productPrice}</td>
        <td class="align-middle">${item.productQty}</td>
        <td class="align-middle">${item.animalType.animalType}</td>
        <td class="align-middle">${item.category.categoryName}</td>
        <td class="align-middle">${new Date(
          item.productCreateDate
        ).toLocaleDateString()}</td>
        <td class="align-middle ${statusColor}">${productStatus}</td>
        <td class="align-middle">
                  <a href="admin.editproduct.html?id=${
                    item.productId
                  }" class="text-danger"
                    ><span
                      class="material-symbols-outlined align-middle">
                      select_check_box </span
                    ><span class="align-middle">編輯</span></a
                  >
                </td>
      </tr>`;
      });
      $("tbody").html(list_html);
      // 初始化 DataTables
      $("#example1")
        .DataTable({
          responsive: true,
          lengthChange: true,
          autoWidth: false,
          order: [7, "desc"], // 預設升序排序
          // buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        })
        .buttons()
        .container()
        .appendTo("#example1_wrapper .col-md-6:eq(0)");
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("error");
      console.log(xhr);
    },
  });
}

$(function () {
  init();

  $(".btn-primary").click(function () {
    window.location.href = "admin.addproduct.html";
  });
});
