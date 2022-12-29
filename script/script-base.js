let prmNavBar = document.getElementById("mainNavBar");
let secNavBar = document.getElementById("secondaryNavBar");
let secNavButton = document.getElementById("secondaryNavBarLines");
let cButton = document.getElementById("contact-submit");
// let mC = document.getElementById("portfolioSections");
// let t;

cButton.addEventListener('click', (e)=>{e.preventDefault();})

secNavButton.addEventListener('click', (e)=>{
    // console.log(secNavBar.lastElementChild.dataset.work);
    // secNavBar.lastElementChild.dataset.work = "true";
    // console.log(secNavBar.lastElementChild.dataset.work);
    let e1 = e.target;
    if(secNavBar.lastElementChild.dataset.work =="false"){

        
        e1.children[0].style.height = "0";
        e1.children[1].style.transform = "rotate(45deg) translateY(0.3em)";
        e1.children[1].style.background = "red";
        e1.children[2].style.transform = "rotate(-45deg) translateY(-0.3em)";
        e1.children[2].style.background = "red";

        prmNavBar.style.display = "none";
        secNavBar.lastElementChild.style.left = 0;
        secNavBar.lastElementChild.dataset.work = "true";
        // clearTimeout(t);
        // mC.style.zIndex = -1;
    }
    else{
        
        e1.children[0].style.height = "0.1em";
        e1.children[1].style.transform = "";
        e1.children[1].style.background = "rgb(20, 165, 165)";
        e1.children[2].style.transform = "";
        e1.children[2].style.background = "rgb(20, 165, 165)";

        prmNavBar.style.display = "initial";
        secNavBar.lastElementChild.style.left = "-100%";
        secNavBar.lastElementChild.dataset.work = "false";
        // t = setTimeout(() => {
        //     mC.style.zIndex = "initial";
        // }, 450);
    }
    // console.log
})

let a = fetch("https://api.github.com/users/skhull-coding/repos");

a.then((v)=>{
    // console.log(v.json());
    return v.json();
}).then((v)=>{
    let toADD = `<div class="projectBox">
    <h3 class="projectTitle">ptitle</h3>
    <p class="projectDesc">pdesc</p>
    <div class="languages"><h4>languages :</h4>
        
        </div>
    <a href="prepo" class="mt"><button class="repolink">Github Repo</button></a>
    <a href="pdeploy"><button class="deployButton">View deployment</button></a>

</div>`;
    // console.log(v);
    
    let toClasses = document.getElementsByClassName("languages");
    let n = 0;
    v.forEach(element => {
        // console.log(element.html_url);
        // console.log(element.name)
        // if (element.description){
        // console.log(element.description);}
        let l = fetch(element.languages_url);
        l.then(v=>v.json()).then(v=>{
            console.log(v);
            let sum = 0;
            for (item in v){
                sum += v[item];
            }
            
            if (sum ==0){
                toClasses[n].innerHTML += "<span>No Languages used</span>";
                n++;
                return;
            }
            console.log(sum);
            for (item in v){
                
            toClasses[n].innerHTML += `
            <span>${item} -  ${Math.floor(v[item]/sum * 100)}%</span>
            <div class="languageUsed"><div class="from" style="width: ${Math.ceil(v[item]/sum * 100)}%;"></div></div>`;
            console.log(v[item]/sum);
            }
            n++;
        })
        // console.log("https://" + element.owner.login + ".github.io/"  + element.name)

        document.querySelector("#projects .sectionContent").innerHTML += toADD.replace("ptitle", element.name).replace("pdesc", element.description?(element.description) : "No Description").replace("prepo", element.html_url).replace("pdeploy", "https://" + element.owner.login + ".github.io/"  + element.name);
    });
})