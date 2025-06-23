const taskContainer =document.querySelector(".task_container")


const addNewCard = () => {
    // get task data 1
    const taskData = {
       id:`${Date.now()}`,
       title:document.getElementById("task title").value,
       image:document.getElementById("imageurl").value,
       type:document.getElementById("tasktype").value,
       descripition:document.getElementById("Task description").value,
    };
    // genarat html code
    const newCard =`<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
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

    //inject to DOm
    taskContainer.insertAdjacentHTML("beforeend",newCard);


    //clear the form
    document.getElementById("task title").value=";"
    document.getElementById("imageurl").value="";
    document.getElementById("tasktype").value="";
    document.getElementById("Task description").value="";
    return;
    
  };