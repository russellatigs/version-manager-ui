$(document).ready(function () {

    //  Gets jobs and populates data
    $.ajax({
        type: 'GET',
        url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs",
        timeout: 3000,
        crossDomain: true,
        dataType: 'json',
        data: {},
        headers: {
            "VMUser": "hmoreno"
        },
        //Renders data to view
        success: function (data) {
            console.log(data.length);
            data.forEach(function (value, i) {
                var jobName = value.name;
                var createdBy = value.createdby;
                var latitude = value.latitude;
                var longitude = value.longitude;

                $("#jobs tbody").append("<tr><td><input type='checkbox' ></td><td>" + jobName + "</td><td>" + createdBy + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td> <button class='btn btn-warning btn-small' type='submit' id='edit'> <span class='glyphicon glyphicon-edit' aria-hidden='true'></span> Edit </button> <button class='btn btn-primary btn-small' type='submit' id='export' method='GET'> <span class='glyphicon glyphicon-send' aria-hidden='true'></span> Export </button> <button class='btn btn-danger btn-small' type='submit' id='delete' method='DELETE'> <span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete </button> </td></tr> ");
            });

        },

        //Responses
    }).done(function (data) {
        console.log(data);
        console.log("result recieved");
    }).fail(function (err) {
            console.log(err);
            console.log("error")
        })
        .always(function () {
            console.log("complete");
        });

    //Creates a job
    $("#add").click(function () {
        $.ajax({
            type: 'POST',
            url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs",
            timeout: 3000,
            rossDomain: true,
            dataType: 'json',
            headers: {
                "VMUser": "hmoreno"
            }
        }).done(function (data) {
            console.log(data);
            console.log("result recieved");
        }).fail(function (err) {
                console.log(err);
                console.log("error")
            })
            .always(function () {
                console.log("complete");
            });

    });

    //Deletes a Job
    $("#delete").click(function () {
        console.log('Im working');
        $.ajax({
            type: 'DELETE',
            url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/{jobid}",
            timeout: 3000,
            crossDomain: true,
            dataType: 'json',
            headers: {
                "VMUser": "hmoreno"
            }
        }).done(function (data) {
            console.log(data);
            console.log("result recieved");
        }).fail(function (err) {
                console.log(err);
                console.log("error")
            })
            .always(function () {
                console.log("complete");
            });

    });

    //Export a Job
    $("#export").submit(function () {
        $.ajax({
            type: 'GET',
            url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/{jobid}/file",
            timeout: 3000,
            crossDomain: true,
            dataType: 'json',
            headers: {
                "VMUser": "hmoreno"
            }
        }).done(function (data) {
            console.log(data);
            console.log("result recieved");
        }).fail(function (err) {
                console.log(err);
                console.log("error")
            })
            .always(function () {
                console.log("complete");
            });

    });
});
