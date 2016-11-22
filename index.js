//Modules
var express = require('express'),
app = express(),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
formidable = require('formidable'),
imageUp = require('./Config/images'),
path = require('path');
// Connecting to DB
mongoose.connect('mongodb://test:test@ds151127.mlab.com:51127/sct');
var Campus = require('./DBA/schemas').Campus;
var Class = require('./DBA/schemas').Class;
var Alumn = require('./DBA/schemas').Alumn;

// Config
var middleware = require('./Config/middleware');
var auth = require('./Config/auth');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true,  parameterLimit: 10000, limit: 1024 * 1024 * 10}));
app.use(cookieParser());
app.use('/api/authenticate', auth.login);

// Welcome message
app.get('/', (req, res)=>{
    res.send('Bienvenido al sistema CRUD de este Centro Educativo.'); 
});

// Campus
app.get('/api/centros', (req, res)=>{
    //Listar centros.
    Campus.find({},(err, campus)=>{
        if(err) console.log(err);
        res.json(campus);
    });   
});

app.get('/api/centros/:id', (req, res)=>{
    //Listar centro. id: identificación del centro
    Campus.findOne({_id: req.params.id},(err, campus)=>{
        if(err) console.log(err);
        res.json(campus);
    });   
});

app.post('/api/newCentro', middleware.ensureAuthenticated, (req, res)=>{
    //Crear centro.
    var newcampus = new Campus ({name: req.body.name});
    newcampus.save((err, result)=>{
        if(err) console.log(err);
        else{console.log(result);
        console.log ('Centro creado');
        res.sendStatus(200);
        }
    });
});

app.delete('/api/deleteCentro/:id', middleware.ensureAuthenticated, (req, res)=>{
    //Eliminar centro. id: identificación del centro
    Campus.findOneAndRemove({_id: req.params.id}, (err, campus)=>{
        if (err) console.log(err);
        console.log(campus);
        Class.remove({campus_id: campus.id}, (err)=>{
            if (err) console.log(err);
            console.log ('Centro elimando');
            res.sendStatus(200);            
        });
    });
});

app.put('/api/updateCentro/:id', middleware.ensureAuthenticated, (req, res)=>{
    //Eliminar centro. id: identificación del centro
    Campus.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.newName}}, (err, result)=>{
        if (err) console.log(err);
        console.log ('Centro actualizado');
        res.sendStatus(200);
    });
});

// Classes
app.get('/api/Clases', (req, res)=>{
    //Listar clases.
    Class.find({},(err, classe)=>{
        if(err) console.log(err);
        res.json(classe);
    });   
});

app.get('/api/Clases/:id', (req, res)=>{
    //Listar clases. id: identificación del clase
    Class.findOne({_id:req.params.id},(err, classe)=>{
        if(err) console.log(err);
        res.json(classe);
    });   
});

app.post('/api/newClase', middleware.ensureAuthenticated, (req, res)=>{
    //Crear clase. Al crear la nueva clase, se debe verificar que pertenezca a un Centro válido
    console.log('campus_id: '+req.body.campus_id);
    Campus.findOne({_id: req.body.campus_id}, (err, campus)=>{
        console.log('campus: '+campus);
        if (err) console.log(err);
        if (campus !== null){
        
        var newclase = new Class ({
            name: req.body.name,
            campus_id: campus.id
        });   
        newclase.save((err, result)=>{
            if(err) console.log(err);
            else {
                console.log ('Clase creada');
                res.sendStatus(200);
            }
        });
        }else{
            res.send('El centro no existe. Verifique e intente nuevamente.');
        }        
    });
});

app.delete('/api/deleteClase/:id', middleware.ensureAuthenticated, (req, res)=>{
    //Eliminar clase. id: identificación de clase
    Class.remove({_id: req.params.id}, (err, result)=>{
        if (err) console.log(err);
        console.log ('Clase elimanda');
        res.sendStatus(200);
    });    
});

app.put('/api/updateClase/:id', middleware.ensureAuthenticated, (req, res)=>{
    //Actualizar clase. id: identificación de clase
    Class.update({_id: req.params.id}, {$set:{name: req.body.newName}},(err, result)=>{
        if (err) console.log(err);
        console.log ('Clase actualizada');
        res.sendStatus(200);
    });    
});

// Alumns
app.get('/api/Alumnos', (req, res)=>{
    //Listar alumnos.
    Alumn.find({},(err, alumns)=>{
        if(err) console.log(err);
        res.send(JSON.stringify(alumns));
    });
});

app.get('/api/Alumnos/:id', (req, res)=>{
    // Listar alumno. id: identificación de alumno
    Alumn.findOne({_id: req.params.id},(err, alumn)=>{
        if(err) console.log(err);
        res.json(alumn);
    });
});

app.get('/api/newAlumno', (req, res)=>{
    // Crear alumno/usuario através de formulario.
    res.sendFile(path.join(__dirname+'/index.html'))
});

app.post('/api/newAlumno', (req, res)=>{
    // Crear alumno.
    res.setHeader('Access-Control-Allow-Origin', '*');
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
    var cloudinaryPath = fields.name+fields.lastname;
    console.log(files);
    var newAlumn = new Alumn ({
            name: fields.name,
            lastname: fields.lastname,
            email: fields.email,
            password: fields.password,
            confirmpassword:  fields.confirmpass,
            image: "http://res.cloudinary.com/pluriza/image/upload/"+cloudinaryPath,
            class_id: fields.class_id,
            mac:    fields.mac,         
        }); 
        if (fields.password === fields.confirmpassword){
            newAlumn.save((err, result)=>{
                if(err) console.log(err);
                else {
                    imageUp.uploadFile(files.image.path, cloudinaryPath);
                    console.log(result);
                    res.json(newAlumn);
                }
            });  
        }else{
            res.send('Verifique las contraseñas');
        }             
    });    
});

app.delete('/api/deleteAlumno/:id', middleware.ensureAuthenticated, (req, res)=>{
    // Eliminar alumno. id: identificación de alumno
    Alumn.remove({_id: req.params.id}, (err, result)=>{
        if (err) console.log(err);
        console.log ('Alumno elimando');
        res.sendStatus(200);
    });    
});

app.put('/api/updateAlumno/:id', middleware.ensureAuthenticated, (req, res)=>{
    // Actualizar alumno. id: identificación de alumno
    Alumn.update({_id: req.params.id}, {$set: {name: req.body.name}}, (err, result)=>{
        if (err) console.log(err);
        console.log ('Alumno actualizado');
        res.sendStatus(200);
    });    
});

//Classes on Campus
app.get('/api/ClasesEnCentro/:id', (req, res)=>{
    // Listar clases en centro. id: identificación de CENTRO
    Campus.findOne({_id: req.params.id}, (err, campus)=>{
        Class.find({campus_id: campus.id}).exec((err, clases)=>{
            var Centro = { Centro: campus.name}
            lasclases = new Array();

            for(var i = 0; i<clases.length; i++){
                lasclases.push(clases[i]);
            }
            Centro['Clases'] = lasclases;
            res.json(Centro);
        });
    });
});

//Alumns on Class
app.get('/api/AlumnosEnClase/:id', (req, res)=>{
     // Listar alumnos en clase. id: identificación de CLASE
    Class.findOne({_id: req.params.id}, (err, clase)=>{
        if (clase !== null){
        Alumn.find({class_id: clase.id}).exec((err, alumnos)=>{
            var Clase = { Clase: clase.name}
            lasalumnos = new Array();

            for(var i = 0; i<alumnos.length; i++){
                lasalumnos.push(alumnos[i]);
            }
            Clase['Alumnos'] = lasalumnos;
            res.json(Clase);
        });
        }else
        res.send('La clase no existe');
    });
});

app.listen(8080, ()=>{
    console.log('Server listening at port: 8080');
});