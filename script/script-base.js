let prmNavBar = document.getElementById("mainNavBar");
let secNavBar = document.getElementById("secondaryNavBar");
let secNavButton = document.getElementById("secondaryNavBarLines");

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
    }
    // console.log
})