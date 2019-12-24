userApp.factory("userOps",["$http","$q","REGISTER_USER", "LOGIN_USER", "FETCH_PROFILE", "UPDATE_PASSWORD",
function($http, $q, REGISTER_USER, LOGIN_USER, FETCH_PROFILE, UPDATE_PASSWORD){
    return{
        register(user){
            var req = {"user":user}
            console.log(req)
            let defer = $q.defer()
            $http.post(REGISTER_USER, req).then((data)=>{
                defer.resolve(data.data);
            }).catch((err)=>{
                defer.reject(err.data);
                console.log("reject",err.data);
            })
            return defer.promise;
        },
        login(user){
            var req = {"user":user}
            let defer=$q.defer();
            $http.post(LOGIN_USER,req).then((data)=>{
                defer.resolve(data.data);
            },(err)=>{
                defer.reject(err.data);
            });
            return defer.promise;
        },
        fetch(token){
            var req = {"token":token}
            let defer = $q.defer()
            $http.post(FETCH_PROFILE, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise
        },
        update(token, newPwd, oldPwd,newEmail){
            var req = {"token":token, "user":{"newpassword":newPwd, "oldpassword":oldPwd,"newemail":newEmail}}
            let defer = $q.defer();
            $http.post(UPDATE_PASSWORD, req).then((data)=>{
                defer.resolve(data.data)
            }).catch((err)=>{
                defer.reject(err.data)
            })
            return defer.promise;
        }
    }
}])