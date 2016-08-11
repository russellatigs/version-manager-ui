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


            // console.log(data.length);
            data.forEach(function (value, i) {
                var jobName = value.name;
                var createdBy = value.createdby;
                var latitude = value.latitude;
                var longitude = value.longitude;
                var id = value.jobid;
                var status = value.status;
                var provider = value.provider;
                var jid = value.jobid;
                $("#jobs tbody").append("<tr class='"+jobTypes[value.status]+"' data-id="+id+"><td>"+ status +"</td><td>" + jobName + "</td><td>" + createdBy + "</td><td class='ymin'>" + latitude + "</td><td class='xmin'>" + longitude + "</td><td>" + provider + "</td><td>  <button class='btn btn-primary btn-small job-export export'> <span class='glyphicon glyphicon-send' aria-hidden='true'></span> Export </button>  <button class='btn btn-warning btn-small job-gold gold' type='submit'> <span class='glyphicon glyphicon-edit' aria-hidden='true'></span> Post to Gold </button> <button class='btn btn-danger btn-small delete-job delete' > <span class='glyphicon glyphicon-remove' aria-hidden='true'></span> Delete </button> </td><td> <label><span>Attachment</span><form enctype='multipart/form-data' method='post' accept-charset='utf-8'> <input class='input-field' type='file' name='file_attach' ><button class='btn btn-primary job-checkin checkin' type='submit'>Check In </button><input type='hidden' class='jid' value="+jid+"></form></label></td> </tr> ");


            });
            // disabling delete buttons for posted jobs
            $("."+jobTypes['POSTED']+" .delete").attr('disabled', 'disabled');
            $("."+jobTypes['NEW']+" .checkin").attr('disabled', 'disabled');
            $("."+jobTypes['EXPORTED']+" .export").attr('disabled', 'disabled');
            $("."+jobTypes['CHECKEDIN']+".export").attr('disabled', 'disabled');


        },
        //Responses
    }).done(function (data) {
        console.log(data);
        // console.log("result recieved");

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

        //Export a Job
        $(".job-export").on('click', function(e) {

          var jobId = $(this).closest('tr').attr("data-id");
          var xmin = $(this).closest('tr').children("td.xmin").text();
          var ymin = $(this).closest('tr').children("td.ymin").text();

            $.ajax({
                type:'GET',
                url: "http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs/"+jobId+"/file",
                headers: {
                    "VMUser": "hmoreno",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                timeout: 3000,
                crossDomain: true,


            }).done(function (data) {
                console.log(data);
                console.log("result recieved");

                var file = new File([data], "hello world.gml", {type: "text/plain;charset=utf-8"});
                saveAs(file);

            }).fail(function ( jqXHR, textStatus, errorThrown) {

                    console.log(errorThrown);
                    console.log("error")
            })
            .always(function () {
                    console.log("complete");
            });

          setTimeout(function(){
            location.reload(true); }, 2000);

        });

    }).done(function (data) {
        // console.log(data);
        // console.log("result recieved");

        //Check In a Job
         $('.job-checkin').on('click', function(event) {
           event.preventDefault();
           var jobId = $(this).closest('tr').attr("data-id");
           //data to be sent to server
           var m_data = new FormData();

           var fname = $(this).prev('input').val();
           var size = $(this).prev('input')[0].files[0].size;
           var ext = fname.substr(fname.lastIndexOf('.') + 1);

              if (fname != '' && size <10000 && ext=="gml") {
                m_data.append('file',$(this).prev('input')[0].files[0]);
                $.ajax({
                 url: "http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs/"+jobId,
                 type: 'POST',
                 data: m_data,
                 headers:{"VMUser":"hmoreno"},
                 dataType: 'json',
                 timeout: 3000,
                 crossDomain: true,
                 contentType: false,
                 processData: false

               }).done(function (data) {
                   console.log(data);
                   console.log("result recieved");


               }).fail(function (err) {
                       console.log(err.responseText);
                       console.log("error")
                   })
                   .always(function () {
                       console.log("complete");
                     //   setTimeout(function(){
                     // location.reload(true); }, 2000);
                   });
              } else{
              	alert("File size must be smaller than 100KB and in .gml format.");
              }

           console.log('hello');
                   setTimeout(function(){
                     location.reload(true); }, 2000);

               });

    }).done(function (data) {

        //Post a Job to Gold
         $('.job-gold').on('click', function(e) {
           var jobId = $(this).closest('tr').attr("data-id");
           console.log('gold');
             $.ajax({
                 type: 'PUT',
                 url: 'http://ec2-54-172-145-108.compute-1.amazonaws.com:8888/jobs/'+jobId,
                 headers:{"VMUser":"hmoreno"},
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

       setTimeout(function(){
       location.reload(true); }, 2000);

    });
  });
