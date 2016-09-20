angular.module('wikiApp')
    .factory('WikiFactory', ['$http', function($http) {

        function getWikipediaArticles(keyword) {

            var wikiApiStart = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
            var wikiApiEnd = '&callback=JSON_CALLBACK';

            return $http.jsonp(wikiApiStart + keyword + wikiApiEnd)
                .success(function(response) {
                    return response;
                });
        }

        return {
            getWikipediaArticles: getWikipediaArticles
        }
    }]);