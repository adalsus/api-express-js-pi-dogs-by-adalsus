const { objSeq } = require('../db.js')

const insertDogSeq = async (dataJSON,hostname,_API_KEY) => {
   try {
      const { getLast_id } = require('../../fns/fnsApi.js')
      const valueLast_id = await getLast_id(objSeq,hostname,_API_KEY)
      //console.log('valueLast_id ->',valueLast_id)
      //console.log(dataJSON)
      dataJSON.id = valueLast_id + 1
      return await objSeq.models.Dogs.create(dataJSON)
   } catch (error) {
      return { 'error': error.message }
   }
}

module.exports = insertDogSeq