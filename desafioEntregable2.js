// Hacelo sin manejo de archivos y agrégalo al final de todo //

// CONSEJO DEL TUTOR, AGREGAR LOS METODOS QUE FALTEN Y LUEGO HACER EL MANEJO DE ARCHIVOS. //

import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.patch = "productos.txt";
  }

  static nuevoId = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    // el cual agregará un producto al arreglo de productos inicial.
    // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    // Al agregarlo, debe crearse con un id autoincrementable

    const productoExiste = this.products.find(
      (producto) => producto.code === code
    );

    if (productoExiste) {
      console.log(
        `El producto ${productoExiste.title} existe, no debes ingresarlo`
      );
      return;
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        `Debes ingresar todos los campos para agregar un producto ${title}`
      );
    } else {
      const producto = {
        id: ++ProductManager.nuevoId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(producto);

      await fs.writeFile(this.patch, JSON.stringify(this.products));

      console.log(`El producto ${producto.title} fue agregado correctamente`);
    }
  };

  readProduct = async () => {
    let leerProducto = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(leerProducto);
  };

  getProducts = async () => {
    let verProducto = await this.readProduct();
    console.log(verProducto);

    // el cual debe devolver el arreglo con todos los productos creados hasta ese momento
  };

  getProductById = async (id) => {
    let verProductoId = await this.readProduct();
    const productoIdValidar = verProductoId.find(
      (producto) => producto.id === id
    );
    if (!productoIdValidar) {
      console.log(`"Not found", el ID ${id} de producto no existe`);
    } else {
      console.log(`El producto con el ID ${id} fue encontrado.`);
    }

    return console.log(productoIdValidar);
  };
  // Usar metodo de array, para buscar articulo - Actualizar el parametro recibido y reescribirlo con writeFile
  deleteProductById = async (id) => {
    let deleteProductoId = await this.readProduct();
    const productoIdValidarId = deleteProductoId.filter(
      (producto) => producto.id != id
    );
    await fs.writeFile(this.patch, JSON.stringify(productoIdValidarId));
    // console.log("ProductoEliminado");
    // console.log(productoIdValidarId);
  };

  updateProduct = async ({ id, ...producto }) => {
    await this.deleteProductById(id);
    let productosInicial = await this.readProduct();
    let productoModificado = [{ id, ...producto }, ...productosInicial];
    await fs.writeFile(this.patch, JSON.stringify(productoModificado));
    console.log(productoModificado.sort());
  };
}
// usar metodo de array para buscar producto y borrar el resto.

// // -----------------------------* Proceso de testing *----------------------------
// Se creará una instancia de la clase “ProductManager”
const producto = new ProductManager();

// // -----------------------------* Proceso de testing *----------------------------
// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// producto.getProducts();

// // -----------------------------* Proceso de testing *----------------------------
// // Se llamará al método “addProduct” con los campos:
// // title: “producto prueba”
// // description:”Este es un producto prueba”
// // price:200,
// // thumbnail:”Sin imagen”
// // code:”abc123”,
// // stock:25
// // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// producto.addProduct(
//   "Producto prueba",
//   "Este es un producto prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );
// producto.addProduct(
//    "Producto prueba2",
//    "Este es un producto prueba",
//    200,
//    "Sin imagen",
//    "abc1234",
//    25
//  );
//  producto.addProduct(
//    "Producto prueba3",
//    "Este es un producto prueba",
//    200,
//    "Sin imagen",
//    "abc12345",
//    25
//  );
//  producto.addProduct(
//    "Producto prueba4",
//    "Este es un producto prueba",
//    200,
//    "Sin imagen",
//    "abc123456",
//    25
//  );

// // -----------------------------* Proceso de testing *----------------------------
// // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// producto.getProducts();

// // -----------------------------* Proceso de testing *----------------------------
// // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// producto.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);

// // -----------------------------* Proceso de testing *----------------------------
// // Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
// producto.getProductById(3);

// // -----------------------------* Proceso de testing *----------------------------
// // Se borrara el producto por ID.
// producto.deleteProductById(1);

// // -----------------------------* Proceso de testing *----------------------------
// // Se actualizara el producto segun el ID

producto.updateProduct({
  id: 2,
  title: "Producto prueba ACTUALIZADO",
  description: "Este es un producto prueba ACTUALIZADO",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc1234",
  stock: 25,
});
