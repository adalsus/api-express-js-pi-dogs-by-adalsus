const { objSeq } = require('../db.js')

const insertTempseq = async (dataJSON) => {
   try {
      dataJSON.namesTemps = dataJSON.namesTemps.trim()
      //console.log(dataJSON)
      const { searchTemps } = require('../../fns/fnsApi.js')
      const valueJSON_sT = await searchTemps(dataJSON)
      if (valueJSON_sT===undefined) {
         require('../../fns/fnsApi.js').removeFile('./src/var/dataGt_g.json')
         const { orden_dataJSON } = require('../../fns/fnsApi.js')
         const formoNewCombi = { 'namesTemps':orden_dataJSON(dataJSON) }
         //console.log(formoNewCombi)
         return await objSeq.models.Temps.create(formoNewCombi)
      } else {
         return valueJSON_sT
      }
   } catch (error) {
      return { 'error': error.message }
   }
}


module.exports = insertTempseq