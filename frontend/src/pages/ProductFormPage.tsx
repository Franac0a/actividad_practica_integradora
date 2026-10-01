import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router";

import {
  createProduct,
  getProductById,
  updateProduct,
} from "../api/products.api";

import type { ProductStatus } from "../types";

function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] =
    useState<ProductStatus>("DISPONIBLE");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(editing);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function loadProduct() {
      try {
        const product = await getProductById(Number(id));

        setName(product.name);
        setDescription(product.description);
        setStatus(product.status);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "No se pudo cargar el producto"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [id]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError("");

    const data = {
      name,
      description,
      status,
    };

    try {
      if (editing && id) {
        await updateProduct(Number(id), data);
      } else {
        await createProduct(data);
      }

      navigate("/products");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al guardar el producto"
      );
    }
  }

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  return (
    <main>
      <h1>
        {editing ? "Editar producto" : "Crear producto"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Nombre
          </label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="description">
            Descripción
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="status">
            Estado
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as ProductStatus
              )
            }
          >
            <option value="DISPONIBLE">
              Disponible
            </option>

            <option value="SIN_STOCK">
              Sin stock
            </option>

            <option value="DISCONTINUADO">
              Discontinuado
            </option>
          </select>
        </div>

        {error && <p>{error}</p>}

        <button type="submit">
          {editing ? "Guardar cambios" : "Crear producto"}
        </button>
      </form>
    </main>
  );
}

export default ProductFormPage;