import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import { getProductById } from "../api/products.api";
import type { Product } from "../types";

function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      const productId = Number(id);

      if (!id || Number.isNaN(productId)) {
        setError("Producto inválido");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Ocurrió un error al cargar el producto"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <main>
      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        <strong>Estado:</strong> {product.status}
      </p>

      <p>
        <strong>Creado:</strong> {product.createdAt}
      </p>

      <p>
        <strong>Actualizado:</strong> {product.updatedAt}
      </p>

      <Link to="/products">Volver a productos</Link>
    </main>
  );
}

export default ProductDetailPage;