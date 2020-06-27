//section to create a list

templateFormList = document.getElementById("template-form-list");
templateHeaderList = document.getElementById("template-header-list");
templateList = document.getElementById("template-list");
btnCreateList = document.querySelectorAll(".btn-create-list");
allList = document.querySelectorAll(".board__list");
btnCloseBoard = document.getElementById("close-board");

// section to create a card

templateFormCard = document.getElementById("template-form-card");
templateCard = document.getElementById("template-card");
// console.log(templateCard);

// the functions for all

btnCloseBoard.onclick = () => (window.location.href = "boards.html");
// console.log(allList);

btnCreateList.forEach((btn) => {
  btn.onclick = (event) => {
    createForm(event);
    console.log("me ejecute");
  };
});

function createForm(event) {
  const newForm = cloneTemplate(templateFormList); // se crea la copia de form
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
  const newHeaderList = cloneTemplate(templateHeaderList);
  const btnCreateFormCard = newHeaderList.lastElementChild;
  btnCreateFormCard.onclick = (event) =>
    createFormCard(templateFormCard, event);
  const btnDeleteList = newHeaderList.firstElementChild.lastElementChild;
  return [newHeaderList, btnDeleteList];
}

function createList() {
  const newList = cloneTemplate(templateList);
  const newBtn = newList.firstElementChild.firstElementChild;

  newBtn.onclick = () => createForm(event); //se añade un evento para crear un new form
  // TODO send new list card to db
  return newList;
}

function deleteList(list) {
  list.remove();
  //TODO delete list from the db
}

function createFormCard(template, event) {
  const formTemplateCard = cloneTemplate(template);
  const currentBtnCard = event.target;
  // const btnCreateCard = formTemplateCard.firstElementChild.querySelector(
  //   ".list__submit"
  // );

  currentBtnCard.before(formTemplateCard);
  hideItem(currentBtnCard);

  getAllFormCards();

  // console.log("form new", formCardCreated);
  // return formCard;
}

function getAllFormCards() {
  formsCardCreated = document.querySelectorAll(".list__new-task");
  console.log(formsCardCreated);
  // let btnShowDetailsCard = "";
  formsCardCreated.forEach((formCard) => {
    formCard.addEventListener("submit", (event) => {
      event.preventDefault();
      const titleCard = formCard.firstElementChild.value;
      createCard(templateCard, formCard, titleCard);
      // btnShowDetailsCard.onclick = (event) => showCardDetails(event);
      // console.log("btn deta 2, ", this.btnShowDetailsCard);
    });

    // console.log("button details", btnShowDetailsCard);

    // btnShowDetailsCard.onclick = (event) => showCardDetails(event);

    const btnDeleteForm = formCard.lastElementChild;
    const btnCreateCard = formCard.parentNode.lastElementChild;

    btnDeleteForm.onclick = () => {
      showItem(btnCreateCard);
      formCard.remove();
    };
  });
}

function createCard(template, formCard, title) {
  const newCard = cloneTemplate(template);
  const inputTitle = newCard.firstElementChild.lastElementChild;
  const btnSeeDetails = newCard.firstElementChild;

  btnSeeDetails.onclick = () => showCardDetails();
  // TODO enlazar con el detalle del card

  inputTitle.textContent = title;
  formCard.before(newCard);
  return btnSeeDetails;
}

function showCardDetails() {
  modalCardDetails = document.getElementById("modal-edit-card");
  closeModal = document.getElementById("close-modal");

  showModalEditCard(modalCardDetails);

  closeModal.onclick = () => hideModalEditCard(modalCardDetails);

  document.addEventListener("keyup", function (event) {
    let codeScape = 27;
    if (event.keyCode === codeScape) hideModalEditCard(modalCardDetails);
  });

  function showModalEditCard(modal) {
    modal.classList.remove("hide");
  }

  function hideModalEditCard(modalBoard) {
    modalBoard.classList.add("hide");
  }
}

function hideItem(item) {
  item.classList.add("hide");
}

function showItem(item) {
  item.classList.remove("hide");
}

// function insertBefore(currentItem, newItem) {
//   currentItem.before(newItem);
// }

function cloneTemplate(item) {
  const newItem = document.importNode(item.content, true);
  return newItem;
}

// info de api

function getBoardDetail(id) {
  const url = `http://localhost:3000/boards/${id}`;
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Token token="${token}"`,
    },
  };
  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);
}

async function showBoardDetail() {
  const idBoard = localStorage.getItem("idBoard");
  const boardInfo = await getBoardDetail(idBoard);
  const title = document.querySelector(".board__title");
  const bg = document.querySelector("body");
  bg.style.background = boardInfo.color;
  title.textContent = boardInfo.name;

  let index = 0;
  const arrList = boardInfo.lists;
  arrList.forEach((list) => {
    const currentList = document.querySelectorAll(".board__list")[index];
    const currentForm = currentList.firstElementChild;
    const [header, btnDelete] = createHeaderList();

    btnDelete.onclick = () => deleteList(currentList);
    const titleList = header.firstElementChild.firstElementChild;
    titleList.textContent = list.name;
    currentList.append(header);

    const arrCards = list.cards;
    const btnAddCard = document.querySelectorAll(".add-card")[index];
    arrCards.forEach((card) => {
      const name = card.name;
      createCard(templateCard, btnAddCard, name);
    });
    index++;
    currentList.after(createList());
    currentForm.remove();
  });
}

showBoardDetail();
