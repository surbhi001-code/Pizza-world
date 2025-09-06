const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(req.url==='/'){
        res.setHeader('Content-Type','text/html');

       res.end(
        `<form>
        <label>Name:</label>
        <input type="text" name:"username"></input>
        <button>Add</button>
        </form>
        `
    );

    }
    else{
        if(req.url==='/message'){
         res.setHeader('Content-Type','text/html');
         let body=[];
         req.on('data',(chunks)=>{
            body.push(chunks);

         })
         req.on('end',()=>{
            let buffer=Buffer.concat(body);
            console.log(buffer);
            let formData=buffer.toString();
            console.log(formData);
            
            const formValue=formData.split('=')[1];
            fs.writeFile('formValue.txt',formValue,(err)=>{
               res.statusCode=302;
               res.setHeader('Location','/');
               res.end();
            })




         })

        }
    }
})
server.listen(3000,()=>{console.log("Server is running!")});
