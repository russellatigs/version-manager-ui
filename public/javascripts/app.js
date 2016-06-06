$(document).ready(function () {
       $('#PersonTableContainer').jtable({
           title: 'Table of people',
           actions: {
              listAction: function (postData, jtParams) {
                    console.log("Loading from custom function...");
                    return $.Deferred(function ($dfd) {
                       $.ajax({
                            type: 'POST',
                            url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs',
                            crossDomain: true,
                            dataType: 'json',
                            data: JSON.stringify(),
                            headers: {
                              'Content-Type': 'application/json'

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
                },
                createAction: function (postData) {
                    console.log("creating from custom function...");
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            type: 'POST',
                            url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs',
                            crossDomain: true,
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                },
                deleteAction: function (postData) {
                    console.log("deleting from custom function...");
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            type: 'DELETE',
                            url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/{jobid}',
                            crossDomain: true,
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                },

                updateAction: function(postData) {
                    console.log("exporting...");
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            type: 'GET',
                            url: 'http://ec2-54-152-233-204.compute-1.amazonaws.com:8888/jobs/{jobid}/file',
                            crossDomain: true,
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                $dfd.resolve(data);
                            },
                            error: function () {
                                $dfd.reject();
                            }
                        });
                    });
                }
            },
           fields: {
               PersonId: {
                   key: true,
                   list: false
               },
               JobName: {
                   title: 'Job Name',
                   width: '40%'
               },
               CreatedBy: {
                   title: 'Created By',
                   width: '20%'
               },
               Long: {
                   title: 'Longitude',
                   width: '20%'
               },
               Lat: {
                   title: 'Latitude',
                   width: '20%'
               },

               RecordDate: {
                   title: 'Record date',
                   width: '30%',
                   type: 'date',
                   create: false,
                   edit: false
               }

           }
       });
       $('#PersonTableContainer').jtable('load');
   });
