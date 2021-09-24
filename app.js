// Project NotesApp
showNotes();
//Function to add notes
let flag = false;
let addBtn = document.getElementById("addBtn");// ye kya karega jisne add btan wale honge unko yha le aayega addbtan wale add note ke option ki i hai to unko le aaeyga
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt"); // ye text wale part ko layega 
  let addTitle = document.getElementById("addTitle"); // ye title wale part ko layega
  let notes = localStorage.getItem("notes"); // local storage se notes ko uthayega
  if (notes == null) {
    notesObj = [];// agar notes phl empty hue mtlb kuch hai hi nhi aabhi notes mai to empty array declare kar dega
  } else {
    notesObj = JSON.parse(notes); 
  }// nhi to jo bhi string aaygi usko array mai convert karke store karega
  let myObj = {
    notes: addTxt.value,// ye title aur normal text ko value assign karega
    title: addTitle.value,
  };
  if (addTitle.value != "" && addTxt.value != "") {
    notesObj.push(myObj); // agar titl aur text dono ami user ne kuch dal diya hai to add kar dega 
    localStorage.setItem("notes", JSON.stringify(notesObj)); //string bnake 
    addTxt.value = ""; // bad mai dono ko empty bhi  kar dega warna to pade rehte aise hi wo  jo text phle dala hai

    addTitle.value = ""; 
    showNotes();
  } else {
    if (addTxt.value == "") {
      window.alert("Please add a note.");
    } else {
      window.alert("Please add a title");
    }
  }
});

function showNotes() {
  let notes = localStorage.getItem("notes");// notes layea upar ale ki tarah
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = ""; // yha pe kyakar rhe hai loop mai sare elments ko show kar rhe hai hai ki kinte elment hai wha tak loop chalega upar wali line mai index aur titl;e neech notes mai kya likha hai wo
  for (let i = 0; i < notesObj.length; i++) {
    html += `
    <div class="card cardNote mx-2 my-2 " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${i + 1}. ${notesObj[i].title}</h5>
          <p class="card-text"> ${notesObj[i].notes} </p>
          <div class="mb-0">
          <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary" style="color:#ffff;" >Delete Note</button>
          <a id="${i}" onclick="markAsImportant(this.id)"  class="impBtn btn btn-danger" style="color:#ffff;" >Important</a>
          </div>
        </div>
    </div>`; 
  }
  // agar notes empty nhi hi to htm mai jo bhi note aaye hai usko dal denge 
  let notesElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElem.innerHTML = html; 
  } else {// nhi to likh denge ki notes mai kuch nh aabhi add a note kro
    notesElem.innerHTML = "Nothing to sho right now plase make a note using add note button"
  }
}
//Function to delete note

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); // is function se delete kar rhe hai phle local storae se bula rhe ahi fir delte kar reh ahi splice se in index se ek elemnt
  localStorage.setItem("notes", JSON.stringify(notesObj)); 
  showNotes();// yha pe dubarh call karenge kyuki delte hone ke bad kaise dikh rha hai wo feature wo bhi to btana hai
}
// function for marking important
function markAsImportant(index) {
    let cardNote = document.getElementsByClassName("cardNote");
    let count = 0; 
    let elm = document.getElementsByTagName("cardnote.a");
    Array.from(cardNote).forEach(function (element) {
      if (count == index && !flag) {
        element.style.backgroundColor = "darkslategray";
        element.style.color = "#ffff";
        flag = true;
      } else {
        if (count == index && flag) {
          element.style.backgroundColor = "#ffff";
          element.style.color = "#343a40";
          flag = false; 
        }
      }
      count++;
    });
  }
// Function to search notes

let searchText = document.getElementById("searchText");
searchText.addEventListener("input", function (e) {
  let val = searchText.value.toLowerCase(); 
  let cardNote = document.getElementsByClassName("cardNote"); 
  Array.from(cardNote).forEach(function (element) {// searh mai dono ka dekh rhe hai ki p mtlb kya hua jo hamne text dala tha uska phla aur h5 mai hamne titile dala tah usko dhoond rhe hai dono ko sath mai jiska mila usko dikha denge
    let elementText = element.getElementsByTagName("p")[0].innerText; 
    let titleText = element.getElementsByTagName("h5")[0].innerText; 
    titleText = titleText.toLowerCase(); 
    elementText = elementText.toLowerCase();// ye isliye kar rhe hai ki agar upper case mai dale to fir bhi search ho jaye automatic lower case mai convert karke
    if (elementText.includes(val) || titleText.includes(val)) {
      element.style.display = "block";
    } else {
      element.style.display = "none"; 
    }
  });
});

