(function () {
	// TODO: add loaded custom event for view
	// TODO: remove $pageChange event to $viewChange
	// TODO: add IE fall back for location.origin line #122
	// TODO: refactor and optimize

	"use strict";

	/**
	 * @author Matt Ludwigs
	 * @date 12/30/14
	 */

	/**
	 * Ajax class to abstract away from ajax calls
	 *
	 * @param method {String}
	 * @param url {String}
	 * @constructor
	 */
	function Ajax(method, url) {
		this.method = method;
		this.url = url;

		console.log(this);
	}

	/**
	 * Prototype for the Ajax Class
	 *
	 * @type {{Ajax}}
	 */
	Ajax.prototype = {

		/**
		 * Send Ajax request and bind the event listener for response text.
		 *
		 * @param cb {Function}
		 */
		send: function (cb) {
			this.xhr = new XMLHttpRequest();

			this._addXhrListener(cb);

			this.xhr.open(this.method, this.url, true);
			this.xhr.send();
		},

		/**
		 * Event listener for Ajax request. Calls callback when request is
		 * ready.
		 *
		 * @param cb {Function}
		 * @private
		 */
		_addXhrListener: function (cb) {
			var self = this;
			this.xhr.addEventListener("readystatechange", function () {
				if (self.readyState === 4 && self.status === 200) {
					if (self.responseURL.indexOf(".json") !== -1) {
						cb(JSON.parse(self.responseText));
					} else {
						cb(self.responseText);
					}
				}
			}.bind(this));
		}
	};

	/**
	 * Spark Object
	 */
	var spark = (function () {

		var linkElems = [],
				options,
				$pageChangeEvent = new CustomEvent("$pageChange");


		/**
		 * When page originally loads run this and call the callback
		 *
		 * @param cb {Function}
		 */
		function loadEvent(cb) {
			window.addEventListener("load", function () {
				var hash = location.hash;
				cb(hash);
			});
		}

		/**
		 * Load the initial view if the page is
		 * the "home" page
		 *
		 * @param viewPath {String}
		 * @param viewContainer {HTMLElement}
		 * @param linkSelector {String}
		 */
		function loadInitView(viewPath, viewContainer, linkSelector) {
			var getView = new Ajax("GET", viewPath);
			getView.send(function (data) {
				viewContainer.innerHTML = data;
				gatherViewLinks(linkSelector);
			});
		}


		/**
		 * Gather link views and story in array for latter use
		 *
		 * @param elemsSelector {String}
		 */
		function gatherViewLinks(elemsSelector) {
			var i,
					links;

			linkElems = [];

			links = document.querySelectorAll(elemsSelector);

			for (i = 0; i < links.length; i++) {
				linkElems.push(links[i]);
				_linkClickListner(links[i]);
			}
		}

		/**
		 * Click event for the view links
		 *
		 * @param elem {HTMLElement}
		 * @private
		 */
		function _linkClickListner(elem) {
			elem.addEventListener("click", function (event) {
				event.preventDefault();
				document.dispatchEvent($pageChangeEvent);
				if (location.origin) {
					location.hash = elem.href.replace(location.origin, "");
				}

				loadView(location.hash);
			});
		}

		/**
		 * load view based off hash passed in
		 *
		 * @param locationHash {String}
		 */
		function loadView(locationHash) {
			var currentHash = locationHash,
					currentViewObj,
					ajax,
					i;
			if (currentHash.indexOf("#") !== -1) {
				currentHash = currentHash.replace("#", "");
			}

			for (i = 0; i < options.views.length; i++) {
				if (options.views[i].url === currentHash) {
					currentViewObj = options.views[i];
					break;
				}
			}

			if (currentViewObj) {
				ajax = new Ajax("GET", currentViewObj.viewPath);
				ajax.send(function (data) {
					options.view.innerHTML = data;
				});
			}
		}

		/**
		 * listener for custom $viewChange event
		 *
		 * @param cb {Function}
		 */
		function viewChangeListener(cb) {
			document.addEventListener("$pageChange", function () {
				cb();
			});
		}

		return {
			/**
			 * Initializer for the spark object
			 *
			 * @param opts {Object}
			 *
			 * @options view, initView, views, viewLink
			 * @type view {HTMLElement}
			 * @type initView {String}
			 * @type viewLink {String}
			 * @type views {Array<Object>}
			 *
			 */
			init: function (opts) {
				options = this.opts = opts;
				loadEvent(function () {
					var hash = location.hash;

					if (hash === "" ) {
						loadInitView(this.opts.initView, this.opts.view, this.opts.viewLink);
					} else {
						this.$digest({ hash: hash });
					}

					viewChangeListener(function () {
						this.$digest();
					}.bind(this));

				}.bind(this));
			},

			/**
			 *
			 * @options {Object} [ hash ]
			 *
			 */
			$digest: function () {
				var _digest = {};
				// If there are arguments do someting
				if (arguments.length) {
					var tempObj = arguments[0],
							keys = Object.keys(tempObj),
							i;
					// loop through the keys add the value to _disget object
					for (i = 0; i < keys.length; i++) {
						// If hash is passed add it to the _disget object
						if (keys[i].toLowerCase() === "hash") {
							_digest.hash = tempObj.hash;
						}
					}
				}

				// if there is a hash, load the view for it
				if (_digest.hash) {
					loadView(_digest.hash);
				}

				// gather the links once view is loaded
				setTimeout(function () {
					gatherViewLinks(this.opts.viewLink);
				}.bind(this), 100);
			}
		};

	})();

	/**
	 * Add Ajax to spark
	 *
	 * @type {Ajax}
	 */
	spark.Ajax = Ajax;

	/**
	 * Expose to window
	 */
	window.spark = spark;

})();