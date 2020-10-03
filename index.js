const fs = require("fs");
const inquirer = require("inquirer");
// array of questions for user
const questions = [
    {
        type: "input",
        message: "What is the title?",
        name: "title"
    },
    {
        type: "input",
        message: "What is the description?",
        name: "description"
    },
    {
        type: "input",
        message: "What are the installation instructions?",
        name: "instructions"
    },
    {
        type: "input",
        message: "What is the usage information?",
        name: "usage"
    },
    {
        type: "input",
        message: "What are the contribution guidelines?",
        name: "contribution"
    },
    {
        type: "input",
        message: "What are the test instructions?",
        name: "test"
    },
    {
        type: "list",
        message: "Would you like to add any licenses?",
        name: "license",
        choices: ["MIT", "GPLv2", "Apache", "GPLv3", "No"]
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "github"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    }
];
const answers = [];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            console.log(err);
        }
    });
}

function licensing(choices) {
    return "MIT";
}

// function to initialize program
function init() {
    console.log("Welcome to the GitHub README generator!");
    inquirer
        .prompt(questions)
        .then(response => {
            let license = licensing(response.checkbox);
            let out = 
            `# ${response.title}

## Description

${response.description}

# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## INSTALLATION

${response.instructions}

## Usage

${response.usage}

## License

${license}

## Contributing

## Tests

${response.test}

## Questions

GitHub: https://github.com/${response.github}/

Email: ${response.email}`
            writeToFile("README.md", out)
        })
    
};


// function call to initialize program
init();
