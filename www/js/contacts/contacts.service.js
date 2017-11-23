
app.factory('ContactsService', ['$http', 'environment', function($http, environment) {
  return {
    all: function(params) {
      return $http.get(environment.url+'contacts/'+params, {headers: environment.headers})
    },
    set: function(data) {
      return $http.post(environment.url+'contacts/', data, {headers: environment.headers})           
    },
    get: function(contactId) { 
      return $http.get(environment.url+'contacts/'+contactId, {headers: environment.headers})           
    },
    remove: function(contactId) {
      return $http.delete(environment.url+'contacts/'+contactId, {headers: environment.headers})           
    }
  };
}]);
