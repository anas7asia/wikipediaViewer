angular.module('wikiApp')
    .controller('WikiController', ['$scope', '$log', 'WikiFactory', function($scope, $log, wikiFactory) {

        $scope.wikiArticles = [];

        wikiFactory.getWikipediaArticles()
            .then(function(data) {
                $scope.wikiArticles = data;
            })
    }]);