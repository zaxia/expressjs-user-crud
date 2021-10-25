var socket = io.connect();
var app = new Vue({
    el: '#app',
    data: {
        users:null,
        search:"",
        btn_text:"Enregistrer",
        user:{},
        add_conditions: {login_ok: false, password_ok: false, confirm_ok: false},
        editing_user: null
    },
    methods:{
        getUsers: function(){
            var self = this;
            axios.get(BASE_API+"user/list").then(function(result){
                self.users = result.data.data;
            }, function(error){
                console.log(error);
            });
        },
        onSearch: function() {
            var self = this;
            axios.get(BASE_API+"user/search?text="+self.search).then(function(result){
                self.users = result.data.data;
            }, function(error){
                console.log(error);
            });
        },
        onSave: function() {
            var self = this;
            if (self.editing_user == null) {
                if(self.add_conditions.login_ok && self.add_conditions.password_ok && self.add_conditions.confirm_ok){
                    axios.post(BASE_API+"user/add",self.user).then(function(result){
                    Swal.fire(
                        'Ajout',
                        `L\'utilisateur ${self.user.login} a bien été ajouté.`,
                        'success'
                    );
                    self.user = {};
                    self.getUsers();
                }, function(error){
                    console.log(error);
                });
                }
            }else{
                axios.put(BASE_API+"user/edit/"+self.editing_user,self.user).then(function(result){
                    Swal.fire(
                        'Modification',
                        `L\'utilisateur ${self.user.login} a bien été modifié.`,
                        'success'
                    );
                    self.editing_user = null;
                    self.getUsers();
                }, function(error){
                    console.log(error);
                });
            }
        },
        onAdd:function(){
            this.user = {};
            this.btn_text = "Enregistrer";
            $(".password").show();
            $(".password input").prop("disabled", false);
        },
        onEdit:function(data){
            var self = this;
            self.btn_text = "Modifier";
            $(".password").hide();
            $(".password input").prop("disabled", true);
            axios.get(BASE_API+"user/get/"+data.login).then(function(result){
                self.user = result.data.data;
                self.editing_user = self.user.login;
                $('#myModal').modal({show:true});
            }, function(error){
                console.log(error);
            });
        },
        onDelete:function(data){
            var self = this;
            Swal.fire({
                title: 'Confirmation',
                text: "Êtes-vous sûr de vouloir supprimer "+data.login,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmer'
            }).then((result) => {
                if (result.value) {
                    axios.delete(BASE_API+"user/delete/"+data.login).then(function(result){
                        Swal.fire(
                            'Utilisateur supprimé',
                            data.login+' a bien été supprimé.',
                            'success'
                        );
                        self.getUsers();
                        socket.emit('user:deleted',data.login);
                    }, function(error){
                        console.log(error);
                    });
                }
            }); 
        },
        checkUsername:function(event){
            var self = this;
            let login = event.target.value;
            axios.get(BASE_API+"user/checkUsername?login="+login).then(function(result){
                if(result.data.data == null){
                    $("#login-result").html('');
                    $(event.target).css("background-color", "");
                    $(event.target).css("opacity", "");
                    self.add_conditions.login_ok=true;
                } else {
                    $("#login-result").html('Cet identifiant n\'est pas disponible');
                    $(event.target).css("background-color", "red");
                    $(event.target).css("opacity", "0.5");
                    self.add_conditions.login_ok=false;
                }
            }, function(error){
                console.log(error);
            });
        },
        checkPassword:function(event){
            var self = this;
            let value = event.target.value;
            if(value!="" && (value.match(/([a-zA-Z])/) && value.match(/([0-9])/) && value.match(/([!,%,&,@@,#,$,^,*,?,_,~])/))){
                $("#password-result").html('');
                $("#password").css("background-color", "");
                $("#password").css("opacity", "");
                self.add_conditions.password_ok=true;
            } else {
                $("#password-result").html('Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial');
                $("#password").css("background-color", "red");
                $("#password").css("opacity", "0.5");
                self.add_conditions.password_ok=false;
            }
            this.checkConfirm();
        },
        checkConfirm:function(){
            var self = this;
            if($("#confirm").val()!=$("#password").val()){
                $("#confirm").css("background-color", "red");
                $("#confirm").css("opacity", "0.5");
                self.add_conditions.confirm_ok=false;
            } else {
                $("#confirm").css("background-color", "");
                $("#confirm").css("opacity", "");
                self.add_conditions.confirm_ok=true;
            }
        }
    },
    mounted: function () {
        this.getUsers();
    }
});