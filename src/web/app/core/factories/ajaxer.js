/// <reference path="../../../typings/angularjs/angular.d.ts" />
var Core;
(function (Core) {
    var Ajaxer = (function () {
        function Ajaxer($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        Ajaxer.prototype.handleError = function (def, msg, code) {
            if (code === void 0) { code = 200; }
            var message = "Errore!";
            if (msg) {
                if (!angular.isUndefined(msg)) {
                    if (!angular.isUndefined(msg.Message)) {
                        if (msg.Message) {
                            message = msg.Message;
                        }
                    }
                    else {
                        message = msg;
                    }
                }
            }
            switch (code) {
                case 200:
                    def.reject(message);
                    break;
                case 404:
                    def.reject("Non trovato!");
                    break;
                case 500:
                    def.reject(message);
                    break;
                default:
                    def.reject(message);
                    break;
            }
        };
        ;
        Ajaxer.prototype.buildConfig = function (url, method, opts) {
            var config = {
                url: url,
                method: method
            };
            if (!angular.isUndefined(opts)) {
                angular.extend(config, opts);
            }
            return config;
        };
        Ajaxer.prototype.get = function (url, opts) {
            var _this = this;
            var def = this.$q.defer();
            var config = this.buildConfig(url, "GET", opts);
            this.$http(config)
                .success(function (data) {
                def.resolve(data);
            }).error(function (msg, code) {
                _this.handleError(def, msg, code);
            });
            return def.promise;
        };
        ;
        Ajaxer.prototype.post = function (url, d, opts) {
            var _this = this;
            var def = this.$q.defer();
            var config = this.buildConfig(url, "POST", opts);
            config.data = d;
            this.$http(config)
                .success(function (data) {
                def.resolve(data);
            }).error(function (msg, code) {
                _this.handleError(def, msg, code);
            });
            return def.promise;
        };
        ;
        Ajaxer.prototype.postEmpty = function (url, opts) {
            var _this = this;
            var def = this.$q.defer();
            var config = this.buildConfig(url, "POST", opts);
            this.$http(config)
                .success(function (data) {
                def.resolve(data);
            }).error(function (msg, code) {
                _this.handleError(def, msg, code);
            });
            return def.promise;
        };
        ;
        return Ajaxer;
    })();
    Core.Ajaxer = Ajaxer;
    angular.module('core')
        .factory('ajaxer', ["$http", "$q", function ($http, $q) {
            return new Ajaxer($http, $q);
        }]);
})(Core || (Core = {}));
