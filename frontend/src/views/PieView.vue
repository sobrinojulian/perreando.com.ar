<template>
  <br>
  <footer class="footer bg-dark text-light">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2023 Paseo de Mascotas. Todos los derechos reservados.</p>
        </div>
        <div class="col-md-6 text-md-right">
          <ul class="list-inline">
            <li class="list-inline-item">
              <RouterLink to="/">Inicio</RouterLink>
              
            </li>
            <li class="list-inline-item">
              <RouterLink to="/">Contacto</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 20px 0;
}

.footer p {
  margin: 0;
}

.footer ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer ul li {
  display: inline-block;
  margin-right: 10px;
}

.footer ul li a {
  color: #fff;
  text-decoration: none;
}

.footer ul li a:hover {
  color: #ccc;
}
</style>
