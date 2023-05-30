<script>
</script>

<template>
    <div class="container">
        <h2 class="mb-4">Contratar Paseador ... - Horario: - Zona: </h2>
        <hr>

        <!-- Contratar paseadores -->
        <form>
            <div class="form-group">
                <label for="location">Seleccionar mascota:</label>
                <table class="table">
                    <thead class="text-light bg-primary">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Mascota</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><button type="submit" class="btn btn-light">Elegir</button></th>
                            <td>Pity</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br>
            <button type="submit" class="btn btn-primary" style="margin-right: 10px">Contratar</button>
            <RouterLink to="/busquedaPaseadores">
                <button class="btn btn-primary" style="margin-right: 10px">Volver</button>
            </RouterLink>
        </form>

    </div>
</template>