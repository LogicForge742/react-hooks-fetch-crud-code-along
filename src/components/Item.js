import React from "react";

function Item({ item ,onUpdateitem , onItemDelete}) {


function handleDelete(){
  fetch(`http://localhost:4000/items/${item.id}` ,{
  method :'DELETE',
  })


 
 .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to delete the item');
      }
      // Some APIs return empty response on DELETE
      // So don't assume JSON body; just call onItemDelete with the current item
      onItemDelete(item);
    })
  }




  //for update start here 
  function handleAddToCart(){
    //add fetch request
   fetch(`http://localhost:4000/items/${item.id}`,{
 method :"PATCH",
  headers :{
    "Content-Type" :"application/json",
  },
  body: JSON.stringify({
    isInCart :!item.isInCart,
   }),
    })
   .then(res => res.json())
   .then(updateItem =>onUpdateitem(updateItem))

  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick = {handleAddToCart}     >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove"  onClick ={handleDelete} >Delete</button>
    </li>
  );
}

export default Item;
