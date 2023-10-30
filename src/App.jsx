// don't forget to import useEffect from react
import { useEffect, useState } from "react";


export default function App() {
  // need state to keep track of todos
  // because localstorage is synchronous - that could slow down the application
  // instead of using an just an empty array as the initial state - we can use a function in its place,
  // which will only be executed on the initial render
  // reference: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [todos, setTodos] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed the JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });
  // need state to keep track of the value in the input
  const [todo, setTodo] = useState("");
  

  // useEffect to run once the component mounts
  useEffect(() => {
    // localstorage only support storing strings as keys and values
    // - therfore we cannot store arrays and objects without converting the object
    // into a string first. JSON.stringify will convert the object into a JSON string
    // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    localStorage.setItem("todos", JSON.stringify(todos));
    // add the todos as a dependancy because we want to update the
    // localstorage anytime the todos state changes
  }, [todos]);

  // function to get the value of the input and set the new state
  function handleIInputChange(e) {
    // set the new state value to what's currently in the input box
    setTodo(e.target.value);
  }

  // function to create a new object on form submit
  function handleFormSubmit(e) {
    // prevent the browser default behavior or refreshing the page on submit
    e.preventDefault();

    // don't submit if the input is an empty string
    if (todo !== "") {
      // set the new todos state (the array)
      setTodos([
        // copy the current values in state
        ...todos,
        {
          // setting a basic id to identify the object
          id: todos.length + 1,
          // set a text property to the value of the todo state and
          // trim the whitespace from the input
          text: todo.trim()
        }
      ]);
    }

    // clear out the input box
    setTodo("");
  }

  return (
    <div className="App">
      {/* create a form element and pass the handleFormSubmit function 
      to the form using the onSubmit prop */}
      <form onSubmit={handleFormSubmit}>
        {/* create an input element - make sure to add the value prop 
        with the state value passed in and the onChange prop to update
        the state every time something is typed in the input */}
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
      </form>

      {/* create a ul to hold all of the list items */}
      <ul className="todo-list">
        {/* map over the todos array which creates a new li element for every todo
        (make sure to add the "key" prop using the unique todo.id value to the li element)
        remember this is an array of objects - so we need to access the property 
        "text" to get the value we want to display */}
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
