import "./App.css";
import TopicList from "./components/TopicList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <TopicList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
