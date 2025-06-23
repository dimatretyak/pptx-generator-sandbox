import generateDemo from "./templates/demo";
import generateOverview from "./templates/overview";

const tasks = [generateDemo, generateOverview];

for (const task of tasks) {
  task();
}
