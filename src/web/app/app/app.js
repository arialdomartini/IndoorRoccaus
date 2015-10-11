/// <reference path="../../typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    angular.module('app', ['core', 'validation'])
        .config(['$validationProvider', function ($validationProvider) {
            $validationProvider.setErrorHTML(function (msg) {
                return "<label class=\"control-label has-error\">" + msg + "</label>";
            });
            angular.extend($validationProvider, {
                validCallback: function (element) {
                    $(element).parents('.form-group:first').removeClass('has-error');
                },
                invalidCallback: function (element) {
                    $(element).parents('.form-group:first').addClass('has-error');
                }
            });
            var expression = {
                req: function (value) {
                    return !!value;
                }
            };
            var defaultMsg = {
                req: {
                    error: 'Mandatory',
                    success: ''
                }
            };
            $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
            $validationProvider.showSuccessMessage = false;
        }])
        .config(["$provide", function ($provide) {
            $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
                    return function (exception, cause) {
                        console.log(exception.message);
                        $delegate(exception, cause);
                    };
                }]);
        }]);
})(App || (App = {}));
