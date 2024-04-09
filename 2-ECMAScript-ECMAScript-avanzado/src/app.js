// DESAFIO CLASE 2
class ProductManager {
    
    constructor() {
        this.products = []
    }
    
    getProducts() {
        return this.products
    }
    
    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (this.products.some(product => product.code === code)) {
            console.log("Existing code!");
            return;
        }

        const product_id = this.products.length + 1;
        const newProduct = {
            id: product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.products.push(newProduct)
        console.log("Product added to list!");
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
            return product;
        } else {
            console.log("Not found!");
        }
    }
}

////////////////////////////////
// PRUEBA DEL CODIGO
////////////////////////////////

const pruebaProductManager = new ProductManager();

/* // AGREGANDO PRODUCTOS
pruebaProductManager.addProduct("producto 1", "descripcion A", 10, "imagen1.jpg", "C01", 500)
pruebaProductManager.addProduct("producto 2", "descripcion B", 20, "imagen2.jpg", "C02", 200)

// OBTENER TODOS LOS PRODUCTOS
console.log(pruebaProductManager.getProducts());

// AGREGAR UN PRODUCTO CON UN CODIGO YA EXISTENTE
pruebaProductManager.addProduct("producto 2", "descripcion B", 20, "imagen2.jpg", "C02", 200)

// OBTENER LOS PRODUCTOS AGREGADOS
console.log(pruebaProductManager.getProductById(2));
console.log(pruebaProductManager.getProductById(3)); */