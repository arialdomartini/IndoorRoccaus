/// <reference path="../../../typings/angularjs/angular.d.ts" />

module App {

    interface IMainScope extends ng.IScope {
        max: number;
        lock: any;
        item: Person;
        registrations: Array<Registration>;
        waitings: Array<Registration>;

        add();
    }

    class Registration {
        Date: Date;

        constructor(private Id: string, private Person: Person) {
            this.Date = new Date();
        }
    }

    class Person {
        FirstName: string;
        LastName: string;
        PhoneNumber: string;
    }

    angular.module('app')
        .controller("main", ["$scope", "$timeout", "ajaxer", "guid", ($scope: IMainScope, $timeout: ng.ITimeoutService, ajaxer: Core.Ajaxer, guid: Core.Guid) => {
            $scope.item = new Person();
            $scope.max = 3;
            $scope.registrations = [];
            $scope.waitings = [];

            $scope.add = () => {
                $scope.lock = true;
                $timeout(() => {
                    $scope.lock = { Type : 1, Message: "Aggiunto!"};
                    let copy = new Person();
                    angular.merge(copy, $scope.item);
                    let registration = new Registration(guid.Generate(), copy);
                    if ($scope.registrations.length >= $scope.max) {
                        $scope.waitings.push(registration);
                    }
                    else {
                        $scope.registrations.push(registration);
                    }
                }, 2000);
            };
        }]);
}