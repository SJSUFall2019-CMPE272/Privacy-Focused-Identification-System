var express = require('express');
var router = express.Router();
const axios = require('axios');
const config = require('../../../config/config')

/*
   * This api returns the schema_id and 
   * cred_def_id info
*/
router.post('/schema', (req, res) => {
 const {attributes, schema_name} = req.body;
 console.log(attributes)
 console.log(JSON.parse(attributes))
 console.log(['score2','passport_id2'])
 const request = {
     "attributes":JSON.parse(attributes),
     "schema_name":"fgfhfdf",
     "schema_version":"1.0"
 }
 
 var data = ""
 axios.post(config.issuerURL+'schemas',request,{
    headers: {
        'Content-Type': 'application/json',
    }
})
  .then(response => {
    data = response.data
     if(data.schema_id!="" && data.schema_id!=null){
         const cred_req = {
             "schema_id":data.schema_id,
             "tag":"default"
         }
        axios.post(config.issuerURL+'credential-definitions',cred_req,{
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response=>{
                res.send({
                    success:true,
                    data:{   
                        "schema_id":cred_req.schema_id,
                        "credential_definition_id":response.data.credential_definition_id
                        },
                    errMsg:""
                });
            })
            .catch(err=>{
                res.send({
                    success:false,
                    data:null,
                    errMsg:"Could not fetch credential definition info"
                })
            });
    } 
    //res.send(data);
  })
  .catch(error => {
    res.send({
        success:false,
        data:null,
        errMsg:"Could not create schema"
    })
  });

  //res.json(data)
});

router.post('/sendOffer',(req, res)=> {
    const credential_definition_id = req.body.credential_definition_id
    const attributes = req.body.attributes
    axios.get(config.issuerURL+'connections')
    .then(response=>{
       console.log(response.data.results[0])
       const connection_id = response.data.results[0].connection_id;
       const request = {
                        "credential_preview": {
                        "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
                        "attributes": JSON.parse(attributes)/* [
                            {
                            "name": "score2",
                            
                            "value": "10"
                            },
                        {
                            "name": "passport_id2",
                            "value": "19"
                        }
                        ] */
                        },
                        "comment": "string",
                        "cred_def_id": credential_definition_id,
                        "connection_id": connection_id,
                        "auto_issue": true
                     }
        
        axios.post(config.issuerURL+'issue-credential/send-offer',request,{
            headers: {
                'Content-Type': 'application/json',
            }}).then(response=>{
                console.log(response.data);
                //res.send(response.data)
                res.send({
                    success:true,
                    data:response.data,
                    errMsg:""
                });

            })

         })
  /*  const request = {
        "credential_preview": {
          "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
          "attributes": [
            {
              "name": "score",
              
              "value": "10"
            },
           {
             "name": "passport_id",
              "value": "19"
           }
          ]
        },
        "comment": "string",
        "cred_def_id": "Btso2j5FydxDQGR2UVqjVw:3:CL:22:default",
        "connection_id": "44aa2e35-f36e-4f3e-a29f-a76d42ae6ae8",
        "auto_issue": true
      } */
});

var schemaAttributes=[];
var getAttributes = (schema_ids) => {
    return new Promise((resolve, reject) => {
        var promises = []
        for(schema_id of schema_ids) {
            
            console.log(schema_id+" --")
           k =  axios.get(config.issuerURL+'schemas/'+schema_id)
           promises.push(k)
           console.log(k) 
           k.then(resp => {
            console.log(resp.data.schema_json.attrNames)
            var tempjson = {
                'schema_id' :schema_id,
                'attributes':resp.data.schema_json.attrNames
            }
            schemaAttributes.push(tempjson);
        })
        }
        Promise.all(promises).then(values => {
            resolve();
        })
    }) 
}
router.get('/schemaAttributes',(req,res) => {
    var schema_ids=[];
    //var schemaAttributes=[];
    var promises = []
    axios.get(config.issuerURL+'schemas/created')
    .then(response => {
        console.log(response.data)
        schema_ids = response.data.schema_ids;
        //console.log(schema_ids)
        getAttributes(schema_ids).then(()=>{
            res.send(schemaAttributes);
        })
       /*  for(schema_id of schema_ids) {
            console.log(schema_id+" --")
           k =  axios.get(config.issuerURL+'schemas/'+schema_id)
           promises.push(k)
           console.log(k) 
           k.then(resp => {
            console.log(resp.data.schema_json.attrNames)
            var tempjson = {
                'schema_id' :schema_id,
                'attributes':resp.data.schema_json.attrNames
            }
            schemaAttributes.push(tempjson);
        }) */
           /* .then(resp => {
                console.log(resp.data.schema_json.attrNames)
                var tempjson = {
                    'schema_id' :schema_id,
                    'attributes':resp.data.schema_json.attrNames
                }
                schemaAttributes.push(tempjson);
            }) */
       // }
        /* Promise.all(promises).then(
            
            res.send(schemaAttributes));
        
    }) */
})
});

module.exports = router;