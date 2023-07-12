const { objSeq } = require('../db.js')

const getDogseq = async () => {
   let arrayDogseq
   if (objSeq.models.Dogs!==undefined) {
      await objSeq.models.Dogs.findAll(
         {
            include: { 
               model: objSeq.models.Temps,
               attributes: ['namesTemps'],
               required: false
            }  
         }
      ).then(Dogs=>{
         if (Dogs!==null) {
            let dogsJSON_s = JSON.stringify(Dogs, null, 2)
            let dogsJSON = JSON.parse(dogsJSON_s)
            arrayDogseq = dogsJSON
         }
         return arrayDogseq      
      })
   }
   return arrayDogseq
}


module.exports = getDogseq