var priceAdminApp = angular.module('PriceAdminApp', ['ngTable', 'ui.bootstrap', 'treeGrid']);

priceAdminApp.factory('sessionTimeOutInterceptor', function () {
    return {
        response: function (response) {
            if (typeof response.data == "string") {
                if (response.data == "" || response.data.indexOf('страницу авторизации') != -1) {
                    window.location = authUrl;
                }
            }
            return response;
        }
    };
});

priceAdminApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('sessionTimeOutInterceptor');
}]);

priceAdminApp.directive('replaceDigit', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('keyup', function () {
                scope.$apply(setAnotherValue());
            });
            function setAnotherValue() {
                ngModel.$setViewValue(ngModel.$modelValue.replace(/[^0-9]{0,}/g, '').trim());
                ngModel.$render();
            }
        }
    };
});