app.controller('MainController', ['$scope', '$ionicModal', function($scope, $ionicModal) {
  
  // metodo para recorrere las funciones que se iniciaran en este controlador
  $scope.init = function(){
    console.log('MainController init');
    $scope.createModal();
  }

  // modal para crear usuario
  $scope.createModal = function(){      
    $ionicModal.fromTemplateUrl('templates/contacts/new-contact.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
  }
  $scope.openModal = function() {
    $scope.modal.show();
  };

  // iniciar controlador
  $scope.init();

}])


