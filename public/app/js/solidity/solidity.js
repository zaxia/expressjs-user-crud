const tests_done = new Array();

$("#test_solidity").on("click", () => {
    tests_done.push({errors: new Array(), results: new Array(), total_errors: 0});
    let test = tests_done.at(-1);
    // let promises = new Array();
    for(let i=0; i<5000; i++){
        // let promise = new Promise((resolve, reject) => {
            axios.get(BASE_API+"solidity/test").then(function(result){
                console.log("ok");
                // test.results.push(result);
                // resolve();
            }, function(error){
                // console.log(error);
                // test.errors.push(error);
                test.total_errors++;
                // reject();
            });
        // });
        // promises.push(promise);
    }
    // Promise.all(promises).then(() => {
    //     console.log(errors.length);
    //     console.log(errors);
    //     console.log(results);
    // }).catch(()=>{
    //     console.log(errors.length);
    //     console.log(errors);
    //     console.log(results);
    // }).then(() => {});
});
