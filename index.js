let currentPage = 1;

document.addEventListener('DOMContentLoaded', function()
{
  addCreateNewMonsterForm();
  getPageData();
  addBtnPageNextListener();
  addBtnPagePreviousListener();
  addBtnCreateMonsterListener();

});

function getPageData()
{
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
      .then(data =>
        {
          console.log(data);
          loadPage(data);
        });
}

function loadPage(data)
{
  let parentContainer = document.getElementById('monster-container');
  parentContainer.innerHTML = '';
  data.forEach(object =>
  {
    let childDiv = document.createElement(
      'div');
    let name = object['name'];
    let age = object['age'];
    let description = object['description'];

    childDiv.innerHTML =
    `<div>
      <h2>${name}</h2>
        <h4>Age: ${age}</h4>
          <p>Bio: ${description}</p>
    </div>`;

    parentContainer.appendChild(childDiv);
  });
}

function addBtnPageNextListener()
{
  document.getElementById('forward').addEventListener('click',
  function()
  {
    event.preventDefault();
    currentPage++;
    console.log('im in!');
    getPageData();
  });
}

function addBtnPagePreviousListener()
{
  document.getElementById('back').addEventListener('click',
  function()
  {
    if (currentPage === 1)
    {
      return;
    }
    event.preventDefault();
    currentPage--;
    getPageData();
  });
}

function addCreateNewMonsterForm()
{
  let createMonsterDiv = document.getElementById('create-monster');
  let createForm = document.createElement('form');
  createForm.id = 'createForm'
  createForm.innerHTML = `name:<input type="text" name="name" id="monsterName">age:<input type="text" name="age" id="monsterAge">description:<input type="text" name="monsterDescription" id="monsterDescription"><input type="submit" value="create" id='createMonster'>`;
  createMonsterDiv.appendChild(createForm);
}

function addBtnCreateMonsterListener()
{
  document.getElementById('createMonster').addEventListener('click',
    function()
    {
      event.preventDefault();
      let monsterName = document.getElementById('monsterName').value;
      let monsterAge = Number(document.getElementById('monsterAge').value);
      let monsterDescription = document.getElementById('monsterDescription').value;
      let newMonster =
      {
        name: monsterName,
        age: monsterAge,
        description: monsterDescription
      }

      fetch('http://localhost:3000/monsters',
      {
        method: "POST",
        headers:
        {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

        data: {
          name: monsterName,
          age: monsterAge,
          description: monsterDescription
        }
      })
          .then(response => response.json())
            .then(data =>
            {
              console.log(data);
            })

    });

}

// function createAPokemon(name, sprite){
//   let data = {name: name, sprite: sprite}
//   debugger
//   //make a post fetch
//   fetch('http://localhost:3000/pokemon/', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   }).then(response => response.json())
//   .then(data => {
//     //data is a pokemon obj
//     render(data)
//   })
// }

// fetch(`http://localhost:3000/pokemon/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: name
//     })
//   }).then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//
//   fetch(`http://localhost:3000/pokemon/${id}`, {
//     method: "DELETE"
//   }).then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//   document.querySelector(`#pokemon-${id}`).remove()
