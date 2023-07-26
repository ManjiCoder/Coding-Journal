import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { revalidatePath } from "next/cache";

export default function ConfirmModal({ closeModal, deleteCard }) {
  const router = useRouter();
  // DELETE - REQUEST API CALL
  const removeCard = async (id) => {
    const toastId = toast.loading("Please wait...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/solutions/remove`,
        {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json",
            "auth-token": Cookies.get("token"),
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.update(toastId, {
          render: data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
        });
        router.replace("/");
        return;
      }
      // console.log(data.message);
      toast.update(toastId, {
        render: data.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
        closeOnClick: true,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Internal server error",
        type: "error",
        closeButton: true,
        closeOnClick: true,
      });
      console.log({ error });
    }
  };

  const handleOnDelete = () => {
    closeModal();
    removeCard(deleteCard._id);
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-11/12 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center dark:bg-slate-700 dark:text-white">
                  <Dialog.Title as="h3">
                    <i className="mb-3 fa-solid fa-circle-exclamation text-5xl text-red-600"></i>
                  </Dialog.Title>
                  <h2 className="text-2xl font-medium mb-3">Are you sure?</h2>
                  <h2 className="text-center font-medium mb-4">
                    Do you want to delete this Question?
                  </h2>
                  <h2 className="text-center font-medium mb-4">
                    {deleteCard.title} with Card No.
                    {deleteCard.index.toString().padStart(2, 0)}
                  </h2>
                  <div className="w-full mt-4 flex justify-evenly">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                      onClick={handleOnDelete}
                    >
                      Yes,I&apos;m sure!
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // formAction={() => removeCard(deleteCard._id)}
                      onClick={closeModal}
                    >
                      No, cancel!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
