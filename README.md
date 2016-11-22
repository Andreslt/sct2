# sct2

<small>Nota: Para todas las peticiones POST, PUT y DELETE, se debe agregar en el Header:</small><br><br>
Authorization: Bearer:Token <br><br>
<u>Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ODI2OTliNTEyMmE5NDI3ZmM1OGZhYzQiLCJpYXQiOjE0Nzk3NDQ5MDgsImV4cCI6MTQ4MDk1NDUwOH0.-xEnDQ_8tW43T1GPs9KljvYfjKWQ5xEgpMZ9ARWS2Bw</u>
<img src="http://res.cloudinary.com/pluriza/image/upload/v1479771481/Captura_de_pantalla_2016-11-21_a_las_6.37.12_p.m._rzn7ta.png">

>CENTROS

-> Create: 

-path: '/api/newCentro'<br>
-method: 'POST'<br>
-args: [name]<br>

-> Read:

-path: '/api/centros'<br>
-method: 'GET'<br>

-path: '/api/centros/:id'<br>
-method: 'GET'<br>
-params: [id]<br>

Update:

-path: '/api/updateCentro/:id'<br>
-method: 'PUT'<br>
-params: [id]<br>
-args: [newName]<br>

Delete: 

-path: '/api/deleteCentro/:id'<br>
-method: 'DELETE'<br>
-params: [id]<br>

>CLASES

-> Create: 

-path: '/api/newClase'<br>
-method: 'POST'<br>
-args: [name, centro]<br>

-> Read:

-path: '/api/Clases'<br>
-method: 'GET'<br>

-path: '/api/Clases/:id'<br>
-method: 'GET'<br>
-params: [id]<br>

Update:

-path: '/api/updateClase/:id'<br>
-method: 'PUT'<br>
-params: [id]<br>
-args: [newName]<br>

Delete: 

-path: '/api/deleteClase/:id'<br>
-method: 'DELETE'<br>
-params: [id]<br>

>Alumnos

-> Create: 

-path: '/api/newAlumno'<br>
-method: 'POST'<br>
-args: [name]<br>

-> Read:

-path: '/api/Alumnos'<br>
-method: 'GET'<br>

-path: '/api/Alumnos/:id'<br>
-method: 'GET'<br>
-params: [id]<br>

Update:

-path: '/api/updateAlumno/:id'<br>
-method: 'PUT'<br>
-params: [id]<br>
-args: [newName]<br>

Delete: 

-path: '/api/deleteAlumno/:id'<br>
-method: 'DELETE'<br>
-params: [id]<br>

>Clases En Centro
-> Read:

-path: '/api/ClasesEnCentro/:id'<br>
-method: 'GET'<br>
-params: [id Centro]<br>

>Clases En Centro
-> Read:

-path: '/api/AlumnosEnClase/:id'<br>
-method: 'GET'<br>
-params: [id Clase]<br>
