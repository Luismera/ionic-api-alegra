
var app = angular.module('alegra', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('allcontacts', {
    cache: false,
    url: '/contacts',
    templateUrl: 'templates/contacts/contacts.html',
    controller: 'ContactsController'
  })
  
  .state('detailcontacts', {
    cache: false,
    url: '/contact/:contactId',
    templateUrl: 'templates/contacts/detail-contact.html',
    controller: 'DetailContactController'
  })

  $urlRouterProvider.otherwise('/contacts');  
  
});

app.directive("ionSearch", function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      getData: "&source",
      model: "=?",
      search: "=?filter"
    },
    link: function(scope, element, attrs) {
      attrs.minLength = attrs.minLength || 0;
      scope.placeholder = attrs.placeholder || "";
      scope.search = { value: "" };

      if (attrs.class) element.addClass(attrs.class);

      if (attrs.source) {
        scope.$watch("search.value", function(newValue, oldValue) {
          if (newValue.length > attrs.minLength) {
            scope.getData({ str: newValue }).then(function(results) {
              scope.model = results;
            });
          } else {
            scope.model = [];
          }
        });
      }

      scope.clearSearch = function() {
        scope.search.value = "";
      };
    },
    template:
      '<div class="item-input-wrapper">' +
      '<i class="icon ion-android-search"></i>' +
      '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
      '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
      "</div>"
  };
})


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})