(function () {

	var LinkFactory = (function () {
		var linksArray = [];

		return {
			// options { linkSelector: HTMLElem, gatherLinks: bool }
			init: function (options) {
				var i;
				if (options.gatherLinks) {
					// gather links
					this.links = document.querySelectorAll(options.linkSelector);
					// Make new link object
					for (i = 0; i < this.links.length; i++) {
						linksArray.push(new Link(this.links[i]));
					}
				}
			},

			getLinks: function () {
				return linksArray;
			}
		};
	})();

	function Link(linkElem) {
		this.elem = linkElem;
		this.addClickListener();
	}

	Link.prototype =  {
		addClickListener: function () {
			this.elem.addEventListener("click", function (event) {
				console.log(this);
			}.bind(this));
		}
	};

	var router = (function () {
		var routes = [];

		function initClickListener(routeObj) {
			routeObj.link.addEventListener("click", function (event) {
				console.log(routeObj);
			});
		}

		return {
			// routeObj { url, view, link}
			addRoute: function (routeObj) {
				routes.push(routeObj);
				initClickListener(routeObj);
			},

			getRoutes: function () {
				return routes;
			}
		};
	})();

	window.router = router;

	LinkFactory.init({ linkSelector: "a.link", gatherLinks: true });
	var links = LinkFactory.getLinks();
	console.log(links);



})();