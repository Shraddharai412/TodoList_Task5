import React, { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "30px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      fontSize:"20px",
      backgroundColor:"lightblue"
    },
    heading: {
      textAlign: "center",
      color: "#333",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    error: {
      color: "red",
      fontSize: "14px",
    },
    button: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10px",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#f9f9f9",
      borderRadius: "5px",
    },
    emptyMessage: {
      textAlign: "center",
      fontStyle: "italic",
      color: "#666",
    },
  };

  function validate(fieldValues = formData) {
    const tempErrors = {};
    if (!fieldValues.title.trim()) {
      tempErrors.title = "Task title is required";
    }
    return tempErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    if (editIndex === null) {
      setTasks((prev) => [...prev, formData]);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = formData;
      setTasks(updatedTasks);
      setEditIndex(null);
    }

    setFormData({ title: "" });
    setErrors({});
  }

  function handleEdit(index) {
    setFormData(tasks[index]);
    setEditIndex(index);
    setErrors({});
  }

  function handleDelete(index) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((_, i) => i !== index));
      if (editIndex === index) {
        setFormData({ title: "" });
        setEditIndex(null);
      }
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Todo List Manager</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Task</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.title && <p style={styles.error}>{errors.title}</p>}
        </div>
        <div>
          <button type="submit" style={{...styles.button,backgroundColor:'purple'}}>
            {editIndex === null ? "Add Task" : "Update Task"}
          </button>
        </div>
      </form>

      {tasks.length === 0 ? (
        <p style={styles.emptyMessage}>No tasks added yet</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none", marginTop: "20px" }}>
          {tasks.map((task, index) => (
            <li key={index} style={styles.listItem}>
              <span>{task.title}</span>
              <div>
                <button onClick={() => handleEdit(index)} style={{...styles.button,backgroundColor:'green'}}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{ ...styles.button, backgroundColor: "#dc3545" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
