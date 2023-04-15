// Clientes

import clientes from './mis_clientes.js'

// Lógica

export default {
    data() {
        return {
            clientes,
            cliente: null,
            id_usuario: "",
            pass_usuario: "",
            mensaje: "",
            mostrar_mensaje: false,
            mostrar_mensaje_exito: false,
            saldo_cliente: "",
            accion: "saldo",
            monto_movimiento: null,
        }
    },
    methods: {
        extraer_cliente() {
            this.accion = "saldo"
            let buscar_cliente = this.clientes.find(cliente => cliente.id == this.id_usuario)
            if (!buscar_cliente) {
                this.mensaje = "Cliente no encontrado"
            } else {
                if (this.pass_usuario == buscar_cliente.clave) {
                    this.cliente = buscar_cliente
                    this.saldo_cliente = this.formato_moneda(this.cliente.saldo)
                } else {
                    this.mensaje = "Contraseña incorrecta"
                }
            }
            this.id_usuario = ""
            this.pass_usuario = ""
            if (this.mensaje.length > 0) {
                this.ver_mensaje()
            }
        },
        girar() {
            if (!this.monto_movimiento || this.monto_movimiento <= 0){
                this.mensaje = "Ingrese un monto válido a girar"
                this.ver_mensaje()
            } else if (this.monto_movimiento > this.cliente.saldo) {
                this.mensaje = "Monto de giro excede saldo"
                this.ver_mensaje()
            } else {
                this.cliente.saldo -= this.monto_movimiento
                this.saldo_cliente = this.formato_moneda(this.cliente.saldo)
                this.monto_movimiento = null
                this.mensaje = `Giro realizado, su nuevo saldo es ${this.saldo_cliente}`
                this.ver_mensaje_exito()
            }
        },
        depositar() {
            if (!this.monto_movimiento || this.monto_movimiento <= 0){
                this.mensaje = "Ingrese un monto válido a depositar"
                this.ver_mensaje()
            } else {
            this.cliente.saldo += this.monto_movimiento
            this.saldo_cliente = this.formato_moneda(this.cliente.saldo)
            this.monto_movimiento = null
            this.mensaje = `Depósito realizado, su nuevo saldo es ${this.saldo_cliente}`
            this.ver_mensaje_exito()
            }
        },
        salir() {
            this.mensaje = "Gracias por su preferencia"
            this.ver_mensaje_exito()
            this.cliente = null
        },
        formato_moneda(saldo) {
            const f = new Intl.NumberFormat("es-cl", {
                currency: "CLP",
                style: "currency",
            })
            return f.format(saldo);
        },
        ver_mensaje() {
            this.mostrar_mensaje = true
            setTimeout(() => {
                this.mostrar_mensaje = false
                this.mensaje = ""
            }, 3000)
        },
        ver_mensaje_exito() {
            this.mostrar_mensaje_exito = true
            setTimeout(() => {
                this.mostrar_mensaje_exito = false
                this.mensaje = ""
            }, 3000)
        },
        limpiar_campos() {
            this.monto_movimiento = null
        }
    },
    watcher: {
        codigo_seleccionado(val) {
            this.accion = val
        }
    },
    template: /*html*/`
        <div class="text-bg-secondary rounded-3">
            <h3 class="text-center mb-3 py-2">Bienvenido/a a su banca en línea</h3>
        </div>
        <div v-if="!cliente" class="container p-3 border border-5 rounded-5">
            <p class="text-center">Por favor ingrese identificador de cliente:</p>
            <div class="row mx-auto">
                <label class="col-5" for="identificador">Id cliente:</label>
                <input class="col" type="text" name="identificador" v-model="id_usuario">
            </div>
            <div class="row mx-auto mt-2">
                <label class="col-5" for="pass">Contraseña:</label>
                <input class="col" type="password" name="pass" v-model="pass_usuario">
            </div>
            <div class="row pt-2 mt-2">
                <button class="btn btn-success" v-on:click="extraer_cliente">Ingresar</button>
            </div>
        </div>
        <div v-if="cliente" class="container p-3 border border-5 rounded-5">
            <div class="row container">
                <h3 class="text-center mb-3 bg-success bg-opacity-25 rounded-4">Banca de {{ cliente.nombre }}</h3>
                <div class=col>
                    <h4 class="text-center">Menú</h4>

                    <div class="container d-grid">
                        <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-saldo" autocomplete="off" checked value="saldo" @click="limpiar_campos" v-model="accion">
                        <label class="btn btn-outline-secondary" for="vbtn-saldo">Ver saldo</label>
                        <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-giro" autocomplete="off" value="giro" @click="limpiar_campos" v-model="accion">
                        <label class="btn btn-outline-secondary" for="vbtn-giro">Realizar giro</label>
                        <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-deposito" autocomplete="off" value="deposito" @click="limpiar_campos" v-model="accion">
                        <label class="btn btn-outline-secondary" for="vbtn-deposito">Realizar depósito</label>
                        <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-salir" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="vbtn-salir" @click="salir">Salir</label>
                    </div>
                </div>

                <div class="col d-flex flex-column justify-content-center align-items-center">
                    <h4 class="text-center">Mi banca</h4>
                    <div class="container h-100 p-3 text-bg-secondary">
                        <div class="container border border-2 d-flex flex-column justify-content-center align-items-center h-100 text-bg-info">
                            <p class="text-center" v-if="cliente && accion === 'saldo'">Su saldo actual es:
                                <br>
                                <h5 class="text-center">{{ saldo_cliente }}</h5>
                            </p>
                            <div v-if="cliente && accion === 'giro'">
                                <p class="text-start">Su saldo es: {{ saldo_cliente }} <br>
                                    Ingrese monto a girar:
                                </p>
                                <div class="row">
                                    <input class="col" type="number" v-model="monto_movimiento">
                                    <button class="col btn btn-success" @click="girar">Girar</button>
                                </div>
                            </div>
                            <div v-if="cliente && accion === 'deposito'">
                                <p class="text-start">Su saldo es: {{ saldo_cliente }} <br>
                                    Ingrese monto a depositar:
                                </p>
                                <div class="row">
                                    <input class="col" type="number" v-model="monto_movimiento">
                                    <button class="col btn btn-success" @click="depositar">Depósito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="alert alert-warning mt-3 mx-auto" role="alert" v-if="mostrar_mensaje">
            {{ mensaje }}
        </div>
        <div class="alert alert-success mt-3 mx-auto" role="alert" v-if="mostrar_mensaje_exito">
            {{ mensaje }}
        </div>
        <h6>Clientes:</h6>

        <table class="table table-sm table-hover table-dark">
            <thead>
                <tr>
                    <th scope="col">#Id cliente</th>
                    <th scope="col">Contraseña</th>
                    <th scope="col">Saldo</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="{ id, clave, saldo } = cliente in this.clientes">
                    <th scope="col"> {{ id }} </th>
                    <th scope="col"> {{ clave }} </th>
                    <th scope="col"> {{ saldo }} </th>
                </tr>
            </tbody>
        </table>
    `,
}
