testApp.factory("reviewOps",["$http","$q","ANALYSE_REVIEW","REVIEW_TEST",
function($http, $q, ANALYSE_REVIEW, REVIEW_TEST){
    return{
        analyse(review){
            var req = {"review": ""+review}
            var defer = $q.defer()
            $http.post(ANALYSE_REVIEW, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise
        },
        sendRev(token, testid, review, sentiment){
            var req = {"token": token, "test":{"testid": testid}, "review":{"content":review, "sentiment":sentiment}}
            var defer = $q.defer();
            $http.post(REVIEW_TEST, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise
        }
    }
}])