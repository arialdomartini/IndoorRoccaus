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
        .controller("main", ["$scope", "$timeout", "ajaxer", "guid", function ($scope, $timeout, ajaxer, guid) {
            $scope.item = new Registration();
            $scope.item.id = guid.Generate();
            $scope.max = 16;
            $scope.data = new GetTournamentViewModel();
            $scope.add = function () {
                $scope.lock = true;
                ajaxer.post("post-new-subscription.php", $scope.item).then(function (d) {
                    switch (d.result) {
                        case "player":
                            $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Info, "Aggiunto!"));
                            break;
                        case "waiter":
                            $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Info, "Aggiunto alla lista di attesa!"));
                            break;
                    }
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
                ajaxer.get("get-tournament.php").then(function (d) {
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
