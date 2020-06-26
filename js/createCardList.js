templateFormList = document.getElementById("template-form-list");
templateHeaderList = document.getElementById("template-header-list");
templateList = document.getElementById("template-list");
btnCreateList = document.querySelectorAll(".btn-create-list");
allList = document.querySelectorAll(".board__list");
btnCloseBoard = document.getElementById("close-board");

btnCloseBoard.onclick = () => (window.location.href = "boards.html");
// console.log(allList);

btnCreateList.forEach((btn) => {
  btn.onclick = (event) => {
    createForm(event);
    console.log("me ejecute");
  };
});

function createForm(event) {
  const newForm = document.importNode(templateFormList.content, true); // se crea la copia de form
  event.target.after(newForm); //se inserta después del boton
  event.target.classList.add("hide"); // se oculta el boton

  const formsCreated = document.querySelectorAll(".board__new-list");

  formsCreated.forEach((formCreated) => {
    closeForm(formCreated);
    formCreated.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputTitleList = formCreated.firstElementChild.value;
      const currentList = event.target.parentNode;
      const [header, btnDelete] = createHeaderList();

      btnDelete.onclick = () => deleteList(currentList);

      const titleList = header.firstElementChild.firstElementChild;
      titleList.textContent = inputTitleList;
      currentList.append(header);
      currentList.after(createList());

      event.target.remove();
    });
  });
}

function closeForm(form) {
  const btnCloses = document.querySelector(".board__cancel");
  const btnNewList = form.parentNode.firstElementChild;

  btnCloses.onclick = (e) => {
    showBtnList(btnNewList);
    form.remove();
  };
}

function showBtnList(button) {
  button.classList.remove("hide");
}

function createHeaderList() {
  const newHeaderList = document.importNode(templateHeaderList.content, true);
  const btnDeleteList = newHeaderList.firstElementChild.lastElementChild;
  return [newHeaderList, btnDeleteList];
}

function createList() {
  const newList = document.importNode(templateList.content, true);
  const newBtn = newList.firstElementChild.firstElementChild;
  newBtn.onclick = () => createForm(event); //se añade un evento para crear un new form
  // TODO send new list card to db
  return newList;
}

function deleteList(list) {
  list.remove();
  //TODO delete list from the db
}
