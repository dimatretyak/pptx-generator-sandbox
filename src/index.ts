import PowerPointBuilder from "./classes/PowerPointBuilder";
import generateDemo from "./templates/demo";
import generateOverview from "./templates/overview";

const date = new Date();
const builder = new PowerPointBuilder();
const tasks = [generateOverview, generateDemo];

const generate = async () => {
  for (const task of tasks) {
    try {
      // TODO: Add master-slide
      await task({
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
