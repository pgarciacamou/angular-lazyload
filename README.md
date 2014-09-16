Angular-lazyload
================

Angular-lazyload is a lightweight AngularJS service that using RequireJS allows to dynamically load services and controllers when a route is resolved.

Pros
  - Weights ~1KB.
  - Allows to hide functionality from users that are not allowed to see.
  - Very big sites can dramatically increase initial load time.
  - There might be a common path for users in your site. It might help to lazy load scenarios where the user wouldn't visit regularly.
  
Cons
  - Unless the application is absolutely gigantic and huge, it's actually slower to do lazy-loading because of different issues like the following.
  - Http requests are expensive, especially on mobile devices.
  - Using AppCache is better and obviously faster to load.
  - All code minified into one single file is ideal and works for most of the applications.
  
Version
-------

0.0.0

How to use?
-----------

Load the LazyLoad module to have access to the service and provider:

    angular.module('mainApp', ['ngRoute', 'LazyLoad'])
    
You must use the service within the configuration phase.

    .config(['$routeProvider', 'lazyProvider', function ($routeProvider, lazyProvider) {

Access the service through the provider:

    	var $lazy = lazyProvider.$get();
    	$routeProvider
    	.when('/login', {
    		templateUrl: 'login/partials/login.html'

We lazyload to the *mainApp* when angular resolves the route.

    		,resolve: {
    			load: function (){
    				return $lazy('mainApp').load([
    					'login/controllers/loginController'
    					,'login/services/loginService'
    				]);//
    			}
    		}
    	})
    	
A similar example:

    	.when('/register', {
    		templateUrl: 'components/register/partials/register.html'
    		,resolve: {
    			load: function (){
    				return $lazy('mainApp').load([
    					'register/controllers/registerController'
    					,'register/services/registerService'
    				]);//
    			}
    		}
    	});
    }]);

This service will add an object called *components* to the module specified.
To be able to lazyLoad the services and controllers we need to use this new *components* object.

To lazy load the *login/controllers/loginController* controller

    angular.module('mainApp')

This new object allows you to access the controller register service:

    .components
    .controller('loginController', ['$scope', 'loginService', function ($scope, loginService) {
        ...
    }]);
    
To lazy load the *login/controllers/loginService* service is basically the same as the controller.

    angular.module('mainApp')
    .components
    .service('loginService', function () {
    	...
    });


Tech
----

 Uses two of open source JS libraries/frameworks to work:

* [AngularJS] - AngularJS lets you write client-side web applications as if you had a smarter browser. It lets you use good old HTML (or HAML, Jade and friends!) as your template language and lets you extend HTML’s syntax to express your application’s components clearly and succinctly
* [RequireJS] - RequireJS is a JavaScript file and module loader.

Birth
-----
This project code was first developed by: [Sagar Ganatra] on [github] and on his [blog] and to make it DRY I encapsulated it into its own [module/service].

License
-------
MIT

**Free Software, Hell Yeah!**

[AngularJS]:https://angularjs.org/
[RequireJS]:http://requirejs.org/
[Sagar Ganatra]:https://github.com/sagar-ganatra
[github]:https://github.com/sagar-ganatra/angular-require-resolve
[blog]:http://www.sagarganatra.com/2014/08/lazy-loading-angularjs-components-using-providers.html
[module]:https://github.com/pgarciacamou/angular-require-resolve