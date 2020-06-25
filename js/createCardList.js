templateFormList = document.getElementById("template-create-list");
btnCreateList = document.querySelector(".btn-create-list");

// console.log(templateFormList);
// console.log(btnCreateList);

btnCreateList.onclick = (event) => {
  // console.log(event.target);
  const copyFormList = document.importNode(templateFormList, true);
  // event.target.after(copyFormList);
  const button = event;
  console.log(button);
  console.log(copyFormList);
};
