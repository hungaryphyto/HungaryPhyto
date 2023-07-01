import { styled } from "@mui/material/styles";
import products from "../assets/products";
import ProductComponent from "../components/Product";

const MainContainer = styled("main")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  overflow: scroll;
  height: 100%;
`;

const Home = () => {
  return (
    <MainContainer>
      {products.map((product, id) => (
        <ProductComponent key={id} product={product} />
      ))}
    </MainContainer>
  );
};

export default Home;