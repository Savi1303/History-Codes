




// Function for the Subcategory list 

function getSubList() {
    const catSub = new  URLSearchParams(window.location.search);
    let subId = catSub.get('id');

    const getScrollItem = document.querySelector(".subItems");
    const top1 = localStorage.getItem("admin");
    const top2 = JSON.parse(top1);
    const top3 = top2.token;     

  
    const sulHeaders = new Headers();
    sulHeaders.append("Authorization", `Bearer ${top3}`);
  
    const sulOptions = {
      method: "GET",
      headers: sulHeaders,
    };
  
    let data = [];
  
    const url =
      `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details${subId}`;
  
    fetch(url, sulOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // const getSub = document.querySelector("adminId");
    
        // getSub.innerHTML = `${result.admin_name}`;x
    
          getScrollItem.innerHTML = data;
      })
      .catch((error) => console.log("error", error));
  }
  
//   getSubList();