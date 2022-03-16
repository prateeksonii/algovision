import { ActionFunction, Form, json, useActionData } from "remix";

type Step = {
  array: number[];
  currentIndex: number;
  found: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  const data = (await request.formData()) as any;
  const array: number[] = data._fields.input[0]
    .split(",")
    .map((val: string) => +val);
  const searchNum: number = +data._fields.searchNum[0];

  const steps: Step[] = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] === searchNum) {
      steps.push({
        array,
        currentIndex: i,
        found: true,
      });
      return steps;
    } else {
      steps.push({
        array,
        currentIndex: i,
        found: false,
      });
    }
  }

  return steps;
};

const LinearSearchRoute = () => {
  const steps: Step[] | undefined = useActionData();

  console.log(steps);

  return (
    <div className="my-8">
      <h1 className="font-black text-4xl">Linear Search</h1>
      <p className="mt-4 text-lg">
        The Linear search algorithm states that we can search an element in a
        given array by iterating over elements from one direction until we find
        the desired element
      </p>
      {/* Input form */}
      <Form
        className="mt-8 flex flex-col gap-4"
        method="post"
        action="/app/search"
      >
        <div>
          <label htmlFor="input" className="text-xl">
            Enter elements of array
          </label>
          <input
            type="text"
            className="w-full bg-gray-100 p-2 rounded mt-1 text-lg"
            placeholder="eg. 5,6,2,3,7,10,22,14"
            name="input"
          />
        </div>
        <div>
          <label htmlFor="searchNum" className="text-xl">
            Enter number to search
          </label>
          <input
            type="number"
            className="w-full bg-gray-100 p-2 rounded mt-1 text-lg"
            placeholder="eg. 10"
            name="searchNum"
          />
        </div>
        <button
          type="submit"
          className="w-max bg-blue-500 text-white px-4 py-2 rounded font-bold text-lg"
        >
          Search
        </button>
      </Form>

      {/* Initial input array */}
      {steps && (
        <section className="mt-8 flex flex-col gap-3">
          <h2 className="font-bold text-2xl">Given Array: </h2>
          <div className="flex flex-wrap gap-1">
            {steps[0].array?.map((num, i) => (
              <div
                key={i}
                className="rounded h-10 w-10 flex items-center justify-center bg-slate-200 text-lg"
              >
                {num}
              </div>
            ))}
          </div>
          {steps.map((step, stepIndex) => (
            <div key={stepIndex}>
              <h2 className="font-bold text-2xl">Step {stepIndex + 1}: </h2>
              <div className="flex flex-wrap gap-1">
                {step.array?.map((num, i) => (
                  <div
                    key={i}
                    className="rounded h-10 min-w-[40px] flex items-center justify-center bg-slate-200 text-lg"
                    style={{
                      background:
                        step.found && i === step.currentIndex
                          ? "#7CFC00"
                          : step.currentIndex === i
                          ? "#7DF9FF"
                          : "",
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default LinearSearchRoute;
