import logo from './logo.svg';
import './App.css';
import FeatureCard from './components/organisms/feature-card/FeatureCard';

function App() {
  return (
    <div className="App">
      <FeatureCard id="my-feature-a" displayName="My Feature A" description="This and that" />
    </div>
  );
}

export default App;
