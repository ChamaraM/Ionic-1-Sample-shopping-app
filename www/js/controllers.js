angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('SignUpCtrl', function($scope, $http, $state, $rootScope){

  $scope.loginData = {};

  $scope.doLogin = function(){
    var userName = $scope.loginData.name;
    var password = $scope.loginData.password;
    var email = $scope.loginData.email;

   $http.post('http://localhost:3500/users', {

  Email : email,
	Password : password,
	Name : userName,


    }).then(successCallBack, errorCallBack);

    function successCallBack(resoponse){      
      console.log("Login Success");
      $rootScope.loggedInData = resoponse.data;
      console.log(resoponse.data);
      $state.go('login');

    }

    function errorCallBack(data){
      console.log("falier callback");
    }

  
  }
})
.controller('AddItemCtrl', function($scope, $http, $state, $rootScope){

  $scope.ItemData = {};

  $scope.AddItem = function(){
    var Name = $scope.ItemData.name;
    var price = $scope.ItemData.price;
    var dec = $scope.ItemData.Desc;
    var cat = $scope.ItemData.cat;

   $http.post('http://localhost:3500/product', {

  ItemName : Name,
	Price : price,
	Description : dec,
	Catagory : cat,


    }).then(successCallBack, errorCallBack);

    function successCallBack(resoponse){      
      console.log("Login Success");
      $rootScope.loggedInData = resoponse.data;
      console.log(resoponse.data);
    // $state.go('app.home');
    $state.go($state.current);

    }

    function errorCallBack(data){
      console.log("falier callback");
    }

    
  }
})
.controller('LoginCtrl', function($scope, $http, $state, $rootScope){

  $scope.userData = {};

  $scope.doSignIn = function(){
    var loguserName = $scope.userData.UserName;
    var logpassword = $scope.userData.Password;
 

   $http.put('http://localhost:3500/login/', {

   "id" : loguserName,
"userPassword": logpassword
    }).then(successCallBack, errorCallBack);

    function successCallBack(resoponse){      
      console.log("Login Success");
      $rootScope.loggedInData = resoponse.data;
      console.log(resoponse.data);
      $state.go('app.home');

    }

    function errorCallBack(data){
      console.log("falier callback");
    }

/*console.log("Login Success");
      $rootScope.loggedInData =data;
      $state.go('home');*/
    console.log('UserName: ' + loguserName + ' PAssword: ' + logpassword );
  }
})
.controller('viewProducttCtrl', function($scope, $http, $state, $rootScope){

  $scope.product = {};


   

   $http.get('http://localhost:3500/product/').then(successCallBack, errorCallBack);

    function successCallBack(resoponse){      
     
    console.log("adasdas");
$scope.product = resoponse.data;
    }

    function errorCallBack(data){
      console.log(data);
      console.log("falier callback");
    }


  
})
.controller('ViewProductCtrl', function($scope, $stateParams, $http, $state, $rootScope) {
  console.log($stateParams.productId)
  var p_id = $stateParams.productId;
   $scope.viewproduct = {};


   

   $http.get('http://localhost:3500/getproduct/'+p_id).then(successCallBack, errorCallBack);

    function successCallBack(resoponse){      
     
    console.log("ViewProduct");
$scope.viewproduct = resoponse.data;
    }

    function errorCallBack(data){
      console.log(data);
      console.log("falier callback");
    }

});
