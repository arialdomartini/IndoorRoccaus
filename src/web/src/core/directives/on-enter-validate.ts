/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />

module Core {

    interface IOnEnterValidateAttrs extends ng.IAttributes {
        onEnterValidate: string;
        onEnterValidated: string;
    }

    angular.module('core')
        .directive('onEnterValidate', ["$parse", "$validation", ($parse: ng.IParseService, $validation) => {
            return {
                restrict: "A",
                compile: (elm, attrs) => {
                    return (scope: ng.IScope, elm, attrs: IOnEnterValidateAttrs) => {
                        var form = $parse(attrs.onEnterValidate)(scope);
                        elm.bind("keydown keypress", (event) => {
                            if (event.which === 13) {
                                $validation.validate(form).success(() => {
                                    if (attrs.onEnterValidated) {
                                        scope.$evalAsync(attrs.onEnterValidated);
                                    }
                                });
                            }
                        });
                    }
                }
            };
        }]);
}
