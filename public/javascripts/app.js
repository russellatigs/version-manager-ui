$(document).ready(function(){
  

                  //  Gets jobs and populates data
                        $.ajax({
                            type: 'GET',
                            url: "http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs",
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


                      //Creates a job
                      $( "#add" ).click(function() {
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
                      $( "#delete" ).click(function() {
                        console.log('Im working');
                      $.ajax({
                        type: 'POST',
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

                    //  Export a Job
                      $( "#export" ).submit(function() {
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
