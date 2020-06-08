var arrayMenu = [];
var arrayPedido = [];
var arrayPedidoRealizar = [];
var id_usuario = 0;
var id_pedido = "P" + Math.floor((Math.random() * 100000) + 1);

getUsuarioLogueado();

function getMenu()
{
    $.ajax({
        type: "GET",
        url: "assets/php/funciones.php",
        data: {
            opc: "getMenu"
        },
        success: function(data)
        {
            try 
            {
                respuesta = JSON.parse(data);
                arrayMenu = respuesta;

                var htmlContenido = "";
                $("#contendorMenu").html(htmlContenido);
                for(var i = 0; i < respuesta.length; i++)
                {
                    htmlContenido += "<div class=\"card\" style=\"width: 7rem;\">";
                    htmlContenido += "<img class=\"card-img-top\" src=\"" + respuesta[i].imagen + "\" alt=\"img_menu\">";
                    htmlContenido += "<div class=\"card-body\">";
                    htmlContenido += "<p class=\"card-text\">" + respuesta[i].nombre + "</p>";
                    htmlContenido += "<p class=\"card-text\"><button type=\"button\" class=\"btn btn-sm btn-success\" onclick=\"addPedido(" + respuesta[i].id + ", '" + respuesta[i].nombre + "', " + respuesta[i].precio + ")\"><i class=\"fas fa-shopping-cart\"></i> $" + respuesta[i].precio + "</button></p>";
                    htmlContenido += "</div>";
                    htmlContenido += "</div>";
                }
                $("#contendorMenu").append(htmlContenido);
            } catch (e) {
                Swal.fire({
                    html: data,
                    icon: 'error',
                    title: "Ocurri&oacute; un error"
                  }); 
            }
        },
        error: function(xhr, status, error)
        {
            Swal.fire({
                html: xhr.responseText,
                icon: 'error',
                title: "Ocurri&oacute; un error"
              }); 
        }
    });
}

function updateTablaPedido()
{
    var totales = arrayPedido.reduce((p, c) => {
        var name = c.nombre;
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]++;
        return p;
    }, {});

    var totalesEspecifico = Object.keys(totales).map(k => {
        return {nombre: k, total: totales[k]}; 
    });

    var htmlTabla = "";
    var totalPedido = 0;
    var totalArticulos = 0;
    $("#tablaPedido").html(htmlTabla);
    for(var i = 0; i < totalesEspecifico.length; i++)
    {
        var preciototal = 0;
        var precioindividual = 0;
        var id = 0;

        for(var j = 0; j < arrayMenu.length; j++)
        {
            if(arrayMenu[j].nombre == totalesEspecifico[i].nombre)
            {
                preciototal = parseInt(arrayMenu[j].precio) * (totalesEspecifico[i].total);
                precioindividual = arrayMenu[j].precio;
                id = arrayMenu[j].id;
            }
        }
        htmlTabla += "<tr>";
        htmlTabla += "<th scope=\"row\"><a href=\"javascript:void(0)\" onclick=\"removeProductoPedido(" + id + ")\" class=\"badge badge-danger\">X</a></th>";
        htmlTabla += "<td><span class=\"badge badge-warning\">" + totalesEspecifico[i].nombre.toUpperCase() + " @ $" + precioindividual + ".00</span></td>";
        htmlTabla += "<td>" + totalesEspecifico[i].total + "</td>";
        htmlTabla += "<td>$" + preciototal + ".00</td>";
        htmlTabla += "</tr>";
        totalPedido += preciototal;
        totalArticulos += totalesEspecifico[i].total;

        var pedidoRealizar = {
            idpedido: id_pedido,
            fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
            id_cliente: id_usuario,
            id_producto: id,
            cantidad: totalesEspecifico[i].total
        };
        
        arrayPedidoRealizar = $.grep(arrayPedidoRealizar, function(e){ 
            return e.id_producto != pedidoRealizar.id_producto;
        });

        arrayPedidoRealizar.push(pedidoRealizar);
    }
    $("#tablaPedido").append(htmlTabla);
    $("#totalPedido").html(totalPedido);
    $("#totalArticulos").html(totalArticulos);
}

function addPedido(in_id, in_nombre, in_precio)
{

    var pedido = {
        id: in_id,
        nombre: in_nombre,
        precio: in_precio
    };

    arrayPedido.push(pedido)

    updateTablaPedido();

    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: 'success',
        title: 'Se agregó un ' + in_nombre + ' a tu pedido'
      });
}

function removeProductoPedido(in_id)
{
    arrayPedido = $.grep(arrayPedido, function(e){ 
        return e.id != in_id;
    });

   updateTablaPedido();

   Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }).fire({
    icon: 'success',
    title: 'Se eliminó el articulo de tu pedido'
  });
}

function limpiarPedido()
{
    arrayPedido = [];
    arrayPedidoRealizar = [];
    id_pedido = "P" + Math.floor((Math.random() * 10000) + 1);

    updateTablaPedido();
}

function fechaHora()
{     
    setInterval(function() {
        var momentNow = moment();
        $('#date-part').html(momentNow.format('dddd').substring(0,3).toUpperCase() + " " + momentNow.format('DD MMMM YYYY'));
        $('#time-part').html(momentNow.format('hh:mm:ss A'));
    }, 100);
}

function getUsuarioLogueado()
{
    $.ajax({
        type: "GET",
        url: "assets/php/funciones.php",
        data: {
            opc: "getUsuarioLogueado"
        },
        success: function(data)
        {
            try 
            {
                respuesta = JSON.parse(data);
                if(respuesta.id != undefined)
                {
                    id_usuario = respuesta.id;
                }
                else
                {
                    window.location.replace("login.html");
                }
            } catch (e) {
                Swal.fire({
                    html: data,
                    icon: 'error',
                    title: "Ocurri&oacute; un error"
                  }); 
            }
        },
        error: function(xhr, status, error)
        {
            Swal.fire({
                html: xhr.responseText,
                icon: 'error',
                title: "Ocurri&oacute; un error"
              }); 
        }
    });
}

function insertPedido()
{
    for(var i = 0; i < arrayPedidoRealizar.length; i++)
    {
        $.ajax({
            type: "GET",
            url: "assets/php/funciones.php",
            data: {
                opc: "insertPedido",
                idpedido: id_pedido,
                fecha: arrayPedidoRealizar[i].fecha,
                id_cliente: arrayPedidoRealizar[i].id_cliente,
                id_producto: arrayPedidoRealizar[i].id_producto,
                cantidad: arrayPedidoRealizar[i].cantidad
            },
            success: function(data)
            {
                try 
                {
                    respuesta = JSON.parse(data);
                    if(respuesta.estado == -1)
                    {
                        Swal.fire({
                            html: data,
                            icon: 'error',
                            title: "Ocurri&oacute; un error al realizar pedido: " + respuesta.mensaje
                        }); 
                    }
                } catch (e) {
                    Swal.fire({
                        html: data,
                        icon: 'error',
                        title: "Ocurri&oacute; un error"
                    }); 
                }
            },
            error: function(xhr, status, error)
            {
                Swal.fire({
                    html: xhr.responseText,
                    icon: 'error',
                    title: "Ocurri&oacute; un error"
                  }); 
            }
        });
    }

    if(arrayPedidoRealizar.length > 0)
    {
        Swal.fire({
            icon: 'success',
            title: "Se realizó tu pedido."
        });
    }
    else
    {
        Swal.fire({
            icon: 'warning',
            title: "El pedido está vacio."
        });
    }

    limpiarPedido();
}

function cerrarSesion()
{
    $.ajax({
        type: "GET",
        url: "assets/php/funciones.php",
        data: {
            opc: "cerrarSesion"
        },
        success: function(data)
        {
            try 
            {
                respuesta = JSON.parse(data);
                if(respuesta.estado == 0)
                {
                    window.location.replace("login.html");
                }
            } catch (e) {
                Swal.fire({
                    html: data,
                    icon: 'error',
                    title: "Ocurri&oacute; un error"
                  }); 
            }
        },
        error: function(xhr, status, error)
        {
            Swal.fire({
                html: xhr.responseText,
                icon: 'error',
                title: "Ocurri&oacute; un error"
              }); 
        }
    });
}

$(document).ready(function() {
    getMenu();
    fechaHora();
});

$("#btnCancelarPedido").click(function() {
    limpiarPedido();
});

$("#btnRealizarPedido").click(function() {
    insertPedido();
});

$("#btnCerrarSesion").click(function() {
    cerrarSesion();
});