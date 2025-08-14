import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => res.json())
      .then((items) => setItems(items))
  }, [])
  function handlePost(newItem) {
    setItems([...items, newItem])

  }
  function onUpdateitem(updateItem) {
    const itemUpdate = items.map((item) => {
      if (item.id === updateItem.id) {
        return updateItem
      }
      else {
        return item
      }
    })
    setItems(itemUpdate)
  }
  function handleItemDelete(deletedItem){
    const remItems = items.filter((item) =>item.id !== deletedItem.id)

     setItems(remItems)
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  console.log('items:', items, Array.isArray(items));

  const itemsToDisplay = Array.isArray(items)
  ? items.filter(item => selectedCategory === "All" || item.category === selectedCategory)
  : [];


  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handlePost} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item}
            onUpdateitem={onUpdateitem} onItemDelete ={handleItemDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
