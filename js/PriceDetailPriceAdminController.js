
/* Подробная информация о прайсе  */


priceAdminApp.controller('PriceDetailPriceAdminController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {

    $scope.$watch(function () { return $scope.MainControllers.ActiveCtrl }, function () {

        if ($scope.MainControllers.PriceDetailCtrl.isActive()) {

            if ($scope.MainControllers.PriceDetailCtrl.reloadPage.value)
                $scope.PriceDetailGridSettings.startPriceDetailLoad();
            else
                $scope.MainControllers.PriceDetailCtrl.reloadPage.set(true);
        }
    });

    $scope.DeactivateTariff = {
        message: {
            isOpen: false,
            clear: function () {
                this.isOpen = false;
            }
        },
        checkBeforeRequest: function () {
            if ($scope.MainControllers.PriceDetailCtrl.selectedTariff.id == null)
                return;

            this.message.isOpen = true;
        },
        start: function () {
            
            //$http({
            //    url: '',
            //    method: "POST",
            //    data: {
            //        sectionId: $scope.MainControllers.PriceDetailCtrl.selectedSection.id,
            //        tariffId: $scope.MainControllers.PriceDetailCtrl.selectedTariff.id
            //    }
            //}).success(function (res) {
            //    if (res.status == 'success') {
            //        $scope.PriceDetailGridSettings.startPriceDetailLoad();
            //    } else
            //        location.reload();

            //    $scope.DeactivateTariff.message.clear();

            //}).error(function () {
            //    location.reload();
            //});
        }
    };

    $scope.PriceDetailGridSettings = {
        data: [],
        expandingProperty: {
            field: 'SectionOrTariffName',
            displayName: 'Секции тарифы',
            cellTemplateScope: {
                isCurrentSectionSelected: function(branch) {
                    if (branch.TariffId !== 0) {
                        return $scope.MainControllers.PriceDetailCtrl.selectedSection.id === branch.SectionId &&
                            $scope.MainControllers.PriceDetailCtrl.selectedTariff.id === branch.TariffId;
                    } else {
                        return $scope.MainControllers.PriceDetailCtrl.selectedSection.id === branch.SectionId &&
                            $scope.MainControllers.PriceDetailCtrl.selectedTariff.id == null;
                    }
                },
                setCurrentSectionSelected: function(branch) {

                    if (branch.TariffId !== 0) {

                        if ($scope.MainControllers.PriceDetailCtrl.selectedSection.id === branch.SectionId &&
                            $scope.MainControllers.PriceDetailCtrl.selectedTariff.id === branch.TariffId && !this.editTariff.value) {
                            $scope.MainControllers.PriceDetailCtrl.selectedSection.set(null);
                            $scope.MainControllers.PriceDetailCtrl.selectedTariff.set(null);
                        } else {
                            $scope.MainControllers.PriceDetailCtrl.selectedSection.set(branch.SectionId);
                            $scope.MainControllers.PriceDetailCtrl.selectedTariff.set(branch.TariffId, branch.SectionOrTariffName);
                        }

                    } else {

                        if ($scope.MainControllers.PriceDetailCtrl.selectedSection.id === branch.SectionId) {
                            $scope.MainControllers.PriceDetailCtrl.selectedSection.set(null);
                        } else if ($scope.MainControllers.PriceDetailCtrl.selectedSection.id !== branch.SectionId) {
                            $scope.MainControllers.PriceDetailCtrl.selectedSection.set(branch.SectionId);
                            $scope.MainControllers.PriceDetailCtrl.selectedTariff.set(null);
                        }
                    }


                    if (this.editTariff.value) {
                        $scope.MainControllers.AddingTariffCtrl.editExistTariff.set(true);
                        $scope.MainControllers.AddingTariffCtrl.setActive();
                        this.editTariff = false;
                    }

                },
                editTariff: false
}
        },
        col_defs: [{
            field: 'DirectionCount',
            displayName: 'Направления',
            cellTemplate: "<span ng-repeat=\"i in cellTemplateScope.getDirectionCountArrayLocal(row.branch[col.field]) track by $index\" class=\"fa fa-briefcase\"></span>",
            cellTemplateScope: {
                getDirectionCountArrayLocal: function (count) {
                    return $scope.PriceDetailGridSettings.getDirectionCountArray(count);
                }
            }
        }, {
            field: 'promoCodeList',
            displayName: 'Промокод',
            cellTemplate: "<span></span>"
        }, {
            field: 'Cost',
            displayName: 'Цена (руб.)'
        }, {
            field: "StartDate",
            displayName: 'Дата начала'
        }, {
            field: 'EndDate',
            displayName: 'Дата окончания'
        }],
        isLoading: false,
        startPriceDetailLoad: function () {
            this.isLoading = true;
            this.data = [];

            //$http({
            //    url: '',
            //    method: "POST",
            //    data: { priceId: $scope.MainControllers.DisplayPriceListCtrl.price.id }
            //}).success(function (res) {
            
            let res = $scope.FakeServer.prices.GetPriceDetail();

            if (res.status == 'success') {

                $scope.PriceDetailGridSettings.data = res.data;

            } else
                location.reload();

            $scope.PriceDetailGridSettings.isLoading = false;

            //}).error(function () {
            //    location.reload();
            //});
        },
        getDirectionCountArray: function (count) {
            return new Array(count);
        }
    };

    /* Показ главного окна при инициализации всех контроллеров */
    $scope.onReady = function () {
        var angularScope = angular.element('#MainPriceAdminController').scope();
        angularScope.mainReady = true;
        angularScope.$apply();

        $('.main-container').css('display', 'block').addClass('fadeIn').addClass('animated');
    };

    setTimeout(function () {
        $scope.onReady();
    }, 700);
    
}]);