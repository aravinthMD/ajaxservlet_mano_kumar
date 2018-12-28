var app = new function () {
    var result;
    var countries = [];
    // var countries = [{ "countryname": "India", "countryid": 1 },
    // { "countryname": "France", "countryid": 2 },
    // { "countryname": "Germany", "countryid": 3 },
    // { "countryname": "England", "countryid": 4 },
    // { "countryname": "Spain", "countryid": 5 },
    // { "countryname": "USA", "countryid": 6 }];

    var mode = "";
    var updateidx;

    this.FetchAll = function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                result = xhr.responseText;
                alert(result);
                console.log(result);
                // countries = JSON.parse(result);
            }
        }
        xhr.open('GET', '/hello', true);
        xhr.send(null);
        // console.log(countries);
    }

    this.getAllCountries = function () {
        console.log(countries);
        this.el = document.getElementById("countries");
        var table_body = '<table border="1" id="example"><thead><tr><th>countryid</th><th>countryname</th></tr></thead><tbody>';
        for (var i in countries) {
            table_body += '<tr>';
            table_body += '<td>';
            table_body += countries[i].countryid;
            table_body += '</td>';
            table_body += '<td>';
            table_body += countries[i].countryname;
            table_body += '</td>';
            table_body += '<td><button onclick="app.editCountry(' + countries[i].countryid + ')">Edit</button></td>';
            table_body += '<td><button onclick="app.deleteCountry(' + countries[i].countryid + ')">Delete</button></td>';
            table_body += '</tr>';
        }
        this.el.innerHTML = table_body;

    };

    this.editCountry = function (countryid) {

        mode = "edit";
        document.getElementById('btn').innerHTML = "Update";
        for (let index = 0; index < countries.length; index++) {

            if (countries[index].countryid == countryid) {

                updateidx = index;
                document.getElementById("countryid").value = countries[index].countryid;
                document.getElementById("countryname").value = countries[index].countryname;
                document.getElementById('countryid').readOnly = true;

            }

        }
    }





    this.deleteCountry = function (countryid) {


        console.log("delete called " + countryid);
        $.ajax({

            url: '/hello/?countryid=' + countryid,
            type: 'DELETE',
            
        });
    }




    this.saveorupdate = function (countryid) {


        // var countryid = document.getElementById("countryid").value;
        // var countryname = document.getElementById('countryname').value;


        if (mode == "") {

            alert("welcome to save");

            var countryid = $("#countryid").val();

            var countryname = $('#countryname').val();

            $.ajax({

                url: '/hello',
                type: 'POST',
                data: { "countryid": countryid, "countryname": countryname },

                success: function (data) {

                    $('#countryid').val(data);
                    alert(data);
                }

            });
            this.FetchAll();


        }
        else {

            alert("welcome to Update");

            var countryid = $("#countryid").val();

            var countryname = $('#countryname').val();

            $.ajax({

                url: '/hello',
                type: 'PUT',
                data: { "countryid": countryid, "countryname": countryname },

                success: function (data) {

                    $('#countryid').val(data);
                    alert(data);
                }

            });

           

            // countries.splice(updateidx, 1, updatecountry);
            document.getElementById('btn').innerHTML = "Add";

        }
        document.getElementById("countryid").value = "";
        document.getElementById("countryname").value = "";
        this.getAllCountries();
    }
    this.FetchAll();

};