const axios = require('axios');

const config = {
	headers: {
		authorization: 'Bearer aSuperSecretKey'
  }
}

const BASE_URL = 'https://echo-serv.tbxnet.com/v1';


const getFilesService = async () => {
  return await axios.get(`${BASE_URL}/secret/files`, config)
}

const getFilesByNameService = async (fileName) => {
  return await axios.get(`${BASE_URL}/secret/file/${fileName}`, config)
}

module.exports = { getFilesService, getFilesByNameService }