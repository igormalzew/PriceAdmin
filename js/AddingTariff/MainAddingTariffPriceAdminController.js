
/* Добавление тарифа в секцию прайса  */


priceAdminApp.controller('MainAddingTariffPriceAdminController', ['$scope', function ($scope) {

    $scope.AddingTariff = {

        ActiveCtrl: 1,

        DisplayAddingTariffCtrl: {
            id: 1,
            selectedTariff: {
                id: null,
                name: null,
                setSelectedTariff: function (id, name) {
                    this.id = id;
                    this.name = name;
                }
            },
            selectedSection: {
                id: null,
                originalId: null,
                isSectionChanged: function () {
                    return this.id !== this.originalId;
                },
                setSelectedSection: function (id, originalId) {
                    this.id = id;
                    if (originalId)
                        this.originalId = originalId;
                }
            },
            clear: function() {
                this.selectedTariff.setSelectedTariff(null, null);
                this.selectedSection.setSelectedSection(null, null);
            },
            setActive: function () {
                $scope.AddingTariff.ActiveCtrl = this.id;
            },
            isActive: function () {
                return $scope.AddingTariff.ActiveCtrl === this.id;
            }
        },


        SelectExistTariffCtrl: {
            id: 2,

            setActive: function () {
                $scope.AddingTariff.ActiveCtrl = this.id;
            },
            isActive: function () {
                return $scope.AddingTariff.ActiveCtrl === this.id;
            }
        },


        SelectPromoCodeCtrl: {
            id: 3,

            editPromoCodeIndex: {
                value: null,
                set: function(val) {
                    this.value = val;
                }
            },
            
            alredySelectedDiscounts: [],
            selectedDiscount: {
                id: null,
                name: null,
                article: null,
                value: null,
                typeOfUnit: null,
                set: function (promo) {
                    this.id = promo.DiscountId;
                    this.name = promo.DiscountName;
                    this.article = promo.Article;
                    this.value = promo.DiscountValue;
                    this.typeOfUnit = promo.TypeOfUnit;
                },
                get: function() {
                    return {
                        DiscountId: this.id,
                        DiscountName: this.name,
                        Article: this.article,
                        DiscountValue: this.value,
                        TypeOfUnit: this.typeOfUnit
                    }
                },
                clear: function () {
                    this.id = null;
                    this.name = null;
                    this.article = null;
                    this.value = null;
                    this.typeOfUnit = null;
                }
            },

            setActive: function () {
                $scope.AddingTariff.ActiveCtrl = this.id;
            },
            isActive: function () {
                return $scope.AddingTariff.ActiveCtrl === this.id;
            }
        }

    };
}]);