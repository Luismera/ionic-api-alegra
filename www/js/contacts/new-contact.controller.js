app.controller('NewContactController', ['$scope', 'ContactsService', '$state', function($scope, ContactsService, $state) {
  
  // variables
  $scope.message = '';
  $scope.types = [{name: "Cliente", value: "client"}, {name: "Proveedor", value: "provider"}];

  // metodo para recorrere las funciones que se iniciaran en este controlador
  $scope.init = function(){
    console.log('NewContactController init');
    $scope.contact = {
                        "type" : [],
                        "address" : {
                                "address" : "",
                                "city" : ""
                        }
                      }
  }


  // guardar contacto
  $scope.saveContact = function(contact, contactForm){
    if(contactForm.$valid) {
      ContactsService.set(contact).then(
        function(response){
          $state.go('detailcontacts', {"contactId": response.data.id});
          $scope.modal.remove();
          $scope.createModal();
        }, function(error){
          $scope.message = error.data.message;
          console.log($scope.message);
        }
      )    
    }
  }

  // checkbox de tipo de usuario
  $scope.toggleSelectionTypes = function(type) {
    var idx = $scope.contact.type.indexOf(type);
    if (idx > -1) {
      $scope.contact.type.splice(idx, 1);
    }
    else {
      $scope.contact.type.push(type);
    }
  };

  // ocultar modal
  $scope.closeModal = function() {
    $scope.modal.remove();
    $scope.createModal();
  };

  // iniciar controlador
  $scope.init();


}])
