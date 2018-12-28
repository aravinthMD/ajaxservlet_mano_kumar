
$("#Add").click(function () {

    var countryid = $('countryid').val();
    var countryname = $('countryname').val();

    $.ajax({

        url: '/hello',
        type: 'POST',
        data: { "countryid": countryid, "countryname": countryname },
        success: function (data) {
            $('#countryid').val(data);
            alert(data);
        }
    });
});