/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />

module Core {
    angular.module('core')
        .filter('utctolocal', ['$filter', ($filter: ng.IFilterService) => {

            return (input, format) => {
                if (!angular.isDefined(format)) {
                    format = 'MMM d, y h:mm:ss a';
                }

                let date = moment.utc(input).toDate();
                return $filter('date')(date, format);
            }
        }]);
}