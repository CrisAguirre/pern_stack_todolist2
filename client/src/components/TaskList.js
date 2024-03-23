import { Button, Card, CardContent, Typography } from '@mui/material'
import {useEffect, useState} from 'react'
export default function TaskList() {

    const [tasks, setTasks] = useState([])

    const loadTasks = async () => {
        const response = await fetch('http://localhost:4000/tasks')
        const data = await response.json()
        setTasks(data) 
    }

    const handleDelete = async (id) => {
       try{ 
        await fetch( `http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
           })
           setTasks(tasks.filter(task => task.id !== id));
        }
        catch(error){
            console.log(error);
        }
    }
    
    useEffect(() =>{
        loadTasks()
    },[])

    return (
        <>
        <h1>Task List</h1>{
            tasks.map((task) => (
                <Card style={{
                    marginBottom: ".7rem"
                }}
                key={task.id}>
                    <CardContent style={{
                        //background: "#262626",
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                       <div >
                            <Typography>{task.title}</Typography>
                            <Typography>{task.description}</Typography>
                        </div>
                        <div>
                            <Button 
                                variant="contained"
                                color="inherit"
                                onClick={() => console.log("edit")}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="contained"
                                color="warning"
                                style={{marginLeft: ".5rem"}}
                                onClick={() =>  handleDelete(task.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))
        }
        </>
    );
}