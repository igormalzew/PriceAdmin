
/* Добавление уже существующего тарифа в секцию прайса  */


priceAdminApp.controller('SelectExistTariffPriceAdminController', ['$scope', '$uibModal', '$http', 'ngTableParams', function ($scope, $uibModal, $http, ngTableParams) {

    $scope.$watch(function () { return $scope.AddingTariff.ActiveCtrl }, function () {

        if ($scope.AddingTariff.SelectExistTariffCtrl.isActive()) {

            $scope.SelectedTariff.setSelectedTariff($scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.id, $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.name);

            $scope.ExistTariffGridSettings.startDataLoad();
        }
    });

    $scope.SelectedTariff = {
        id: null,
        name: null,

        setSelectedTariff: function (id, name) {
            this.id = id;
            this.name = name;

            this.tariffAlreadyAdded.checkTariffAlreadyAdded();
        },
        isFirstOpen: {
            value: true,
            set: function (val) {
                this.value = val;
            }
        },
        tariffAlreadyAdded: {
            value: false,
            set: function (val) {
                this.value = val;
            },
            isCheckNotActual: function () {
                return $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id == null ||
                    $scope.SelectedTariff.id == null;
            },
            checkTariffAlreadyAdded: function () {
                if (this.isCheckNotActual()) {
                    this.set(false);
                    return;
                }

                //$http({
                //    url: '', method: "POST", data: { sectionId: $scope.AddingTariff.DisplayAddingTariffCtrl.selectedSection.id, tariffId: $scope.SelectedTariff.id }
                //}).success(function (res) {
                //    if (res.status === 'success')
                //        $scope.SelectedTariff.tariffAlreadyAdded.set(res.data);
                //    else
                //        location.reload();
                //}).error(function () {
                //    location.reload();
                //});
            }
        },
        setParentSelectedTariff: function () {
            if (this.id != null) {
                $scope.AddingTariff.DisplayAddingTariffCtrl.selectedTariff.setSelectedTariff(this.id, this.name);
            }
        }
    };

    $scope.ExistTariffGridSettings = {

        data: new ngTableParams(),

        startDataLoad: function () {
            this.data = this.getTableParams();
        },

        isLoading: false,

        tariffGroupTypes: {
            3: { name: "Астрал Отчет", icon: "fa fa-files-o" }
        },

        getTableParams: function () {
            return new ngTableParams({
                sorting: {
                    TariffName: 'asc'
                },
                count: 5
            }, {
                getData: function ($defer, params) {
                    if ($scope.SelectedTariff.BlockRequest) { $scope.SelectedTariff.BlockRequest = false; return; }

                    $scope.ExistTariffGridSettings.isLoading = true;
                    var filters = JSON.parse(JSON.stringify(params.filter()));
                    filters.CommonSearchFilter = $scope.CommonSearchFilter;

                    //$http({
                    //    url: 'PriceAdmin/GetExistTariffs',
                    //    method: "POST",
                    //    data: {
                    //        Page: params.page(),
                    //        Count: params.count(),
                    //        Sort: params.sorting(),
                    //        Filter: filters,
                    //        EntityId: $scope.SelectedTariff.isFirstOpen.value ? $scope.SelectedTariff.id : null
                    //    }
                    //}).success(function (res) {

                    let res = $scope.FakeServer.tariffs.GetExist();

                    if (res.status == 'success') {
                        $defer.resolve(res.data.data);
                        params.total(res.data.totalCount);

                        if ($scope.SelectedTariff.isFirstOpen.value) {
                            if (params.page() !== res.data.page) {
                                $scope.SelectedTariff.BlockRequest = true;
                                params.page(res.data.page);
                            }
                            $scope.SelectedTariff.isFirstOpen.set(false);
                        }

                        // Если тариф еще не выбран выделяем первый тариф в списке
                        if ($scope.SelectedTariff.id == null && res.data.data.length > 0) {
                            $scope.SelectedTariff.setSelectedTariff(res.data.data[0].TariffId, res.data.data[0].TariffName);
                        } else if (res.data.data.length === 0) {
                            $scope.SelectedTariff.setSelectedTariff(null, null);
                        }

                    } else
                        location.reload();

                    $scope.ExistTariffGridSettings.isLoading = false;

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

    $scope.CloseSelectExistTariff = function () {
        $scope.SelectedTariff.setSelectedTariff(null, null);
        $scope.SelectedTariff.isFirstOpen.set(true);
        $scope.SelectedTariff.tariffAlreadyAdded.set(false);
        $scope.CommonSearchFilter = '';

        $scope.AddingTariff.DisplayAddingTariffCtrl.setActive();
    };

    $scope.EnterClick = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.ExistTariffGridSettings.refreshTable();
    }

}]);