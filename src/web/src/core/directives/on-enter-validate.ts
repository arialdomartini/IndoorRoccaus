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
                priority: 1, // execute before ng-click (0)
                restrict: "A",
                compile: (elm, attrs) => {
                    return (scope: ng.IScope, elm, attrs: IOnEnterValidateAttrs) => {
                        var form = $parse(attrs.onEnterValidate)(scope);
                        elm.bind("keydown keypress", (event: JQueryEventObject) => {                            
                            if (event.which === 13) {
                                event.preventDefault();
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
