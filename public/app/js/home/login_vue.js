var app = new Vue({
    el: '#app',
    data: {
        user:{}
    },
    methods:{
        login: function() {
            var self = this;
            $("#result-login").html("");
            $("#result-password").html("");
            axios.post(BASE_API+"login",self.user).then(function(result){
                console.log(result);
                if(result.data.data=="user_not_found"){
                    $("#result-login").html("Utilisateur introuvable");
                } else if(result.data.data=="wrong_password"){
                    $("#result-password").html("Mot de passe incorrect");
                } else {
                    window.location.href = "/";
                }
            });
        }
    },
    mounted: function () {
    }
});