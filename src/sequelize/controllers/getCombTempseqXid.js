const { objSeq } = require('../db.js')


const getCombTempseqXid = async id => {
   let valorCombTempseq
   if (objSeq.models.Temps!==undefined) {
      await objSeq.models.Temps.findByPk(id)
      .then(CombTemp=>{
         if (CombTemp!==null) {
            let CombTempJSON_s = JSON.stringify(CombTemp, null, 2)
            let CombTempJSON = JSON.parse(CombTempJSON_s)
            valorCombTempseq = CombTempJSON
         }
         return valorCombTempseq      
      })
   }
   return valorCombTempseq
}



module.exports = getCombTempseqXid