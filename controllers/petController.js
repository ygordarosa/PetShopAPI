const {
  getPetDB,
  addPetDB,
  updatePetDB,
  deletePetDB,
  getPetPorIdDB,
} = require("../useCases/PetUseCases");

const getPet = async (request, response) => {
  await getPetDB()
    .then((data) => response.status(200).json(data))
    .catch(
      (err) => response.status(400),
      json({
        status: "error",
        message: "Erro ao buscar as pet: " + err,
      })
    );
};

const addPet = async (request, response) => {
  await addPetDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Pet foi criada",
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

const updatePet = async (request, response) => {
  await updatePetDB(request.body)
    .then((data) =>
      response.status(200).json({
        status: "success",
        message: "Pet foi alterada com sucesso",
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

const deletePet = async (request, response) => {
  await deletePetDB(request.params.id)
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

const getPetPorId = async (request, response) => {
  await getPetPorIdDB(request.params.id)
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({
      status : 'error',
      message : err
    }))
}


module.exports = {
  getPet, addPet, updatePet, deletePet, getPetPorId
}