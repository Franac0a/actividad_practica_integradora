import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getProducts } from "../api/products.api";
import type { Product } from "../types";

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Ocurrió un error al cargar los productos"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Productos</h1>

      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>

              <p>{product.description}</p>

              <p>Estado: {product.status}</p>

              <Link to={`/products/${product.id}`}>
                Ver detalle
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default ProductListPage;