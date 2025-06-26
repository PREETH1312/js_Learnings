const taskContainer =document.querySelector(".task_container");
const taskmodal = document.querySelector(".task__modal__body");
const searchBar = document.getElementById("searchBar");

let globalTaskData =[];

const generateHTML =(taskData) =>`<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
        <div class="card">
          <div class="card-header d-flex gap-2 justify-content-end">
            <button class="btn btn-outline-info" name=${taskData.id} onclick="editCard.apply(this, arguments)">
              <i class="fa-solid fa-pencil" name=${taskData.id}></i>
            </button>
            <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this, arguments)">
              <i class="fa-solid fa-trash" name=${taskData.id}></i>
            </button>
          </div>
          <div class="card-body">
          <img src=${taskData.image}
           alt="image" 
           class="card-img" onerror="this.src='fallback.jpg'"/>
            <h5 class="card-title mt-4">${taskData.title}</h5>
            <p class="card-text">${taskData.descripition}

            </p>
            <span class="badge text-bg-primary">${taskData.type}</span>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline-primary" name=${taskData.id} data-bs-toggle="modal" data-bs-target="#showTask" onclick="openTask.apply(this, arguments)">open task</button>
          </div>
        </div>
      </div>`;

const openTaskModal = (taskData) => {
    const date = new Date(parseInt(taskData.id));
    return `<div id=${taskData.id} >
    <img src=${taskData.image} alt="image" class="img-fluid placeholder__image mb-3" onerror="this.src='fallback.jpg'"/>
    <strong class=" text-sm text-muted ">Created on ${date.toDateString()}</strong>
    <h2 class="my-3">${taskData.title}</h2>
    <p class="lead">${taskData.descripition}</p>
</div>`;
};
    

const insertToDOM = (content) =>
        taskContainer.insertAdjacentHTML("beforeend", content);

const saveToLocalStorage = () => 
  localStorage.setItem("tasky",JSON.stringify({card: globalTaskData}));


const addNewCard = () => {
    // get task data 1
    const taskData = {
       id:`${Date.now()}`,
       title:document.getElementById("tasktitle").value,
       image:document.getElementById("imageurl").value,
       type:document.getElementById("tasktype").value,
       descripition:document.getElementById("Taskdescripition").value,
    };

    globalTaskData.push(taskData);
    
    saveToLocalStorage();

    const newCard = generateHTML(taskData);

     insertToDOM(newCard);


    //clear the form
    document.getElementById("tasktitle").value="";
    document.getElementById("imageurl").value="";
    document.getElementById("tasktype").value="";
    document.getElementById("Taskdescripition").value="";
    return;
    
};
const loadExistingData =() => {
  //check localstorage
  const getData = localStorage.getItem("tasky");
  //retrieve data if exist
   if(!getData)return;

   const taskCards = JSON.parse(getData);

   globalTaskData = taskCards.card;

   globalTaskData.map((taskData) => {
   const newCard = generateHTML(taskData);
    insertToDOM(newCard);
   });
   return;
};

const deleteCard =(event) => {
    const targetID = event.target.getAttribute("name");
    const elementType =event.target.tagName;

    const removeTask = globalTaskData.filter((task) => task.id !== targetID);
    globalTaskData = removeTask;
    
    saveToLocalStorage();

    //access DOM to remove card
    if(elementType === "BUTTON"){
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
      );
    } else {
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    } 
};
const editCard =(event) => {
    const elementType =event.target.tagName;
     let taskTitle;
     let tasktype;
     let taskDescripition;
     let parentElement;
     let submitButton;

     if(elementType==="BUTTON"){
      parentElement = event.target.parentNode.parentNode;
     } else {
      parentElement = event.target.parentNode.parentNode.parentNode;
     }

     taskTitle = parentElement.childNodes[3].childNodes[3];
     taskDescripition = parentElement.childNodes[3].childNodes[5];
     tasktype = parentElement.childNodes[3].childNodes[7];
     submitButton = parentElement.childNodes[5].childNodes[1];

      taskTitle.setAttribute("contenteditable","true");
      taskDescripition.setAttribute("contenteditable","true");
      tasktype.setAttribute("contenteditable","true");
      submitButton.setAttribute("onclick","saveEdit.apply(this, arguments)");
   
};
const saveEdit =(event) => {
  
   const targetID = event.target.getAttribute("name");
    const elementType =event.target.tagName;

     let parentElement;

     if(elementType==="BUTTON"){
      parentElement = event.target.parentNode.parentNode;
     } else {
      parentElement = event.target.parentNode.parentNode.parentNode;
     }

    const taskTitle = parentElement.childNodes[3].childNodes[3];
    const taskDescripition = parentElement.childNodes[3].childNodes[5];
    const tasktype = parentElement.childNodes[3].childNodes[7];
    const submitButton = parentElement.childNodes[5].childNodes[1];

    const updatedData = {
      title: taskTitle.innerHTML,
      type: tasktype.innerHTML,
      descripition: taskDescripition.innerHTML,
    };

     const updateGlobalTasks = globalTaskData.map((task) => {
      if (task.id === targetID) {
        return { ...task, ...updatedData};
      }
      return task;
    });

    globalTaskData = updateGlobalTasks;

    saveToLocalStorage();

    taskTitle.setAttribute("contenteditable","false");
    taskDescripition.setAttribute("contenteditable","false");
    tasktype.setAttribute("contenteditable","false");
    submitButton.innerText = "Open Task";
submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");


};
const openTask = (event) => {
    const targetID = event.target.getAttribute("name");

    const getTask = globalTaskData.filter((task) => task.id === targetID);
    taskmodal.innerHTML = openTaskModal(getTask[0]);



};

searchBar.addEventListener("keyup", function (e) {
    if (!e) e = window.event;
    while (taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.firstChild);
    }
    const searchString = e.target.value;

    const filteredCharacters = globalTaskData.filter((character) => {
        return (
            character.title.includes(searchString) ||
            character.descripition.includes(searchString) ||
            character.type.includes(searchString)
        );
    });

     filteredCharacters.map((careData) => {

        const filteredCard = generateHTML(careData);

        insertToDOM(filteredCard);
    });
});

  //stringify 
  //js object =>JSON

  //parse
  //JSON =>js object

  //content editable = false