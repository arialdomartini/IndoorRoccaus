/// <reference path="../../../typings/angularjs/angular.d.ts" />

module Core {

    export class Ajaxer {
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }
        private handleError(def: ng.IDeferred<Object>, msg: any, code: number = 200) {

            var message = "Errore!";

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

        private buildConfig(url: string, method: string, opts?: ng.IRequestShortcutConfig): ng.IRequestConfig {
            var config: ng.IRequestConfig = {
                url: url,
                method: method
            }

            if (!angular.isUndefined(opts)) {
                angular.extend(config, opts);
            }
            return config;
        }

        get<V>(url: string, opts?: ng.IRequestShortcutConfig): ng.IPromise<V> {

            let def = this.$q.defer<V>();

            let config = this.buildConfig(url, "GET", opts);

            this.$http(config)
                .success((data: V) => {
                    def.resolve(data);
                }).error((msg, code) => {
                    this.handleError(def, msg, code);
                });

            return def.promise;
        };
        post<B, V>(url: string, d: B, opts?: ng.IRequestShortcutConfig): ng.IPromise<V> {

            var def = this.$q.defer<V>();

            let config = this.buildConfig(url, "POST", opts);
            config.data = d;

            this.$http(config)
                .success((data: V) => {
                    def.resolve(data);
                }).error((msg, code) => {
                    this.handleError(def, msg, code);
                });

            return def.promise;
        };
        postEmpty<V>(url: string, opts?: ng.IRequestShortcutConfig): ng.IPromise<V> {

            var def = this.$q.defer<V>();

            let config = this.buildConfig(url, "POST", opts);

            this.$http(config)
                .success((data: V) => {
                    def.resolve(data);
                }).error((msg, code) => {
                    this.handleError(def, msg, code);
                });

            return def.promise;
        };
    }

    angular.module('core')
        .factory('ajaxer', ["$http", "$q", function($http: ng.IHttpService, $q: ng.IQService) {
            return new Ajaxer($http, $q);
        }]);

}