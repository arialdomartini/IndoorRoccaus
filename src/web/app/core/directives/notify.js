/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/toastr/toastr.d.ts" />
var Core;
(function (Core) {
    (function (NotifyTypes) {
        NotifyTypes[NotifyTypes["Info"] = 0] = "Info";
        NotifyTypes[NotifyTypes["Error"] = 1] = "Error";
    })(Core.NotifyTypes || (Core.NotifyTypes = {}));
    var NotifyTypes = Core.NotifyTypes;
    var NotifyMessage = (function () {
        function NotifyMessage(type, message) {
            this.Type = type;
            this.Message = message;
        }
        return NotifyMessage;
    })();
    Core.NotifyMessage = NotifyMessage;
    angular.module('core')
        .directive('notify', [function () {
            return {
                restrict: "E",
                compile: function (elm, attrs) {
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "notify-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": 300,
                        "hideDuration": 1000,
                        "timeOut": 5000,
                        "extendedTimeOut": 1000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                    return function (scope, elm, attrs) {
                        scope.$on('notifier', function (evt, d) {
                            switch (d.Type) {
                                case NotifyTypes.Info:
                                    {
                                        toastr.info(d.Message);
                                        break;
                                    }
                                case NotifyTypes.Error:
                                    {
                                        toastr.error(d.Message);
                                        break;
                                    }
                            }
                        });
                    };
                }
            };
        }]);
})(Core || (Core = {}));
