import express from 'express';
import { createConnection } from 'mysql2';
import { StatusCodes} from 'http-status-codes';


//Creating Connection
var conn = createConnection({
host : "localhost",
user : "root",
password : "cdac",
database : "web_practice"
}
);

conn.connect((error)=>{
    if(error){
        console.log(" Error in db connection "+ error);
    }
    else{
        console.log("DB connection successfull");
    }
}
)


//Creating server
var app = express();
app.use(express.json());
//CRUD OPERATIONS

//POST - Creation
app.post('/student', (request,response)=>{
    try{
        const data = request.body; //String
        const qry = `insert into dost values (${data.id}, '${data.name}',${data.marks})`;
        conn.query(qry,(error, result)=>{
            if(error){
                console.log(error);
                if(error.errno==1062){
                    console.log("Duplicate value");
                    response.status(StatusCodes.BAD_REQUEST).send({message : "Duplicate value"});
                }
                else{
                response.status(StatusCodes.PRECONDITION_FAILED).send({message : "Query failed"});
            }}
            else{
                console.log(`${data.id}, '${data.name}','${data.phone}',${data.marks}`);
                response.status(StatusCodes.OK).send({message : "Insertion Successfull"});
            }
        })
    }
    catch(error){
        response.status(StatusCodes.BAD_REQUEST).send({message : "Input is wrong"});
    }


})

//Get ALL Method - READ
app.get('/student',(request,response)=>{
    try{
        const qry = `select * from dost`;
        conn.query(qry,(error, result)=>{
            if(error){
                console.log("Error in fetching");
                response.status(StatusCodes.CONFLICT).send({message : "Error in fetching data"});
            }
            else{
                response.status(StatusCodes.OK).send(result);
            }

        })
    }
    catch(error){
        response.status(StatusCodes.BAD_REQUEST).send({message : "Internal Error"});
    }
})

//Getting single element
app.get('/student/:a',(request,response)=>{
    try{
        const x=parseInt(request.params.a);
        const qry = `select * from dost where id =${x} `;
        conn.query(qry,(error, result)=>{
            if(error){
                console.log("Error in fetching");
                response.status(StatusCodes.CONFLICT).send({message : "Error in fetching data"});
            }
            else{
                response.status(StatusCodes.OK).send(result);
            }

        })
    }
    catch(error){
        response.status(StatusCodes.BAD_REQUEST).send({message : "Internal Error"});
    }
})

//Deletion
app.delete('/student/:a',(request,response)=>{
    try{
        const x=parseInt(request.params.a);
        const qry = `delete from dost where id =${x} `;
        conn.query(qry,(error, result)=>{
            if(error){
                console.log("Error in fetching");
                response.status(StatusCodes.CONFLICT).send({message : "Error in fetching data"});
            }
            else{
                response.status(StatusCodes.OK).send({message : "Deletion Successfull"});
            }

        })
    }
    catch(error){
        response.status(StatusCodes.BAD_REQUEST).send({message : "Internal Error"});
    }
})

//Update
app.put('/student/:a',(request,response)=>{
    try{
        const x=parseInt(request.params.a);
        const data = request.body;
        const qry = `update dost set name = '${data.name}', marks = ${data.marks} where id = ${x}`;
        conn.query(qry,(error, result)=>{
            if(error){
                console.log("Error in fetching");
                response.status(StatusCodes.CONFLICT).send({message : "Error in fetching data"});
            }
            else{
                response.status(StatusCodes.OK).send(result);
            }

        })
    }
    catch(error){
        response.status(StatusCodes.BAD_REQUEST).send({message : "Internal Error"});
    }
})




app.listen(3300,()=>{
    console.log("Server Started ..... ");
})