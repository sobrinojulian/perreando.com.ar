# Proyecto:
> [Figma](https://www.figma.com/file/TRh3g5jnVZPjriqIjMLoqk/Untitled)

Sistema encargado de gestionar los paseos de perros para los clientes. A su vez, los paseadores podran gestionar los paseos realizados.

# Finalidad/Objetivo:
Facilitar la gestion y programacion de paseos para los clientes y paseadores.

# Funcionalidades:
- Login de usuario: Existen 2 perfiles (TIpos de usuarios) --> Clientes y Paseadores
- [Registro/Perfil de cliente: Al registrarse ingrese sus datos personales (En el perfil los puede modificar; Nombre, Apellido, Dni, Email, Telefono). - Podemos precargarlo]
    - Alta de Mascotas: El listado de mascotas de la que cada cliente es Dueño. Datos de Nombre, Tipo, Raza, Tamaño, Peso, Si esta Vacunado, dueño.
    - Busqueda de paseadores: Cada cliente puede realizar una busqueda filtrada (Zona y Turno Horario) y seleccionar el paseador que desee.
    - Contratar un paseador: Cada cliente puede, con el paseador seleccionado, contratar el servicio y se debe realizar el calculo del precio final dicho paseo.

- [Registro/Perfil de Paseador: Al registrarse ingrese sus datos personales (En el perfil los puede modificar; Nombre, Apellido, Dni, Email, Telefono, Fecha de Nacimiento). Adicional, tarifa basica. - Podemos precargarlo]
    - Alta de horarios y zonas a cubrir: Puede ir generando sus turnos disponibles de paseos y el precio por cada turno (Algunos turnos especificos por demanda podrian ser mas caros)
- Listado de paseos programados: Un listado con los paseos que tiene asignados en los proximos dias.
Historal de paseos: Tanto de clientes como de paseadores, ambos pueden ver los paseos realizados/contratados.

# Tareas a desarrollar:
- Vista Login y reigstro de un usuario
- Vista de Perfil de Cliente
- Vista de Perfil de Paseador
- Backend de Usuario para darlos de alta/baja/modificacion, asi como el perfil asignado.
- Vista de Mascotas asignadas a cada cliente
- Backend de Mascotas para darlos de alta/baja/modificacion
- Vista Busqueda de Paseadores con los filtros desarrollador para realizar correctamenter la busqueda
- Backend para realizar esta busqueda de paseador filtrando o total
- Vista para contratar un paseador seleccionado
- Backend de la contratacion de un paseador con la tarifa total y demas caracteristicas
- Vista para generacion de turnos y horarios a cubrir por el paseador
- Backend para la generacion de turnos disponibles
- Vista listado de paseos programados para el paseador + Consulta en el backend
- Vista Historial de los paseos, indistinto por tipo de usuario + Consulta en el backend

# Curso de tareas
Tareas realizadas:

	Usuario
	- Login de usuario
	- Registro de usuario
	- Informacion de usuario
	- Editar usuario
	- Eliminar usuario
	Contratacion
	- Busqueda paseadores con disitintos filtros
	Mascota
	- Carga de mascotas
	- Validacion de campos en la carga usando Vee validated
	- Validor si se cargo o no correctamente
	- Inhabilitar para que se guarde correctamente

----------------------

Tareas en curso:

	Contratacion
	- Contratación de paseadores
	Mascota
	- Vinculacion del Cliente con cada mascota

----------------------

Tareas finalizadas:

	Contratacion (Seba)
	- Alta de paseo contratado
	- Seleccionar mascota/s a pasear
	- Aumento de ganancia en Paseadores
	Mascota (Judith)
	- Mostrar Mascotas (De cada cliente)
	- Baja de mascota
	Pagina Principal (Ale)
	- Diseño de la pantalla (Animaciones, etc)
	Paseos programados (Julian)
	- Listados del dia de la fecha (En adelante)
	Historial de paseos (Julian)
	- Listados de paseos antiguos
	Disponibilidad Paseadores (Zonas y horarios)
	- Armar vista de disponibilidad
	- Carga automatica basado en un rango horario y duracion de cada paseo