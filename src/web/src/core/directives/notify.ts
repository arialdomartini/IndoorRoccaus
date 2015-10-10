/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />

module Core {

    export enum NotifyTypes {
        Info,
        Warning,
        Error
    }
    export class NotifyMessage {
        Message: string;
        Type: NotifyTypes;
        constructor(type: NotifyTypes, message: string) {
            this.Type = type;
            this.Message = message;
        }
    }

    angular.module('core')
        .directive('notify', [() => {
            return {
                restrict: "E",
                compile: function(elm, attrs) {
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": 300,
                        "hideDuration": 1000,
                        "timeOut": 9000,
                        "extendedTimeOut": 1000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };


                    return function(scope, elm, attrs) {
                        scope.$on('notifier', (evt, d: NotifyMessage) => {
                            switch (d.Type) {
                                case NotifyTypes.Info:
                                    {
                                        toastr.info(d.Message)
                                        break;
                                    }
                                case NotifyTypes.Warning:
                                    {
                                        toastr.warning(d.Message)
                                        break;
                                    }
                                case NotifyTypes.Error:
                                    {
                                        toastr.error(d.Message)
                                        break;
                                    }
                            }

                        });
                    };
                }
            };
        }]);
}
