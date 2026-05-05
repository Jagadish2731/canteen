import React, { useState, useRef } from "react";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter, FiImage, FiX, FiCheck } from "react-icons/fi";
import "../../style/AdminCSS/menu.css";
 
const CATEGORIES = ["All", "Main Course", "Beverages", "Desserts", "Snacks"];
 
const categoryEmoji = {
  "Main Course": "🍽️",
  Beverages: "☕",
  Desserts: "🍰",
  Snacks: "🍿",
};
 
const Menu = () => {
  const [item, setItem]               = useState("");
  const [price, setPrice]             = useState("");
  const [category, setCategory]       = useState("Main Course");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
 
  // ── Filter state ──
  const [filterOpen, setFilterOpen]         = useState(false);
  const [activeFilter, setActiveFilter]     = useState("All");
  const [searchTerm, setSearchTerm]         = useState("");
 
  // ── Edit state ──
  const [editId, setEditId]           = useState(null);
  const [editName, setEditName]       = useState("");
  const [editPrice, setEditPrice]     = useState("");
  const [editCategory, setEditCategory] = useState("Main Course");
 
  const [list, setList] = useState([
    { id: 1, name: "Burger",  price: 150, category: "Main Course", image: null },
    { id: 2, name: "Pizza",   price: 200, category: "Main Course", image: null },
    { id: 3, name: "Coffee",  price: 50,  category: "Beverages",   image: null },
  ]);
 
  // ── Image handlers ──
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };
 
  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
 
  // ── Add item ──
  const addItem = () => {
    if (!item.trim() || !price) return;
    setList([...list, {
      id: Date.now(),
      name: item,
      price: parseFloat(price),
      category,
      image: imagePreview,
    }]);
    setItem(""); setPrice(""); setCategory("Main Course");
    clearImage();
  };
 
  // ── Delete ──
  const deleteItem = (id) => {
    setList(list.filter((i) => i.id !== id));
    if (editId === id) cancelEdit();
  };
 
  // ── Edit helpers ──
  const startEdit = (menuItem) => {
    setEditId(menuItem.id);
    setEditName(menuItem.name);
    setEditPrice(menuItem.price);
    setEditCategory(menuItem.category);
  };
 
  const saveEdit = () => {
    if (!editName.trim() || !editPrice) return;
    setList(list.map((i) =>
      i.id === editId
        ? { ...i, name: editName, price: parseFloat(editPrice), category: editCategory }
        : i
    ));
    cancelEdit();
  };
 
  const cancelEdit = () => {
    setEditId(null); setEditName(""); setEditPrice(""); setEditCategory("Main Course");
  };
 
  // ── Filtered list ──
  const filteredList = list.filter((i) => {
    const matchCat    = activeFilter === "All" || i.category === activeFilter;
    const matchSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });
 
  return (
    <div className="menu-page">
 
      {/* ── Header ── */}
      <div className="menu-header">
        <h1>🍽️ Menu Management</h1>
        <p>Manage your canteen menu items</p>
      </div>
 
      {/* ── Controls ── */}
      <div className="menu-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-wrapper">
          <button
            className={`filter-btn ${filterOpen ? "active" : ""}`}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <FiFilter /> Filter
            {activeFilter !== "All" && <span className="filter-badge">1</span>}
          </button>
 
          {filterOpen && (
            <div className="filter-dropdown">
              <p className="filter-dropdown-label">Filter by Category</p>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-option ${activeFilter === cat ? "selected" : ""}`}
                  onClick={() => { setActiveFilter(cat); setFilterOpen(false); }}
                >
                  {cat !== "All" && <span>{categoryEmoji[cat]}</span>}
                  {cat}
                  {activeFilter === cat && <FiCheck className="check-icon" />}
                </button>
              ))}
              {activeFilter !== "All" && (
                <button className="filter-clear" onClick={() => { setActiveFilter("All"); setFilterOpen(false); }}>
                  Clear filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
 
      {/* Active filter pill */}
      {activeFilter !== "All" && (
        <div className="active-filter-pill">
          <span>{categoryEmoji[activeFilter]} {activeFilter}</span>
          <button onClick={() => setActiveFilter("All")}><FiX /></button>
        </div>
      )}
 
      {/* ── Add Item Card ── */}
      <div className="add-item-card">
        <h3>➕ Add New Item</h3>
        <div className="add-item-layout">
          {/* Left — form */}
          <div className="add-item-form">
            <div className="form-group">
              <label>Item Name</label>
              <input type="text" value={item} onChange={(e) => setItem(e.target.value)} placeholder="Enter item name" />
            </div>
            <div className="form-group">
              <label>Price (Rs)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Main Course</option>
                <option>Beverages</option>
                <option>Desserts</option>
                <option>Snacks</option>
              </select>
            </div>
            <button className="add-btn" onClick={addItem}>
              <FiPlus /> Add Item
            </button>
          </div>
 
          {/* Right — image upload */}
          <div className="image-upload-zone" onClick={() => fileInputRef.current?.click()}>
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="image-preview" />
                <button className="image-clear-btn" type="button" onClick={(e) => { e.stopPropagation(); clearImage(); }}>
                  <FiX />
                </button>
              </>
            ) : (
              <div className="image-upload-placeholder">
                <div className="upload-icon-wrap">
                  <FiImage className="upload-icon" />
                </div>
                <p>Click to upload item image</p>
                <span>PNG, JPG up to 5MB</span>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden-file-input" onChange={handleImageChange} />
          </div>
        </div>
      </div>
 
      {/* ── Results count ── */}
      <p className="results-count">
        Showing <strong>{filteredList.length}</strong> of <strong>{list.length}</strong> items
        {activeFilter !== "All" && ` in "${activeFilter}"`}
      </p>
 
      {/* ── Menu Items Grid ── */}
      <div className="menu-items-grid">
        {filteredList.length === 0 ? (
          <div className="empty-state">
            <span>🍽️</span>
            <p>No items found</p>
          </div>
        ) : filteredList.map((menuItem) => (
          <div key={menuItem.id} className={`menu-item-card ${editId === menuItem.id ? "editing" : ""}`}>
 
            {/* Image */}
            {editId !== menuItem.id && (
              <div className="item-image-wrap">
                {menuItem.image ? (
                  <img src={menuItem.image} alt={menuItem.name} className="item-image" />
                ) : (
                  <div className="item-image-fallback">
                    <span>{categoryEmoji[menuItem.category] ?? "🍴"}</span>
                  </div>
                )}
                <span className="item-category-pill">{menuItem.category}</span>
              </div>
            )}
 
            <div className="item-body">
              {editId === menuItem.id ? (
                /* ── EDIT MODE ── */
                <div className="edit-form">
                  <h4 className="edit-title">✏️ Edit Item</h4>
                  <div className="form-group">
                    <label>Item Name</label>
                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Price (Rs)</label>
                    <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                      <option>Main Course</option>
                      <option>Beverages</option>
                      <option>Desserts</option>
                      <option>Snacks</option>
                    </select>
                  </div>
                  <div className="edit-actions">
                    <button className="save-btn" onClick={saveEdit}><FiCheck /> Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}><FiX /> Cancel</button>
                  </div>
                </div>
              ) : (
                /* ── VIEW MODE ── */
                <>
                  <div className="item-header">
                    <h4>{menuItem.name}</h4>
                    <div className="item-actions">
                      <button className="edit-btn" onClick={() => startEdit(menuItem)} title="Edit"><FiEdit /></button>
                      <button className="delete-btn" onClick={() => deleteItem(menuItem.id)} title="Delete"><FiTrash2 /></button>
                    </div>
                  </div>
                  <div className="item-details">
                    <span className="price">Rs {menuItem.price}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
 
    </div>
  );
};
 
export default Menu;
