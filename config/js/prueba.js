$("#listar").click(function () {
    Listar();
});

$("#limpiar").click(function (event) {
    event.preventDefault();
    $("#form_test")[0].reset();
    $("#hidden").html("");
});

function Listar() {
    $.post("controllers/controllerPrueba.php?accion=listar","",
        function (respuesta) {
            //console.log(respuesta);
            const data = JSON.parse(respuesta);
            //console.log(data);
            let contador = 0
            let cadena = "";
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    contador = contador+1
                    cadena +=
                        "<tr>  <th scope='row'>"+ contador+"</th> <td>"+ data[i]["cli_nombre"] +"</td>  <td>"+ data[i]["cli_apellidos"] +"</td> <td><button type='button' class='btn btn-warning disabled'><i class='fas fa-edit'></i></button></td> <td><button type='button' class='btn btn-danger disabled' ><i class='fas fa-trash-alt'></i></button></td> </tr>";
                }
                $("#table_body").html(cadena);
                $.post("controllers/controllerPrueba.php?accion=listar2","",
                    function (respuesta1) {
                        //console.log(respuesta);
                        const data = JSON.parse(respuesta1);
                        //console.log(data);
                        let contador1 = 3
                        let cadena1 = "";
                        if (data.length > 0) {
                            for (let i = 0; i < data.length; i++) {
                                contador1 = contador1+1
                                cadena1 +=
                                    "<tr>  <th scope='row'>"+ contador1+"</th> <td>"+ data[i]["cli_nombre"] +"</td>  <td>"+ data[i]["cli_apellidos"] +"</td> <td><button type='button' class='btn btn-warning' id='edit' onclick=Mostrar("+ data[i]["cli_id"] +")><i class='fas fa-edit'></i></button></td> <td><button type='button' class='btn btn-danger' id='delete' onclick=Eliminar(" +data[i]["cli_id"] +")><i class='fas fa-trash-alt'></i></button></td> </tr>";
                            }
                            $("#table_body").append(cadena1);
                        } else {
                            alert("Datos vacios.");
                        }
                        $("#form_test")[0].reset();
                    }
                )

            } else {
                alert("Datos vacios.");
            }
            $("#form_test")[0].reset();
        }
    );

    
}

/*
function Listar3() {
    $.post("controllers/controllerPrueba.php?accion=listar2","",
        function (respuesta1) {
            //console.log(respuesta);
            const data = JSON.parse(respuesta1);
            //console.log(data);
            let contador1 = 3
            let cadena1 = "";
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    contador1 = contador+1
                    cadena1 +=
                        "<tr>  <th scope='row'>"+ contador1+"</th> <td>"+ data[i]["cli_nombre"] +"</td>  <td>"+ data[i]["cli_apellidos"] +"</td> <td><button type='button' class='btn btn-warning' id='edit' onclick=Mostrar("+ data[i]["cli_id"] +")><i class='fas fa-edit'></i></button></td> <td><button type='button' class='btn btn-danger' id='delete' onclick=Eliminar(" +data[i]["cli_id"] +")><i class='fas fa-trash-alt'></i></button></td> </tr>";
                }
                $("#table_body").append(cadena1);
            } else {
                alert("Datos vacios.");
            }
            $("#form_test")[0].reset();
        }
    );
}*/

$("#insertar").click(function (event) {
    event.preventDefault();
    Guardar();
});

// Esta funcion inserta y modifica dependiendo si existe o no id
function Guardar() {
    const datos = {
        id:        $("#id").val(),
        nombre:    $("#nombre").val(),
        apellidos: $("#apellidos").val(),
    };
    //console.log(datos);

    //validar texto y espacion en un campo
    /* var nom = /^[a-zA-ZÀ-ÿ\s]{1,15}$/.test(datos.nombre);
    console.log(nom); */

    var text = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    
    if (datos.nombre.length == 0 || datos.apellidos.length == 0  || text.test(datos.nombre) == false || text.test(datos.apellidos) == false ) {
        Alerts("Datos vacíos o erróneos","","warning");
    } else {
        $.ajax({
            url: "controllers/controllerPrueba.php?accion=guardar",
            data: datos,
            type: "POST",
            success: function (resp) { 
                //console.log(resp);
                if (resp == "Update") {
                    Alerts("Registro modificado","","success");
                } else {
                    Alerts("Registro guardado","","success");
                }
                Listar();
            },
            error: function (error) {
                alert("Error: "+error);
            },
        });
        $("#form_test")[0].reset();
    }
    $("#hidden").html("");
}

function Mostrar(id) {
    //console.log(id);
    $("#hidden").hide();
    $("#hidden").html("<input id='id'>");
    $.post("controllers/controllerPrueba.php?accion=mostrar",{id:id},
        function (respuesta) {
            //console.log(respuesta);
            const data = JSON.parse(respuesta);
           //console.log(data);
            $("#id").val(data[0]["cli_id"]);
            $("#nombre").val(data[0]["cli_nombre"]);
            $("#apellidos").val(data[0]["cli_apellidos"]);
        }
    );
}

//Elimnar Cliente
function Eliminar(id){
	Swal.fire({
		icon: "warning",
		title: "¿Estas seguro que desea eliminar este cliente?",
		showCancelButton: true,
		confirmButtonColor:"#3085d6",
		cancelButtonColor:"#d33",
  		confirmButtonText:"Eliminar",
  		cancelButtonText:"Cancelar"
	}).then((result) => {
		if (result.isConfirmed) {
			$.post("controllers/controllerPrueba.php?accion=eliminar",{"ide":id},
				function(response){	
				//console.log(response);
                Listar();
			});
			Listar();
		  	Alerts("Resgistro eliminado","","success");
		} 
	});
			
};

function Alerts(title,description,typeAlert) {
    Swal.fire(
		title,
		description,
        typeAlert
    );
}
