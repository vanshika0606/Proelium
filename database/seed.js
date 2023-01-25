const mongoose = require("mongoose");
const Data = require("../model/Booking_Model.js");

const fetch = require("node-fetch");

const connectDatabase = async () => {
  let resultData;
  let saveCounter = 0;
  await mongoose
    .connect("mongodb://localhost:27017/Data")
    .then(() => console.log("mongodb connection success"))
    .catch((error) => console.log(error));
  const url = ["https://s3.amazonaws.com/roxiler.com/product_transaction.json"];
  url.map(async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("m");
      resultData = [...json];

      for (let i = 0; i < resultData.length; i++) {

        let data = new Data({
          id: resultData[i].id,
          title: resultData[i].title,
          price: resultData[i].price,
          description: resultData[i].description,
          category: resultData[i].category,
          image: resultData[i].image,
          sold: resultData[i].sold,
          dateOfSale: resultData[i].dateOfSale.slice(0, 10),
        });
        data.save((err, result) => {
          saveCounter++;
          if (err) {
            console.log(err);
          }
          
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = connectDatabase;
