
/* Добавление промокода к тарифу */


priceAdminApp.controller('SelectPromoCodePriceAdminController', ['$scope', '$http', 'ngTableParams', '$timeout', function ($scope, $http, ngTableParams, $timeout) {

    $scope.$watch(function () { return $scope.AddingTariff.ActiveCtrl }, function () {

        if ($scope.AddingTariff.SelectPromoCodeCtrl.isActive()) {
            $scope.SelectedDiscount.set($scope.AddingTariff.SelectPromoCodeCtrl.selectedDiscount.get());
            $scope.PromoCodeGridSettings.startDataLoad();
        }
    });

    $scope.SelectedDiscount = {
        id: null,
        name: null,
        article: null,
        value: null,
        typeOfUnit: null,
        isFirstOpen: {
            value: true,
            set: function(val) {
                this.value = val;
            }
        },
        set: function (promo) {
            this.id = promo.DiscountId;
            this.name = promo.DiscountName;
            this.article = promo.Article;
            this.value = promo.DiscountValue;
            this.typeOfUnit = promo.TypeOfUnit;

            this.discountAlredySelected.check(promo.DiscountId);
        },
        discountAlredySelected: {
            value: false,
            check: function (checkDiscountId) {
                if (checkDiscountId === null) {
                    this.value = false;
                    return;
                }

                this.value = $scope.AddingTariff.SelectPromoCodeCtrl.alredySelectedDiscounts.some(function (discount) {
                    return discount.DiscountId === checkDiscountId;
                });
            }
        },
        clear: function () {
            this.id = null;
            this.name = null;
            this.article = null;
            this.value = null;
            this.typeOfUnit = null;
            this.isFirstOpen.set(true);
        },
        setParentDiscount: function () {
            if (this.id !== null)
                $scope.AddingTariff.SelectPromoCodeCtrl.selectedDiscount.set({
                    DiscountId: this.id,
                    DiscountName: this.name,
                    Article: this.article,
                    DiscountValue: this.value,
                    TypeOfUnit: this.typeOfUnit
                });
        }
    };

    $scope.NewPromo = {
        name: '',
        article: '',
        value: '',
        typeOfUnit: '1',
        errorList: [],
        isShowAlerts: {
            value: true,
            set: function(val) {
                this.value = val;
            }
        },
        isLoading: false,
        isAreaOpen: {
            value: false,
            set: function (val) {
                this.value = val;
            }
        },
        clear: function() {
            this.name = '';
            this.article = '';
            this.value = '';
            this.typeOfUnit = '1';
            this.errorList = [];
            this.isLoading = false;
            this.isAreaOpen.set(false);
        },

        save: function () {
            if (!this.name || !this.article || !this.value) {
                $scope.NewPromo.isShowAlerts.set(false);
                $timeout(function () {
                    $scope.NewPromo.isShowAlerts.set(true);
                }, 300);
                return;
            }

            if (this.isLoading) return;

            this.isLoading = true;
            this.errorList = [];

            //$http({
            //    url: '',
            //    method: "POST",
            //    data: {
            //        DiscountName: this.name,
            //        Article: this.article,
            //        DiscountValue: this.value,
            //        IsPercent: this.typeOfUnit === '1'
            //    }
            //}).success(function (res) {
            //    if (res.status == 'success') {

            //        if (res.data.Status == 'success') {
            //            $scope.SelectedDiscount.set(res.data.Entity);
            //            $scope.SelectedDiscount.isFirstOpen.set(true);
            //            $scope.NewPromo.clear();
            //            $scope.PromoCodeGridSettings.refreshTable();
            //        }
            //        else if (res.data.Status == 'error')
            //            $scope.NewPromo.errorList = res.data.ErrorList;

            //    } else
            //        location.reload();

            //    $scope.NewPromo.isLoading = false;

            //}).error(function () {
            //    location.reload();
            //});
        }
    };


    $scope.PromoCodeGridSettings = {

        data: new ngTableParams(),

        startDataLoad: function () {
            this.data = this.getTableParams();
        },

        isLoading: false,

        getTableParams: function () {
            return new ngTableParams({
                sorting: {
                    DiscountName: 'asc'
                },
                count: 5
            }, {
                getData: function ($defer, params) {
                    if ($scope.SelectedDiscount.BlockRequest) { $scope.SelectedDiscount.BlockRequest = false; return; }

                    $scope.PromoCodeGridSettings.isLoading = true;
                    var filters = JSON.parse(JSON.stringify(params.filter()));
                    filters.CommonSearchFilter = $scope.CommonSearchFilter;

                //    $http({
                //        url: '',
                //        method: "POST",
                //        data: {
                //            Page: params.page(),
                //            Count: params.count(),
                //            Sort: params.sorting(),
                //            Filter: filters,
                //            EntityId: $scope.SelectedDiscount.isFirstOpen.value ? $scope.SelectedDiscount.id : null
                //}
                    //    }).success(function (res) {

                    let res = $scope.FakeServer.tariffs.GetPromo();
                    if (res.status == 'success') {
                        $defer.resolve(res.data.data);
                        params.total(res.data.totalCount);

                        if ($scope.SelectedDiscount.isFirstOpen.value) {
                            if (params.page() !== res.data.page) {
                                $scope.SelectedDiscount.BlockRequest = true;
                                params.page(res.data.page);
                            }
                            $scope.SelectedDiscount.isFirstOpen.set(false);
                        }

                        // Если промокод еще не выбран выделяем первый промокод в списке
                        if ($scope.SelectedDiscount.id == null && res.data.data.length > 0) {
                            $scope.SelectedDiscount.set(res.data.data[0]);
                        } else if (res.data.data.length === 0) {
                            $scope.SelectedDiscount.clear();
                        }

                    } else
                        location.reload();

                    $scope.PromoCodeGridSettings.isLoading = false;

                //    }).error(function () {
                //        location.reload();
                //    });

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

    $scope.CloseSelectPromoCode = function () {
        $scope.CommonSearchFilter = '';
        $scope.SelectedDiscount.clear();
        $scope.AddingTariff.DisplayAddingTariffCtrl.setActive();
        $scope.NewPromo.clear();
    };

    $scope.EnterClick = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.PromoCodeGridSettings.refreshTable();
    }

}]);