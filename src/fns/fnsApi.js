const fdeco = require('./fnB_deco.js');
const axios = require('axios')

const last_idDogs = async sequelize => {
   let value_id;
   await sequelize.models.Dogs.findOne({
      order: [
         ['id', 'DESC'],
      ]
   }).then(Dogs=>{
      //console.log(Dogs)
      if (Dogs!==null) {
         value_id = Dogs.id;
      }
   })
   return value_id;
};

const last_idBreeds = async url_req => {
   let value_id;
   await axios.get(url_req)
   .then(Breeds=>{
      //console.log(Breeds.data[0].id)
      if (Breeds!==null) {
         value_id = Breeds.data[0].id;
      }
   })
   return value_id;
};

const antepongo = (prefijo,numero) => {
   return parseInt(`${prefijo}${numero}`)
}

const to_sync = async (UnoTodos,option,mensaje) => {
   try {
      (option===null) ? await UnoTodos.sync(): await UnoTodos.sync(option)
      .then(
        () => {if (mensaje!==null) return console.log(mensaje)}
      )
   } catch(error) {
      console.log(error.message);
   }
}

//Funcion interna que Ordena Arrays
function sortDogsBy(property, data) {  
   return data.sort((a, b) => {
      return a[property] >= b[property] ? 1 : -1
   })
}//Fin instrucciones de Funcion interna que Ordena Arrays
const gDataGt = async (hostname,_API_KEY) => {
   let fs = require('fs')

   let dataGt_l_ordById
   if (!fs.existsSync('./src/var/dataGt_g.json')) {   
   
      let dataGt_l
      var url_arm = `${hostname}?api_key=${_API_KEY}`
      await axios.get(url_arm)
      .then(async Breeds=>{
         //console.log(Breeds.data[0])
         if (Breeds!==null) {
            dataGt_l = await Breeds.data;
            removeFile('./src/var/dataGt_g.json',fs)
            var writeStream = fs.createWriteStream('./src/var/dataGt_g.json');
            writeStream.write(JSON.stringify(await dataGt_l))
            writeStream.end();
         }
      })
      var idRazas = []
      for (let index in dataGt_l) {
         idRazas.push(dataGt_l[index].id);
      }
      let ult_id = dataGt_l[dataGt_l.length-1].id
      let idFaltantes = []
      for (let i = 1; i<=ult_id; i++) {
         if (idRazas.includes(i)===false) {
            idFaltantes.push(i);
         }
      }
   


      //Inicio proceso temporal (su uso es solo en el desarrollo)
      //let dataGt_l = require('../utils/dataGt_l.json')
      //const { idFaltantes } = require('../utils/idFaltantes.js')
      //Fin proceso temporal (su uso es solo en el desarrollo)
      


      //console.log(idFaltantes)
   
      if (idFaltantes.length!==0) {
         for (let e_id of idFaltantes) {
            var url_arm = `${hostname}/${e_id}?api_key=${_API_KEY}` 
            await axios.get(url_arm)
            .then(async Breeds=>{
               //console.log(Breeds.data)
               if (Breeds.data!==undefined) {
                  dataGt_l.push(await Breeds.data);
               }
            })   
         }
      }
      dataGt_l_ordById = sortDogsBy('id',dataGt_l)
      var writeStream = fs.createWriteStream('./src/var/dataGt_g.json');
      writeStream.write(JSON.stringify(dataGt_l_ordById, null, 2))
      writeStream.end();




      //Inicia proceso de traer los registros de la db
      //console.log('dataGt_l_ordById.length')
      //console.log(dataGt_l_ordById.length)
      const getDogseq = require('../sequelize/controllers/getDogseq.js')
      const valuesDogseq = await getDogseq()
      
      //console.log('valuesDogseq')
      //console.log(valuesDogseq)
      //console.log('valuesDogseq.length')
      //console.log(valuesDogseq.length)
      if (valuesDogseq.length!==0) {
         if (valuesDogseq!==undefined) { 
               let valuesDogseq_ordById = sortDogsBy('id',valuesDogseq)
               if (dataGt_l_ordById.length!==undefined) {
                     dataGt_l_ordById.push(...valuesDogseq_ordById)
               } else {
                     dataGt_l_ordById = valuesDogseq_ordById
               } 
         }
      }
      //Fin proceso de traer los registros de la db

      return dataGt_l_ordById



   } else {
      //console.log('usa require')
      const dataGt_l_ordById_require = require('../var/dataGt_g.json')
      dataGt_l_ordById = [...dataGt_l_ordById_require]


      //Inicia proceso de traer los registros de la db
      //console.log('else')
      //console.log('dataGt_l_ordById.length')
      //console.log(dataGt_l_ordById.length)
      const getDogseq = require('../sequelize/controllers/getDogseq.js')
      const valuesDogseq = await getDogseq()
      //console.log('valuesDogseq')
      //console.log(valuesDogseq)
      //console.log('valuesDogseq.length')
      //console.log(valuesDogseq.length)
      if (valuesDogseq.length!==0) {
         if (valuesDogseq!==undefined) {
               let valuesDogseq_ordById = sortDogsBy('id',valuesDogseq) 
               if (dataGt_l_ordById.length!==undefined) {
                     dataGt_l_ordById.push(...valuesDogseq_ordById)
               } else {
                     dataGt_l_ordById = valuesDogseq_ordById
               } 
         }
      }
      //Fin proceso de traer los registros de la db
   
      
      return dataGt_l_ordById
   }   

   
}

const gDataGtQname = async (url_search,name) => {
   //try {
      let array_enc;
      await axios.get(url_search)
      .then(async dogsQname => {
         //console.log(await dogsQname.data)
         if (await dogsQname.data.length!==0) {
            array_enc = dogsQname.data
         } else {
            //console.log(dogsQname.data)
            array_enc = dogsQname.data
         }

         //console.log(array_enc.length)
         //Inicia proceso de adicionarle los registros que tambien coincidan 
         //pero ahora los tomará de la db postgresql
         const getDogseqQname = require('../sequelize/controllers/getDogseqQname.js')
         const valuesDogseq = await getDogseqQname(name)
         //console.log(valuesDogseq)
         if (valuesDogseq.length!==0) {
               if (valuesDogseq!==undefined) { 
                  if (array_enc.length!==undefined) {
                     array_enc.push(...valuesDogseq)
                  } else {
                     array_enc = valuesDogseq
                  } 
               }
         }
         //Fin proceso de adicionarle los registros que tambien coincidan 
         //pero ahora los tomará de la db postgresql


         return array_enc

      })
      return array_enc
   //} catch {
   //   return {'error': 'La Query o Consulta tiene caracteres inválidos'}
   //}
}

const gDataGtXid = async (url_req,id_p) => {
   let value_enc;
   await axios.get(url_req)
   .then(async Breeds => {
      //console.log(Breeds)
      if (Breeds.data.id!==undefined) {
         value_enc = Breeds.data;
      } else {
         //console.log('gDataGtXid')
         //console.log('ANTES de buscar en db')
         //console.log('axios.get a url_req y por no encontrar res de Breeds es:')
         //console.log(Breeds.data)
         value_enc = Breeds.data;

         if (!isNaN(id_p-0)) {
            //Inicia proceso de traer el registro de la db
            const getDogSeqXid = require('../sequelize/controllers/getDogSeqXid.js')
            const valueDogSeq = await getDogSeqXid(id_p) 
            if (valueDogSeq!==undefined) { value_enc = valueDogSeq }
            //Fin proceso de traer el registro de la db
         }

         return value_enc;
      }
   })
   return value_enc;
}

const removeFile = (pathCfile,fs_p) => {
   let fs_=(fs_p===undefined)?require('fs'):fs_p
   if (fs_.existsSync(pathCfile)) {  
      try {
         fs_.unlinkSync(pathCfile)
         //console.log("Delete File successfully.");
      } catch (err) { 
         console.error(err)
         if (fs_.existsSync(pathCfile)) {
            fs_.unlink(pathCfile, err => {
               if (err) {throw err;}//console.log("Delete File successfully.");
           });
         }
      }
   }
}

const getLast_id = async (objSeq,hostname,_API_KEY) => {
   let last_id
   //const { last_idDogs } = require('../fns/fnsApi.js')
   const value_idDog = await last_idDogs(objSeq);
   last_id = value_idDog;
   if (!value_idDog) {
         var URL_REQ = `${hostname}?api_key=${_API_KEY}&order=DESC&limit=1`
         //const { last_idBreeds } = require('../fns/fnsApi.js')
         const value_idAPIdog = await last_idBreeds(URL_REQ)
         //const { antepongo } = require('../fns/fnsApi.js')
         last_id = antepongo(2,value_idAPIdog)
   }
   //console.log(last_id)
   return last_id
}


const gTempsI_Gt = async (hostname,_API_KEY) => {
   const dataJSON_Gt = await gDataGt(hostname,_API_KEY);
   //console.log(dataJSON_Gt.length)
   let tot_temps = [];
   for (let elem of dataJSON_Gt) {
      //console.log(elem)
      if (elem.temperament !== undefined) {
         tot_temps.push(...elem.temperament.split(','));
         //console.log('ingresa a lo de las API')
      }
      if (elem.Temp !== undefined) {
         //console.log('ingresa a los de la db')
         //console.log(elem.Temp)
         if (elem.Temp!==null) tot_temps.push(...elem.Temp.namesTemps.split(','));
      }
   }
   for (let i in tot_temps) tot_temps[i]=tot_temps[i].trim();
   tot_temps.sort();
   const array_temperament = [...new Set(tot_temps)];//[...new Set()]Crea un nuevo array quitando los repetidos
   let array_objs_temp = []
   for (let elem of array_temperament) array_objs_temp.push({'nameT':elem});
   
   
   //Inicia proceso de Grabarlo en la tabla Temperaments de la db postgresql
   const saveToTemp = require('../sequelize/controllers/saveToTemp.js')
   const values_Temp_db = await saveToTemp(array_objs_temp)
   //Finaliza proceso de Grabarlo en la tabla Temperaments de la db postgresql 
   

   return values_Temp_db;
}



const searchCombTemps_db = async (str_fdJ_ord) => {
   const { objSeq } = require('../sequelize/db.js')
   let obj_encon;
   await objSeq.models.Temps.findOne({
      where: {'namesTemps':str_fdJ_ord}
   }).then(Temps=>{
      //console.log(Temps)
      if (Temps!==null) {
         obj_encon = Temps.dataValues;
      }
   })
   return obj_encon;
}
const orden_dataJSON = (dataJSON) => {
   let array_dataJSON = dataJSON.namesTemps.split(',')
   let fmt_dataJSON = []
   for (let elem of array_dataJSON) {
      //console.log(`|${elem}|->|${elem.length}|`)
      if (elem) {
         elem = elem.trim()
         if (elem.length!==0) {
            let fmt_elem = elem[0].toUpperCase() + elem.slice(1).toLowerCase()
            fmt_dataJSON.push(fmt_elem)
         }
      }
   }
   let str_fdJ_ord = (fmt_dataJSON.sort()).join(', ')
   return str_fdJ_ord
}
const searchTemps = async (dataJSON) => {
   try {
      
      //Inicia proceso de buscar en la db si existe esta combinacion de temperamentos
      let value_sCT_db = await searchCombTemps_db(orden_dataJSON(dataJSON))
      //console.log('obj enc -> ', value_sCT_db)
      //Fin proceso de buscar en la db si existe esta combinacion de temperamentos

      //Retorno lo que encontró
      return value_sCT_db

   } catch(error) {
      return { 'error': error.message }
   }
}



module.exports = { 
   fdeco, 
   last_idDogs,
   last_idBreeds,
   antepongo,
   to_sync,
   gDataGt,
   gDataGtXid,
   removeFile,
   gDataGtQname,
   getLast_id,
   gTempsI_Gt,
   searchTemps,
   orden_dataJSON
};
