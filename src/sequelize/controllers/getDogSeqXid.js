const { objSeq } = require('../db.js') 

const getDogSeqXid = async id => {
   let valueDogSeq
   if (objSeq.models.Dogs!==undefined) {
      await objSeq.models.Dogs.findByPk(id,
         {  
            include: { 
               model: objSeq.models.Temps,
               attributes: ['namesTemps'],
               required: false
            }  
         }
      ).then(Dog_Seq => {
         if (Dog_Seq!==null) {
            let dogJSON = JSON.parse(JSON.stringify(Dog_Seq, null, 2))
            valueDogSeq = dogJSON
         }
         return valueDogSeq
      })
   }
   return valueDogSeq
}

module.exports = getDogSeqXid