/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/jquery.blockUI/jquery.blockUI.d.ts" />
/// <reference path="../../../typings/nprogress/nprogress.d.ts" />

module Core {

    export class Locker {
        static MessagerTime: number = 1500;
    }

    angular
        .module('core')
        .factory('locker', ['$http', '$q', function($http, $q) {
            function lock(element, extOpts) {
                var opts = {
                    css: { border: 'none', 'opacity': '0.9', 'background-color': 'transparent' },
                    overlayCSS: { opacity: .6, 'border-radius': '4px' },
                    bindEvents: true,
                    baseZ: 1060,
                    message: '<img width="100%" height="120" alt="loading.." src="content/images/loading.svg">',
                    centerY: true
                };

                if (extOpts) {

                    if (extOpts.width && extOpts.height) {
                        opts.message = '<img width="' + extOpts.width + '" height="' + extOpts.height + '" alt="" src="content/images/loading.svg">';
                    }

                    $.extend(opts, extOpts);
                }

                NProgress.start();
                if (element) {
                    $(element).block(opts);
                }
                else {
                    $.blockUI(opts);
                }
            }

            function messager(element, msg) {
                var opts = {
                    css: { border: 'none', 'opacity': '0.9', 'background-color': 'transparent', 'width': '80%', 'onOverlayClick': function() { } },
                    overlayCSS: { opacity: .6, 'border-radius': '4px' },
                    bindEvents: true,
                    baseZ: 1060,
                    message: msg,
                    centerY: false
                };

                if (element) {
                    $(element).block(opts);
                }
            }

            function unlock(element) {

                NProgress.done();
                if (element) {
                    $(element).off("click.blockuiunlocker");
                    $(element).unblock();
                }
                else {
                    $.unblockUI();
                }
            }

            var timeOut;
            return {
                getErrorMessage: function(msg) {
                    return "<div class='messager red'><i class='fa fa-times-circle'></i> " + msg + "</div>";
                },
                getSuccessMessage: function(msg) {
                    return "<div class='messager green'><i class='fa fa-check-circle'></i> " + msg + "</div>";
                },
                lock: lock,
                unlock: unlock,
                messager: function(element, msg, time) {
                    if (angular.isUndefined(time)) {
                        time = Locker.MessagerTime;
                    }

                    if (timeOut) {
                        clearTimeout(timeOut);
                    }

                    timeOut = setTimeout(function() {
                        unlock(element);
                    }, time);

                    messager(element, msg);

                    element.on("click.blockuiunlocker", '.blockUI', function() {
                        unlock(element);
                        clearTimeout(timeOut);
                    });
                }
            }
        }]);
}
