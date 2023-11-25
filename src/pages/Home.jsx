import './index.css'
import React, { useState,useEffect} from 'react'
import {
    chakra,
    Button,
    List,
    ListItem,
    Heading,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react'


export const Home = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')

    useEffect(()=>{
            setTodos(todos)
        },[todos])
    const createTodoHandler = (text) => {
        setTodos((prevState) => [...prevState, { id: Date.now(), text, elemStatus: "uncompleted" }])
        setText('')
        // a = [1,2,3] => b = [...[1,2,3], 4,5,6] = [1,2,3,4,5,6]
    }

    const removeTodoHandler = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }

    const firstSort = () => {
        todos.sort(function (a, b) {
            if (a.text > b.text) {
              return 1;
            }
            if (a.text < b.text) {
              return -1;
            }
            return 0;
          });
          setTodos((prevState) => [...prevState])
    }

    const elementStatus = (elemId) =>{
        todos.map((todo) => {
                if (todo.id === elemId) {
                    if (todo.elemStatus === "uncompleted") {
                        todo.elemStatus = "completed";
                    } else {
                        todo.elemStatus = "uncompleted";
                    }
                }
            }
        )
        setTodos(todos)
        setTodos((prevState) => [...prevState])
    }

    const filtrElemenst = (par) =>{
        let todosComleted = []
        let todosUncomleted = []
        todos.map((todo) => {
            if (todo.elemStatus === "completed") {
                todosComleted.push(todo)
            }else {todosUncomleted.push(todo)}
            }
        )
        if(par===1){setTodos(todosComleted)}
        if(par===0){setTodos(todosUncomleted)}
        if(par===2){setTodos(todos)}
        setTodos((prevState) => [...prevState])
    }

    return (
        <Flex
            flexDirection='column'
            h='90vh'
            w='100ph'
            m='1rem'
            gap='1rem'
            alignItems='center'
            justifyContent='space-between'
            display='flex'
            borderRadius={75}

        >
            <Heading color={'brown'}>
                <div className={'font-cyrill-script-heading'}>Списокъ дѣлъ</div>
            </Heading>
            <List
                h='55%'
                w='65%'
                display='flex'
                flexDirection='column'
                overflowY='scroll'
                border='3px solid black'
                borderRadius='10px'
                background={"#ffefff"}
                p='10px'
            >
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        borderBottom='1px solid gray'
                        py='13px'
                    >
                        <Text className={'font-cyrill-script'}>{todo.text}</Text>
                        <img src='/vupolneno.png' alt='Completed' className={todo.elemStatus} width={"50"} height={"50"}/>
                        <div>
                            <Button
                                className={'font-cyrill-script'}
                                onClick={() => {elementStatus(todo.id)}}
                                background={'blue.900'}
                                color='white'
                                margin={1}
                                _hover={{
                                    background: 'green.500',
                                }}
                            >
                                Сдѣлано
                            </Button>

                            <Button
                                className={'font-cyrill-script'}
                                onClick={() => removeTodoHandler(todo.id)}
                                background={'blue.900'}
                                color='white'
                                margin={1}
                                _hover={{
                                    background: 'red.600',
                                }}
                            >
                                Изничтожить
                            </Button>
                        </div>
                    </ListItem>
                ))}
            </List>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault() // Без перезагрузки приложения после добавления задачи
                    createTodoHandler(text)
                }}
                display='flex'
                flexDirection='column'
                alignItems='center'
                gap='20px'
            >
                <Input
                    className={'font-cyrill-script'}
                    placeholder='Напишите задачу...'
                    maxLength={60}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w='400px'
                    h='50px'
                />
                <hr/>
                <div className={"display: flex"}>
                    <Button
                        className={'font-cyrill-script'}
                        isDisabled={!text.trim().length}
                        type='submit'
                        w='fit-content'
                        background={'blue.500'}
                        color='white'
                        _hover={{
                            background: 'blue.600',
                        }}
                    >
                        Добавить задачу
                    </Button>
                    <Button
                        className={'font-cyrill-script'}
                        onClick={() => firstSort()}
                        background={'blue.500'}
                        color='white'
                        margin={1}
                        _hover={{
                            background: 'blue.600',
                        }}
                        >
                        Сортировать задачи
                    </Button>
                    <Button
                        className={'font-cyrill-script'}
                        onClick={() => filtrElemenst(1)}
                        background={'blue.500'}
                        color='white'
                        margin={1}
                        _hover={{
                            background: 'blue.600',
                        }}
                        >
                        Выполненные
                    </Button>
                    <Button
                        className={'font-cyrill-script'}
                        onClick={() => filtrElemenst(0)}
                        background={'blue.500'}
                        color='white'
                        margin={1}
                        _hover={{
                            background: 'blue.600',
                        }}
                        >
                        Невыполненные
                    </Button>
                    <Button
                        className={'font-cyrill-script'}
                        onClick={() => filtrElemenst(2)}
                        background={'blue.500'}
                        color='white'
                        margin={1}
                        _hover={{
                            background: 'blue.600',
                        }}
                        >
                        Сбросить фильтр
                    </Button>
                </div>
            </chakra.form>

        </Flex>
    )
}
