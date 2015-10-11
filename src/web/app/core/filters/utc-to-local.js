/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />
var Core;
(function (Core) {
    angular.module('core')
        .filter('utctolocal', ['$filter', function ($filter) {
            return function (input, format) {
                if (!angular.isDefined(format)) {
                    format = 'MMM d, y h:mm:ss a';
                }
                var date = moment.utc(input).toDate();
                return $filter('date')(date, format);
            };
        }]);
})(Core || (Core = {}));
