const {
  getPessoaDB,
  addPessoaDB,
  updatePessoaDB,
  deletePessoaDB,
  getPessoaPorIdDB,
} = require("../useCases/PessoaUseCases");

const getPessoa = async (request, response) => {
  await getPessoaDB()
    .then((data) => response.status(200).json(data))
    .catch(
      (err) => response.status(400),
      json({
        status: "error",
        message: "Erro ao buscar as pessoa: " + err,
      })
    );
};

const addPessoa = async (request, response) => {
  await addPessoaDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Pessoa foi criada",
        object: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const updatePessoa = async (request, response) => {
  await updatePessoaDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Pessoa foi alterada com sucesso",
        objeto: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const deletePessoa = async (request, response) => {
  await deletePessoaDB(request.params.id)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: data,
      })
    )
    .catch((err) =>
      response.status(400).json({
        status: "error",
        message: err,
      })
    );
};

const getPessoaPorId = async (request, response) => {
  await getPessoaPorIdDB(request.params.id)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status : 'error',
      message : err
    }))
}


module.exports = {
  getPessoa, addPessoa, updatePessoa, deletePessoa, getPessoaPorId
}