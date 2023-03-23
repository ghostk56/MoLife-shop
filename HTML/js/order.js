function init() {
  $.ajax({
    url: "/productorders",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let list_html = "";
      $.each(data, function (i, item) {
        let statusColor = "";
        let statusName = "";
        switch (item.orderStatus) {
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

        let total = 0;
        $.each(item.items, function (i, unit) {
          total += unit.productPrice;
        });

        list_html += `
                  <tr>
                    <td class="align-middle">#${item.orderId}</td>
                    <td class="align-middle">${item.orderReceiver}</td>
                    <td class="align-middle">${item.orderMobile}</td>
                    <td class="align-middle">${item.orderAddress}</td>
                    <td class="align-middle">${new Date(
                      item.orderDate
                    ).toLocaleDateString()}</td>
                    <td class="align-middle">$${total}</td>
                    <td class="align-middle ${statusColor}">${statusName}</td>
                    <td class="align-middle">
                      <a href="admin.editproductorder.html?id=${
                        item.orderId
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

      // 定義自定義排序方法
      jQuery.fn.dataTable.ext.type.order["custom_sort-pre"] = function (value) {
        let order = ["待出貨", "已出貨", "已完成", "已取消"];
        let index = order.indexOf(value);
        return index === -1 ? Infinity : index;
      };
      // 初始化 DataTables
      $("#example1")
        .DataTable({
          responsive: true,
          lengthChange: true,
          autoWidth: false,
          order: [
            [6, "asc"],
            [4, "desc"],
          ], // 預設升序排序
          columnDefs: [
            {
              targets: 6, // 第7列
              type: "custom_sort", // 使用自定義排序
            },
          ],
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
});
