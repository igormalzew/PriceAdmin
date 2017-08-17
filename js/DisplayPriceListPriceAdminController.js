
 /* Просмотр всех прайсов */


priceAdminApp.controller('DisplayPriceListPriceAdminController', ['$scope', '$filter', '$http', 'ngTableParams', function ($scope, $filter, $http, ngTableParams) {

    $scope.extSearch = false;
    $scope.extFilters = {};
    $scope.extEmptyFilters = {
        PriceName:'',
        RegionCode:'',
        Region: '',
        GroupId:0
    };

    $scope.PriceListGridSettings = {
        data: new ngTableParams(),
        isLoading: false,
        startPriceListLoad: function() {
            this.data = this.getTableParams();
        },
        priceGroupTypes: {
            4: { name: "Астрал Отчет", icon: "fa fa-files-o" }
        },
        getTableParams: function() {
            return new ngTableParams({
                sorting: {
                    PriceName: 'asc'
                },
                count: 13
            }, {
                getData: function ($defer, params) {
                    $scope.PriceListGridSettings.isLoading = true;

                    var filters = JSON.parse(JSON.stringify(params.filter()));
                    filters.CommonSearchFilter = $scope.CommonSearchFilter;
                    filters.PriceName = $scope.extFilters.PriceName;
                    filters.RegionCode = $scope.extFilters.RegionCode;
                    filters.Region = $scope.extFilters.Region;
                    filters.GroupId = $scope.extFilters.GroupId;

                    //$http({
                    //    url: '',
                    //    method: "POST",
                    //    data: { Page: params.page(), Count: params.count(), Sort: params.sorting(), Filter: filters }
                    //}).success(function (res) {

                    let res = $scope.FakeServer.prices.GetPriceList({ Page: params.page(), Count: params.count(), Sort: params.sorting(), Filter: filters });

                    if (res.status == 'success') {
                        $defer.resolve(res.data.data);
                        params.total(res.data.totalCount);

                    } else
                        location.reload();

                    $scope.PriceListGridSettings.isLoading = false;

                    //}).error(function () {
                    //    location.reload();
                    //});
                }
            });
        },
        refreshTable: function () {
            this.data.page(1);
            this.data.reload();
        },
        getPageCount: function () {
            var count = this.data.total() / this.data.count();
            return count !== parseInt(count) ? parseInt(count) + 1 : parseInt(count);
        }
    };

    $scope.PriceListGridSettings.startPriceListLoad();

    $scope.ShowPriceDetail = function (priceId, priceName) {
        $scope.MainControllers.DisplayPriceListCtrl.price.set(priceId, priceName);
        $scope.MainControllers.PriceDetailCtrl.setActive();
    };

    $scope.ClearFilters = function () {
        $scope.CommonSearchFilter = '';
        $scope.clearExtFilters();
    };

    $scope.clearExtFilters = function () {
        $scope.extFilters = angular.copy($scope.extEmptyFilters);
    };

    $scope.simpleSearch = function() {
        $scope.clearExtFilters();
        $scope.PriceListGridSettings.refreshTable();
    }

    $scope.search = function () {
        $scope.CommonSearchFilter = '';
        $scope.PriceListGridSettings.refreshTable();
    }

    $scope.extSearchToggle = function () {
        $scope.extSearch = !$scope.extSearch;
        $('.ext-search-container').addClass('bounceInLeft').addClass('animated');
    }

}]);

priceAdminApp.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

priceAdminApp.directive("onlyDigit", function () {
    return {
        require: 'ngModel',
        restrict: "A",
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function (value) {
                var text = ctrl.$viewValue;
                if (!text || typeof text != "string") return text;
                var transformedInput = text.replace(/[^0-9]/g, "");
                if (transformedInput !== text) {
                    ctrl.$setViewValue(transformedInput);
                    ctrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
