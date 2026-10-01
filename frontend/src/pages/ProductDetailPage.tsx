import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router";

import {
  changeProductStatus,
  deleteProduct,
  getProductById,
} from "../api/products.api";

import {
  subscribeToProduct,
  unsubscribeFromProduct,
} from "../api/subscriptions.api";

import Can from "../components/Can";

import type { Product, ProductStatus } from "../types";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  const [newStatus, setNewStatus] = useState<ProductStatus>("DISPONIBLE");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const productId = Number(id);

  async function loadProduct() {
    if (!id || Number.isNaN(productId)) {
      setError("Producto inválido");
      setLoading(false);
      return;
    }

    try {
      const data = await getProductById(productId);

      setProduct(data);
      setNewStatus(data.status);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo cargar el producto",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProduct();
  }, [id]);

  async function handleStatusChange() {
    try {
      const updatedProduct = await changeProductStatus(productId, newStatus);

      setProduct(updatedProduct);
      setMessage("Estado actualizado correctamente");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "No se pudo cambiar el estado",
      );
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(productId);

      navigate("/products");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el producto",
      );
    }
  }

  async function handleSubscribe() {
    try {
      await subscribeToProduct(productId);

      setMessage("Te suscribiste al producto correctamente");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo realizar la suscripción",
      );
    }
  }

  async function handleUnsubscribe() {
    try {
      await unsubscribeFromProduct(productId);

      setMessage("Suscripción cancelada correctamente");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo cancelar la suscripción",
      );
    }
  }

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error && !product) {
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
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <Can permission="subscription:create">
        <button onClick={handleSubscribe}>Suscribirse</button>
      </Can>{" "}
      <Can permission="subscription:delete">
        <button onClick={handleUnsubscribe}>Desuscribirse</button>
      </Can>
      <hr />
      <Can permission="product:update">
        <Link to={`/products/${product.id}/edit`}>Editar producto</Link>
      </Can>
      <Can permission="product:change-status">
        <div>
          <h2>Cambiar estado</h2>

          <select
            value={newStatus}
            onChange={(event) =>
              setNewStatus(event.target.value as ProductStatus)
            }
          >
            <option value="DISPONIBLE">Disponible</option>

            <option value="SIN_STOCK">Sin stock</option>

            <option value="DISCONTINUADO">Discontinuado</option>
          </select>

          <button onClick={handleStatusChange}>Cambiar estado</button>
        </div>
      </Can>
      <Can permission="product:delete">
        <button onClick={handleDelete}>Eliminar producto</button>
      </Can>
      <hr />
      <Link to="/products">Volver a productos</Link>
    </main>
  );
}

export default ProductDetailPage;
