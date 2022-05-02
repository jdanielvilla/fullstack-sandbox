import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import axios from 'axios'

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// const getPersonalTodos = () => {
//   return sleep(1000).then(() => Promise.resolve({
//     '0000000001': {
//       id: '0000000001',
//       title: 'First List',
//       todos: ['First todo of first list!']
//     },
//     '0000000002': {
//       id: '0000000002',
//       title: 'Second List',
//       todos: ['First todo of second list!']
//     }
//   }))
// }

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const getTodoList = () => {
    axios.get('http://localhost:3001/todos')
    .then(res => {
      res.data.data.forEach(todoList => {setTodoLists(todoList)
      console.log("We got the todoList")
      })
    })
    .catch(err => {console.error("We got an error, error: " + err)})
  }

  const postTodoList = (newTodoList) => {
    axios.post('http://localhost:3001/todos', [newTodoList])
    .then(
      console.log("The todoList has been sent")
    )
    .catch(err => {console.error("We got an error, error:" + err)})
  }

  useEffect(() => {
    getTodoList()
  }, [])

  if (!Object.keys(todoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My Todo Lists
        </Typography>
        <List>
          {Object.keys(todoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={todoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {todoLists[activeList] && <TodoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      todoList={todoLists[activeList]}
      saveTodoList={(id, { todos }) => {
        const listToUpdate = todoLists[id]
        const newTodoList = {
          ...todoLists,
          [id]: {...listToUpdate, todos}
        }
        setTodoLists(newTodoList)
        postTodoList(newTodoList)
      }}
    />}
  </Fragment>
}
