app.controller('DetailContactController', ['$scope', '$stateParams', 'ContactsService', '$state', '$ionicPopup', function($scope, $stateParams, ContactsService, $state, $ionicPopup) {
  
  // variables
  $scope.contact = {}
  $scope.types = [{name: "Cliente", value: "client"}, {name: "Proveedor", value: "provider"}];
  
  // metodo para recorrere las funciones que se iniciaran en este controlador
  $scope.init = function(){
    console.log('DetailContactController init')
    getContact($stateParams.contactId)
  }

  // obtener 1 contacto
  getContact = function(idContact){
    ContactsService.get(idContact).then(
      function(response){
        $scope.contact = response.data;
        $scope.typeContact = []
        angular.forEach($scope.types, function(type){
          var type = type
          angular.forEach(response.data.type, function(typeOrg){
            if (typeOrg == type.value) {
              $scope.typeContact.push(type.name)
            }
          })  
        })        
      }, function(error){
        console.log(error)        
      }
    );
  }

  // borrar contacto
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
            $state.go('allcontacts');
          }, function(error){
            console.log(error)        
          }
        );
      } else {
        console.log('No quiero borrar contacto');
      }
    });    
  }
 
}])
