document.addEventListener('DOMContentLoaded', () => {
  //Create form to add new monsters to database
  const createDiv = document.getElementById('create-monster');
  const createForm = document.createElement('form');
  createDiv.append(createForm);
  const formName = document.createElement('input');
  const formAge = document.createElement('input');
  const formDescription = document.createElement('input');
  createForm.append(formName, formAge, formDescription);
  formName.id = 'name';
  formAge.id = 'age';
  formDescription.id = 'description';
  formName.placeholder = 'name...';
  formAge.placeholder = 'age...';
  formDescription.placeholder = 'description...';
  const createButton = document.createElement('button');
  createButton.type = 'submit';
  createForm.append(createButton);
  createButton.innerText = 'Create';
  const monsterContainer = document.getElementById('monster-container');
  //fetch and append elements to hold first 50 monsters
  fetch('http://localhost:3000/monsters')
    .then(resp => resp.json())
    .then(monsters => {
      const first50 = monsters.slice(0, 50);
      first50.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.id = `${monster.id}`;
        monsterContainer.append(monsterDiv)
        monsterDiv.innerHTML = `<h2>Name:${monster.name}</h><h2>Age:${monster.age}</h><p>Description:${monster.description}</p>`
      })
    })
  //handle form submit to add new monster to databases
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    postMonster(e.target);
    e.target.reset();
  });
  function postMonster(formData) {
    const newMonst = {
      name: `${formData.name.value}`,
      age: `${formData.age.value}`,
      description: `${formData.description.value}`
    }
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newMonst),
    };
    console.log(newMonst);
    fetch('http://localhost:3000/monsters', configObj)
  };
  //cycle DOM to next 50 monsters from dataBase
  const next = document.getElementById('forward');
  next.addEventListener('click', () => {
    const topMonstId = monsterContainer.firstChild.id;
    nextMonsts(topMonstId);
  });
  function nextMonsts(topMonstId) {
    fetch('http://localhost:3000/monsters')
      .then(resp => resp.json())
      .then(monsters => {
        if (+topMonstId+50 <= monsters.length) {
          monsterContainer.innerHTML = '';
          const next50 = monsters.slice(+topMonstId + 49, +topMonstId + 99);
          next50.forEach(monster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.id = `${monster.id}`;
            monsterContainer.append(monsterDiv)
            monsterDiv.innerHTML = `<h2>Name:${monster.name}</h><h2>Age:${monster.age}</h><p>Description:${monster.description}</p>`
          })
        }
      })
  }
  //cycle DOM to previous 50 monsters from database
  const back = document.getElementById('back');
  back.addEventListener('click', () => {
    const topMonstId = monsterContainer.firstChild.id;
    prevMonsts(topMonstId);
  });
  function prevMonsts(topMonstId) {
    fetch('http://localhost:3000/monsters')
      .then(resp => resp.json())
      .then(monsters => {
        if (+topMonstId>50) {
          monsterContainer.innerHTML = '';
          const prev50 = monsters.slice(+topMonstId-51, +topMonstId-1);
          prev50.forEach(monster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.id = `${monster.id}`;
            monsterContainer.append(monsterDiv)
            monsterDiv.innerHTML = `<h2>Name:${monster.name}</h><h2>Age:${monster.age}</h><p>Description:${monster.description}</p>`
          })
        }
      })
  }
})