import { BsInstagram, BsFacebook, BsGithub } from "react-icons/bs";
import logo from "../../../public/dentistFavIcon.png";

export function Footer() {
  return (
    <div className="flex h-24 items-center bg-neutral-100 dark:bg-base-200 justify-around w-screen">
      <div className="flex justify-center items-center flex-col gap-2 h-full">
        <img src={logo} alt="logo" className="w-12 h-12" />
        <h2 className="text-accent font-bold text-xl">HAP ODONTO</h2>
      </div>
      <div className="flex gap-8">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-accent-focus">
          <BsInstagram size={30} />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-accent-focus">
          <BsFacebook size={30} />
        </a>
        <a href="https://github.com/afrataiza/Checkpoint_Front_End_3/" target="_blank" rel="noreferrer" className="hover:text-accent-focus">
          <BsGithub size={30} />
        </a>
      </div>
    </div>
  );
}
