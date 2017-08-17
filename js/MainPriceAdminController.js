
/* Родительский контроллер для связи между дочерними */


priceAdminApp.controller('MainPriceAdminController', ['$scope', function ($scope) {

    $scope.MainControllers = {

        ActiveCtrl: 1,

        DisplayPriceListCtrl: {
            id: 1,
            price: {
                id: null,
                name: null,
                set: function (id, name) {
                    this.id = id;
                    this.name = name;
                }
            },
            setActive: function () {
                $scope.MainControllers.ActiveCtrl = this.id;
            },
            isActive: function () {
                return $scope.MainControllers.ActiveCtrl === this.id;
            }
        },

        PriceDetailCtrl: {
            id: 2,
            selectedSection: {
                id: null,
                set: function (id) {
                    this.id = id;
                }
            },
            selectedTariff: {
                id: null,
                name: null,
                set: function (id, name) {
                    this.id = id;
                    this.name = name;
                }
            },
            reloadPage: {
                value: true,
                set: function (val) {
                    this.value = val;
                }
            },
            setActive: function () {
                $scope.MainControllers.ActiveCtrl = this.id;
            },
            isActive: function () {
                return $scope.MainControllers.ActiveCtrl === this.id;
            }
        },

        AddingTariffCtrl: {
            id: 3,
            editExistTariff: {
                value: false,
                set: function (val) {
                    this.value = val;
                }
            },
            setActive: function () {
                $scope.MainControllers.ActiveCtrl = this.id;
            },
            isActive: function () {
                return $scope.MainControllers.ActiveCtrl === this.id;
            }
        }
    };


    $scope.FakeServer = {
        prices: {
            items: [
                { "PriceId": 1, "PriceName": "Прайс АстралОтчет Алтайский край - Республика Алтай", "RegionCode": "22", "Region": "Алтайский край", "GroupId": 4 },
                { "PriceId": 2, "PriceName": "Прайс АстралОтчет Алтайский край - Республика Алтай", "RegionCode": "04", "Region": "Республика Алтай", "GroupId": 4 },
                { "PriceId": 3, "PriceName": "Прайс АстралОтчет Амурская область - Еврейская автономная область", "RegionCode": "28", "Region": "Амурская область", "GroupId": 4 },
                { "PriceId": 4, "PriceName": "Прайс АстралОтчет Амурская область - Еврейская автономная область", "RegionCode": "79", "Region": "Еврейская автономная область", "GroupId": 4 },
                { "PriceId": 5, "PriceName": "Прайс АстралОтчет Архангельская область и Ненецкий автономный округ", "RegionCode": "29", "Region": "Архангельская область и Ненецкий автономный округ", "GroupId": 4 },
                { "PriceId": 6, "PriceName": "Прайс АстралОтчет Астраханская область", "RegionCode": "30", "Region": "Астраханская область", "GroupId": 4 },
                { "PriceId": 7, "PriceName": "Прайс АстралОтчет Белгородская область", "RegionCode": "31", "Region": "Белгородская область", "GroupId": 4 },
                { "PriceId": 8, "PriceName": "Прайс АстралОтчет Брянская область", "RegionCode": "32", "Region": "Брянская область", "GroupId": 4 },
                { "PriceId": 9, "PriceName": "Прайс АстралОтчет Владимирская область", "RegionCode": "33", "Region": "Владимирская область", "GroupId": 4 },
                { "PriceId": 10, "PriceName": "Прайс АстралОтчет Волгоградская область", "RegionCode": "34", "Region": "Волгоградская область", "GroupId": 4 },
                { "PriceId": 11, "PriceName": "Прайс АстралОтчет Вологодская область", "RegionCode": "35", "Region": "Вологодская область", "GroupId": 4 },
                { "PriceId": 12, "PriceName": "Прайс АстралОтчет Воронежская область", "RegionCode": "36", "Region": "Воронежская область", "GroupId": 4 },
                { "PriceId": 13, "PriceName": "Прайс АстралОтчет г. Москва", "RegionCode": "77", "Region": "г. Москва", "GroupId": 4 },
                { "PriceId": 14, "PriceName": "Прайс АстралОтчет Алтайский край - Республика Алтай", "RegionCode": "22", "Region": "Алтайский край", "GroupId": 4 },
                { "PriceId": 15, "PriceName": "Прайс АстралОтчет Алтайский край - Республика Алтай", "RegionCode": "04", "Region": "Республика Алтай", "GroupId": 4 },
                { "PriceId": 16, "PriceName": "Прайс АстралОтчет Амурская область - Еврейская автономная область", "RegionCode": "28", "Region": "Амурская область", "GroupId": 4 },
                { "PriceId": 17, "PriceName": "Прайс АстралОтчет Амурская область - Еврейская автономная область", "RegionCode": "79", "Region": "Еврейская автономная область", "GroupId": 4 },
                { "PriceId": 18, "PriceName": "Прайс АстралОтчет Архангельская область и Ненецкий автономный округ", "RegionCode": "29", "Region": "Архангельская область и Ненецкий автономный округ", "GroupId": 4 },
                { "PriceId": 19, "PriceName": "Прайс АстралОтчет Астраханская область", "RegionCode": "30", "Region": "Астраханская область", "GroupId": 4 },
                { "PriceId": 20, "PriceName": "Прайс АстралОтчет Белгородская область", "RegionCode": "31", "Region": "Белгородская область", "GroupId": 4 },
                { "PriceId": 21, "PriceName": "Прайс АстралОтчет Брянская область", "RegionCode": "32", "Region": "Брянская область", "GroupId": 4 },
                { "PriceId": 22, "PriceName": "Прайс АстралОтчет Владимирская область", "RegionCode": "33", "Region": "Владимирская область", "GroupId": 4 },
                { "PriceId": 23, "PriceName": "Прайс АстралОтчет Волгоградская область", "RegionCode": "34", "Region": "Волгоградская область", "GroupId": 4 },
                { "PriceId": 24, "PriceName": "Прайс АстралОтчет Вологодская область", "RegionCode": "35", "Region": "Вологодская область", "GroupId": 4 },
                { "PriceId": 25, "PriceName": "Прайс АстралОтчет Воронежская область", "RegionCode": "36", "Region": "Воронежская область", "GroupId": 4 },
                { "PriceId": 26, "PriceName": "Прайс АстралОтчет г. Москва", "RegionCode": "77", "Region": "г. Москва", "GroupId": 4 }],

            GetPriceList: function (data) {
                let res = this.items.slice((data.Page - 1) * data.Count, data.Page * data.Count);
                return { "status": "success", "data": { "totalCount": this.items.length, "data": res } };
            },

            GetPriceDetail: function () {
                return {
                    "status": "success", "data": [
                        {
                            "SectionId": 217, "SectionOrTariffName": "Подробное отображение тестового прайса", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 227, "SectionOrTariffName": "Первая группа", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 229, "SectionOrTariffName": "Подгруппа 1", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 229, "SectionOrTariffName": "Ребенок 1", "DirectionCount": 4, "PromoCodeList": null, "Cost": 650.00, "StartDate": null, "EndDate": "", "TariffId": 163, "children": null }, { "SectionId": 229, "SectionOrTariffName": "Ребенок 2", "DirectionCount": 4, "PromoCodeList": null, "Cost": 750.00, "StartDate": null, "EndDate": "", "TariffId": 162, "children": null }, { "SectionId": 229, "SectionOrTariffName": "Ребенок 3", "DirectionCount": 4, "PromoCodeList": null, "Cost": 950.00, "StartDate": null, "EndDate": "", "TariffId": 161, "children": null }, { "SectionId": 229, "SectionOrTariffName": "Ребенок 4", "DirectionCount": 4, "PromoCodeList": null, "Cost": 1150.00, "StartDate": null, "EndDate": "", "TariffId": 160, "children": null }, { "SectionId": 229, "SectionOrTariffName": "5", "DirectionCount": 4, "PromoCodeList": null, "Cost": 1250.00, "StartDate": null, "EndDate": "", "TariffId": 159, "children": null }, { "SectionId": 229, "SectionOrTariffName": "6", "DirectionCount": 4, "PromoCodeList": null, "Cost": 1550.00, "StartDate": null, "EndDate": "", "TariffId": 158, "children": null }] }, { "SectionId": 228, "SectionOrTariffName": "Подгруппа 2", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 228, "SectionOrTariffName": "1", "DirectionCount": 4, "PromoCodeList": null, "Cost": 700.00, "StartDate": null, "EndDate": "", "TariffId": 163, "children": null }, { "SectionId": 228, "SectionOrTariffName": "2", "DirectionCount": 4, "PromoCodeList": null, "Cost": 800.00, "StartDate": null, "EndDate": "", "TariffId": 162, "children": null }, { "SectionId": 228, "SectionOrTariffName": "3", "DirectionCount": 4, "PromoCodeList": null, "Cost": 1000.00, "StartDate": null, "EndDate": "", "TariffId": 161, "children": null }, { "SectionId": 228, "SectionOrTariffName": "4", "DirectionCount": 4, "PromoCodeList": null, "Cost": 1200.00, "StartDate": null, "EndDate": "", "TariffId": 160, "children": null }, { "SectionId": 228, "SectionOrTariffName": "5", "DirectionCount": 4, "PromoCodeList": null, "Cost": 1550.00, "StartDate": null, "EndDate": "", "TariffId": 159, "children": null }, { "SectionId": 228, "SectionOrTariffName": "6", "DirectionCount": 4, "PromoCodeList": null, "Cost": 2000.00, "StartDate": null, "EndDate": "", "TariffId": 158, "children": null }] }] }, {
                                "SectionId": 218, "SectionOrTariffName": "Вторая группа", "DirectionCount": 2, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 225, "SectionOrTariffName": "Подгруппа 1", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 226, "SectionOrTariffName": "Дополнительный", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 226, "SectionOrTariffName": "Стартовый", "DirectionCount": 1, "PromoCodeList": null, "Cost": 1500.00, "StartDate": null, "EndDate": "", "TariffId": 125, "children": null }, { "SectionId": 226, "SectionOrTariffName": "Базовый", "DirectionCount": 2, "PromoCodeList": null, "Cost": 1800.00, "StartDate": null, "EndDate": "", "TariffId": 131, "children": null }, { "SectionId": 226, "SectionOrTariffName": "Оптимальный", "DirectionCount": 3, "PromoCodeList": null, "Cost": 100.00, "StartDate": null, "EndDate": "", "TariffId": 139, "children": null }, { "SectionId": 226, "SectionOrTariffName": "Максимальный", "DirectionCount": 4, "PromoCodeList": null, "Cost": 200.00, "StartDate": null, "EndDate": "", "TariffId": 155, "children": null }] }, { "SectionId": 225, "SectionOrTariffName": "Стартовый", "DirectionCount": 1, "PromoCodeList": null, "Cost": 100.00, "StartDate": null, "EndDate": "", "TariffId": 124, "children": null }, { "SectionId": 225, "SectionOrTariffName": "Базовый", "DirectionCount": 2, "PromoCodeList": null, "Cost": 100.00, "StartDate": null, "EndDate": "", "TariffId": 130, "children": null }, { "SectionId": 225, "SectionOrTariffName": "Оптимальный", "DirectionCount": 3, "PromoCodeList": null, "Cost": 200.00, "StartDate": null, "EndDate": "", "TariffId": 138, "children": null }, { "SectionId": 225, "SectionOrTariffName": "Максимальный", "DirectionCount": 4, "PromoCodeList": null, "Cost": 200.00, "StartDate": null, "EndDate": "", "TariffId": 154, "children": null }] }, { "SectionId": 221, "SectionOrTariffName": "Подгруппа 2", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 222, "SectionOrTariffName": "Дополнительный", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 222, "SectionOrTariffName": "1", "DirectionCount": 1, "PromoCodeList": null, "Cost": 1350.00, "StartDate": null, "EndDate": "", "TariffId": 125, "children": null }, { "SectionId": 222, "SectionOrTariffName": "2", "DirectionCount": 2, "PromoCodeList": null, "Cost": 1700.00, "StartDate": null, "EndDate": "", "TariffId": 131, "children": null }, { "SectionId": 222, "SectionOrTariffName": "3584568", "DirectionCount": 3, "PromoCodeList": null, "Cost": 2300.00, "StartDate": null, "EndDate": "", "TariffId": 139, "children": null }, { "SectionId": 222, "SectionOrTariffName": "Важное", "DirectionCount": 4, "PromoCodeList": null, "Cost": 3000.00, "StartDate": null, "EndDate": "", "TariffId": 155, "children": null }] }, { "SectionId": 221, "SectionOrTariffName": "88", "DirectionCount": 1, "PromoCodeList": null, "Cost": 1500.00, "StartDate": null, "EndDate": "", "TariffId": 124, "children": null }, { "SectionId": 221, "SectionOrTariffName": "9999", "DirectionCount": 2, "PromoCodeList": null, "Cost": 1800.00, "StartDate": null, "EndDate": "", "TariffId": 130, "children": null }, { "SectionId": 221, "SectionOrTariffName": "888", "DirectionCount": 3, "PromoCodeList": null, "Cost": 2500.00, "StartDate": null, "EndDate": "", "TariffId": 138, "children": null }, { "SectionId": 221, "SectionOrTariffName": "87877 ", "DirectionCount": 4, "PromoCodeList": null, "Cost": 3200.00, "StartDate": null, "EndDate": "", "TariffId": 154, "children": null }] }, { "SectionId": 223, "SectionOrTariffName": "Подгруппа 3", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 224, "SectionOrTariffName": "Дополнительный", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 224, "SectionOrTariffName": "68549", "DirectionCount": 1, "PromoCodeList": null, "Cost": 700.00, "StartDate": null, "EndDate": "", "TariffId": 123, "children": null }, { "SectionId": 224, "SectionOrTariffName": "5585", "DirectionCount": 2, "PromoCodeList": null, "Cost": 900.00, "StartDate": null, "EndDate": "", "TariffId": 129, "children": null }, { "SectionId": 224, "SectionOrTariffName": "564", "DirectionCount": 3, "PromoCodeList": null, "Cost": 1500.00, "StartDate": null, "EndDate": "", "TariffId": 137, "children": null }, { "SectionId": 224, "SectionOrTariffName": "6849", "DirectionCount": 4, "PromoCodeList": null, "Cost": 2500.00, "StartDate": null, "EndDate": "", "TariffId": 153, "children": null }] }, { "SectionId": 223, "SectionOrTariffName": "55555", "DirectionCount": 1, "PromoCodeList": null, "Cost": 800.00, "StartDate": null, "EndDate": "", "TariffId": 122, "children": null }, { "SectionId": 223, "SectionOrTariffName": "984", "DirectionCount": 2, "PromoCodeList": null, "Cost": 1000.00, "StartDate": null, "EndDate": "", "TariffId": 128, "children": null }, { "SectionId": 223, "SectionOrTariffName": "878", "DirectionCount": 3, "PromoCodeList": null, "Cost": 1700.00, "StartDate": null, "EndDate": "", "TariffId": 136, "children": null }, { "SectionId": 223, "SectionOrTariffName": "684", "DirectionCount": 4, "PromoCodeList": null, "Cost": 2750.00, "StartDate": null, "EndDate": "", "TariffId": 152, "children": null }] }, { "SectionId": 219, "SectionOrTariffName": "Подгруппа 4", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 220, "SectionOrTariffName": "Дополнительный", "DirectionCount": 0, "PromoCodeList": null, "Cost": null, "StartDate": null, "EndDate": null, "TariffId": 0, "children": [{ "SectionId": 220, "SectionOrTariffName": "84", "DirectionCount": 1, "PromoCodeList": null, "Cost": 2000.00, "StartDate": null, "EndDate": "", "TariffId": 125, "children": null }, { "SectionId": 220, "SectionOrTariffName": "888", "DirectionCount": 2, "PromoCodeList": null, "Cost": 2350.00, "StartDate": null, "EndDate": "", "TariffId": 131, "children": null }, { "SectionId": 220, "SectionOrTariffName": "787", "DirectionCount": 3, "PromoCodeList": null, "Cost": 3100.00, "StartDate": null, "EndDate": "", "TariffId": 139, "children": null }, { "SectionId": 220, "SectionOrTariffName": "5555", "DirectionCount": 4, "PromoCodeList": null, "Cost": 3700.00, "StartDate": null, "EndDate": "", "TariffId": 155, "children": null }] }, { "SectionId": 219, "SectionOrTariffName": "4554", "DirectionCount": 1, "PromoCodeList": null, "Cost": 2200.00, "StartDate": null, "EndDate": "", "TariffId": 124, "children": null }, { "SectionId": 219, "SectionOrTariffName": "8748", "DirectionCount": 2, "PromoCodeList": null, "Cost": 2500.00, "StartDate": null, "EndDate": "", "TariffId": 130, "children": null }, { "SectionId": 219, "SectionOrTariffName": "888", "DirectionCount": 3, "PromoCodeList": null, "Cost": 3300.00, "StartDate": null, "EndDate": "", "TariffId": 138, "children": null }, { "SectionId": 219, "SectionOrTariffName": "888", "DirectionCount": 4, "PromoCodeList": null, "Cost": 4050.00, "StartDate": null, "EndDate": "", "TariffId": 154, "children": null }] }, { "SectionId": 218, "SectionOrTariffName": "Запись 1", "DirectionCount": 0, "PromoCodeList": null, "Cost": 0.0, "StartDate": null, "EndDate": "", "TariffId": 7, "children": null }, { "SectionId": 218, "SectionOrTariffName": "Запись 2", "DirectionCount": 0, "PromoCodeList": null, "Cost": 10.00, "StartDate": null, "EndDate": "", "TariffId": 352, "children": null }, { "SectionId": 218, "SectionOrTariffName": "Запись 3", "DirectionCount": 0, "PromoCodeList": null, "Cost": 20.00, "StartDate": null, "EndDate": "", "TariffId": 351, "children": null }, { "SectionId": 218, "SectionOrTariffName": "Запись 4", "DirectionCount": 0, "PromoCodeList": null, "Cost": 30.00, "StartDate": null, "EndDate": "", "TariffId": 350, "children": null }, { "SectionId": 218, "SectionOrTariffName": "Запись 5", "DirectionCount": 0, "PromoCodeList": null, "Cost": 40.00, "StartDate": null, "EndDate": "", "TariffId": 349, "children": null }, { "SectionId": 218, "SectionOrTariffName": "Запись 6", "DirectionCount": 0, "PromoCodeList": null, "Cost": 50.00, "StartDate": null, "EndDate": "", "TariffId": 346, "children": null }, { "SectionId": 218, "SectionOrTariffName": "Запись 7", "DirectionCount": 3, "PromoCodeList": null, "Cost": 350.00, "StartDate": null, "EndDate": "", "TariffId": 254, "children": null }]
                            }]
                        }]
                };
            },

            GetSectionTree: function () {
                return {"status":"success","data":[{"SectionId":217,"SectionName":"Прейскурант по региону Астраханская область АО Астрал Отчет","children":[{"SectionId":227,"SectionName":"Для группы юридических лиц","children":[{"SectionId":229,"SectionName":"Бюджет ЦБ","children":[]},{"SectionId":228,"SectionName":"Группа компаний","children":[]}]},{"SectionId":218,"SectionName":"Для юридических лиц и индивидуальных предпринимателей","children":[{"SectionId":225,"SectionName":"Бюджет","children":[{"SectionId":226,"SectionName":"Дополнительный абонент","children":[]}]},{"SectionId":221,"SectionName":"ЕНВД/УСНО","children":[{"SectionId":222,"SectionName":"Дополнительный абонент","children":[]}]},{"SectionId":223,"SectionName":"ИП","children":[{"SectionId":224,"SectionName":"Дополнительный абонент","children":[]}]},{"SectionId":219,"SectionName":"ОСНО","children":[{"SectionId":220,"SectionName":"Дополнительный абонент","children":[]}]}]}]}]}  
            },

            GetTariff: function () {
               return {"status":"success","data":{"TariffName":"Внеплановая смена КЭП","DisplayTariffName":"Внеплановая смена реквизитов","StartDate":{"Year":"2014","Month":"11","Day":"8"},"EndDate":{"Year":"","Month":"","Day":""},"TariffPriceList":[{"TariffPriceValue":500,"StartDate":{"Year":"2015","Month":"5","Day":"23"},"EndDate":{"Year":"","Month":"","Day":""}}],"PromoCodeList":[{"UseLimit":null,"DiscountId":47,"DiscountName":"Промокод для всех тарифов по АО","Article":"super","DiscountValue":null,"TypeOfUnit":"%","IsPercent":false}]}}
            }
        },

        tariffs: {
            GetExist: function () {
                return { "status": "success", "data": { "totalCount": 10, "page": 1, "data": [{ "TariffId": 216, "TariffName": "АРМ-Уполномоченный представитель", "TariffGroupId": 3, "TariffType": "Основная лицензия", "DirectionCount": 4, "FixedDirections": "", "Restrictions": "", "IsEgrul": false }, { "TariffId": 300, "TariffName": "АРМ-Уполномоченный представитель (продление на год)", "TariffGroupId": 3, "TariffType": "Основная лицензия", "DirectionCount": 4, "FixedDirections": "", "Restrictions": "Пролонгация", "IsEgrul": false }, { "TariffId": 251, "TariffName": "Астрал-Налогоплательщик", "TariffGroupId": 3, "TariffType": "Расширение лицензии", "DirectionCount": 0, "FixedDirections": "", "Restrictions": "", "IsEgrul": false }, { "TariffId": 217, "TariffName": "Внеплановая смена КЭП", "TariffGroupId": 3, "TariffType": "Расширение лицензии", "DirectionCount": 0, "FixedDirections": "", "Restrictions": "", "IsEgrul": false }, { "TariffId": 299, "TariffName": "Внеплановая смена реквизитов для абонента АЦ", "TariffGroupId": 3, "TariffType": "Расширение лицензии", "DirectionCount": 0, "FixedDirections": "", "Restrictions": "Клиент уполномоченного представителя", "IsEgrul": false }] } };
            },

            GetPromo: function () {
                return { "status": "success", "data": { "totalCount": 10, "page": 1, "data": [{ "DiscountId": 60, "DiscountName": "86604 венд проц", "Article": "86604venproc", "DiscountValue": null, "TypeOfUnit": "%" }, { "DiscountId": 63, "DiscountName": "86604 венд проц 3", "Article": "86604venproc3", "DiscountValue": null, "TypeOfUnit": "%" }, { "DiscountId": 57, "DiscountName": "86604 венд руб", "Article": "86604venrub", "DiscountValue": null, "TypeOfUnit": "руб." }, { "DiscountId": 61, "DiscountName": "86604 венд руб 2", "Article": "86604venrub2", "DiscountValue": null, "TypeOfUnit": "руб." }, { "DiscountId": 62, "DiscountName": "86604 венд руб 3", "Article": "86604venrub3", "DiscountValue": null, "TypeOfUnit": "руб." }] } }
            }
        }
    };
}]);
