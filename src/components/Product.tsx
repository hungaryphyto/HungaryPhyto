import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

interface Product {
  id: number;
  name: string;
  concentration: number;
  picture: string;
  inStock: boolean;
  quantity: number;
  value: number;
  discount: number;
}

interface ProductComponentProps {
  product: Product;
}

function formatCurrency(value: number): string {
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ product }) => {
  console.log(product);
  return (
    <ProductContainer>
      <h1>{product.name}</h1>
      <h2>{product.concentration} mg/ml</h2>
      <h2>10ml</h2>
      <span>
        <img src={product.picture} alt={product.name} />
      </span>
      <h2>{product.inStock ? "Em Estoque" : "Esgotado"}</h2>
      <h2>{product.inStock && formatCurrency(product.value)} </h2>
      <h3>
        {product.inStock && product.discount !== 0.0
          ? `Desconto: ${formatCurrency(product.discount)}`
          : "Enviamos para todo BR"}
      </h3>
    </ProductContainer>
  );
};

const ProductContainer = styled(Box)`
  background-color: #333;
  width: 250px;
  height: 450px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 15px;
  border: 2px solid #fff;

  color: #ccc;
  * {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 17px;
  }
  span {
    width: 250px;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 100%;
    object-fit: cover; // Isso ajuda a manter a proporção da imagem
  }

  h2 {
    font-size: 15px;
  }
  h3 {
    font-size: 15px;
    color: #ff0000aa;
  }
`;

export default ProductComponent;
