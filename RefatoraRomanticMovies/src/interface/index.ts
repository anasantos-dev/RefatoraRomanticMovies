import express from "express";
import { configureDependencies } from "../infrastructure/utils/config";
import { connectDB } from "../infrastructure/database/mongo-db/connection"; // Certifique-se de ajustar o caminho corretamente

export const app = express();
app.use(express.json());

const { movieController } = configureDependencies();

app.post("/movies", (req, res) => movieController.create(req, res));

// Descomente as outras rotas quando estiver pronto para usá-las
// app.get('/movies', (req, res) => movieController.listAll(req, res));
// app.get('/movies/:id', (req, res) => movieController.getMovieById(req, res));
// app.delete('/movies/:id', (req, res) => movieController.deleteMovieById(req, res));
// app.put('/movies/:id', (req, res) => movieController.updateMovie(req, res));

if (require.main === module) {
  const PORT = 3333;

  // Conectar ao MongoDB antes de iniciar o servidor
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Erro ao conectar no MongoDB:", error);
      process.exit(1); // Encerrar o processo em caso de falha na conexão com o banco de dados
    });
}
