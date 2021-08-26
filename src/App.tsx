// React App
import { useState } from "react";
// Material-UI Imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { addTodo, removeTodo, setTodoStatus, editTodo, updateTodo } from "./redux/todoSlice";
import { Todo } from "./models/todo";

function App() {
  //React Hooks
  const [todoDescription, setTodoDescription] = useState("");
  const [todoEditDesc, setTodoEditDesc] = useState("");

  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state.todo) as Todo[];
  const dispatch = useDispatch<AppDispatch>();

  //Rendering
  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center" }} variant="h3">
        Todo List
      </Typography>
      <TextField
        variant="outlined"
        label="To Do Item"
        fullWidth
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <Button
        style={{
          marginTop: '10px',
        }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          if (!todoDescription) return;
          dispatch(addTodo(todoDescription));
          setTodoDescription('');
        }}
      >
        Add Item
      </Button>
      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            {
              todo.isEditing === true ?
                <TextField
                  label="Edit Item"
                  variant="outlined"
                  fullWidth
                  value={todoEditDesc}
                  onChange={(e) => setTodoEditDesc(e.target.value)}
                /> :
                <ListItemText
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.description}
                </ListItemText>
            }

            <ListItemSecondaryAction>
              {todo.isEditing === true ?
                <IconButton
                  onClick={() => {
                    dispatch(updateTodo({ id: todo.id, description: todoEditDesc }));
                  }}
                >
                  <CheckIcon />
                </IconButton>
                :
                <IconButton
                  onClick={() => {
                    setTodoEditDesc(todo.description);
                    dispatch(editTodo(todo.id));
                  }}
                >
                  <EditIcon />
                </IconButton>
              }

              <IconButton
                onClick={() => {
                  dispatch(removeTodo(todo.id))
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Checkbox
                edge="end"
                checked={todo.completed}
                onClick={() => {
                  dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id }))
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;