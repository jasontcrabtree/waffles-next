import Link from 'next/link';
import { Formik } from 'formik';
import { request } from 'graphql-request';

const API = 'https://jtc-nextjs-course.herokuapp.com/v1/graphql';
const mutation = `
  mutation insert_articles($objects: [recipes_insert_input!]!) {
    insert_recipes(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export default function New() {
  return (
    <div>
      <header className="p-4 border-b-2 border-gray-200 flex items-center relative justify-center">
        <Link href="/">
          <a className="ml-4 absolute left-0 flex items-center text-gray-100 focus:outline-none focus:shadow-outline rounded-full p-1 pr-2">
            ← Back
          </a>
        </Link>
        <h1 className="text-center text-2xl font-semibold text-orange-500">
          New Recipe
        </h1>
      </header>

      <main>
        <div className="mt-8 px-6">
          <Formik
            initialValues={{
              name: '',
              imageUrl: '',
            }}
            // ingredients: '',
            // instructions: '',
            // recipeUrl: '',
            onSubmit={values => {
              console.log({ values });
              const variables = { objects: [values] };
              request(API, mutation, variables);
            }}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 ">
                  <div className="">
                    <label htmlFor="name" className="block text-orange-500">
                      Name
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Spaghetti with Meatballs"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="imageUrl" className="block text-orange-500">
                      Image URL
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input
                        id="imageUrl"
                        value={values.imageUrl}
                        onChange={handleChange}
                        placeholder="https://www.budgetbytes.com/wp-content/uploads/2018/01/Sheet-Pan-BBQ-Meatloaf-Dinner-V2.jpg"
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-5">
                  <div className="flex justify-end">
                    <span className="ml-3 inline-flex rounded-md shadow-sm">
                      <button type="submit" className="text-orange-400">
                        Save
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}
