$(document).ready(function () {
  //Execute after document is loaded
});

//if the code is not performing correctly. -- User Alert--

const userAlert = function() {
  alert(`Notice: 
    Users are currently experiencing errors updating

    and deleting individual "Student Grades". 

    Our tech team is working on resolving this issue.

    Thank you for your patience!`)
  
     }


const app = angular.module('app', ['ngMessages']);



app.controller('mainController',
 ['$scope', '$log', '$http', '$filter',  function ($scope, $log, $http, $filter){

 

  $scope.firstName="";
  $scope.lastName = "";
  $scope.grade = "";
  $scope.updateFname = "";
  $scope.updateLname ="";
  $scope.updateGrade = "";
  $scope.heading2 = "Student Grades";
  $scope.heading1 = "Enter student details";
  $scope.formattedtitle = $filter('uppercase')($scope.heading2,$scope.heading1);

 

  $http({

    method: 'GET',
    url: 'https://angular-cea16-default-rtdb.firebaseio.com/students.json',
   }).then(function (response) {

      let studentsDB = response.data;

       $scope.students = [];

      for (const id in studentsDB) {
        
        const firstName = studentsDB[id].firstName;
        const lastName = studentsDB[id].lastName;
        const grade = studentsDB[id].grade;
      
$scope.students.push(new Student(id,firstName, lastName, grade));


      }

       $log.info($scope.students);

   }, function (error){
       $log.error(error);

   });



   //---The add student function--


   $scope.add =  function(firstName,lastName,grade) {
  
    var a = firstName;
    var b = lastName;
    var c = grade;


    var student = {
      firstName: firstName,
      lastName: lastName,
      grade: grade,
    };

    if(a.length && b.length && c.length != 0){


      $http({

        method: 'POST',
        url: 'https://angular-cea16-default-rtdb.firebaseio.com/students.json',
        data: JSON.stringify(student)
       }).then(function (response) {
          
       }, function (error){
           $log.error(error);
    
       });
      
  Snackbar2();
  setTimeout(getStudents, 500)
  
  setTimeout(clearForm, 600)

       
    } else{

      alert("Please put a first name, last name and grade!")
    }

   
   }

   



//---The update student function--

$scope.update = function (updateFName,updateLName,updateGrade) {

  student = $scope.id;


  var updateStudent = {
    firstName: updateFName,
    lastName: updateLName,
    grade: updateGrade,
  };

  $http({
  method: 'PUT',
      url: `https://angular-cea16-default-rtdb.firebaseio.com/students/${student}.json`,
      data: JSON.stringify(updateStudent)
     }).then(function () {
      setTimeout(getStudents, 500)
      $log.info(updateStudent);
     }, function (error){
         $log.error(error);
         alert("error while updating user try again!");
  
     });
 
    clearModal();
    setTimeout(console.log(student), 2000);
};



//---The delete student function--
$scope.delete = studentId => {
 
  
 $http({

    method: 'DELETE',
    url: `https://angular-cea16-default-rtdb.firebaseio.com/students/${studentId}.json`,
   }).then(function (response) {
     
    console.log(`${studentId}`);
   
   }, function (error){
       $log.error(error); 

   }); 

   setTimeout(getStudents, 500)

 
}





//---The edit student function--


$scope.editStudent = studentId => {

  $scope.id = studentId;

  document.getElementById('updateModal').style.display
                          ='block';

  $http({

    method: 'GET',
      url: `https://angular-cea16-default-rtdb.firebaseio.com/students/${studentId}.json`,
   }).then(function () {

    
      console.log(`hello the student id is ${studentId}`);

   }, function (error){
       $log.error(error);

   });



}


$scope.deleteStudent = studentId => {
      
    if(confirm('Are you sure you want to delete this student?')){
      //Pass in a tattle Id send to fire base with command to delete
      $scope.delete(studentId);
      Snackbar();

  }

}






var clearModal =function () {

  document.getElementById('updateModal').style.display='none'
  $('#updateFname').val("");
  $('#updateLname').val("");
  $('#updateGrade').val("");

}




var clearForm = function (){
  $('#1').val(null);
  $('#2').val(null);
  $('#3').val(null);
  
}

var getStudents = function () {

  $http({

    method: 'GET',
    url: 'https://angular-cea16-default-rtdb.firebaseio.com/students.json',
   }).then(function (response) {

      let studentsDB = response.data;

       $scope.students = [];

      for (const id in studentsDB) {
        
        const firstName = studentsDB[id].firstName;
        const lastName = studentsDB[id].lastName;
        const grade = studentsDB[id].grade;
      
$scope.students.push(new Student(id,firstName, lastName, grade));


      }

      

   }, function (error){
       $log.error(error);

   });



 }



   

   var Snackbar = function() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

   }

   var Snackbar2 = function() {
    var x = document.getElementById("snackbar2");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

   }
   

}])
