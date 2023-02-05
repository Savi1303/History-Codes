// function changeInfo(event) {
//     event.preventDefault();


//    let img1 = document.querySelector(".img");
//    let getHead = document.querySelector(".h1");
//    let getPara = document.querySelector(".sgc");
//    let getPara1 = document.querySelector(".mgc");
//    let getHead1 = document.querySelector(".h4");
//    let getBtn = document.querySelector(".bsn");
//    let getBzn = document.querySelector(".btn");

//    img1.src = "./images/welcome.png";
//    getHead.innerHTML ="Log In";
//    getPara.style.display = "none";
//    getPara1.style.display = "none";
//    getHead1.innerHTML = "Don't have an Account?";
//    getBtn.innerHTML = "Sign Up";
//    getBzn.innerHTML = "Log In"
// }



    // function for signUp

function signUp(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get spinner
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    // get values from input
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("exampleInputEmail1").value;
    const getPass = document.getElementById("exampleInputPassword1").value;
    const getCon = document.getElementById("exampleInputPassword2").value;

    if (getName === "" || getEmail === "" || getPass === "" || getCon === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE' 
        })
        getSpin.style.display = "none";
    }

    if (getCon !== getPass)  {
        Swal.fire({
            icon: 'info',
            text: 'Password does not match',
            confirmButtonColor: '#2D85DE' 
        })  
    }    

    else {
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPass);
        signData.append("password_confirmation", getCon);

        const signReq = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";
        
        fetch(url, signReq)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            if (result.status === "success")  {
                Swal.fire ({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
            
                setTimeout(() => {
                    location.href = "inslex.html"
                }, 3000)
            }
            else {
                Swal.fire ({
                    Icon: 'info',
                    text: 'Registration Unsuccessful',
                    confirmButtonColor: '#2D85DE'
                })
                getSpin.style.display = "none";
            }
            })
          .catch(error => console.log('error', error));
    }

}




// function to login


function logIn(event) {
    event.preventDefault();
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;

    if (getEmail === "" || getPass === "") {
        Swal.fire ({
            icon: 'info',
            text: 'All fields are required',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    else {
        const logForm = new FormData();
        logForm.append("email", getEmail);
        logForm.append("password", getPass);

        const logReq = {
            method: 'POST',
            body: logForm
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

        fetch(url, logReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("admin", JSON.stringify(result));
            const getItem = localStorage.getItem("admin");
            const theItem = JSON.parse(getItem);
            if (theItem.hasOwnProperty("email")) {
                location.href = "dashboard.html"
            } 
            else {
                Swal.fire({
                    icon: 'Warning',
                    text: 'Login Unsuccessful',
                    confirmButtonColor: '#2D85DE'
                })
        getSpin.style.display = "none";
            }
        })
        .catch(error => console.log('error', error));
    }
}


// dashboard api

function dashboardApi() {
    const myPageModal = document.querySelector(".pagemodal");
    myPageModal.style.display = "block";

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    
    const dashReq = {
        method: 'GET',
        headers: dashHeader
    }

    const url = "http://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

    fetch(url, dashReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const getCat = document.getElementById("category");
        const getLearn = document.getElementById("learnmat");
        const getsubCat = document.getElementById("subCat");
        const getQuiz = document.getElementById("quiz");
        const getStudent = document.getElementById("student");

    getCat.innerHTML = `${result.total_number_of_categories}`;
    getLearn.innerHTML = `${result.total_number_of_learningmaterial}`;
    getsubCat.innerHTML = `${result.total_number_of_subcategories}`;
    getQuiz.innerHTML = `${result.total_number_of_quize}`;
    getStudent.innerHTML = `${result.total_number_of_students}`;

    myPageModal.style.display = "none";


    })
    .catch(error => console.log('error', error));
}
dashboardApi();
