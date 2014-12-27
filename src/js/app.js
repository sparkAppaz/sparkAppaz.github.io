(function () {
	var view = document.querySelector("#view");

	function get(url, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send();

		xhr.addEventListener("readystatechange", function (event) {
			if (xhr.readyState === 4 && xhr.status === 200) {
				cb(xhr.responseText);
			}
		});
	}

	var LinkFactory = (function () {
		var linksArray = [],
				viewContainer;

		function setViewContainer(viewContainerHTMLElem) {
			viewContainer = viewContainerHTMLElem;
		}

		return {
			// options { linkSelector: HTMLElem, gatherLinks: bool }
			init: function (options) {
				var i;
				if (options.gatherLinks) {
					// gather links
					this.links = document.querySelectorAll(options.linkSelector);
					// Make new link object
					for (i = 0; i < this.links.length; i++) {
						linksArray.push(new ViewLink(this.links[i]));
					}
				}
			},

			getLinks: function () {
				return linksArray;
			}
		};
	})();

	function ViewLink(linkElem) {
		this.elem = linkElem;
		this.view = this.elem.href;
		this.addClickListener();
	}

	ViewLink.prototype =  {
		addClickListener: function () {
			this.elem.addEventListener("click", function (event) {
				event.preventDefault();
				history.pushState(null, null, this.view);

				if (location.pathname !== "/") {
					this.ajaxViewCall(this.view, view);
				}

			}.bind(this));
		},

		ajaxViewCall: function (url, viewElem) {
			get(this.view, function (data) {
				console.log(data);
				viewElem.innerHTML = data;
			});
		}
	};


	var app = (function () {
	
		function popStateListener(options) {
			window.addEventListener("popstate", function (event) {
				console.log(location.pathname);

				if (location.pathname === "/") {
					loadInitView(options.initView, function () {
						LinkFactory.init(options);
					});
				} else {
					get(location.pathname, function (data) {
						view.innerHTML = data;
						LinkFactory.init(options);
					});
				}
			});
		}

		function loadInitView(initView, cb) {
			get(initView, function (html) {
				
				get(initView, function (html) {
					view.innerHTML = html;
					cb();
				});
			});
		}

		return {
			init: function (options) {
				this.options = options;
				this.viewContainer = document.querySelector(options.viewContainer);

				console.log(this.viewContainer);

				loadInitView(options.initView, function () {
					LinkFactory.init(options);
				});
				this.bindListeners();
			},

			bindListeners: function () {
				popStateListener(this.options);
			}
		};

	})();

	// The code a user would run
	(function () {

		var options = {
			linkSelector: "a.view-link", 
			gatherLinks: true, 
			initView: "/out/views/main.html",
			viewContainer: "#view"
		};

		app.init(options);
	})();

})();