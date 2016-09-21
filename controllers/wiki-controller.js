angular.module('wikiApp')
    .controller('WikiController', ['$scope', '$log', 'WikiFactory', function($scope, $log, wikiFactory) {

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
        $scope.isAutocompleteVisible = false;

        // search an entire article
        $scope.searchWikiArticles = function() {
            $scope.isAutocompleteVisible = false;
            $scope.articlesLoading = true;
            wikiFactory.getWikipediaArticles($scope.searchForm.language, $scope.searchForm.keyword)
                .then(function(data) {
                    if(data.data.query) {
                        $scope.wikiArticles = makePrettyJson(data.data.query.pages);
                        $scope.articlesLoading = false;
                    }
                    else {
                        setTimeout(function() {
                            $scope.articlesLoading = false;
                        }, 1000);
                    }
                });
        }

        // search for article titles to use them in autocomplete
        $scope.searchTitles = function(keyword) {
            // filtering input: if input.length is bigger then 3 and timeout is set as ng-model-options
            if(keyword.length >= 3) {

                wikiFactory.getWikipediaTitles($scope.searchForm.language, keyword)
                    .then(function(data) {
                        $log.log(data);
                        if(data.data.query) {
                            $scope.wikiTitles = makePrettyJson(data.data.query.pages);
                            $scope.isAutocompleteVisible = true;
                        }
                    });

            }
        }

        // use autocomplete proposition as #keyword input value
        $scope.showAutocompleteTitles = function(keyword) {
            $scope.searchForm.keyword = keyword;
        }

        // transform pure JSON to array of objects
        function makePrettyJson(json) {
            var result = [];
            var keys = Object.keys(json);
            keys.forEach(function(key){
                result.push(json[key]);
            });
            return result;
        }
    }]);