import server from "$server/instance";
import Logger from "$pkg/logger";
import { startExcelJobWorker } from "$workers/StartWorker";

const startRestApp = () => {
  Logger.info("Starting App : rest");
  const app = server.restServer();
  const PORT: number = Number(process.env.NODE_LOCAL_PORT) || 3010;
  return app.listen(PORT, () => {
    Logger.info(`Rest App is Running at Port ${PORT}`);

    startExcelJobWorker();
  });
};

export default startRestApp;
