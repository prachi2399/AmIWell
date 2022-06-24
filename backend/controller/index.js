var request = require("request-promise");

const predictDiagnosis = async (req, res) => {
  const { symptoms } = req.body;
  // This variable contains the data
  // you want to send
  var data = {
    array: symptoms,
  };

  console.log(data, "shshj");

  var options = {
    method: "POST",

    // http:flaskserverurl:port/route
    uri: "http://127.0.0.1:5000/predict-diagnosis",
    body: data,

    // Automatically stringifies
    // the body to JSON
    json: true,
  };

  await request(options)
    // The parsedBody contains the data
    // sent back from the Flask server
    .then(function (parsedBody) {
      console.log(parsedBody);

      // You can do something with
      // returned data
      let result;
      result = parsedBody["result"];
      res.json({ data: result });
      //   console.log("Sum of Array from Python: ", result);
    })
    .catch(function (err) {
      res.status(500).json({ error: "Not Found" });
    });
};

module.exports = {
  predictDiagnosis,
};
