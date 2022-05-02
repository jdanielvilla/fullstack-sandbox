import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = (event) => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  const handleBlur = () => {
    saveTodoList(todoList.id, { todos })
  }


  return (
    <Card sx={{margin: '0 1rem'}}>
      <CardContent>
        <Typography component='h2'>
          {todoList.title}
        </Typography>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          {todos.map((todo, index) => (
            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{margin: '8px'}} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{flexGrow: 1, marginTop: '1rem'}}
                label='What to do?'
                value={todo.title}
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    {title: event.target.value,
                      completed: todos[index].completed 
                    },
                    ...todos.slice(index + 1)
                  ])
                }}
                onBlur={handleBlur}
              />
              <Button
               sx={{margin: '8px'}}
               size='small'
               color='primary'
              >
               <Checkbox 
               {...label}
               checked={todo.completed}
               onClick={() => {
                todo.completed = !todo.completed
                setTodos([...todos])
               }}
               />
              </Button>
              <Button
                sx={{margin: '8px'}}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
