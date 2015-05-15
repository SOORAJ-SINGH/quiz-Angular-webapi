/*The constructor function of the QuizCtrl controller expects an injectable parameter named $scope. 
The initial state of the scope should be set up in the constructor function by attaching properties to 
    the $scope object. The properties contain the view model, and will be accessible to the template 
    when the controller is registered.
    */
angular.module('QuizApp', [])
    .controller('QuizCtrl', function ($scope, $http) {
        $scope.answered = false;
        $scope.title = "Loading question...";
        $scope.options = [];
        $scope.correctAnswers = false;
        $scope.working = false;

        $scope.answer = function () {
            return $scope.correctAnswers ? 'correct' : 'incorrect';
        };


        //This function retrieves the next question from the Trivia Web API created in
        //the previous exercise and attaches the question data to the $scope object.
        $scope.nextQuestion = function () {
            $scope.working = true;
            $scope.answered = false;
            $scope.title = "loading question...";
            $scope.options = [];

            $http.get("/api/trivia").success(function (data, status, headers, config) {
                $scope.options = data.options;
                $scope.title = data.title;
                $scope.answered = false;
                $scope.working = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "Oops... something went wrong";
                $scope.working = false;
            });

        };


        //This function sends the answer selected by the user to the Trivia Web API and
        //stores the result –i.e. if the answer is correct or not– in the $scope object.
        $scope.sendAnswer = function (option) {
            $scope.working = true;
            $scope.answered = true;

            $http.post('/api/trivia', { 'questionId': option.questionId, 'optionId': option.id }).success(function (data, status, headers, config) {
                $scope.correctAnswers = (data == true);
                $scope.working = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "Oops... something went wrong";
                $scope.working = false;
            });
        };

    });