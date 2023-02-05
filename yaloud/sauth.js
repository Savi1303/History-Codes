    if (!localStorage.getItem("admin")) {
        location.href = "404.html"
    }
    



    // Function for closing table for top3 students
    
 function closeDashModal() {

    const myModal = document.querySelector(".mymodal");
    myModal.style.display = "none";


}



// function for change image in update hidden div

function chooseImg(event) {
    event.preventDefault();
   
    const div1 = document.querySelector(".getWrapp");
    const div2 = document.querySelector(".wrapper");
   
    div1.style.display = "none";
    div2.style.display = "block";
   
   }
   
   
   
   
   // logout function
   
   function logout() {
       Swal.fire({
           icon: 'success',
           text: 'Logout Successful',
           confirmButtonColor: '#2D85DE'
       })
       
       setTimeout(() => {
           localStorage.clear();
           location.href = "index.html"
       }, 3000)
   }

   // Function for closing table for Update in category

function closeModal3() {
    const myModal = document.getElementById("my-modal3");
    myModal.style.display = "none";
}


    // Dashboard UserName   


    const settName = document.getElementById("adminId")

    const myToken = localStorage.getItem("admin");
    const theToken = JSON.parse(myToken);
    const token = theToken.token;
    
    const nameHeader = new Headers();
    nameHeader.append("Authorization", `Bearer ${token}`);
    
    const nameReq = {
        method: 'GET',
        headers: nameHeader
    }
    
        let adName = [];
    
    const urlx = "http://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
    
    fetch(urlx, nameReq)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        const getCat = document.getElementById("adminId");
    
        getCat.innerHTML = `${result.admin_name}`;
    
    })
    .catch((error) => console.log("error", error));
    

    // subCategory Username

function getNameDetails() {

    const myParams = new URLSearchParams(window.location.search);
    let catName = myParams.get('name');

    const displayCatName = document.querySelector(".det");
    displayCatName.innerHTML = catName;

}
