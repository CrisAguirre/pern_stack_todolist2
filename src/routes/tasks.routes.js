//se definen las rutas de los endpoints
const {Router} = require('express');
//const pool = require('../db')
//router.get('/', (reg, res) => {
    //res.send('Hello world');
  //  }
//)
//router.get('/tasks', async (req, res) => {
    //const result = await pool.query('SELECT NOW()')
    //console. log(result)
    //res.json(result.rows[0].now)
    //res.send('retrieving a list of tasks');
//})
const { getAllTasks, 
        getTask,
        createTask,
        deleteTask, 
        updateTask
     } = require("../controllers/tasks.controller")

const router = Router();

router.get('/tasks', getAllTasks)
router.get('/tasks/:id', getTask)
router.post('/tasks', createTask)
router.delete('/tasks/:id', deleteTask)
router.put('/tasks/:id', updateTask)
module.exports = router;