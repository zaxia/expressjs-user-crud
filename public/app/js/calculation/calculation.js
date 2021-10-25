$("#test_calculation").on("click", () => {
    axios.get(BASE_API+"calculation/test").then(function(result){
        console.log(result);
    }, function(error){
        console.log(error);
    });
});