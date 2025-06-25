import PowerPointBuilder from "./classes/PowerPointBuilder";
import generateDemo from "./templates/demo";
import generateOverview from "./templates/overview";

const date = new Date();
const builder = new PowerPointBuilder();

const tasks = [
  {
    title: "Overview",
    executer: generateOverview,
  },
  {
    title: "Demo",
    executer: generateDemo,
  },
];

const generate = async () => {
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
