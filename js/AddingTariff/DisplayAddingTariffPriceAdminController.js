
/* Отображение окна добавления тарифа в секцию прайса  */


priceAdminApp.controller('DisplayAddingTariffPriceAdminController', ['$scope', '$uibModal', '$filter', '$http', function ($scope, $uibModal, $filter, $http) {

    $scope.$watch(function () { return $scope.MainControllers.ActiveCtrl }, function () {

        if ($scope.MainControllers.AddingTariffCtrl.isActive() && $scope.AddingTariff.DisplayAddingTariffCtrl.isActive()) {
            $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.setSelectedSection($scope.MainControllers.PriceDetailCtrl.selectedSection.id, $scope.MainControllers.PriceDetailCtrl.selectedSection.id);

            if ($scope.MainControllers.AddingTariffCtrl.editExistTariff.value) {
                $scope.MainControllers.AddingTariffCtrl.editExistTariff.set(false);

                $scope.Tariff.editTariff.set(true);
                $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.setSelectedTariff($scope.MainControllers.PriceDetailCtrl.selectedTariff.id);
                $scope.Tariff.getDataAboutExitsTariff();
            }

            $scope.SectionGridSettings.startSectionsLoad();
        }
    });

    $scope.$watchGroup([function () { return $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.id }, function () { return $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id }], function () {
        $scope.Tariff.tariffAlreadyAdded.checkTariffAlreadyAdded();
    });

    $scope.$watch(function () { return $scope.AddingTariff.SelectPromoCodeCtrl.selectedDiscount.id }, function () {

        if ($scope.AddingTariff.SelectPromoCodeCtrl.selectedDiscount.id === null) return;

        var promo = $scope.AddingTariff.SelectPromoCodeCtrl.selectedDiscount.get();
        $scope.Tariff.promoCode.addedPromo[$scope.AddingTariff.SelectPromoCodeCtrl.editPromoCodeIndex.value].DiscountId = promo.DiscountId;
        $scope.Tariff.promoCode.addedPromo[$scope.AddingTariff.SelectPromoCodeCtrl.editPromoCodeIndex.value].DiscountName = promo.DiscountName;
        $scope.Tariff.promoCode.addedPromo[$scope.AddingTariff.SelectPromoCodeCtrl.editPromoCodeIndex.value].Article = promo.Article;
        $scope.Tariff.promoCode.addedPromo[$scope.AddingTariff.SelectPromoCodeCtrl.editPromoCodeIndex.value].DiscountValue = promo.DiscountValue;
        $scope.Tariff.promoCode.addedPromo[$scope.AddingTariff.SelectPromoCodeCtrl.editPromoCodeIndex.value].TypeOfUnit = promo.TypeOfUnit;

    });


    $scope.SelectedSection = {
        isSectionAreaOpen: false,
        pathToSection: '',
        refreshPathToSection: function () {
            this.pathToSection = this.getPathToSection($scope.SectionGridSettings.data, $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id);
        },
        getPathToSection: function (sectionArray, sectionId) {

            for (var i = 0; i < sectionArray.length; i++) {

                if (sectionArray[i].SectionId == sectionId)
                    return sectionArray[i].SectionName;

                var name = this.getPathToSection(sectionArray[i].children, sectionId);
                if (name)
                    return sectionArray[i].SectionName + ' / ' + name;
            }
        },
        clear: function () {
            this.isSectionAreaOpen = false;
            this.pathToSection = '';
        }
    };

    $scope.SectionGridSettings = {
        data: [],
        isLoading: false,
        expandingProperty: {
            field: 'SectionName',
            cellTemplateScope: {
                isCurrentSectionSelected: function (branch) {
                    return $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id === branch.SectionId;
                },
                setCurrentSectionSelected: function (branch) {
                    $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.setSelectedSection(branch.SectionId);
                    $scope.SelectedSection.refreshPathToSection();

                    if ($scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id !== $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.originalId)
                        $scope.Tariff.startDate = new Date();
                    else
                        $scope.Tariff.startDate = $scope.Tariff.originStartDate;
                }
            }
        },
        startSectionsLoad: function () {
            if ($scope.MainControllers.DisplayPriceListCtrl.price.id == null) return;

            this.isLoading = true;
            this.data = [];

            //$http({
            //    url: '',
            //    method: "POST",
            //    data: { priceId: $scope.MainControllers.DisplayPriceListCtrl.price.id }
            //}).success(function (res) {

            let res = $scope.FakeServer.prices.GetSectionTree();
            if (res.status == 'success') {

                $scope.SectionGridSettings.data = res.data;
                $scope.SelectedSection.refreshPathToSection();

            } else
                location.reload();

            $scope.SectionGridSettings.isLoading = false;

            //}).error(function () {
            //    location.reload();
            //});
        }
    };

    $scope.DatePickerSettings = {
        startingDay: 1,
        showWeeks: false,
        minDate: null,
        maxDate: null
    };

    $scope.CheckBySave = {
        isNeedEditTariffDates: false,
        errorList: [],
        warningList: [],
        set: function (isNeed, errorList, warningList) {
            this.isNeedEditTariffDates = isNeed;
            this.errorList = errorList;
            this.warningList = warningList;
        }
    };

    $scope.Tariff = {
        nameInPrice: '',
        startDate: new Date(),
        originStartDate: new Date(),
        endDate: '',
        tariffPrice: {
            create: function (val, start, end) {
                return {
                    TariffPriceValue: val,
                    TariffPriceStartDate: start,
                    TariffPriceEndDate: end
                };
            },
            addedPrices: [],
            addPrice: function (price) {
                if (price)
                    this.addedPrices.push(price);
                else
                    this.addedPrices.push(this.create(0, new Date(), null));
            },
            deletePrice: function (index) {
                this.addedPrices.splice(index, 1);
            }
        },

        promoCode: {
            promoCodeArea: {
                isVisible: false,
                isOpen: false,
                set: function(val) {
                    this.isOpen = val;

                    if (val)
                        setTimeout(function () {
                            $scope.Tariff.promoCode.promoCodeArea.isVisible = val;
                        }, 0.5);
                    else
                        this.isVisible = val;
                }
            },
            addedPromo: [],
            createPromo: function() {
                return {
                    DiscountId: null,
                    DiscountName: null,
                    Article: null,
                    DiscountValue: null,
                    TypeOfUnit: null
                };
            },
            addPromo: function () {
                this.addedPromo.push(this.createPromo());
            },
            deletePromo: function (index) {
                this.addedPromo.splice(index, 1);
            },
            goToSelectPromo: function (index) {
                $scope.AddingTariff.SelectPromoCodeCtrl.editPromoCodeIndex.set(index);
                $scope.AddingTariff.SelectPromoCodeCtrl.alredySelectedDiscounts = this.addedPromo;
                $scope.AddingTariff.SelectPromoCodeCtrl.selectedDiscount.set(this.addedPromo[index]);
                $scope.AddingTariff.SelectPromoCodeCtrl.setActive();
            }
        },

        editTariff: {
            value: false,
            set: function (val) {
                if (val)
                    $scope.Tariff.startDate = null;

                this.value = val;
            }
        },

        clear: function () {
            this.editTariff.set(false);
            this.nameInPrice = '';
            this.startDate = new Date();
            this.originalStartDate = new Date();
            this.endDate = '';
            this.tariffPrice.addedPrices = [];
            this.promoCode.addedPromo = [];
            this.promoCode.promoCodeArea.set(false);
        },

        checkAndSave: function (savingConfirmed) {
            if ($scope.IsLoading) return;

            //$scope.IsLoading = true;
            $scope.CheckBySave.set(false, [], []);

        //    $http({
        //        url: '',
        //        method: "POST",
        //        data: {
        //            data: {
        //                SectionId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id,
        //                OriginalSectionId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.originalId,
        //                TariffId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.id,
        //                DisplayTariffName: this.nameInPrice,
        //                StartDate: this.startDate,
        //                EndDate: this.endDate,
        //                TariffPriceList: $scope.Tariff.tariffPrice.addedPrices,
        //                PromoCodeList: $scope.Tariff.promoCode.addedPromo
        //            },
        //            isWarningConfirmed: savingConfirmed,
        //            isUpdateTariff: $scope.Tariff.editTariff.value
        //}
        //    }).success(function (res) {
        //        if (res.status == 'success') {

        //            if (res.data.Status == 'success')
        //                $scope.CloseAddingTariff(true);

        //            if (res.data.Status == 'error')
        //                $scope.CheckBySave.set(false, res.data.ErrorList, []);

        //            if (res.data.Status == 'warning')
        //                $scope.CheckBySave.set(true, [], res.data.ErrorList);

        //        } else
        //            location.reload();

        //        $scope.IsLoading = false;

        //    }).error(function () {
        //        location.reload();
        //    });

        },
        tariffAlreadyAdded: {
            value: false,
            set: function (val) {
                this.value = val;
            },
            isCheckNotActual: function () {
                return $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id == null ||
                    $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.id == null ||
                    ($scope.Tariff.editTariff.value && !$scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.isSectionChanged());
            },
            checkTariffAlreadyAdded: function () {
                if (this.isCheckNotActual()) {
                    this.set(false);
                    return;
                }

                //$http({
                //    url: '', method: "POST", data: { sectionId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id, tariffId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.id }
                //}).success(function (res) {
                //    if (res.status === 'success')
                //        $scope.Tariff.tariffAlreadyAdded.set(res.data);
                //    else
                //        location.reload();
                //}).error(function () {
                //    location.reload();
                //});
            }
        },
        getDataAboutExitsTariff: function () {
            $scope.IsLoading = true;

            //$http({
            //    url: '',
            //    method: "POST",
            //    data: { sectionId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id, tariffId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.id }
            //}).success(function (res) {

            let res = $scope.FakeServer.prices.GetTariff();

            if (res.status == 'success') {
                $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.name = res.data.TariffName;
                $scope.Tariff.nameInPrice = res.data.DisplayTariffName;

                $scope.Tariff.startDate = res.data.StartDate.Year && res.data.StartDate.Month && res.data.StartDate.Day ?
                        new Date(res.data.StartDate.Year, res.data.StartDate.Month, res.data.StartDate.Day) : null;

                $scope.Tariff.originStartDate = res.data.StartDate.Year && res.data.StartDate.Month && res.data.StartDate.Day ?
                        new Date(res.data.StartDate.Year, res.data.StartDate.Month, res.data.StartDate.Day) : null;

                $scope.Tariff.endDate = res.data.EndDate.Year && res.data.EndDate.Month && res.data.EndDate.Day ?
                        new Date(res.data.EndDate.Year, res.data.EndDate.Month, res.data.EndDate.Day) : null;

                $scope.Tariff.promoCode.addedPromo = res.data.PromoCodeList;

                for (var i = 0; i < res.data.TariffPriceList.length; i++) {

                    var startDate = res.data.TariffPriceList[i].StartDate.Year && res.data.TariffPriceList[i].StartDate.Month && res.data.TariffPriceList[i].StartDate.Day ?
                        new Date(res.data.TariffPriceList[i].StartDate.Year, res.data.TariffPriceList[i].StartDate.Month, res.data.TariffPriceList[i].StartDate.Day) : null;

                    var endDate = res.data.TariffPriceList[i].EndDate.Year && res.data.TariffPriceList[i].EndDate.Month && res.data.TariffPriceList[i].EndDate.Day ?
                        new Date(res.data.TariffPriceList[i].EndDate.Year, res.data.TariffPriceList[i].EndDate.Month, res.data.TariffPriceList[i].EndDate.Day) : null;

                    $scope.Tariff.tariffPrice.addPrice($scope.Tariff.tariffPrice.create(res.data.TariffPriceList[i].TariffPriceValue, startDate, endDate));
                }
            } else
                location.reload();

            $scope.IsLoading = false;

            //}).error(function () {
            //    location.reload();
            //});

        }
    };

    $scope.ClearAddingTariff = function () {
        $scope.AddingTariff.DisplayAddingTariffCtrl.clear();
        $scope.Tariff.clear();
        $scope.CheckBySave.set(false, [], []);
        $scope.SelectedSection.clear();
    };

    /* Модальное окно при закрытии окна */
    $scope.CheckModalAndCloseAddingTariff = function (withModal, reloadPriceDetail) {

        if (withModal) {

            var modalInstance = $uibModal.open({
                animation: true,
                ariaDescribedBy: 'modal-body-top',
                templateUrl: 'modalAlertBeforeCloseAddingTariff.html',
                size: 'md',
                controller: 'modalAlertBeforeCloseAddingTariffCtrl'
            });

            modalInstance.result.then(function () { $scope.CloseAddingTariff(reloadPriceDetail) }, function () { });

        } else {
            $scope.CloseAddingTariff(reloadPriceDetail);
        }
    };

    $scope.CloseAddingTariff = function (reloadPriceDetail) {

        $scope.ClearAddingTariff();

        if (!reloadPriceDetail)
            $scope.MainControllers.PriceDetailCtrl.reloadPage.set(false);

        $scope.MainControllers.PriceDetailCtrl.setActive();
    };

}]);


/* Закрытие модального окна */
priceAdminApp.controller('modalAlertBeforeCloseAddingTariffCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);