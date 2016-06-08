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
                var id = value.jobid;
                var status = value.status;

                $("#jobs tbody").append("<tr><td>"+ status +"</td><td>" + jobName + "</td><td>" + createdBy + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td> <button class='btn btn-warning btn-small' type='submit' id='edit'> <span class='glyphicon glyphicon-edit' aria-hidden='true'></span> Edit </button> <button class='btn btn-primary btn-small' type='submit' id='export' method='GET'> <span class='glyphicon glyphicon-send' aria-hidden='true'></span> Export </button> <button class='btn btn-danger btn-small' type='submit' id='delete' method='DELETE'> <span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete </button> </td></tr> ");
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
    // $("#add").click(function () {
    //     $.ajax({
    //         type: 'POST',
    //         url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs",
    //         timeout: 3000,
    //         rossDomain: true,
    //         dataType: 'json',
    //         headers: {
    //             "VMUser": "hmoreno"
    //         },
    //     }).done(function (data) {
    //         console.log(data);
    //         console.log("result recieved");
    //     }).fail(function (err) {
    //             console.log(err);
    //             console.log("error")
    //         })
    //         .always(function () {
    //             console.log("complete");
    //         });
    //
    // });

    $('#job-form').submit(function(e) {
       e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs',
            headers:{"VMUser":"hmoreno",
            'Accept': 'application/json',
          'Content-Type': 'application/json' },
          dataType: 'json',
            timeout:3000,
            crossDomain: true,
            success: function(data){
              console.log(data);
            },
            data: JSON.stringify({ name: $("#job-name").val(),
                    longitude: $("#job-longitude").val(),
                    latitude:  $("#job-latitude").val()})
        });
        return false;
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
