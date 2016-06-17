$(document).ready(function () {

    //  Gets jobs and populates data
    $.ajax({
        type: 'GET',
        url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs",
        timeout: 5000,
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

                $("#jobs tbody").append("<tr data-id="+id+"><td>"+ status +"</td><td>" + jobName + "</td><td>" + createdBy + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>  <button class='btn btn-primary btn-small job-export' > <span class='glyphicon glyphicon-send' aria-hidden='true'></span> Export </button> <button class='btn btn-info btn-small job-checkin' type='submit'> <span class='glyphicon glyphicon-ok' aria-hidden='true'></span> Check In </button> <button class='btn btn-warning btn-small' type='submit' id='edit'> <span class='glyphicon glyphicon-edit' aria-hidden='true'></span> Post to Gold </button> <button class='btn btn-danger btn-small delete-job'> <span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete </button> </td></tr> ");

            });

        },

        //Responses
    }).done(function (data) {
        console.log(data);
        console.log("result recieved");

        //Deletes a Job
        $(".delete-job").on('click', function(e) {
          var jobId = $(this).closest('tr').attr("data-id");

            $.ajax({
                type: 'DELETE',
                url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/"+jobId,
                headers:{"VMUser":"hmoreno",
                'Accept': 'application/json',
                'Content-Type': 'application/json' },
                dataType: 'json',
                timeout:3000,
                crossDomain: true,
                success: function(data){

                   if(data.status === 'Job deleted succcessfully'){
                     console.log("inside if");
                     $("tr[data-id='"+jobId+"']").remove();
                   }

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

    }).done(function (data) {
        console.log(data);
        console.log("result recieved");

        //Export a Job
        $(".job-export").on('click', function(e) {
          var jobId = $(this).closest('tr').attr("data-id");

            $.ajax({
                type:'GET',
                url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/"+jobId+"/file/",
                headers: {
                    "VMUser": "hmoreno",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                timeout: 5000,
                crossDomain: true,

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

    }).done(function (data) {
        console.log(data);
        console.log("result recieved");

        //Check In a Job
         $('.job-checkin').on('click', function(e) {
           var jobId = $(this).closest('tr').attr("data-id");
           console.log('hello');
             $.ajax({
                 type: 'POST',
                 url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/"+jobId+"/file/",
                 headers:{"VMUser":"hmoreno",
                 'Accept': 'application/json',
                 'Content-Type': 'application/json' },
                 dataType: 'json',
                 timeout:9000,
                 crossDomain: true
               }).done(function (data) {
                   console.log(data);
                   data: JSON.stringify,
                   console.log("result recieved");


               }).fail(function (err) {
                       console.log(err);
                       console.log("error")
                   })
                   .always(function () {
                       console.log("complete");
                   });

               });



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


   //Creates a Job
   $('#job-form').submit(function(evt) {
     evt.preventDefault();
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
                   latitude:  $("#job-latitude").val(),
                   provider:  $("#job-provider").val()})
       });
       return false;
   });



    //Check In a Job
    //  $('.job-checkin').on('click', function(e) {
    //    var jobId = $(this).closest('tr').attr("data-id");
    //    console.log('hello');
    //      $.ajax({
    //          type: 'POST',
    //          url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/',
    //          headers:{"VMUser":"hmoreno",
    //          'Accept': 'application/json',
    //          'Content-Type': 'application/json' },
    //          dataType: 'json',
    //          timeout:3000,
    //          crossDomain: true
    //        }).done(function (data) {
    //            console.log(data);
    //            data: JSON.stringify,
    //            console.log("result recieved");
     //
     //
    //        }).fail(function (err) {
    //                console.log(err);
    //                console.log("error")
    //            })
    //            .always(function () {
    //                console.log("complete");
    //            });


    //          success: function(data){
    //            console.log(data);
    //          },
    //          data: JSON.stringify
    //      });
    //      return false;
    //  });

     //Post a Job to Gold
      $('#job-gold').submit(function(e) {
         e.preventDefault();
          $.ajax({
              type: 'PUT',
              url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/',
              headers:{"VMUser":"hmoreno",
              'Accept': 'application/json',
              'Content-Type': 'application/json' },
              dataType: 'json',
              timeout:3000,
              crossDomain: true,
              success: function(data){
                console.log(data);
              },
              // data:{
              //   id:
              // }
          });
          return false;
      });
});
