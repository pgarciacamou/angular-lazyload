(function(){
	'use strict';
	var lazyLoad;
	angular.module('LazyLoad', [])
	.config(['$controllerProvider', '$provide', function ($controllerProvider, $provide){
		lazyLoad = {
			controller: $controllerProvider.register
			,service: $provide.service
		};
	}])
	.factory('lazy', function (){
		var $injector = angular.injector(['ng'])
		,$rootScope = $injector.get('$rootScope')
		,$q = $injector.get('$q');

		return function(moduleName){
			var mod = angular.module(moduleName);
			mod.lazyLoad = mod.lazyLoad || lazyLoad;
			return {
				load: function (arr){
					arr = arr || [];
					var deferred = $q.defer();
					require(arr, function () {
						$rootScope.$apply(function (){deferred.resolve();});
					});
					return deferred.promise;
				}
			};
		}
	});
})();