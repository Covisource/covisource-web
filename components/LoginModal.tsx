import { Dialog } from "@headlessui/react";
import Button from "~components/Button";
import { signIn } from "next-auth/client";

const LoginModal = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 bg-black bg-opacity-90 overflow-y-auto"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        {/* Closes the modal when clicked outside of */}
        <Dialog.Overlay className="fixed inset-0" />

        {/* Centers the Modal */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Actual Content */}
        <div className="bg-white rounded-lg inline-flex flex-col gap-2 w-96 p-6 my-8 overflow-hidden text-left align-middle transition-all transform">
          <h1 className="text-2xl font-bold mb-2">Login To Covisource.</h1>
          <Button
            onClick={() =>
              signIn("google", { callbackUrl: `${process.env.BASE_URL}/` })
            }
            className="ct-bg-muted flex items-center justify-center gap-1 w-full py-5 font-extrabold text-md ct-text-primary focus:outline-none focus:ring-1 focus:ring-gray-100"
          >
            <i className="fab fa-google mr-5"></i>
            <span>Login With Google</span>
          </Button>
          <Button
            onClick={() =>
              signIn("twitter", { callbackUrl: `${process.env.BASE_URL}/` })
            }
            className="ct-bg-muted flex items-center justify-center gap-1 w-full py-5 font-extrabold text-md ct-text-primary focus:outline-none focus:ring-1 focus:ring-gray-100"
          >
            <i className="fab fa-twitter mr-5"></i>
            <span>Login With Twitter</span>
          </Button>
          <Button
            onClick={() =>
              signIn("facebook", { callbackUrl: `${process.env.BASE_URL}/` })
            }
            className="ct-bg-muted flex items-center justify-center gap-1 w-full py-5 font-extrabold text-md ct-text-primary focus:outline-none focus:ring-1 focus:ring-gray-100"
          >
            <i className="fab fa-facebook mr-5"></i>
            <span>Login With Facebook</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;
