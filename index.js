// function for signup
function signUp(event) {
    // prevents page reload
    event.preventDefault();

    // get spinner
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    // get values from inputs
    const getName = document.getElementById("name").value;
    const getEmail = document.getElementById("email").value;
    const getPass = document.getElementById("password").value;
    const getConfirmPass = document.getElementById("confirmPassword").value;

    if (getName === "" || getEmail === "" || getPass === "" || getConfirmPass === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    if (getConfirmPass !== getPass) {
        Swal.fire({
            icon: 'info',
            text: 'Password do not match',
            confirmButtonColor: '#2D85DE'
        })
    }

    else {
        const signData = new FormData();
        signData.append("name", getName);
        signData.append("email", getEmail);
        signData.append("password", getPass);
        signData.append("password_confirmation", getConfirmPass);

        const signReq = {
            method: 'POST',
            body: signData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

        fetch(url, signReq)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if (result.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                Swal.fire({
                    Icon: 'info',
                    text: 'Registration Unsuccessful!',
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
// dashboardApi();


//function for top3 students

function studentModal(){
    const myModal = document.querySelector(".mymodal");
    myModal.style.display = "block";

    const top1 = localStorage.getItem("admin");
    const top2 = JSON.parse(top1);
    const top3 = top2.token;     

    const getHeader = new Headers ();
    getHeader.append("Authorization", `Bearer ${top3}`);
    
    const topReq = {
        method: 'GET',
        headers: getHeader
    };

    let data = [];
  

const url = "http://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students"
      
      fetch(url , topReq)
        .then(response => response.json())
        .then(result => {
            result.map((item) => {
                data +=
                `<div class="student-card">
                    <p><span class="clent">Name</span>: <span class="switchItem">${item.name}</span></p>
                    <p><span class="clent">Email</span>: <span class="switchItem">${item.email}</span></p>
                    <p><span class="clent">Phone</span>: <span class="switchItem">${item.phone_number}</span></p>
                    <p><span class="clent">Position</span>: <span class="switchItem">${item.position}</span></p>
                    <p><span class="clent">Score</span>: <span class="switchItem">${item.total_score}</span></p>
                </div>
                  `           	
    const getTopStudents = document.querySelector(".allstudent");     
                getTopStudents.innerHTML = data;
      }) 
          })
        .catch(error => console.log('error', error));

}


// function for table of all students

const wrapper = document.getElementById("table-id") 

    const tab1 = localStorage.getItem("admin");
    const tab2 = JSON.parse(tab1);
    const tab3 = tab2.token;

    const getHeader = new Headers ();
    getHeader.append("Authorization", `Bearer ${tab3}`);
    
    const tableReq = {
        method: 'GET',
        headers: getHeader
    };

    let tabData = [];


const url = "http://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students"
      
      fetch(url , tableReq)
        .then(response => response.json())
        .then(result => {
           result.map((item) => {
               tabData +=
               `<div class="student-table">
               <tr>
                   <td><span class="clent"></span> <span class="switchItem">${item.name}</span></td>
                   <td><span class="clent"></span> <span class="switchItem">${item.email}</span></td>
                   <td><span class="clent"></span> <span class="switchItem">${item.phone_number}</span></td>
                   <td><span class="clent"></span> <span class="switchItem">${item.position}</span></td>
                   <td><span class="clent"></span> <span class="switchItem">${item.total_score}</span></td>
                   </tr>
               </div>
                 `           	
                 const getAllStudents = document.getElementById("table-id");     
                 getAllStudents.innerHTML = tabData;
       })
    }) 
    .catch(error => console.log('error', error));

// Function to create Category
function category() {
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";
  
    const catName = document.getElementById("cat_name").value;
    const catImage = document.getElementById("cat_img").files[0];
  
    if (catName === "" || catImage === "") {
      Swal.fire({
        icon: "info",
        text: "All fields are required",
        confirmButtonColor: "#2D85DE",
      });
      getSpin.style.display = "none";
    } 
    else {
      const top1 = localStorage.getItem("admin");
      const top2 = JSON.parse(top1);
      const top3 = top2.token;     
  
  
      const catHeader = new Headers();
      catHeader.append("Authorization", `Bearer ${top3}`);
  
      const formdata = new FormData();
      formdata.append("name", catName);
      formdata.append("image", catImage);
  
      const dashReq = {
        method: "POST",
        headers: catHeader,
        body: formdata,
      };
  
      const url =
        "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";
      fetch(url, dashReq)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.status === "success") {
            Swal.fire({
              icon: "success",
              text: "created successfully",
              confirmButtonColor: "#2D85DE",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
          } else {
            Swal.fire({
              icon: "info",
              text: "Unsuccessful",
              confirmButtonColor: "#2D85DE",
            });
            getSpin.style.display = "none";
          }
        })
        .catch((error) => console.log("error", error));
    }
  }   







// Function for the category list 

  function getCatList() {
    const getScrollItem = document.querySelector(".category_done");
    const top1 = localStorage.getItem("admin");
    const top2 = JSON.parse(top1);
    const top3 = top2.token;     

  
    const listHeaders = new Headers();
    listHeaders.append("Authorization", `Bearer ${top3}`);
  
    const listOptions = {
      method: "GET",
      headers: listHeaders,
    };
  
    let data = [];
  
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";
  
    fetch(url, listOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result?.map((item) => {
          data += `
                <div class="search-card">
                  <a href="details.html?id=${item.id}&name=${item.name}"><img src=${item.image} alt="image" /></a>
                  <div class="button">
                  <p>${item.name}</p>
                  <div class="text-right">
                    <button class="update-button" onclick="upModal(${item.id})">Update</button>
                    <button class="delete-button" onclick="deleteCategory(${item.id})">Delete</button>
                  </div>
                  </div>
                </div>
                `;
          getScrollItem.innerHTML = data;
        });
      })
      .catch((error) => console.log("error", error));
  }
  
  getCatList();

  //  Function for delete button for category
  
    function deleteCategory(myid) {
      const getToken = localStorage.getItem('admin');
      const token = JSON.parse(getToken);
      const myToken = token.token;
      const listHeaders = new Headers();
      listHeaders.append("Authorization", `Bearer ${myToken}`);
      const delReq = {
          method: 'GET',
          headers: listHeaders
      }
      const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${myid}`;
      fetch(url, delReq)
      .then(response => response.json())
      .then(result => {
          console.log(result)
          if (result.status === "success") {
              Swal.fire({
                  icon: 'success',
                  text: `${result.message}`,
                  confirmButtonColor: "#2D85DE"
              })
              setTimeout(() => {
                  location.reload();
              }, 3000)
          }
          else {
              Swal.fire({
                  icon: 'info',
                  text: 'Unsuccessful',
                  confirmButtonColor: "#2D85DE"
              })
          }
      })
      .catch(error => console.log('error', error));
  }


//   Function for update Category Modal

let uniqueId; 
function upModal(modalId) {
    localStorage.setItem("un", modalId);
    const myModal = document.getElementById("my-modal3");
    myModal.style.display = "block"

    const top1 = localStorage.getItem("admin");
    const top2 = JSON.parse(top1);
    const top3 = top2.token;     

  
    const upHeaders = new Headers();
    upHeaders.append("Authorization", `Bearer ${top3}`);
  
    uniqueId = modalId;

    const upReq = {
        method : 'GET',
        headers : upHeaders
    };

    const url = `http://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${uniqueId}`

  fetch(url, upReq)
      .then(response => response.json())
      .then(result => {
        const getUpName = document.getElementById("updateName");
        const getUpImage = document.getElementById("updateNameImage");

        getUpName.setAttribute(`value`, `${result.name}`);
        getUpImage.setAttribute(`value`, `${result.image}`);


        })
      .catch(error => console.log('error', error));

}

//  function to update Category

function updateCategory(event) {
    event.preventDefault();

    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const getUpdateName = document.getElementById("updateName").value;
    const getUpdateImage = document.getElementById("updateNameImage").value;
    const getUpdateImage1 = document.getElementById("updateImage").files[0];

    const getId = localStorage.getItem("un");
    console.log(getId);
    if ( getUpdateName === "") {
        Swal.fire({
            icon: 'info',
            text: `The Name field is Required`,
            confirmButtonColor: "#2D85DE"
        })
    getSpin.style.display = "none";

    }
    else {
 
    const top1 = localStorage.getItem("admin");
    const top2 = JSON.parse(top1);
    const top3 = top2.token;  

    const updateHeaders = new Headers();
    updateHeaders.append("Authorization", `Bearer ${top3}`);

        const upFormData = new FormData();
        upFormData.append("name", getUpdateName);
        upFormData.append("image",getUpdateImage);
        upFormData.append("image", getUpdateImage1);
        upFormData.append("category_id", getId);
        
                const upReq = {
                    method: 'POST',
                    headers: updateHeaders,
                    body: upFormData
                };
                const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";
                fetch(url, upReq)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status === "success") {
                        Swal.fire({
                            icon: 'success',
                            text: `${result.message}`,
                            confirmButtonColor: '#2D85DE'
                        })
                        setTimeout(() => {
                            location.reload();
                        }, 3000)
                    }
                    else{
                        Swal.fire({
                            icon: 'info',
                            text: 'Unsuccessful!',
                            confirmButtonColor: '#2D85DE'
                        })
                        getSpin.style.display = "none";
                    }
                })
                .catch(error => console.log('error', error));
            }
        }
                         


        
// Function for Subcategory

function subCategory(event) {
    event.preventDefault();
    

    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";
  
    const subName = document.getElementById("subCatName").value;
    const subImage = document.getElementById("subCatImg").files[0];
    const catSub = new  URLSearchParams(window.location.search);
    let subId = catSub.get('id');

  
    if (subName === "" || subImage === "") {
      Swal.fire({
        icon: "info",
        text: "All fields are required",
        confirmButtonColor: "#2D85DE",
      });
      getSpin.style.display = "none";
    } 
    else {
      const top1 = localStorage.getItem("admin");
      const top2 = JSON.parse(top1);
      const top3 = top2.token;     
  
  
      const subHeader = new Headers();
      subHeader.append("Authorization", `Bearer ${top3}`);
  
      const subData = new FormData();
      subData.append("subCatName", subName);
      subData.append("subCatImg", subImage);
      subData.append("category_id", subId );
  
      const subReq = {
        method: "POST",
        headers: subHeader,
        body: subData,
      };

      const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";
      fetch(url, subReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status = "success") {
          Swal.fire({
            icon: "success",
            text: "created successfully",
            confirmButtonColor: "#2D85DE",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error))
    }
}

