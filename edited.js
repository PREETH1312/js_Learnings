//<!-- JavaScript -->
    const taskContainer = document.getElementById("taskContainer");

    const addNewCard = () => {
      const title = document.getElementById("TaskTitle").value.trim();
      const image = document.getElementById("ImageURL").value.trim();
      const type = document.getElementById("TaskType").value.trim();
      const description = document.getElementById("TaskDescription").value.trim();

      if (!title || !image || !type || !description) {
        alert("Please fill in all fields.");
        return;
      }

      const newCard = `
        <div class="col-md-6 col-lg-4 my-4">
          <div class="card">
            <div class="card-header d-flex gap-2 justify-content-end">
              <button class="btn btn-outline-info"><i class="fa-solid fa-pencil"></i></button>
              <button class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="card-body">
              <img src="${image}" alt="image" class="card-img" />
              <h5 class="card-title mt-4">${title}</h5>
              <p class="card-text">${description}</p>
              <span class="badge text-bg-primary">${type}</span>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary">Open Task</button>
            </div>
          </div>
        </div>
      `;

      taskContainer.insertAdjacentHTML("beforeend", newCard);

      // Clear form
      document.getElementById("TaskTitle").value = "";
      document.getElementById("ImageURL").value = "";
      document.getElementById("TaskType").value = "";
      document.getElementById("TaskDescription").value = "";
    };