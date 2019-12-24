testApp.factory("testOps",["$http","$q","FETCH_TEST","CREATE_TEST",
function($http, $q, FETCH_TEST, CREATE_TEST){
    return{
        fetch(token, testid){
            var req = {"token":token, "test":{"testid":testid}}
            console.log(req);
            // return;
            let defer = $q.defer()
            $http.post(FETCH_TEST, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise;
        },
        create(token,test, questions){
            test.duration=test.newduration;
            var req = {"token":token, "test":test, "questions":questions}
            let defer = $q.defer()
            $http.post(CREATE_TEST, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise;
        }
    }
}])