const taskContainer =document.querySelector(".task_container")
let globalTaskData =[];

const generateHTML =(taskData) =>`<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
        <div class="card">
          <div class="card-header d-flex gap-2 justify-content-end">
            <button class="btn btn-outline-info">
              <i class="fa-solid fa-pencil"></i>
            </button>
            <button class="btn btn-outline-danger">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="card-body"><img src=${taskData.image} alt="image" class="card-img"/>
            <h5 class="card-title mt-4">${taskData.title}</h5>
            <p class="card-text">${taskData.descripition}

            </p>
            <span class="badge text-bg-primary">${taskData.type}</span></h6>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline-primary">open task</button>
          </div>
        </div>
      </div>`;

      const insertToDOM = (content) =>
        taskContainer.insertAdjacentHTML("beforeend",newCard);

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
    
    localStorage.setItem("tasky",JSON.stringify({card: globalTaskData}));

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

  //stringify 
  //js object =>JSON

  //parse
  //JSON =>js object