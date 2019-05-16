const tape = require("tape");
const runDbBuild = require("../src/database/db_build");
const getData = require("../src/queries/getUserData");
const postData = require("../src/queries/postUserData");

tape("tape is working", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});
tape('getData', (t)=> {
  runDbBuild(function(err, res){
   console.log('your test goes here');
   t.error(err, "No Error"); //Assert that db_build finished successfully with no errors
    let expected = [
      {
        id: 1,
        first_name: "Nareman",
        last_name: "Fero"
      }
    ];
    getData((err, result) => {
      if (err) console.log(err);
      t.deepEqual(result, expected, "Returns expected data");
      t.end();
    });
  });
});
tape("PostData", t => {
  runDbBuild(function(err, res) {
    t.error(err, "No Error");

    postData("Minesh", "London", (err, result) => {
      if (err) console.log(err);
      getData((err, result) => {
        if (err) console.log(err);
        t.deepEqual(result.length, 2, "Returns expected data");
        t.end();
      });
    });
  });
});
