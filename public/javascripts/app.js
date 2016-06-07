$(document).ready(function(){


                       $.ajax({

                            url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs',
                            timeout: 3000,
                            crossDomain: true,
                            dataType: 'json',
                            headers: {
                              'VMUser': 'hmoreno'
                                      },
                            success: function (data) {
                               $dfd.resolve(data);
                               console.log('worked!');
                            },
                            error: function () {
                               $dfd.reject();
                               console.log('did not work!');
                          }
                        });
                    });
});
