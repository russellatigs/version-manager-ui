$(document).ready(function () {

  //search functionality
  $('.search-form #search').hideseek({
  highlight: true,
  nodata: 'No results found'
});

//loading button snippet and modal dismissal
$('.btn').on('click', function() {
    var $this = $(this);
    $this.button('loading');
    setTimeout(function() {
    $this.button('reset');

  }, 1000);
  $(".job-modal").modal('hide');
});

// $('.btn').on('click', function() {
//   console.log('Im working');
//     setTimeout(function() {
//       $('.job-modal').modal('hide');
//     }, 1000);
// });


//jobtypes array
 var jobTypes = {
   'NEW': 'new-job',
   'EXPORTED': 'exported',
   'CHECKEDIN': 'checked-in',
   'POSTED': 'posted'
 }
    //  Gets jobs and populates data
    $.ajax({
        type: 'GET',
        url: "http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs",
        timeout: 8000,
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
                var provider = value.provider;

                $("#jobs tbody").append("<tr class='"+jobTypes[value.status]+"' data-id="+id+"><td>"+ status +"</td><td>" + jobName + "</td><td>" + createdBy + "</td><td>" + latitude + "</td><td>" + longitude + "</td><td>" + provider + "</td><td>  <button class='btn btn-primary btn-small job-export' id='export' > <span class='glyphicon glyphicon-send' aria-hidden='true'></span> Export </button> <button class='btn btn-info btn-small job-checkin' type='submit' id='checkin'> <span class='glyphicon glyphicon-ok' aria-hidden='true'></span> Check In </button> <button class='btn btn-warning btn-small job-gold' type='submit' id='gold'> <span class='glyphicon glyphicon-edit' aria-hidden='true'></span> Post to Gold </button> <button class='btn btn-danger btn-small delete-job' id='delete'> <span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete </button> </td></tr> ");


            });

            // disabling delete buttons for posted jobs

            $("."+jobTypes['POSTED']+" #delete").attr('disabled', 'disabled');
            $("."+jobTypes['NEW']+" #checkin, #gold").attr('disabled', 'disabled');
            $("."+jobTypes['EXPORTED']+" #export, #gold").attr('disabled', 'disabled');



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
                url: "http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs/"+jobId,
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
                url: "http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs/"+jobId+"/file/",
                headers: {
                    "VMUser": "hmoreno",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                dataType: 'json',
                timeout: 3000,
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

          setTimeout(function(){
            location.reload(true); }, 2000);



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
                 url: "http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs/"+jobId,
                 headers:{"VMUser":"hmoreno",
                 'Accept': 'application/json',
                 'Content-Type': 'application/json' },
                 dataType: 'json',
                 timeout: 3000,
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

                   setTimeout(function(){
                     location.reload(true); }, 2000);

               });



    }).done(function (data) {
        console.log(data);
        console.log("result recieved");
        //Post a Job to Gold
         $('.job-gold').on('click', function(e) {
           var jobId = $(this).closest('tr').attr("data-id");
           console.log('gold');
             $.ajax({
                 type: 'PUT',
                 url: 'http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs/'+jobId,
                 headers:{"VMUser":"hmoreno",
                 'Accept': 'application/json',
                 'Content-Type': 'application/json' },
                 dataType: 'json',
                 timeout:3000,
                 crossDomain: true,
                 success: function(data){
                   console.log(data);
                 },

             });
             setTimeout(function(){
               location.reload(true); }, 2000);
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
   $('#job-form').submit(function(e) {
     e.preventDefault();
         $.ajax({
           type: 'POST',
           url: 'http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs',
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
       setTimeout(function(){
         location.reload(true); }, 2000);



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
      // $('.job-gold').on('click', function(e) {
      //   var jobId = $(this).closest('tr').attr("data-id");
      //   console.log('hello');
      //     $.ajax({
      //         type: 'PUT',
      //         url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/'+jobId,
      //         headers:{"VMUser":"hmoreno",
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json' },
      //         dataType: 'json',
      //         timeout:3000,
      //         crossDomain: true,
      //         success: function(data){
      //           console.log(data);
      //         },
      //
      //     });
      //     return false;
      // });
});
