const { objSeq } = require('../db.js')

const saveToTemp = async (array_objs_temp) => {
   try {
      await (require('../models/Temperaments.js').Temperaments)(objSeq,{force: true},'(re)created')
      return await objSeq.models.Temperaments.bulkCreate(array_objs_temp)
   } catch(error) {
      return { 'error': error.message }
   }
}

module.exports = saveToTemp