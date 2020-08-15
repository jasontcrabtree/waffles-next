import { request } from 'graphql-request';
import useSWR from 'swr';
// import { AspectRatio } from '@ui';  // previously wrapped around img, removed for simplicity
import Link from 'next/link';

const API = 'https://jtc-nextjs-course.herokuapp.com/v1/graphql';
const fetcher = query => request(API, query);

export default function Home() {
  const { data, error } = useSWR(
    `{
      recipes(order_by: {name: asc}) {
        id
        name
        imageUrl
      }
    }`,
    fetcher
  );

  return (
    <div>
      <header className="p-8 border-b-2 border-gray-200 flex justify-left items-center relative">
        <h1 className="text-2xl pl-20 font-medium uppercase text-gray-200">
          All Recipes
        </h1>
        <Link href="/new">
          <a className="absolute pr-24 right-0 mr-4 flex text-orange-500">
            Add
          </a>
        </Link>
      </header>

      <main className="p-4 mt-4">
        {!data ? (
          <p>Loading...</p>
        ) : data.recipes.length === 0 ? (
          <p>No recipes.</p>
        ) : (
          <div className="px-32 space-y-8 ">
            {data.recipes.map(recipe => (
              <div key={recipe.id} className="relative">
                <div>
                  <img
                    src={recipe.imageUrl}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="bg-white m-4 rounded px-4 py-4 bg-opacity-90 text-sm font-semibold absolute bottom-0 inset-x-0">
                  {recipe.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
