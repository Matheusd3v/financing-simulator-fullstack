import { Container } from "../../../style/container"
import MiddleSection from "./components/middle-section"
import TopSection from "./components/top-section"

const Home = () => {
  return (
    <Container>
      <TopSection/>
      <MiddleSection/>
    </Container>
  )
}

export default Home