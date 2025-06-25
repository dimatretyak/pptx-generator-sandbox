import PowerPointBuilder from "./classes/PowerPointBuilder";
import generateDemo from "./templates/demo";
import generateOverview from "./templates/overview";
import generateDebug from "./templates/debug";

const date = new Date();
const builder = new PowerPointBuilder();

const tasks = [
  // {
  //   title: "Overview",
  //   executer: generateOverview,
  // },
  // {
  //   title: "Demo",
  //   executer: generateDemo,
  // },
  {
    title: "Debug",
    executer: generateDebug,
  },
];

const generate = async () => {
  // TODO: Add introduce slide

  for (const task of tasks) {
    try {
      builder.addMasterSlide(task.title);

      await task.executer({
        builder,
        dates: {
          start: date,
          end: date,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  builder.buildAndSave("output/all.pptx");
};

generate();
