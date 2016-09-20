angular.module('wikiApp')
    .controller('WikiController', ['$scope', '$log', 'WikiFactory', function($scope, $log, wikiFactory) {

        $scope.wikiArticles = [];

        $scope.searchWikiArticles = function(kword) {
            $log.log(kword);
            wikiFactory.getWikipediaArticles(kword)
                .then(function(data) {
                    $scope.wikiArticles = data.data.query.pages;
                    $log.log($scope.wikiArticles);
                })
        } 
    }]);