/// <reference path="../../typings/angularjs/angular.d.ts" />

module App {
    angular.module('app', ['core', 'validation', 'validation.rule'])
        .config(['$validationProvider', function($validationProvider) {            
        }])
        .config(["$provide", function($provide) {            
            $provide.decorator("$exceptionHandler", ["$delegate", function($delegate) {
                return function(exception, cause) {
                    console.log(exception.message);
                    $delegate(exception, cause);
                };
            }]);
        }])
}