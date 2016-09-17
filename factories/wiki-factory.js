angular.module('wikiApp')
    .factory('WikiFactory', ['$scope', '$log', function($scope, $log) {

        function getWikipediaArticles(keyword) {

            var wikiApiStart = '';
            var wikiApiEnd = '';

            return $http.jsonp(wikiApiStart + keyword + wikiApiEnd)
                .success(function(response) {
                    return response;
                });
        }

        return {
            getWikipediaArticles: getWikipediaArticles
        }
    }]);