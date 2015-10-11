/// <reference path="../../../typings/angularjs/angular.d.ts" />

module App {

    interface IMainScope extends ng.IScope {
        max: number;
        lock: any;
        item: Registration;
        data: IGetTournamentViewModel;
        regForm: ng.IFormController;

        add();
    }

    class Registration {
        id: string
        registeredat: Date;
        firstname: string;
        lastname: string;
        phonenumber: string;
    }

    interface IGetTournamentViewModel {
        players: Array<Registration>;
        waiters: Array<Registration>;
    }

    class GetTournamentViewModel implements IGetTournamentViewModel {
        players: Array<Registration> = [];
        waiters: Array<Registration> = [];
    }

    interface INewSubscriptionViewModel {
        result: string;
    }

    angular.module('app')
        .controller("main", ["$scope", "$timeout", "$validation", "ajaxer", "guid", ($scope: IMainScope, $timeout: ng.ITimeoutService, $validationProvider, ajaxer: Core.Ajaxer, guid: Core.Guid) => {
            $scope.item = new Registration();
            $scope.item.id = guid.Generate();
            $scope.max = 16;

            $scope.data = new GetTournamentViewModel();            

            $scope.add = () => {
                $scope.lock = true;

                ajaxer.post("post-new-subscription.php", $scope.item).then((d: INewSubscriptionViewModel) => {
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
                    
                }, (d) => {
                    $scope.lock = false;
                    $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Error, d));

                }).finally(() => {
                    fetch();
                });;
            };

            function fetch() {
                $scope.lock = true;
                ajaxer.get<IGetTournamentViewModel>("http://www.robbiani.net/adunoindoor/get-tournament.php").then((d: IGetTournamentViewModel) => {
                    $scope.lock = false;                    
                    $scope.data = d;
                }, (d) => {
                    $scope.lock = false;
                    $scope.$emit("notifier", new Core.NotifyMessage(Core.NotifyTypes.Error, d));
                });
            }
            fetch();
        }]);
}
