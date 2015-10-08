/// <reference path="../../../typings/angularjs/angular.d.ts" />
var App;
(function (App) {
    var Registration = (function () {
        function Registration(Id, Person) {
            this.Id = Id;
            this.Person = Person;
            this.Date = new Date();
        }
        return Registration;
    })();
    var Person = (function () {
        function Person() {
        }
        return Person;
    })();
    angular.module('app')
        .controller("main", ["$scope", "$timeout", "ajaxer", "guid", function ($scope, $timeout, ajaxer, guid) {
            $scope.item = new Person();
            $scope.max = 3;
            $scope.registrations = [];
            $scope.waitings = [];
            $scope.add = function () {
                $scope.lock = true;
                $timeout(function () {
                    $scope.lock = { Type: 1, Message: "Aggiunto!" };
                    var copy = new Person();
                    angular.merge(copy, $scope.item);
                    var registration = new Registration(guid.Generate(), copy);
                    if ($scope.registrations.length >= $scope.max) {
                        $scope.waitings.push(registration);
                    }
                    else {
                        $scope.registrations.push(registration);
                    }
                }, 2000);
            };
        }]);
})(App || (App = {}));
