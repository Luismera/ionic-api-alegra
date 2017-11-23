app.controller('ContactsController', ['$scope', 'ContactsService', '$ionicPopup', '$state', function($scope, ContactsService, $ionicPopup, $state) {
  
  // variables
  $scope.moredata = false;

  // metodo para recorrere las funciones que se iniciaran en este controlador
  $scope.init = function(){
  	console.log('ContactsController init');
    $scope.contacts = [];
    getContacts();  
  }  

  // listar contactos
  getContacts = function() {
    ContactsService.all().then(
      function(response){
        if (response.data) {
          $scope.contacts = response.data;
          $scope.moredata = true;
        }else{
          console.log("No hay datos")
        }        
      }, function(error){
        console.log(error.data);
      }
    );
  }


  //borrar contacto del listado
  $scope.deleteContact = function(contactId) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Eliminar contacto',
      template: 'Esta seguro que desea eliminar este contacto?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        ContactsService.remove(contactId).then(
          function(response){
            console.log(response.data.message)        
            $scope.init();
          }, function(error){
            console.log(error.data)        
          }
        );
      } else {
        console.log('No quiero borrar contacto');
      }
    });    
  }

  // filtrar por tipo de usuario
  $scope.getType = function(type) {
    var params = "?type="+type;
    ContactsService.all(params).then(
      function(response){
        if (response.data) {
          $scope.contacts = response.data;
          $scope.moredata = false;
        }else{
          console.log("No hay datos")
        }        
      }, function(error){
        console.log(error);
      }
    );
  }

  // actualizar lista
  $scope.doRefresh = function() {
    ContactsService.all().then(
      function(response){   
        if (response.data) {
          $scope.contacts = response.data;
          $scope.moredata = true;
        }else{
          console.log("No hay datos")
        }
        $scope.$broadcast('scroll.refreshComplete');
      }, function(error){
        console.log(error)        
      }
    )
  };


  // scroll infinito
  $scope.loadMore = function() {
    var params = "?start="+$scope.contacts.length;
    ContactsService.all(params).then(
      function(response){    
        if (response.data.length != 0 ) {
          angular.forEach(response.data, function(contact){
            $scope.contacts.push(contact);
          })
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else{
          $scope.moredata = false;
        }        
      }, function(error){
        console.log(error)        
      }
    )
  };
  
}])
