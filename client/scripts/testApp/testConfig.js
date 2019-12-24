//testRoutes
testApp.constant("CREATE_TEST", "http://localhost:1234/test/create");
testApp.constant("FETCH_TEST", "http://localhost:1234/test/fetch");
testApp.constant("DELETE_TEST", "http://localhost:1234/test/delete");

//answerRoutes
testApp.constant("SUBMIT_ANSWERS", "http://localhost:1234/answer/create");

//reviewRoutes
testApp.constant("ANALYSE_REVIEW", "http://localhost:5000/review")   //python server call
testApp.constant("REVIEW_TEST", "http://localhost:1234/review/send")