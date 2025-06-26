import PowerPointBuilder from "./classes/PowerPointBuilder";
import generateDemo from "./templates/demo";
import generateOverview from "./templates/overview";
import generateDebug from "./templates/debug";
import { formateFooterDate } from "./utils/formatters";

const date = new Date();
const builder = new PowerPointBuilder();

const tasks = [
  {
    title: "Overview",
    report: "overall",
    executer: generateOverview,
  },
  {
    title: "Demo",
    report: "demo",
    executer: generateDemo,
  },
  {
    title: "Debug",
    report: "debug",
    executer: generateDebug,
  },
];

const generate = async () => {
  // TODO: Add introduce slide

  const startDate = new Date("05/27/2025");
  const formattedStartDate = formateFooterDate(startDate);

  const endDate = new Date("06/27/2025");
  const formattedEndDate = formateFooterDate(endDate);

  for (const task of tasks) {
    try {
      builder.addMasterSlide(task.title);

      await task.executer({
        builder,
        footerText: `${formattedStartDate}-${formattedEndDate}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  builder.buildAndSave("output/all.pptx");

  // builder.uploadToAWS({
  //   Bucket: process.env.AWS_BUCKET!,
  //   Key: `vitals/sandbox/all-${Date.now()}.pptx`,
  //   s3Config: {
  //     region: process.env.AWS_REGION!,
  //     credentials: {
  //       accessKeyId: process.env.AWS_ACCESS_KEY!,
  //       secretAccessKey: process.env.AWS_SECRET_KEY!,
  //     },
  //   },
  // });
};

generate();
