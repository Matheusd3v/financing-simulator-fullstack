import { Container } from "../../../style/container"
import BottomSection from "./components/bottom-section"
import MiddleSection from "./components/middle-section"
import TopSection from "./components/top-section"

const Home = () => {
  return (
    <Container>
      <TopSection/>
      <MiddleSection/>
      <BottomSection/>
    </Container>
  )
}

export default Home