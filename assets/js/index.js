var arrayMenu = [];
var arrayPedido = [];

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

function cancelarPedido()
{
    arrayPedido = [];

    updateTablaPedido();
}

$(document).ready(function() {
    getMenu();
});

$("#btnCancelarPedido").click(function() {
    cancelarPedido();
});