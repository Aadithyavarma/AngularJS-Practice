var myApp = angular.module('myApp', ['ngRoute']);

// Routing module
myApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {

            templateUrl: 'pages/first.html',
            controller: 'mainController'

        })

        .when('/second', {

            templateUrl: 'pages/second.html',
            controller: 'secondController'

        })

        .when('/second/:num', {

            templateUrl: 'pages/second.html',
            controller: 'secondController'

        })

        .when('/third', {

            templateUrl: 'pages/third.html',
            controller: 'thirdController'

        })

        .otherwise({
            redirect: '/'
        })

});


// Custom service
myApp.service('emailService', function () {

    var self = this;
    this.name = "sampleemail@gmail.com";
    this.nameReturn = function () {

        return self.name;

    };

});

// Controller for first page
myApp.controller('mainController', ['$scope', '$filter', '$location', '$log', 'emailService', function ($scope, $filter, $location, $log, emailService) {

    $scope.handle = emailService.nameReturn();

    $scope.lowercasehandle = function () {
        return $filter('lowercase')($scope.handle);
    };

    emailService.name = $scope.lowercasehandle();

    $scope.$watch('handle', function () {
        emailService.name = $scope.lowercasehandle();
    });

    $scope.minCharacters = 10;
    $scope.maxCharacters = 30;

    $scope.rules = [
        {
            rulename: "Must be unique"
        },
        {
            rulename: "Must be between 10 and 30 characters"
        },
        {
            rulename: "Must be cool"
        },
        {
            rulename: "Converts capital letters in the text box to lowercase automatically"
        },
        {
            rulename: "Email address is passed to third page"
        }
    ];

    $scope.newRule = function () {
        var element = {};
        element.rulename = $scope.addRule;
        $scope.rules.push(element);
        $log.info($scope.rules);

    };

}]);

//Controller for second page
myApp.controller('secondController', ['$scope', '$log', '$routeParams', function ($scope, $log, $routeParams) {

    $scope.num = ($routeParams.num) || 1;

    $log.info("SecondPage");

    $scope.persons = [
        {
            name: 'Person 1',
            address: 'VIT University, Vellore, Tamil Nadu 632014'
    },
        {
            name: 'Person 2',
            address: 'VIT University, Chennai, Tamil Nadu 600048'
    },
        {
            name: 'Person 3',
            address: 'SRM University, Chennai, Tamil Nadu 603203'
    },
                     ]

}]);

// Custom directive which is used in second page
myApp.directive("addressReturn", function () {
    return {
        restrict: 'EC',
        templateUrl: 'myDirectives/address.html',
        replace: true,
        scope: {    
            personName: "@",
            personAddress: "@"
        }
    }
});

// Controller for third page
myApp.controller('thirdController', ['$scope', '$log', 'emailService', function ($scope, $log, emailService) {

    $scope.email = emailService.nameReturn();

    $log.info("ThirdPage");

}]);