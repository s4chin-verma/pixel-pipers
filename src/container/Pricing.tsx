const Pricing: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-teal-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-blue-500 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-cyan-600">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit
          ut non voluptas in. Explicabo id ut laborum.
        </p>
        <div className="mt-16 flex justify-center">
          <fieldset className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-red-400">
            <legend className="sr-only">Payment frequency</legend>
            {/* <!-- Checked: "bg-indigo-600 text-white", Not Checked: "text-gray-500" --> */}
            <label className="cursor-pointer rounded-full px-2.5 py-1">
              <input type="radio" name="frequency" value="monthly" className="sr-only" />
              <span>Monthly</span>
            </label>
            {/* <!-- Checked: "bg-indigo-600 text-white", Not Checked: "text-gray-500" --> */}
            <label className="cursor-pointer rounded-full px-2.5 py-1">
              <input type="radio" name="frequency" value="annually" className="sr-only" />
              <span>Annually</span>
            </label>
          </fieldset>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="rounded-3xl p-8 ring-1 xl:p-10 ring-yellow-400">
            <h3 id="tier-freelancer" className="text-lg font-semibold leading-8 text-orange-600">
              Freelancer
            </h3>
            <p className="mt-4 text-sm leading-6 text-green-600">
              The essentials to provide your best work for clients.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              {/* <!-- Price, update based on frequency toggle state --> */}
              <span className="text-4xl font-bold tracking-tight text-pink-900">$15</span>
              {/* <!-- Payment frequency, update based on frequency toggle state --> */}
              <span className="text-sm font-semibold leading-6 text-purple-600">/month</span>
            </p>
            <a
              href="#"
              aria-describedby="tier-freelancer"
              className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-cyan-600 text-gray-600 shadow-sm hover:bg-red-500 focus-visible:outline-orange-600">
              Buy plan
            </a>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-gray-400">
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-yellow-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                5 products
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Up to 1,000 subscribers
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Basic analytics
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-teal-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                48-hour support response time
              </li>
            </ul>
          </div>
          <div className="rounded-3xl p-8 ring-1 xl:p-10 ring-gray-700">
            <h3 id="tier-startup" className="text-lg font-semibold leading-8 text-gray-900">
              Startup
            </h3>
            <p className="mt-4 text-sm leading-6 text-cyan-600">
              A plan that scales with your rapidly growing business.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              {/* /\   <!-- Price, update based on frequency toggle state --> */}
              <span className="text-4xl font-bold tracking-tight text-yellow-700">$30</span>
              {/* <!-- Payment frequency, update based on frequency toggle state --> */}
              <span className="text-sm font-semibold leading-6 text-teal-600">/month</span>
            </p>
            <a
              href="#"
              aria-describedby="tier-startup"
              className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white shadow-sm hover:bg-green-800 focus-visible:outline-red-600">
              Buy plan
            </a>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-pink-600">
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-purple-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                25 products
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-yellow-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Up to 10,000 subscribers
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Advanced analytics
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                24-hour support response time
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-orange-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Marketing automations
              </li>
            </ul>
          </div>
          <div className="rounded-3xl p-8 ring-1 xl:p-10 bg-gray-900 ring-gray-900">
            <h3 id="tier-enterprise" className="text-lg font-semibold leading-8 text-white">
              Enterprise
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              Dedicated support and infrastructure for your company.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-white">Custom</span>
            </p>
            <a
              href="#"
              aria-describedby="tier-enterprise"
              className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white">
              Contact sales
            </a>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 xl:mt-10 text-gray-300">
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Unlimited products
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Unlimited subscribers
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Advanced analytics
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                1-hour, dedicated support response time
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Marketing automations
              </li>
              <li className="flex gap-x-3">
                <svg
                  className="h-6 w-5 flex-none text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Custom reporting tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
