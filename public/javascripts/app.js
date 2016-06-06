$(document).ready(function () {
       $('#PersonTableContainer').jtable({
           title: 'Table of people',
           actions: {
               listAction: '/GettingStarted/PersonList',
               createAction: '/GettingStarted/CreatePerson',
               updateAction: '/GettingStarted/UpdatePerson',
               deleteAction: '/GettingStarted/DeletePerson'
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
   });
