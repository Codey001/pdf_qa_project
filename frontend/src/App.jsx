import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <Header />
      <div className="flex-grow">
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
