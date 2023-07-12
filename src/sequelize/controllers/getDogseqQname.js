const { objSeq } = require('../db.js') 
const { Op } = require("sequelize")


const getDogseqQname = async name => {
   let arrayDogseq
   if (objSeq.models.Dogs!==undefined) {
      await objSeq.models.Dogs.findAll(
         {
            where: { 
               name: { [Op.iLike]:`%${name}%` }
            },
            include: { 
               model: objSeq.models.Temps,
               attributes: ['namesTemps'],
               required: false 
            }
         }
      ).then(Dogs_Seq => {
         if (Dogs_Seq!==null) {
            let dogsJSON = JSON.parse(JSON.stringify(Dogs_Seq, null, 2))
            //console.log(dogsJSON)
            arrayDogseq = dogsJSON
         }
         return arrayDogseq
      })
   }
   return arrayDogseq
}


module.exports = getDogseqQname