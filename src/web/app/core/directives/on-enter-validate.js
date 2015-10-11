/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
var Core;
(function (Core) {
    angular.module('core')
        .directive('onEnterValidate', ["$parse", "$validation", function ($parse, $validation) {
            return {
                priority: 1,
                restrict: "A",
                compile: function (elm, attrs) {
                    return function (scope, elm, attrs) {
                        var form = $parse(attrs.onEnterValidate)(scope);
                        elm.bind("keydown keypress", function (event) {
                            if (event.which === 13) {
                                event.preventDefault();
                                $validation.validate(form).success(function () {
                                    if (attrs.onEnterValidated) {
                                        scope.$evalAsync(attrs.onEnterValidated);
                                    }
                                });
                            }
                        });
                    };
                }
            };
        }]);
})(Core || (Core = {}));
