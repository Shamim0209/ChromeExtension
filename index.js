const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = [];

const ulEl = document.getElementById("ul-l");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  renderLeads();
}
function renderLeads() {
  let listItems = "";
  for (let index = 0; index < myLeads.length; index++) {
    listItems += `<li> <a href='${myLeads[index]}' target='_blank>'>${myLeads[index]}</a>`;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  renderLeads();
  inputEl.value = "";
});
deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads();
});
tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads) )
      renderLeads()
  })
})