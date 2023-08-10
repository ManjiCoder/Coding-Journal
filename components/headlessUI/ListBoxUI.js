import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck, BsChevronExpand } from "react-icons/bs";
import { useRouter } from "next/router";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function ListBoxUI({
  listBoxTitle,
  selected,
  setSelected,
  options,
}) {
  const { pathname } = useRouter();
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <label
            htmlFor="language"
            className="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white"
          >
            {listBoxTitle}
          </label>
          <Listbox.Button
            id="language"
            className="border border-gray-300 dark:border-gray-500 relative w-full cursor-default rounded-md bg-white dark:bg-gray-600 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:border-indigo-500 focus:ring-0 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-blue-500 sm:text-sm"
          >
            <span
              id="selectedLang"
              className={`block truncate capitalize dark:text-white ${
                selected === "" && "text-gray-500"
              }`}
            >
              {selected === "" ? "Select" : selected}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`border border-gray-300 dark:border-gray-500 absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-gray-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${
                pathname === "/" ? "w-36 sm:w-full" : "w-full"
              }`}
            >
              {options.map((Lang, LangIdx) => (
                <Listbox.Option
                  key={LangIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 capitalize ${
                      active
                        ? "bg-amber-100 text-amber-900"
                        : "text-gray-900 dark:text-white"
                    }`
                  }
                  value={Lang}
                >
                  {({ selected }) => (
                    <>
                      <span
                        id={Lang}
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {Lang}
                      </span>
                      {selected ? (
                        <span
                          id={Lang}
                          className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                        >
                          <BsCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
