
function adoptAnimal(id) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, value: true })
  };
  fetch('/animals/update', options)
  .then(response =>{
    location.reload();
  });

}

function deleteAnimal(id) {
  const options = { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, value: false })
  };
  fetch('/animals/update', options)
  .then(response =>location.reload());

}

async function updateSpecies(id) {
  newSpecies = await prompt("Update species")

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, name: newSpecies })
  };
  fetch('/species/update', options)
  .then(response =>location.reload());
  location.reload();

}

function deleteSpecies(id) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  };
  fetch('/species/delete', options)
  .then(async response =>{
    console.log(response);
    if(response.status == 403){
      await alert("Can not delete this specie.")
    }
    location.reload();

   });

}

async function addSpecies() {
  newSpecies = await prompt("Add species")

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newSpecies })
  };
  fetch('/species/insert', options)
  .then(response =>location.reload());
  location.reload()
}

function updateTemperament(id) {
  newTemperament = prompt("Update temperament")

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, name: newTemperament })
  };
  fetch('/temperament/update', options)
   .then(response =>location.reload());
  location.reload();
}

function deleteTemperament(id) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify({ id: id })
  };
  fetch('/temperament/delete', options)
   .then(async response =>{
    if(response.status == 403){
      await alert("Can not delete this temperament.")
    }
    location.reload();

   });

}



async function addTemperaments() {
  newTemperaments = await prompt("Add Temperaments")

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: newTemperaments })
  };
  fetch('/temperament/insert', options)
  .then(response =>location.reload());
    location.reload();

}