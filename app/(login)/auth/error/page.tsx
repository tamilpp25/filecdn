'use client';
import { CrossIcon } from 'lucide-react';

export default function LoginError() {
  return (
    <div className="flex h-screen">
      <div className="m-auto h-2/4 w-80 bg-slate-950 dark:bg-slate-50 rounded-md lg:grid-cols-2 flex flex-col justify-center">
        <div className="text-center py-10">
          <section className="w-3/4 mx-auto flex flex-col gap-10">
            <div className="title flex flex-col items-center">
              <CrossIcon className="fill-red-600 rotate-45" height={90} width={90} />
              <h1 className="text-white dark:text-gray-800 text-3xl font-bold py-4">
                Access Denied
              </h1>
              <p className="w-full text-gray-100 dark:text-gray-600">
                Your account does not exist in our database. If you think this
                is a mistake please contact your administrator!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
