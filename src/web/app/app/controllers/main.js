/// <reference path="../../../typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    var Registration = (function () {
        function Registration() {
        }
        return Registration;
    })();
    var GetTournamentViewModel = (function () {
        function GetTournamentViewModel() {
            this.players = [];
            this.waiters = [];
        }
        return GetTournamentViewModel;
    })();
    angular.module('app')
        .controller("main", ["$scope", "$timeout", "$validation", "ajaxer", "guid", function ($scope, $timeout, $validationProvider, ajaxer, guid) {
            $scope.item = new Registration();
            $scope.item.id = guid.Generate();
            $scope.max = 16;
            $scope.data = new GetTournamentViewModel();
            $scope.add = function () {
                $scope.lock = true;
                ajaxer.post("post-new-subscription.php", $scope.item).then(function (d) {
                    switch (d.result) {
                        case "player":
                            $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Info, "Your subscription is confirmed. Thank you!"));
                            break;
                        case "waiter":
                            $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Warning, "Unfortunately the maximum number of participants has been reached. Sorry for that :-( You are not subscribed to the tournament but your name will be added to the “Waiting List” in case of a registered player will unsubscribe."));
                            break;
                    }
                    $scope.item = new Registration();
                    $scope.item.id = guid.Generate();
                    $validationProvider.reset($scope.regForm);
                }, function (d) {
                    $scope.lock = false;
                    $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Error, d));
                }).finally(function () {
                    fetch();
                });
                ;
            };
            function fetch() {
                $scope.lock = true;
                ajaxer.get("http://www.robbiani.net/adunoindoor/get-tournament.php").then(function (d) {
                    $scope.lock = false;
                    $scope.data = d;
                }, function (d) {
                    $scope.lock = false;
                    $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Error, d));
                });
            }
            fetch();
        }]);
})(App || (App = {}));
