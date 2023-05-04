const csvtojson = require('csvtojson');
const filesService = require("../services/files.services")

const getFiles = async (req, res) => { // retorna la data unificada por cada archivo encontrado
	const { fileName } = req.query;
	try {
		const { data } = await filesService.getFilesService(); // obtengo los nombres de los archivos
		const files = data.files;
		let finalResponse;
		if(fileName){ // si envia el parametro para filtrar
			const filterByName = files.filter(f => f.includes(fileName));
			finalResponse = await convertDataToJson(filterByName);
		} else { // si no envia el parametro para filtrar
			finalResponse = await convertDataToJson(files);
		}
		res.send({ data: finalResponse });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: 'server error'});
	}
};

const convertDataToJson = async(files) => { // recibe cada nombre archivo
	let result = [];
	for (let i = 0; i < files.length; i++) { // recorro cada nombre de archivo
		const file = files[i];
		try { // controlo la peticion en algunos casos retorna estaus 400 o 500, me aseguro que la peticion es correcta.
			const { data } = await filesService.getFilesByNameService(file); // descargo la data de cada archivo.
			const jsonArray= await csvtojson().fromString(data); // convierto la data csv a json
			if(jsonArray.length > 0){ // control, puede que algun archivo no tenga data, solo la cabezera
				jsonArray.forEach(item => { // unifico la data por cada archivo.
					result.push({
						file: item.file ? item.file : '', 
						text: item.text ? item.text : '', 
						number: item.number ? item.number : '' , 
						hex: item.hex ? item.hex : '' , 
					});
				});
			}
		} catch (err) { // si la peticion falla con estaus 400 o 500
			console.log('error', err);
		}			
	}
	return result;
}

module.exports = { getFiles }