$("#send_email").on("click", () => {
    axios.post(BASE_API+"email/send", $('#email_form').serialize()).then(function(result){
        Swal.fire(
            'Envoi',
            `L'email a bien été envoyé`,
            'success'
        );
    }, function(error){
        console.log(error);
    });
});