const fs = require('fs')
const path = require('path')

var btnHome = document.getElementById('btnHome');
var btnCreate = document.getElementById('btnCreate')
var btnOpen = document.getElementById('btnOpen')
var btnUpdate = document.getElementById('btnUpdate')
var btnDelete = document.getElementById('btnDelete')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

btnHome.addEventListener('click', function(){ //button to open main page from CRUD page
    window.close();
})

let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function(){  //create text file when user click CREATE button
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ 
    if(err){
      return console.log(err)
    }
    alert(fileName.value + " grocery list successfully created")
    console.log(fileName.value + " grocery list sucessfully created")   
    fileName.value = ""
    fileContents.value = ""
  })
})

btnOpen.addEventListener('click', function(){  //read contents of the created text file when user click OPEN button
  let file = path.join(pathName, fileName.value)
  fs.readFile(file, function(err, data){ 
    if(err){
      return console.log(err)
    }
    fileContents.value = data
    alert("The grocery list sucessfully opened")
    console.log("The grocery list sucessfully opened")
  })
})

btnUpdate.addEventListener('click', function(){ //update contents of the created text file when user click UPDATE button
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err){ 
      if(err){
        return console.log(err)
      }
      alert("The grocery list was updated")
      console.log("The grocery list was updated")
      fileName.value = ""
      fileContents.value = ""
    })
})

btnDelete.addEventListener('click', function(){ //delete text file when user click DELETE button
  let file = path.join(pathName, fileName.value)
  fs.unlink(file, function(err){ 
    if(err){
      return console.log(err)
    }
    alert("The grocery list sucessfully deleted")   
    fileName.value = ""
    fileContents.value = ""
  })
})