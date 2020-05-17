const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let validator = require("email-validator");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let employees = [];

let nameValidation = name => {
  if (name === "") {
    return "Please enter a name";
  } return true;
}

let emailValidation = email => {
  if (validator.validate(email)) {
     return true
  } else {
    return "Please enter a valid email address";
  };
};

const managerQuestions = [{
    message: "What is your manager's name?",
    name: "name",
    validate: nameValidation
  },
    {
    message: "What is your manager's id?",
    name: "id"
  },
    {
    message: "What is your manager's email?",
    name: "email",
    validate: emailValidation
  },
    {
    message: "What is your manager's office number?",
    name: "officeNumber"
  },
];

function newMember(){
    inquirer.prompt([{
            type: "list",
            name: "team",
            message: "Which type of team member would you like to add?",
            choices: [
                "Intern",
                "Engineer",
                "None"
            ]
    }]).then(employee => {
        switch (employee.team){
            case "Intern": 
                internQuestions();
                break;  
            case "Engineer":
                engineerQuestions();
                break;
            case "None":
                let html = render(employees)
                fs.writeFile(outputPath, html, function(err){
                    if (err){
                        console.log(err);
                    }else{
                        console.log("Successfully Written");
                    };
                });
        }
    })
};

function init(){
    inquirer
  .prompt(managerQuestions)
  .then(function(data) {
        let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        employees.push(manager);
        newMember();
    });
};

function internQuestions(){
    inquirer
  .prompt([{
       message: "What is your intern's name?",
       name: "name",
       validate: nameValidation
      },
       {
        message: "What is your intern's id?",
        name: "id"
      },
       {
        message: "What is your intern's email?",
        name: "email",
        validate: emailValidation
      },
       {
        message: "What is your intern's school?",
        name: "school"
      },
    ]).then(function(data) {
        let intern = new Intern(data.name, data.id, data.email, data.school);
        employees.push(intern);
        newMember();
        });
};

function engineerQuestions(){
    inquirer
  .prompt([{
       message: "What is your engineer's name?",
       name: "name",
       validate: nameValidation
      },
       {
        message: "What is your engineer's id?",
        name: "id"
      },
       {
        message: "What is your engineer's email?",
        name: "email",
        validate: emailValidation
      },
       {
        message: "What is your engineer's GitHub username?",
        name: "github"
      },
    ]).then(function(data) {
        let engineer = new Engineer(data.name, data.id, data.email, data.github);
        employees.push(engineer);
        newMember();
        });
};
  
init();




