const { objSeq } = require('../db.js')

const insertDogSeq = async (dataJSON,hostname,_API_KEY) => {
   try {
      const { getLast_id } = require('../../fns/fnsApi.js')
      const valueLast_id = await getLast_id(objSeq,hostname,_API_KEY)
      //console.log('valueLast_id ->',valueLast_id)
      //console.log(dataJSON)
      dataJSON.id = valueLast_id + 1


      
      //let p_dataGt_g = require('../../var/dataGt_g.json')
      //console.log(p_dataGt_g)
      
      //console.log('dataJSON.id_Temps-> ',dataJSON.id_Temps)
      //console.log(typeof(dataJSON.id_Temps))
      if (typeof(dataJSON.id_Temps)==='number') {
         let valor_namesTemps = null
         //Inicia proceso de traer, si es que existe, la combinación de temperamentos, de aquel id, en la db
         const getCombTempseqXid = require('./getCombTempseqXid.js')
         const valueCombTempseq = await getCombTempseqXid(dataJSON.id_Temps)
         //console.log('valueCombTempseq')
         //console.log(valueCombTempseq)
         if (valueCombTempseq===undefined) { 
            dataJSON.id_Temps = null
         } else { valor_namesTemps = valueCombTempseq.namesTemps }
         //Fin proceso de traer, si es que existe, la combinación de temperamentos, de aquel id, en la db
         //if (valor_namesTemps!==null) {
         //   dataJSON["Temp"] = {"namesTemps": valor_namesTemps}
         //}
      } else {
         dataJSON.id_Temps = null
      }
      


      //let p_dataJSON_n = JSON.parse(JSON.stringify(dataJSON, null, 2))
      //p_dataGt_g.push(p_dataJSON_n)
            
      //const fs = require('fs');
      // add new content update of the JSON file
      //try {
         //console.log(p_dataGt_g, null, 2)
      //   fs.writeFileSync(
      //      './src/var/dataGt_g.json',
      //      JSON.stringify(p_dataGt_g, null, 2)
      //   )
      //} catch (e) { console.log(e); }



      return await objSeq.models.Dogs.create(dataJSON)
   } catch (error) {
      return { 'error': error.message }
   }
}

module.exports = insertDogSeq