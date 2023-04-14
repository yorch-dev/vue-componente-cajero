class Cliente {
    static identificador = 0
    constructor(nombre, clave, saldo) {
        this.id = Cliente.nuevo_id(),
            this.nombre = nombre,
            this.clave = clave,
            this.saldo = saldo
    }
    static nuevo_id() {
        return ++Cliente.identificador;
    }
}

let cliente_1 = new Cliente("Cliente 1", "1234", 10000)
let cliente_2 = new Cliente("Cliente 2", "2345", 50000)
let cliente_3 = new Cliente("Cliente 3", "3456", 100000)
let cliente_4 = new Cliente("Cliente 4", "4567", 0)

const clientes = [cliente_1, cliente_2, cliente_3, cliente_4]

export default clientes