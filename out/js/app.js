var app = angular.module("SparkApp", ['ngRoute']);


app.config(["$routeProvider", function ($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "/out/views/main.html"
    })
    .when("/content", {
      templateUrl: "/out/views/content.html"
    })
    .when("/code", {
      templateUrl: "/out/views/code.html"
    })
    .when("/sitemap", {
      templateUrl: "/out/views/sitemap.html"
    })
    .when("/videos", {
      templateUrl: "/out/views/videos.html"
    })
    .when("/launch", {
      templateUrl: "/out/views/launch.html"
    })
    .when("/design", {
      templateUrl: "/out/views/design.html"
    })
    .otherwise({
      redirectTo: "/"
    });

}]);

