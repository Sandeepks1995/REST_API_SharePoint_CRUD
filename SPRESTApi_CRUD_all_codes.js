                                        // Utilities REST API


//01 fetch data from SharePoint list top 5000 data append in a table using id
// JS Code
{/* <script type="text/javascript" src="jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="url.js?csf=1&web=1&e=8kQCHh"></script>

<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
<h2>Employee Data</h2>
<table id="Employee">
    <tr>
        <td>Name</td>
        <td id="selectCity">City</td>
        <td id="selectDepartment">Department</td>
    </tr>
</table> */}

$(document).ready(function () {
    Read();
});
function Read() {
    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getBytitle('list_name')/items?$top=5000",
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var items = data.d.results;
            console.log(items);
            for (var i = 0; i < items.length; i++) {
                $('#table_name').append("<tr> <td> " + items[i].Title + " </td><td> " + items[i].field_1 + " </td><td> " + items[i].field_2 + " </td><td> " + items[i].field_3 + " </td></tr> ");
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}

//02 Filter using if else with onchange event listener and data append in table 
// HTML Code

{/* <script type="text/javascript" src="jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="https://url/SiteAssets/FilterApp/filter_app.js?csf=1&web=1&e=kqS6Qd"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

   <div class="container-fluid" style="width:100%">
        <h2>Employee Data</h2>
        <table id="Employee" class="table table-bordered table-dark table-striped">
            <tr>
                <td class="form-control">Name</td>
                <td>
                    <select id="selectCity" class="form-control">
                        <option value="">selectCity</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Noida">Noida</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Pune">Pune</option>
                    </select>
                </td>
                <td>
                    <select id="selectDepartment" class="form-control">
                        <option value="">selectDepartment</option>
                        <option value="Operation">Operation</option>
                        <option value="QA">QA</option>
                        <option value="Development">Development</option>
                        <option value="Hr">Hr</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
  */}

// JS Code

$(document).ready(function () {
    Read();
    $("#selectCity, #selectDepartment").change(function () {
        Read();
    });
});

function Read() {
    var filterCity = $("#selectCity").val();
    var filterDepartment = $("#selectDepartment").val();

    var filterQueryString = "";

    if (filterCity && !filterDepartment) {
        filterQueryString = "?$filter=field_1 eq '" + filterCity + "' ";
    } else if (!filterCity && filterDepartment) {
        filterQueryString = "?$filter=field_2 eq '" + filterDepartment + "'";
    } else if (filterCity && filterDepartment) {
        filterQueryString = "?$filter=field_1 eq '" + filterCity + "' and field_2 eq '" + filterDepartment + "'";
    } else {
        filterQueryString = "";
    }

    $.ajax({
        url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getByTitle('Employees1')/items" + filterQueryString,
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            // Clear existing data in the table after selecting the filter
            $('#Employee tr:not(:first)').remove();

            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                $('#Employee').append("<tr> <td> " + items[i].Title + " </td><td> " + items[i].field_1 + " </td><td> " + items[i].field_2 + " </td></tr> ");
            }
        },
        error: function (data) {

            alert(JSON.stringify(data));
        }
    });
}

//03 Filter by making url endpoints with date filter including lookup column values and data append in table 
// HTML code
{/* <script type="text/javascript" src="url/SiteAssets/Advance%20filter/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="https://url/sites/site/SiteAssets/Advance%20filter/adv_filter.js"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

   <div class="container mt-3">
        <h2>Employee Data</h2>
        <table id="Employee" border="1px" class="table table-dark table-striped">
            <thead>
            <tr>
                <td id="name">Name</td>
                <td>
                    <select id="selectDepartment">
                        <option value="0">Department</option>
                        <option value="Operation">Operation</option>
                        <option value="QA">QA</option>
                        <option value="Development">Development</option>
                        <option value="Hr">Hr</option>
                    </select>
                </td>
                <td>
                    <select id="selectCity">
                        <option value="0">City</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Noida">Noida</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Pune">Pune</option>
                    </select>
                </td>
                <td id="State">State</td>
                <td id="country">Country</td>
                <td>
                    <select id="selectDOJ">
                        <option value="0">DOJ</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last_week">Last Week</option>
                        <option value="last month">Last Month</option>
                        <!-- <option value="Custom">Custom</option> -->
                    </select>
                </td>
            </tr>
            </thead>
        </table>
    </div> */}

// JS code
$(document).ready(function () {
    Read();
    $("#selectDepartment, #selectCity, #selectDOJ").change(Read);
});

function Read() {
    var filter = "$filter=ID gt 0"
        + ($("#selectDepartment").val() == "0" ? "" : " and Department eq '" + $("#selectDepartment").val() + "'")
        + ($("#selectCity").val() == "0" ? "" : " and City/Title eq '" + $("#selectCity").val() + "'")
        + constructDOJFilter();

    var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('Adv_filter')/items?$select=Title,Department,City/Title,City/State,City/country,DOJ&$expand=City&" + filter;

    $.ajax({
        url: url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            $('#Employee tr:not(:first)').remove();
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                $('#Employee').append("<tr><td>" + items[i].Title + "</td><td>" + items[i].Department + "</td><td>" + items[i].City.Title + "</td><td>" + items[i].City.State + "</td><td>" + items[i].City.country + "</td><td>" + items[i].DOJ + "</td></tr>");
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}

function constructDOJFilter() {
    var selectedDOJ = $("#selectDOJ").val();
    var currentDate = new Date().toISOString().split('T')[0];

    switch (selectedDOJ) {
        case "today":
            return " and DOJ eq '" + currentDate + "'";
        case "yesterday":
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return " and DOJ eq '" + yesterday.toISOString().split('T')[0] + "'";
        case "last_week":
            var lastWeekStart = new Date();
            lastWeekStart.setDate(lastWeekStart.getDate() - 7);
            return " and DOJ ge '" + lastWeekStart.toISOString().split('T')[0] + "'";
        case "last_month":
            var lastMonthStart = new Date();
            lastMonthStart.setMonth(lastMonthStart.getMonth() - 30);
            lastMonthStart.setDate(1);
            var lastMonthEnd = new Date(lastMonthStart);
            lastMonthEnd.setMonth(lastMonthEnd.getMonth() + 1);
            lastMonthEnd.setDate(0);

            return " and DOJ ge '" + lastMonthStart.toISOString().split('T')[0] + "' and DOJ le '" + lastMonthEnd.toISOString().split('T')[0] + "'";
    }
    return "";
}
// 04 date  filter by given date range
// HTML Code
{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://url/:u:/r/sites/Success_Point/SiteAssets/Date%20Adv_filter/adv_filter.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<div class="container mt-3">
	<p class="text-bg-success">Employee Detail</p>
	<div class="input_type">
		Start Date : <input type="date" id="start-date">
        End Date : <input type="date" id="end-date">
		<input type="button" id="submit-btn" value="Submit" onclick="Read()">
    </div>
		<table id="table_p1" class="table table-success table-striped table-hover table-bordered">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Position</th>
					<th>Department</th>
					<th>Date of Joining</th>
					<th>Date of Exit</th>
					<th>City</th>
					<th>State</th>
					<th>Country</th>
				</tr>
			</thead>
		</table>
	</div> */}

// JS Code

$(document).ready(function () {
    Read();
});
function Read() {
    var fromdate = convertDate($("#start-date").val());
    var toDate = convertDate($("#end-date").val());
    var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getbytitle('Date_Adv_list')/items?$select=Title,Name,Position,Department,DOJ,DOE,City,State,Country&$filter= ID gt 0" + (fromdate && toDate ? " and DOJ ge'" + fromdate + "' and DOE lt '" + toDate + "'" : "");

    $.ajax({
        url: url,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            $('#table_p1 tr:not(:first)').remove();
            var items = data.d.results;
            for (var i = 0; i < items.length; i++) {
                $('#table_p1').append("<tr><td>" + items[i].Title + "</td><td>" + items[i].Name + "</td><td>" + items[i].Position + "</td><td>" + items[i].Department + "</td><td>" + formatDate(items[i].DOJ) + "</td><td>" + formatDate(items[i].DOE) + "</td><td>" + items[i].City + "</td><td>" + items[i].State + "</td><td>" + items[i].Country + "</td></tr>");
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}
function formatDate(dateString) {
    if (!dateString) return "";
    var date = new Date(dateString);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}
function convertDate(dateString) {
    if (!dateString) return "";
    var date = new Date(dateString);
    return date.toISOString();
}

// 05 Pagination using datatable.net

// HTML Code

{/* <script type="text/javascript" src="https://cdn.datatables.net/2.0.3/js/dataTables.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/2.0.3/css/dataTables.dataTables.min.css">
<script type="text/javascript" src="https://url/:u:/r/sites/Success_Point/SiteAssets/Pagination/emp.js"></script>

<h2 style="text-center">Employee Data</h2>
<table id="Employee" class="display" cellspacing="0" width="100%">
   <thead>
      <tr>
        <th>Name</th>
        <th>City</th>
        <th>Department</th>
        <th>Age</th>
     </tr>
    </thead>
</table> */}

// JavaScript code

$(document).ready(function () {
    getListData();
});
var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Employees_data')/items?$top=5000";
var response = response || [];
function getListData() {
    $.ajax({
        url: url,
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            response = response.concat(data.d.results);
            if (data.d.__next) {
                url = data.d.__next;
                getListData();
            }
            $('#Employee').DataTable({
                "aaData": response,
                sorting: true,
                "bDestroy": true,
                "aoColumns": [
                    { "mData": "Title" },
                    { "mData": "field_1" },
                    { "mData": "field_2" },
                    { "mData": "field_3" }
                ]
            });
        },
        error: function (error) {
            // error handler code goes here
        }
    });
};

// 06 CRUD operations -- create item in list, edit/update using populate values in form , delete item

// HTML Code
{/* <script type="text/javascript" src="jquery-3.7.1.js"></script>
<script type="text/javascript" src="https://domain/:u:/r/sites/Success_Point/SiteAssets/My%20Crud%20APP/crud.js"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<form>
    <div class="container mt-3">
        <h2 class="text-primary">Employee Form</h2>
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" class="form-control">
        </div>
        <div class="form-group">
            <label for="department">Department:</label>
            <input type="text" id="department" class="form-control">
        </div>
        <div class="form-group">
            <label for="position">Position:</label>
            <input type="text" id="position" class="form-control">
        </div>
        <div class="form-group">
            <label for="email">Email ID:</label>
            <input type="email" id="email" class="form-control">
        </div>
        <div class="form-group">
            <label for="city">City:</label>
            <input type="text" id="city" class="form-control">
        </div>
        <div class="form-group">
            <label for="mobile">Mobile Number:</label>
            <input type="text" id="mobile" class="form-control">
        </div>
        <div class="form-group">
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" class="form-control">
        </div>
        <input type="button" class="btn btn-primary" id="submit-btn" value="Submit">
        <!-- Add Update button -->
        <!-- <button id="update-btn" class="btn btn-primary">Update</button> -->
        <input type="hidden" id="hidden-item-id" />
    </div>
</form>

<div class="container mt-3">
    <h2 class="text-bg-success">Employee Table</h2>
    <table id="employee-table" class="table table-success table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Email ID</th>
                <th>City</th>
                <th>Mobile Number</th>
                <th>DOB</th>
                <th>DeleteItem</th>
                <th>UpdateItem</th>
            </tr>
        </thead>
        <tbody id="employee-table-body">
            <!-- Employee details will be inserted here dynamically -->
        </tbody>
    </table>
</div> */}

// JS Code

$(document).ready(function () {
    $("#employee-table-body").on("click", ".delete-btn", function () {
        var itemId = $(this).data("id");
        if (confirm("Are you sure you want to delete this employee?")) {
            deleteListItem(itemId);
        } else {
            return;
        }
    });

    $("#employee-table-body").on("click", ".edit-btn", function () {
        var itemId = $(this).data("id");
        $("#hidden-item-id").val(itemId);
        getEmployeeData(itemId);
    });

    $("#submit-btn").click(function () {
        var userData = {
            "Name": $("#name").val(),
            "Department": $("#department").val(),
            "Position": $("#position").val(),
            "Email": $("#email").val(),
            "City": $("#city").val(),
            "Mobile": $("#mobile").val(),
            "DOB": $("#dob").val()
        };

        var itemId = $("#hidden-item-id").val();
        if (itemId) {
            updateListItem(itemId, userData);
        } else {
            createListItem(userData);
        }
    });

    function updateListItem(itemId, userData) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('MyCrudList')/items(" + itemId + ")",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": getFormDigest(),
                "X-HTTP-Method": "MERGE",
                "IF-MATCH": "*",
            },
            data: JSON.stringify({
                __metadata: { type: "SP.Data.MyCrudListListItem" },
                Title: userData.Name,
                Department: userData.Department,
                Position: userData.Position,
                Email: userData.Email,
                City: userData.City,
                Mobile: userData.Mobile,
                DOB: userData.DOB
            }),
            success: function (data, status, xhr) {
                alert("Employee updated successfully.");
                Read();
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to update employee: " + error);
            }
        });
    }

    function getEmployeeData(itemId) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('MyCrudList')/items(" + itemId + ")",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                var name = data.d.Title;
                var department = data.d.Department;
                var position = data.d.Position;
                var email = data.d.Email;
                var city = data.d.City;
                var mobile = data.d.Mobile;
                var dob = data.d.DOB;

                $("#name").val(name);
                $("#department").val(department);
                $("#position").val(position);
                $("#email").val(email);
                $("#city").val(city);
                $("#mobile").val(mobile);
                $("#dob").val(dob);
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to retrieve employee data: " + error);
            }
        });
    }
    function createListItem(userData) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('MyCrudList')/items",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": getFormDigest()
            },
            data: JSON.stringify({
                __metadata: { type: "SP.Data.MyCrudListListItem" },
                Title: userData.Name,
                Department: userData.Department,
                Position: userData.Position,
                Email: userData.Email,
                City: userData.City,
                Mobile: userData.Mobile,
                DOB: userData.DOB
            }),
            success: function (data, status, xhr) {
                alert("Employee added successfully.");
                Read();
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to add employee: " + error);
            }
        });
    }
    function deleteListItem(itemId) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('MyCrudList')/items(" + itemId + ")",
            type: "DELETE",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": getFormDigest(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function (data, status, xhr) {
                alert("Employee deleted successfully.");
                Read();
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to delete employee: " + error);
            }
        });
    }

    function Read() {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('MyCrudList')/items",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                $("#employee-table-body").empty();
                $.each(data.d.results, function (index, item) {
                    var rowData = JSON.stringify(item);
                    $('#employee-table-body').append("<tr><td>" + item.Title + "</td><td>" + item.Department + "</td><td>" + item.Position + "</td><td>" + item.Email + "</td><td>" + item.City + "</td><td>" + item.Mobile + "</td><td>" + item.DOB + "</td><td><button class='delete-btn' data-id='" + item.Id + "'>Delete</button></td><td><button class='edit-btn' data-id='" + item.Id + "'>Edit</button></td></tr>");
                });
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to retrieve employee data: " + error);
            }
        });
    }
    Read();
    function getFormDigest() {
        var fd;
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                fd = data.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to get form digest: " + error);
            }
        });
        return fd;
    }
});

// 07 Project RestAPI
// HTML Code
{/* <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.SPServices/0.7.1a/jquery.SPServices-0.7.1a.min.js"></script>
<script type="text/javascript" src="https://domain/:u:/r/sites/Success_Point/SiteAssets/Project_REST/rest.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">

<style>
	h2,h1{
		text-align: center;
	}
</style>
<div class="container mt-3">
    <h1 class="text-bg-success">Employee Information Form</h1>
    <form id="employee-form">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" class="form-control" required><br>
        </div>
        <div>
            <label for="department">Department:</label>
            <input type="text" id="department" class="form-control" required><br>
        </div>
        <div class="mb-1 mt-1">
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" class="form-control" required><br>
        </div>
        <div class="mb-1 mt-1">
            <label for="age">Age:</label>
            <input type="text" id="age" class="form-control" readonly><br>
        </div>
        <div class="mb-1 mt-1">
            <label for="doj">Date of Joining:</label>
            <input type="date" id="doj" class="form-control" required><br>
        </div>
        <div id="peoplePickerDiv"></div>
        <div>
            <label for="skills">Skills:</label><br>
            <label for="javascript">JavaScript</label>
            <input type="checkbox" name="skill" class="skill-checkbox form-check-input" id="javascript" value="JavaScript">
            <label for="react">React</label>
            <input type="checkbox" name="skill" class="skill-checkbox form-check-input" id="react" value="React">
            <label for="SharePoint">SharePoint</label>
            <input type="checkbox" name="skill" class="skill-checkbox form-check-input" id="SharePoint" value="SharePoint">
            <label for="PowerApps">PowerApps</label>
            <input type="checkbox" name="skill" class="skill-checkbox form-check-input" id="PowerApps" value="PowerApps">
            <label for="PowerAutomate">PowerAutomate</label>
            <input type="checkbox" name="skill" class="skill-checkbox form-check-input" id="PowerAutomate" value="PowerAutomate">
            <label for="PowerBI">PowerBI</label>
            <input type="checkbox" name="skill" class="skill-checkbox form-check-input" id="PowerBI" value="PowerBI">
        </div><br>
        <label for="city">City:</label><br>
        <select id="city" class="form-control" name="city"></select><br><br>
        <!-- <label for="state">State:</label><br>
        <input type="text" class="form-control" id="state" name="state" readonly><br><br>
        <label for="country">Country:</label><br>
        <input type="text" class="form-control" id="country" name="country" readonly><br><br> -->
        <label for="attachment">Attachment:</label>
        <input type="file" id="attachmentFile" name="attachment" accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"><br><br>
        <input type="button" id="submit-btn" class="btn btn-primary" value="Submit">
        <input type="hidden" id="hidden-item-id" />
    </form>
</div>

<div class="container mt-3">
    <h2 class="text-bg-success">Employee Information</h2>
</div>
<div class="container mt-3">
    <table  class="table table-success table-striped table-hover table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Date of Joining</th>
                <th>Skills</th>
				<th>Attachment</th>
                <th>City</th>
                <th>UpdateItem</th>
                <th>DeleteItem</th>
                <!-- <th>State</th>
                <th>Country</th> -->
            </tr>
        </thead>
        <tbody id="employee-table-body"></tbody>
    </table>
</div> */}

// JS Code

$(document).ready(function () {
    showCity();
    Read();
    $("#employee-table-body").on("click", ".delete-btn", function () {
        var itemId = $(this).data("id");
        if (confirm("Are you sure you want to delete this employee?")) {
            deleteListItem(itemId);
        } else {
            return;
        }
    });

    $("#dob").change(function () {
        var dob = $(this).val();
        var age = calculateAge(dob);
        $("#age").val(parseInt(age));
    });

    $("#employee-table-body").on("click", ".edit-btn", function () {
        var itemId = $(this).data("id");
        $("#hidden-item-id").val(itemId);
        getEmployeeData(itemId);
    });

    $("#submit-btn").click(function () {
        var userData = {
            Name: $("#name").val(),
            Department: $("#department").val(),
            DOB: $("#dob").val(),
            Age: $("#age").val(),
            DOJ: $("#doj").val(),
            City: $("#city").val()
        };
        var itemId = $("#hidden-item-id").val();
        if (itemId) {
            updateListItem(itemId, userData);
            console.log("data exist")
        } else {
            createListItem(userData);
            console.log("data not exist")
        }
    });

    function calculateAge(dob) {
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();
        return Math.floor(age);
    }

    function createListItem(userData) {
        var selectedSkills = [];
        $(".skill-checkbox:checked").each(function () {
            selectedSkills.push($(this).val());
        });
        var specialTags = { "__metadata": { "type": "Collection(Edm.String)" }, "results": [selectedSkills.join(',')] };
        var userData = {
            Name: $("#name").val(),
            Department: $("#department").val(),
            DOB: $("#dob").val(),
            Age: $("#age").val(),
            DOJ: $("#doj").val(),
            Skills: specialTags,
            City: $("#city").val()
        }
        console.log("create start")
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Project_Rest')/items",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": getFormDigest()
            },
            data: JSON.stringify({
                __metadata: { type: "SP.Data.Project_x005f_RestListItem" },
                Title: userData.Name,
                Department: userData.Department,
                DOB: userData.DOB,
                Age: userData.Age,
                DOJ: userData.DOJ,
                Skills: specialTags,
                CityId: userData.City
            }),
            success: function (data, status, xhr) {
                alert("Employee added successfully.");
                Read(); // Refresh the employee table after adding a new employee
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to add employee: " + error);

            }
        });
    }

    // Delete function
    function deleteListItem(itemId) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Project_Rest')/items(" + itemId + ")",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": getFormDigest(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            },
            success: function (data, status, xhr) {
                alert("Employee deleted successfully.");
                Read();
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to delete employee: " + error);
            }
        });
    }

    // Update function
    function updateListItem(itemId, userData) {
        var selectedSkills = [];
        $(".skill-checkbox:checked").each(function () {
            selectedSkills.push($(this).val());
        });
        var specialTags = { "__metadata": { "type": "Collection(Edm.String)" }, "results": [selectedSkills.join(',')] };
        var userData = {
            Name: $("#name").val(),
            Department: $("#department").val(),
            DOB: $("#dob").val(),
            Age: $("#age").val(),
            DOJ: $("#doj").val(),
            Skills: specialTags,
            City: $("#city").val()
        }
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Project_Rest')/items(" + itemId + ")",
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": getFormDigest(),
                "X-HTTP-Method": "MERGE",
                "IF-MATCH": "*"
            },
            data: JSON.stringify({
                __metadata: { type: "SP.Data.Project_x005f_RestListItem" },
                Title: userData.Name,
                Department: userData.Department,
                DOB: userData.DOB,
                Age: userData.Age,
                DOJ: userData.DOJ,
                Skills: userData.Skills,
                CityId: userData.City
            }),
            success: function (data, status, xhr) {
                alert("Employee updated successfully.");
                Read();
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to update employee: " + error);
            }
        });
    }

    // function to get data from list based on ID
    function getEmployeeData(itemId) {
        if (!itemId) {
            console.log("Item ID is undefined.");
            return;
        }

        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Project_Rest')/items(" + itemId + ")",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                var name = data.d.Title;
                var department = data.d.Department;
                var dob = data.d.DOB;
                var doj = data.d.DOJ;
                var skills = data.d.Skills.results;
                var cityId = data.d.CityId;

                $("#name").val(name);
                $("#department").val(department);
                $("#dob").val(dob);
                $("#doj").val(doj);

                $(".skill-checkbox").prop("checked", false);
                skills.forEach(function (skill) {
                    $(".skill-checkbox[value='" + skill + "']").prop("checked", true);
                });

                $("#city").val(cityId);
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to retrieve employee data: " + error);
            }
        });
    }

    function getSelectedSkills() {
        var selectedSkills = [];
        $(".skill-checkbox:checked").each(function () {
            selectedSkills.push($(this).val());
        });
        return { "__metadata": { "type": "Collection(Edm.String)" }, "results": selectedSkills };
    }

    function Read() {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('Project_Rest')/items?$select=Id,Title,Department,DOB,Age,DOJ,Skills,Attachments,City/Title&$expand=City",
            type: "GET",
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                $("#employee-table-body").empty();
                $.each(data.d.results, function (index, item) {
                    var skills = item.Skills.results.join(', ');
                    $('#employee-table-body').append("<tr><td>" + item.Title + "</td><td>" + item.Department + "</td><td>" + item.DOB + "</td><td>" + item.Age + "</td><td>" + item.DOJ + "</td><td>" + skills + "</td><td>" + item.Attachments + "</td><td>" + item.City.Title + "</td><td><button class='edit-btn' data-id='" + item.Id + "'>Edit</button></td><td><button class='delete-btn' data-id='" + item.Id + "'>Delete</button></td></tr>");
                });
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to retrieve employee data: " + error);
            }
        });
    }

    function showCity() {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('CityLookup')/items?$select=Title",
            method: "GET",
            headers: {
                "Accept": "application/json;odata=verbose",
            },
            success: function (data) {
                var txt = "<option>Select City</option>";
                var items = data.d.results;
                for (var i = 0; i < items.length; i++) {
                    txt += "<option value=" + items[i].Title + ">" + items[i].Title + "</option>"
                }
                $("#city").html(txt);
            },
            error: function (data) {
                alert("Error occurred while fetching city data");
            }
        })
    }
    // function to get formDigest value
    function getFormDigest() {
        var fd;
        $.ajax({
            url: _spPageContextInfo.siteAbsoluteUrl + "/_api/contextinfo",
            method: "POST",
            async: false,
            headers: { "Accept": "application/json;odata=verbose" },
            success: function (data) {
                fd = data.d.GetContextWebInformation.FormDigestValue;
            },
            error: function (xhr, status, error) {
                console.log(JSON.stringify(xhr));
                alert("Failed to get form digest: " + error);
            }
        });
        return fd;
    }
});

// 08 JSOM Prototype
// HTML Code
{/* <script src="/_layouts/15/MicrosoftAjax.js" type="text/javascript"></script>
<script src="/_layouts/15/sp.runtime.js" type="text/javascript"></script>
<script src="/_layouts/15/sp.js" type="text/javascript"></script>
<h1>JSOM Sample APP</h1>
    <h2>Web Properties</h2>
    <input type="button" title="Show" onclick="getWebProperties();" name="Show" value="Show Web Properties" />

    <h2>Fetch List Item</h2>
    <input type="button" title="Show" onclick="retrieveListItems();" name="Show" value="Show" />
    <ul id="tasksUL"></ul>

    <h2>New List Item</h2>
    Title: <input type="text" id="_Title" name="_Title" />
    City: <input type="text" id="_City" name="_City" />
    Department: <input type="text" id="_Dept" name="_Dept" />
    <input type="button" id="_Save" title="Show" name="Save" value="Save" onclick="createListItem();" />

    <h2>Update List Item</h2>
    ID: <input type="text" id="_TextID" name="_TextID" />
    Title: <input type="text" id="_TextTitle" name="_TextTitle" />
    <input type="button" id="_Update" title="_Update" name="_Update" value="Update" onclick="updateListItem()" />

    <h2>Delete List Item</h2>
    ID: <input type="text" id="_TextDeleteID" name="_Title" />
    <input type="button" id="_Delete" title="_Delete" name="_Delete" value="Delete" onclick="deleteListItem();" />

<script src="https://domain/sites/Success_Point/_layouts/15/sp.js" type="text/javascript"></script> 
<script src="https://domain/sites/Success_Point/SiteAssets/JSOM%20Prototype/JSOMAPP.js" type="text/javascript"></script>   */}

// JS Code

var BaseUrl = "https://domain/sites/Success_Point/";
var listName = "JSOM";
function getWebProperties() {
    try {
        var ctx = new SP.ClientContext.get_current();
        this.web = ctx.get_web();
        ctx.load(this.web);
        ctx.executeQueryAsync(Function.createDelegate(this, this.onSuccess),
            Function.createDelegate(this, this.onFail));
    } catch (e) {
        alert(e.message);
    }
}
function onSuccess(sender, args) {
    alert('web title:' + this.web.get_title() + '\n ID:' + this.web.get_id() +
        '\n Created Date:' + this.web.get_created());
}
function onFail(sender, args) {
    alert('failed to get list. Error:' + args.get_message());
}

function retrieveListItems() {
    try {
        var clientContext = new SP.ClientContext(BaseUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listName);

        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
            '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
            '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' +
            '<RowLimit>10</RowLimit></View>'
        );
        this.collListItem = oList.getItems(camlQuery);

        clientContext.load(collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, this.onQuerySucceeded),
            Function.createDelegate(this, this.onQueryFailed)
        );
    } catch (e) {
        alert(e.message);
    }
}

function onQuerySucceeded(sender, args) {
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo += '\nID: ' + oListItem.get_id() +
            '\nTitle: ' + oListItem.get_item('Title') +
            '\nCity: ' + oListItem.get_item('City') +
            '\nDepartment: ' + oListItem.get_item('Department');
    }

    alert(listItemInfo.toString());
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}
// Create item
function createListItem() {
    try {
        var clientContext = new SP.ClientContext(BaseUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listName);

        var itemCreateInfo = new SP.ListItemCreationInformation();
        this.oListItem = oList.addItem(itemCreateInfo);
        oListItem.set_item('Title', document.getElementById('_Title').value) +
            oListItem.set_item('City', document.getElementById('_City').value) +
            oListItem.set_item('Department', document.getElementById('_Dept').value);

        oListItem.update();

        clientContext.load(oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, this.onQuerySucceeded1),
            Function.createDelegate(this, this.onQueryFailed1)
        );
    } catch (e) {
        alert(e.message);
    }
}

function onQuerySucceeded1() {
    alert('Item created: ' + oListItem.get_id());
}

function onQueryFailed1(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}

function updateListItem() {
    var clientContext = new SP.ClientContext(BaseUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(listName);

    this.oListItem = oList.getItemById(document.getElementById('_TextID').value);
    oListItem.set_item('Title', document.getElementById('_TextTitle').value);
    oListItem.update();

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded2),
        Function.createDelegate(this, this.onQueryFailed1)
    );
}

function onQuerySucceeded2() {
    alert('Item updated!');
}

function deleteListItem() {
    //this.itemId =2;
    var clientContext = new SP.ClientContext(BaseUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    this.oListItem = oList.getItemById(document.getElementById('_TextDeleteID').value);
    oListItem.deleteObject();

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded3),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded3() {
    alert('Item deleted');
}

//=====================================================
