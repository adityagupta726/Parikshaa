testApp.factory("testDelete",["$http","$q","DELETE_TEST",
function($http, $q, DELETE_TEST){
    return{
        delete(token, testid){
            var req = {"token":token, "test":{"testid":testid}}
            let defer = $q.defer()
            $http.post(DELETE_TEST, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise;
        }
    }
}])