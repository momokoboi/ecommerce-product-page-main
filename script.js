// global variables
let indexmodal = 1 
let cart_quantity = 0


// listen click on IMGs
function IMG_updaters(){
    const thumb1 = document.getElementById("thumb_1")
    const thumb2 = document.getElementById("thumb_2")
    const thumb3 = document.getElementById("thumb_3")
    const thumb4 = document.getElementById("thumb_4")

    const ELarray = [thumb1, thumb2, thumb3, thumb4]

    thumb1.addEventListener("click", () =>{
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img(thumb1, 1)
    })
    thumb2.addEventListener("click", () =>{
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img(thumb2, 2)
    })
    thumb3.addEventListener("click", () =>{
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img(thumb3, 3)
    })
    thumb4.addEventListener("click", () =>{
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img(thumb4, 4)
    })

    const mainImg = document.getElementById("show_product")

    mainImg.addEventListener("click", ()=> {
    const existingModal = document.getElementById("backdrop_img");
    if (existingModal) {
        existingModal.remove(); // Remove the existing modal before creating a new one
    }  
    const mainEL = document.getElementById("main")

    const newElement = document.createElement('div');
    newElement.id = "backdrop_img"
    newElement.innerHTML = `
      <section class="modal_display product_display">
        <button id="btn-prev"><img src="images/icon-previous.svg" alt="prev_icon"></button>
        <button id="btn-next"><img src="images/icon-next.svg" alt="next_icon"></button>
        <button id="exit"><img src="images/icon-close.svg" alt="close_btn"></button>
        <div id="main_img">
          <img src="images/image-product-1.jpg" alt="product_1" id="show_product_m">
        </div>
        <div id="thumbnail_img">
          <ul>
            <li class="thumb thumb--focus" id="thumb_1_m">
              <img src="images/image-product-1-thumbnail.jpg" alt="thumbnail_1">
            </li>
            <li class="thumb" id="thumb_2_m">
              <img src="images/image-product-2-thumbnail.jpg" alt="thumbnail_2">
            </li>
            <li class="thumb" id="thumb_3_m">
              <img src="images/image-product-3-thumbnail.jpg" alt="thumbnail_3">
            </li>
            <li class="thumb" id="thumb_4_m">
              <img src="images/image-product-4-thumbnail.jpg" alt="thumbnail_4">
            </li>
          </ul>
        </div>
      </section>
        `;
    mainEL.appendChild(newElement)
    backdrop_MGI()
    }
    )
    const backdropEL = document.getElementById("backdrop_img")
    
}


// image thumbnail + mainIMG
function update_img(tobeupdated, index){
    tobeupdated.setAttribute("class", "thumb thumb--focus")

    const mainImg = document.getElementById("show_product")
    mainImg.setAttribute("src", `images/image-product-${index}.jpg`)

    main.setAttribute("alt", `product_${index}`)
}

// update modal img

function update_img_modal(tobeupdated, index){
  tobeupdated.setAttribute("class", "thumb thumb--focus")

  const mainImg = document.getElementById("show_product_m")
  mainImg.setAttribute("src", `images/image-product-${index}.jpg`)

  main.setAttribute("alt", `product_${index}`)
}

function updatebuttons_modul(direction){
  const thumb1 = document.getElementById("thumb_1_m")
  const thumb2 = document.getElementById("thumb_2_m")
  const thumb3 = document.getElementById("thumb_3_m")
  const thumb4 = document.getElementById("thumb_4_m")

  const ELarray = [thumb1, thumb2, thumb3, thumb4]
  
  if(direction === "right"){
    indexmodal+=1
  }else if(direction === "left" && indexmodal > 0){
    indexmodal-=1
  }

  if(indexmodal === 2){
    ELarray.forEach((value) => value.setAttribute("class", "thumb"))
    update_img_modal(thumb2, 2)
  }else if(indexmodal === 3){
    ELarray.forEach((value) => value.setAttribute("class", "thumb"))
    update_img_modal(thumb3, 3)
    
  }else if(indexmodal === 4){
    ELarray.forEach((value) => value.setAttribute("class", "thumb"))
    update_img_modal(thumb4, 4)
  }else if(direction === "right" && indexmodal > 4){
    ELarray.forEach((value) => value.setAttribute("class", "thumb"))
    indexmodal = 1
    update_img_modal(thumb1, 1)
  }else if(direction === "left" && indexmodal === 1){
    ELarray.forEach((value) => value.setAttribute("class", "thumb"))
    indexmodal = 1
    update_img_modal(thumb1, 1)
  }else if(direction === "left" && indexmodal === 0){
    ELarray.forEach((value) => value.setAttribute("class", "thumb"))
    indexmodal = 4
    update_img_modal(thumb4, 4)
  }

}

// counter
function update_counter(){
  let count = 0
  const count_displayEL = document.getElementById("number")

  const plus_btn = document.getElementById("plus")
  const minus_btn = document.getElementById("minus")

  plus_btn.addEventListener("click", () => {
  count+=1
  count_displayEL.innerText = `${count}`
  })

  minus_btn.addEventListener("click", () => {
    if(count > 0){
      count-=1
      count_displayEL.innerText = `${count}`
    }
    })
}

// add to kart
function add_to_cart() {
  const addEL = document.getElementById("add_to_cart");
  const cart_listEL = document.getElementById("cart_list");

  addEL.addEventListener("click", () => {
    let count_displayEL = document.getElementById("number");
    cart_quantity += Number(count_displayEL.innerText);

    if (cart_quantity > 0) {
      const itemcount = document.getElementById("itemcount");
      itemcount.style.display = "flex";
      itemcount.innerText = cart_quantity;

      cart_listEL.style.alignSelf = "flex-start";
      cart_listEL.innerHTML = `
          <li>
              <img src="images/image-product-1-thumbnail.jpg" alt="product_in_cart" id="product_img">
              <div id="info_cart">
                  <p>Fall limited Edition Sneakers</p> 
                  <button id="del"><img src="images/icon-delete.svg" alt="del_icon"></button>
                  <p>$125.00 x ${cart_quantity} <span id="total">$${125.00 * cart_quantity}</span></p>
              </div>
          </li>
      `;

      const remove_btn_EL = document.getElementById("del");
      remove_btn_EL.addEventListener("click", () => {
        cart_listEL.innerHTML = `<p>Cart is Empty, please add items</p>`;
        cart_listEL.style.alignSelf = "center";
        cart_listEL.style.color = "gray";
        cart_quantity = 0;

        
        const itemcount = document.getElementById("itemcount");
        itemcount.style.display = "none";
      });
    }
  });
}



// show kart
function show_cart(){
  const cart_BTN_EL = document.getElementById("cart_EL")
  const cart_modalEL = document.getElementById("cart")
  const cart_EL = document.getElementById("backdrop")

  cart_BTN_EL.addEventListener("click", () => {
    cart_EL.style.backgroundColor = "transparent"
    cart_EL.style.display = "flex"
    cart_modalEL.style.display = "flex"
  })
  
  cart_EL.addEventListener("click", () =>{
  cart_EL.style.display = "none"
  })

  
  cart_modalEL.addEventListener("click", (the_click) => {
    the_click.stopPropagation(); 
  });

  const checkoutBTN = document.getElementById("checkout")
  
  checkoutBTN.addEventListener("click", ()=>{
    if(cart_quantity>0){
      checkout()
    }
  })

}
// del kart

function del_item(){
  
  if(remove_btn_EL){
    remove_btn_EL.remove()
  }
  const remove_btn_EL = document.getElementById("del")
  remove_btn_EL.addEventListener("click", ()=>{
    alert("here")
    const cart_listEL = document.getElementById("cart_list")
    cart_listEL.innerHTML = `<p>Car is Empty pls add items</p>`
    cart_listEL.style.alignSelf = "center"
    cart_listEL.style.color = "gray"
    
  })
}
//checkout

function checkout(){
  // if checkout being added.
  const cart_modalEL = document.getElementById("cart")
  const cart_EL = document.getElementById("backdrop")
  cart_modalEL.style.display = "none"
  cart_EL.style.display = "transparent"
}

// backdrop_images


function backdrop_MGI(){
    const exitEL = document.getElementById("exit")
    const backdropEL = document.getElementById("backdrop_img")

    const modalEL = document.getElementsByClassName("modal_display")[0]
    backdropEL.addEventListener("click", () => {
        backdropEL.style.display = "none"
    })

    modalEL.addEventListener("click", (the_click) => {
        the_click.stopPropagation(); 
    });

    exitEL.addEventListener("click", () => {
        backdropEL.style.display = "none"
    })

    const thumb1 = document.getElementById("thumb_1_m")
    const thumb2 = document.getElementById("thumb_2_m")
    const thumb3 = document.getElementById("thumb_3_m")
    const thumb4 = document.getElementById("thumb_4_m")

    const ELarray = [thumb1, thumb2, thumb3, thumb4]

    

    thumb1.addEventListener("click", () =>{
        indexmodal = 1
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img_modal(thumb1, 1)
        
    })
    thumb2.addEventListener("click", () =>{
        indexmodal = 2
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img_modal(thumb2, 2)
        
    })
    thumb3.addEventListener("click", () =>{
        indexmodal = 3
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img_modal(thumb3, 3)
        
    })
    thumb4.addEventListener("click", () =>{
        indexmodal = 4
        ELarray.forEach((value) => value.setAttribute("class", "thumb"))
        update_img_modal(thumb4, 4)
        
      })

      // left right button.
      const rightEL = document.getElementById("btn-next")
      const leftEL = document.getElementById("btn-prev")
      rightEL.addEventListener("click", ()=>{
        updatebuttons_modul("right")
        
      })

      leftEL.addEventListener("click", ()=>{
        updatebuttons_modul("left")
      })

}



function main(){
    IMG_updaters()
    update_counter()
    add_to_cart()
    show_cart()
}


main()