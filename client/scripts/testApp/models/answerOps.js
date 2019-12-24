testApp.factory("answerOps",["$http","$q","SUBMIT_ANSWERS",
function($http, $q, SUBMIT_ANSWERS){
    return{
        submit(token, testid, answers){
            var req = {"token":token, "test":{"testid":testid}, "answers":answers}
            let defer = $q.defer();
            $http.post(SUBMIT_ANSWERS, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise
        }
    }
}])