(function () {


	var router = (function () {

		var routes = [];

		function addRoute(url, route) {
			var _tempObj = {
				url: url,
				route: route
			};
			
			routes.push(_tempObj);
		}

		return {
			addRoute: addRoute,
			routes: routes
		};

	})();

	window.router = router;

})();