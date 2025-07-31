# React Fundamentals

Modern React Development

---

## What is React?

- JavaScript library for building user interfaces
- Created by Facebook (Meta) in 2013
- Component-based architecture
- Virtual DOM for performance

---

## Key Concepts

--

### Components

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Welcome name="World" />
```

--

### JSX Syntax

```jsx
const element = (
  <div className="container">
    <h1>Welcome to React</h1>
    <p>Let's build something amazing!</p>
  </div>
);
```

--

### State Management

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

---

## Hooks

Modern way to handle state and side effects

- `useState` - State management
- `useEffect` - Side effects
- `useContext` - Context consumption
- `useReducer` - Complex state logic

Note:
Hooks were introduced in React 16.8 and revolutionized how we write React components.

---

## Demo Time!

Let's build a simple Todo App

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
  };
  
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map(todo => <div key={todo.id}>{todo.text}</div>)}
    </div>
  );
}
```

---

## Best Practices

1. **Keep components small and focused**
2. **Use functional components with hooks**
3. **Implement proper error boundaries**
4. **Optimize with React.memo when needed**
5. **Follow naming conventions**

---

## Resources

- [Official React Documentation](https://reactjs.org/)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Create React App](https://create-react-app.dev/)

---

## Questions?

Thank you for your attention!

🚀 Happy coding with React!