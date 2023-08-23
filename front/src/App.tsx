import "./App.css";
import Form from "./components/Form";
import Container from "./components/Container";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserForm from "./components/UserForm";
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <main className=" relative min-h-screen overflow-y-hidden  ">
        <div className="p-8">
          <h1
            className="text-3xl w-full text-center bg-gradient-to-b  from-teal-200
       via-teal-500 to-teal-600 text-transparent bg-clip-text font-bold "
          >
            Mes todos avec PostgreSQL
          </h1>
        </div>
        <div className="p-2 mb-8">
          <Container />
        </div>
        <div>
          <UserForm />
        </div>

        <Form />
      </main>
    </QueryClientProvider>
  );
}

export default App;
