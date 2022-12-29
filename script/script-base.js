// GETTING ELEMENTS THAT ARE NEED TO BE MADE INTERACTIVE
let prmNavBar = document.getElementById("mainNavBar"); // MAIN NAVIGATION BAR
let secNavBar = document.getElementById("secondaryNavBar"); // SECONDARY NAVIGATION BAR
let secNavButton = document.getElementById("secondaryNavBarLines"); // SECONDARY NAVIGATION BAR LINES
let cButton = document.getElementById("contact-submit"); // CONTACT FORM BUTTON

// CONTACT SUBMIT BUTTON - DO NOTHING UNTIL FORM ACTON IS VALID
cButton.addEventListener("click", (e) => {
  e.preventDefault();
});

// SECONDARY NAVIGATION BAR - APPEARANCE EFFECT
secNavButton.addEventListener("click", (e) => {
  e = e.target;
  // IF NAVBAR NOT ON SCREEN
  if (secNavBar.lastElementChild.dataset.work == "false") {
    e.children[0].style.height = "0";
    e.children[1].style.transform = "rotate(45deg) translateY(0.3em)";
    e.children[1].style.background = "red";
    e.children[2].style.transform = "rotate(-45deg) translateY(-0.3em)";
    e.children[2].style.background = "red";

    prmNavBar.style.display = "none";
    secNavBar.lastElementChild.style.left = 0;
    secNavBar.lastElementChild.dataset.work = "true";
  }
  // IF NAVBAR ON SCREEN
  else {
    e.children[0].style.height = "0.1em";
    e.children[1].style.transform = "";
    e.children[1].style.background = "rgb(20, 165, 165)";
    e.children[2].style.transform = "";
    e.children[2].style.background = "rgb(20, 165, 165)";

    prmNavBar.style.display = "initial";
    secNavBar.lastElementChild.style.left = "-100%";
    secNavBar.lastElementChild.dataset.work = "false";
  }
});

// FETCHING GITHUB API FOR PROJECTS
let projects = fetch("https://api.github.com/users/skhull-coding/repos");

projects
  .then((v) => {
    return v.json();
  })
  .then((v) => {
    let toADD = `<div class="projectBox flex f-col"><h3 class="projectTitle">ptitle</h3>
                    <p class="projectDesc">pdesc</p>
                    <div class="languages flex f-col"><h4>languages :</h4></div>
                    <a href="prepo" class="mt w-100"><button class="repolink w-100">Github Repo</button></a>
                    <a href="pdeploy" class = "w-100"><button class="deployButton w-100">View deployment</button></a></div>`;

    let toClasses = document.getElementsByClassName("languages");
    let n = 0;

    // FOR LANGUAGE PERCENTAGE
    v.forEach((element) => {
      let l = fetch(element.languages_url);
      l.then((v) => v.json()).then((v) => {
        let sum = 0; // FIRST TOTAL SUM IS FOUND
        for (item in v) {
          sum += v[item];
        }

        // IF NO LANGUAGE IS FOUND IN PROJECT
        if (sum == 0) {
          toClasses[n].innerHTML += "<span>No Languages used</span>";
          n++;
          return;
        }
        console.log(sum);
        for (item in v) {
          // PUTTING INDIVIDUAL %AGE TO THEIR SPACE IN DOM
          toClasses[n].innerHTML += `
            <span>${item} -  ${Math.floor((v[item] / sum) * 100)}%</span> 
            <div class="languageUsed"><div class="from" style="width: ${Math.ceil(
              (v[item] / sum) * 100
            )}%;"></div></div>`;
          console.log(v[item] / sum);
        }
        n++;
      });

      // UPDATING PROJECT BOX WITH RECEIVED RESPONSE FROM FETCH FUNCTION
      document.querySelector("#projects .sectionContent").innerHTML += toADD
        .replace("ptitle", element.name) // PROJECT TITLE
        .replace(
          "pdesc",
          element.description ? element.description : "No Description" // USING TERTIARY OPERATOR
        ) // PROJECT DESCRIPTION (IF FOUND)
        .replace("prepo", element.html_url) // PROJECT REPO LINK (GITHUB)
        .replace(
          "pdeploy",
          "https://" + element.owner.login + ".github.io/" + element.name
        ); // PROJECT DEPLOYMENT URL
    });
  });
