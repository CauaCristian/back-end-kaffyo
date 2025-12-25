import "reflect-metadata";
import app from "./App";
import { dataSource } from "./source/Data_Source";
const PORT = process.env.PORT ?? 3000;
try {
    dataSource.initialize();
    console.log(`Banco de dados Kaffyo conectado!`);
    app.listen(PORT, () => {
        console.log(`Api Kaffyo rodando na porta ${PORT}!`);
    });
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=Server.js.map