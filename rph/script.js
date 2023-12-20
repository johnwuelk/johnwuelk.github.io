"use strict";

// const PI = 3.147;
// const sisBirthdate = new Date("12/13/2000");
// console.log(sisBirthdate.toUTCString());

// const currentDate = new Date();

// const year = currentDate.getFullYear();
// const date = currentDate.getDate();
// const month = currentDate.getMonth();
// const day = currentDate.getDay();

// // const isPast = ;

// console.log(day, year, month, date);

// console.log(Date.now());

/**
 * Log in a user into the meeting when they enter
 * - store their data in a grouped manner
 */

// a list to store my records
const meetingRecords = {};
const maxDuration = 720;
const meetingStartTime = new Date("Sun, 06 Jun 2021 12:00:00 GMT");

const nameInput = document.querySelector("#name");
const enterBtn = document.querySelector("#enter");
const leaveBtn = document.querySelector("#leave");
const reportBtn = document.querySelector("#report");
const tableBody = document.querySelector("#table-body");

// add event listeners to buttons
enterBtn.addEventListener("click", addUser);
leaveBtn.addEventListener("click", exitUser);
reportBtn.addEventListener("click",generateReport);

function fillInput() {
	document.getElementById("name").value = document.getElementById("select").value;
}
document.getElementById("name").onfocus = function() {clear()};
function clear() {
	document.getElementById("select").value = "";
	document.getElementById("name").value = "";
	
}

function addUser() {
  const name = nameInput.value;

  if (name == "") {
    return alert("Please select or type the child that is entering.");
  }

  if (!meetingRecords[name]) {
    meetingRecords[name] = [];
  }

  // check if the user is already in the meeting
  let lastIndex = meetingRecords[name].length - 1;
  let previousEntry = meetingRecords[name][lastIndex];
  if (previousEntry && !previousEntry.left) {
    return alert("Your Child has already joined the daycare today");
  }

  const entryTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
   //... Date().toLocaleString("de-DE", "localeMatcher=lookup");
	//... old: toUTCString()
  meetingRecords[name].push({
    joined: entryTime,
  });
  // update the dom
  updateDom();

  document.querySelector('#downloadLink').click();
}

function exitUser() {
  const name = nameInput.value;
  const leftTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  //... Date().toLocaleString("de-DE", "localeMatcher=lookup");

  if (name == "") {
    return alert("Please select or type a child that is leaving.");
  }

  let lastIndex = meetingRecords[name].length - 1;
  let previousEntry = meetingRecords[name][lastIndex];

  // check if the user has already left the meeting
  if (previousEntry && previousEntry.left) {
    return alert("User already left");
  }

  meetingRecords[name][lastIndex].left = leftTime;

  // update the dom
  updateDom();
  
  document.querySelector('#downloadLink').click();
}

function updateDom() {
  const frag = new DocumentFragment();
  for (let name in meetingRecords) {
    for (let record of meetingRecords[name]) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
          <td>${name}</td>
          <td>${record.joined}</td>
          <td>${record.left || "-"}</td>
      `;

      frag.append(newRow);
    }
  }

  tableBody.innerHTML = "";
  tableBody.append(frag);
}


function claculateDuration(enterTime, leaveTime){

  // If leaveTime is undefined, then set the duration in the meeting to the whole time.
  
  if(leaveTime === undefined){
     
    return maxDuration - ((new Date(enterTime).getTime()-meetingStartTime.getTime())/(1000 * 60));
  }
  const diff = new Date("1970-1-1 " + leaveTime) - new Date("1970-1-1 " + enterTime);
  
	console.log(diff);
  return diff/3600000;
}



// Write a generate report code to display everyone who attended the meeting and their total duration in the meeting.
function generateReport(){

  if(!Object.keys(meetingRecords).length){
    alert("No one has joined.");
    return false;
  }

  const frag = new DocumentFragment();
  // Get table element
  const reportTable = document.querySelector("#report-table");
  // Get tbody element
  const reportTableTbody = document.querySelector("#table-report-body");
  reportTableTbody.innerHTML="";

  // Display report table
  reportTable.style.display = "block";

  // Get loop through meeting records
  for( let name in meetingRecords){
    const lastIndex = meetingRecords[name].length - 1;

    // For every item in the attendance list calculate the duration
    let duration = 0;
    for(let timeRecord of meetingRecords[name]){
      duration +=claculateDuration(timeRecord.joined, timeRecord.left);
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML=`<td>${name}</td>
    <td>${meetingRecords[name][0].joined}</td>
    <td>${meetingRecords[name][lastIndex].left || "-"}</td>
    <td>${duration.toFixed(1)} hours</td>`;

    frag.append(newRow);
  }

  reportTableTbody.appendChild(frag);

}
