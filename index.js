const taskContainer =document.querySelector(".task_container")
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
           class="card-img"/>
            <h5 class="card-title mt-4">${taskData.title}</h5>
            <p class="card-text">${taskData.descripition}

            </p>
            <span class="badge text-bg-primary">${taskData.type}</span></h6>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline-primary" name=${taskData.id}>open task</button>
          </div>
        </div>
      </div>`;


const insertToDOM = (content) =>
        taskContainer.insertAdjacentHTML("beforeend", content);

const saveToLocalStorage = () => 
  localStorage.setItem("tasky",JSON.stringify({card: globalTaskData}));

const addNewCard = () => {
    // get task data 1
    const taskData = {
       id:`${Date.now()}`,
       title:document.getElementById("task title").value,
       image:document.getElementById("imageurl").value,
       type:document.getElementById("tasktype").value,
       descripition:document.getElementById("Task description").value,
    };

    globalTaskData.push(taskData);
    
    saveToLocalStorage();

    const newCard = generateHTML(taskData);

     insertToDOM(newCard);


    //clear the form
    document.getElementById("task title").value=";"
    document.getElementById("imageurl").value="";
    document.getElementById("tasktype").value="";
    document.getElementById("Task description").value="";
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
      submitButton.innerHTML = "Save Changes";
   
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
    submitButton.innerHTML = "open Task";

};



  //stringify 
  //js object =>JSON

  //parse
  //JSON =>js object

  //content editable = false