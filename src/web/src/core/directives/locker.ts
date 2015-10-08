module Core {
    angular
        .module('core')
        .directive('locker', [
            "locker", function(locker) {
                return {
                    restrict: "A",
                    controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                        function handle(val) {
                            var type = typeof (val);
                            if (!angular.isUndefined(val)) {
                                switch (type) {
                                    case "boolean":
                                        if (val === true) {
                                            locker.lock($element);
                                        } else {
                                            locker.unlock($element);
                                        }
                                        break;
                                    case "string":
                                        if (val.length > 0) {
                                            locker.messager($element, val);
                                        }
                                        break;
                                    case "object":
                                        if (angular.isNumber(val.Type)) {
                                            var msg = "";
                                            switch (val.Type) {
                                                case -1:
                                                    {
                                                        var msg = "";
                                                        if (val.Message) {
                                                            msg = locker.getErrorMessage(val.Message);
                                                        }
                                                        if (msg.length > 0) {
                                                            locker.messager($element, msg);
                                                        } else {
                                                            locker.unlock($element);
                                                        }
                                                    }
                                                    break;
                                                default:
                                                case 1:
                                                    {
                                                        var msg = "";
                                                        if (val.Message) {
                                                            msg = locker.getSuccessMessage(val.Message);
                                                        }
                                                        if (msg.length > 0) {
                                                            locker.messager($element, msg);
                                                        } else {
                                                            locker.unlock($element);
                                                        }
                                                    }
                                                    break;
                                                case 0:
                                                    {
                                                        if (val.Options) {
                                                            locker.lock($element, val.Options);
                                                        } else {
                                                            locker.unlock($element);
                                                        }
                                                    }
                                                    break;
                                            }
                                        }
                                        break;
                                }
                            }

                        }

                        if ($attrs.lockerType === "emit") {
                            $scope.$on($attrs.locker, function(evt, data) {
                                handle(data);
                            });
                        }
                        else {
                            $scope.$watch($attrs.locker, handle);
                        }
                    }]
                }
            }
        ]);
}
