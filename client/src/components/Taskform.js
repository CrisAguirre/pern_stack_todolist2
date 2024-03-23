import { Button, Card, Grid, TextField, Typography, CardContent, CircularProgress } from "@mui/material";
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"; 

export default function TaskForm(){

    const [task, setTask] = useState({
        title: '',
        description: '',
    })

    const [loading, setloading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate()
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setloading(true);

    if(editing){
        await fetch(`http://localhost:4000/tasks/${params.id}`, {
           method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        //const data = await response.json();
        //console.log(data);
    }else{

        await fetch("http://localhost:4000/tasks", {
           method: "POST",
            body: JSON.stringify(task),
            headers: { "Content-Type": "application/json" },
        });
    }
        //const data = await res.json();
        setloading(false)
        //console.log(data);
        navigate('/')
    }
    const handleChange = (e) =>
        setTask({...task, [e.target.name]: e.target.value});
        //console.log(e.target.name, e.target.value);

    const loadTask = async (id) => {
        const res = await fetch(`http://localhost:4000/tasks/${id}`)
        const data = await res.json()
        //console.log(data);
        setTask({title: data.title, description: data.description})
        setEditing(true)
    };

    useEffect(() => {
        if (params.id) {
           loadTask(params.id);
         }
     }, [params.id])

    return ( 
        <Grid container
             direction={"column"} 
             alignItems={"center"} 
             justifyContent={"center"}
        >
        <Grid item xs={3}>
            <Card sx={{mt:5}} style={{ 
                backgroundColor: '$1e272e',
                padding: '1rem',
           }}>
                <Typography variant="5" textAlign="center" color="Black">{editing ? "Edit Task" : "Create Task"}</Typography>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant='filled'
                            label="Write yor title"
                            sx={{
                                display: "block",
                                margin: '0.5rem 0'
                            }}
                            name='title'
                            value={task.title}
                            onChange={handleChange}
                            inputProps={{style: {color: "black"}}}
                            inputlabelprops={{style: {color: "black"}}}
                        />
                        <TextField
                            variant='filled'
                            label="Write your description"
                            multiline
                            rows={4}
                            sx={{
                                display: "block",
                                margin: '0.5rem 0',
                            }}
                            name='description'
                            value={task.description}
                            onChange={handleChange}
                            inputProps={{style: {color: "black"}}}
                            inputlabelprops={{style: {color: "black"}}}
                        />

                        <Button variant="contained" color="primary" type="submit" disabled={ !task.title || !task.description}>
                            {loading ? <CircularProgress
                                color="inherit"
                                size={24}
                            />: 'Save'}
                        </Button>

                    </form>
                </CardContent>

            </Card>
        </Grid>
    </Grid>
  )}