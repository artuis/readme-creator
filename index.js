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
        choices: ["MIT", "GPLv3", "GPLv2", "Apache 2.0", "No"]
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

function licensing(choices, username) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const license = {

    };
    license.text = `This application is covered by the `;
    switch (choices) {
        case "MIT":
            license.text += "[MIT License](https://opensource.org/licenses/MIT)";
            license.badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case "GPLv3":
            license.text += "[GNU General Public License, version 3](https://www.gnu.org/licenses/gpl-3.0.en.html)"
            license.badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case "GPLv2":
            license.text += "[GNU General Public License, version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)"
            license.badge += "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case "Apache 2.0":
            license.text += "[Apache License, version 2.0](https://www.apache.org/licenses/LICENSE-2.0)"
            license.badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        default: // user selected no
            license.text = "None";
            license.badge = "";
            return license;
            break;
    }
    license.text += 
    `

Copyright ${currentYear} ${username}`
    return license;
}

// function to initialize program
function init() {
    console.log("Welcome to the GitHub README generator!");
    inquirer
        .prompt(questions)
        .then(response => {
            let license = licensing(response.license, response.github);
            let out = 
            `# ${response.title}
${license.badge}
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

${license.text}

## Contributing

${response.contribution}

## Tests

${response.test}

## Questions

GitHub: https://github.com/${response.github}/

Email: ${response.email}`
            writeToFile("./generated/README.md", out)
        })
};


// function call to initialize program
init();
