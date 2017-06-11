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

})
.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var myLatlng = new google.maps.LatLng( 6.905428,79.971354);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    });
