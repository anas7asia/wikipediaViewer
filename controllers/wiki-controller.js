angular.module('wikiApp')
    .controller('WikiController', ['$scope', '$log', '$window', 'WikiFactory', function($scope, $log, $window, wikiFactory) {

        // retrive avaliable languages immediately
        $scope.langs = wikiFactory.getLanguages();
        // #keyword input value
        $scope.searchForm = {
            keyword: '',
            language: 'en' // english is by default
        };
        // array of retrieved articles after form submit
        $scope.wikiArticles = [];
        $scope.articlesLoading = false;
        $scope.autocompleteIsShown = false;

        // search an entire article
        $scope.searchWikiArticles = function() {
            $scope.autocompleteIsShown = false;
            $scope.articlesLoading = true;
            wikiFactory.getWikipediaArticles($scope.searchForm.language, $scope.searchForm.keyword)
                .then(function(data) {
                    $scope.wikiArticles = makePrettyJson(data.data.query.pages);
                    $scope.articlesLoading = false;
                });
        }

        // search for article titles to use them in autocomplete
        $scope.searchTitles = function(keyword) {
            // filtering input: if input.length is bigger then 3 and only after 1.5 seconds
            if(keyword.length >= 3) {
                setTimeout(function() {
                    wikiFactory.getWikipediaTitles($scope.searchForm.language, keyword)
                        .then(function(data) {
                            $scope.wikiTitles = makePrettyJson(data.data.query.pages);
                            $scope.autocompleteIsShown = true;
                        });
                }, 1500);
            }
        }

        // use autocomplete proposition as #keyword input value
        $scope.showAutocompleteTitles = function(word) {
            $scope.searchForm.keyword = word;
            $scope.autocompleteIsShown = false;
        }

        function makePrettyJson(json) {
            var result = [];
            var keys = Object.keys(json);
            keys.forEach(function(key){
                result.push(json[key]);
            });
            return result;
        }
     
    }]);