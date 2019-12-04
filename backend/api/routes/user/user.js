var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../../../config/config')
var SimpleCrypto = require("simple-crypto-js").default;
var _secretKey = "sdhabdaskdbjabdjksnd";
var simpleCrypto = new SimpleCrypto(_secretKey);
var User = require("../../models/user");

router.post('/getcred', (req, res) => {
    let ans = []
    console.log(req.user.id)
    axios.get(config.userURL + 'credentials')
        .then(response => {

            console.log(response.data.results)
            response.data.results.forEach(element => {
                if (element.attrs.user_id === req.user.id) {
                    let first = element.schema_id.indexOf(":") + 3
                    let second = element.schema_id.lastIndexOf(":");
                    console.log(element.schema_id.slice(first, second));
                    element["schema_name"] = element.schema_id.slice(first, second);
                    ans.push(element)
                }
            }
            );

            res.send({
                success: true,
                data: ans,
                errMsg: ""
            });
        })
        .catch(err => {
            res.send({
                success: false,
                data: null,
                errMsg: "Could not fetch any credential info"
            })
        });
})

router.post('/getencrypt', (req, res) => {
    var data = {
        referent: req.body.referent,
        attrs: req.body.attrs
    };
    var encrypted = simpleCrypto.encrypt(data);
    //console.log("Encryption process...");
    //console.log("Plain Object     : " + plainObject);
    console.log("Encrypted Object : " + encrypted);
    res.send({
        success: true,
        data: encrypted,
        errMsg: ""
    });
})




router.post('/verify', (req, res) => {
    console.log(req.body.data)
    var decrypted = simpleCrypto.decrypt(req.body.data, true);

    let a = JSON.parse(decrypted.attrs)
    let b = {}
    //a.push("sasd")

    axios.get(config.userURL + 'credentials', decrypted.referent, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {

            console.log(response.data.results[0].attrs)
            a.forEach(att => {
                console.log(att)
                if (response.data.results[0].attrs[att]) {
                    b[att] = response.data.results[0].attrs[att]
                } else {
                    res.send({
                        success: true,
                        data: null,
                        errMsg: "Attribute not preasent in id"
                    });
                }
            })
            console.log(b)
            res.send({
                success: true,
                data: b,
                errMsg: ""
            });
        })
        .catch(err => {
            res.send({
                success: false,
                data: null,
                errMsg: "Could not fetch any credential info"
            })
        });

})

router.get('/getalluser', (req, res) => {
    console.log("Inside Get all User");
    User.find({type: 0})
        .exec()
        .then(result => {
            //console.log(result);
            res.send({
                success: true,
                data: result,
                errMsg: ""
            });
        })
        .catch(err => {
            console.log(err);
            res.send({
                success: false,
                data: null,
                errMsg: "DB Error"
            });
        })
});



module.exports = router;