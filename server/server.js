import {app} from './app.js';
import { connectDB } from './data/database.js';

connectDB();

app.listen(4000,()=>{
    console.log(`Server is working: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})

//5:06:17