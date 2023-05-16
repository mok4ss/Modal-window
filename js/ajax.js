$(document).ready(function () {
  $("#submitButton").click(function (event) {
    event.preventDefault(); // отменяем отправку формы по умолчанию

    // собираем данные из формы
    var formData = {
      clientFirstName: $("#clientFirstName").val(),
      clientLastName: $("#clientLastName").val(),
      clientPhone: $("#clientPhone").val(),
      clientEmail: $("#clientEmail").val(),
      jobCategory: $("#jobCategory").val(),
      jobSource: $("#jobSource").val(),
      jobDescription: $("#jobDescription").val(),
      addressInput: $("#addressInput").val(),
      cityInput: $("#cityInput").val(),
      stateInput: $("#stateInput").val(),
      zipcodeInput: $("#zipcodeInput").val(),
      areaInput: $("#areaInput").val(),
      startDateInput: $("#startDateInput").val(),
      startTimeInput: $("#startTimeInput").val(),
      endTimeInput: $("#endTimeInput").val(),
      testSelectInput: $("#testSelectInput").val(),
    };

    // отправляем данные на сервер с помощью AJAX запроса
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/data/createjob", // замените на URL вашего серверного скрипта
      data: formData,
      dataType: "json",
      encode: true,
    })
      .done(function (data) {
        // отображаем данные на странице
        $("#result").html(
          '<div class="alert alert-success">' + data.message + "</div>"
        );
      })
      .fail(function (data) {
        // отображаем ошибку на странице
        $("#result").html(
          '<div class="alert alert-danger">' +
            data.responseJSON.message +
            "</div>"
        );
      });
  });
});
