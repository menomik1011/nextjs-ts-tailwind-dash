import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { Icon } from "@iconify/react";
import { MouseEvent } from "react";
import { useRouter } from "next/router";

export default function SocialButtonGroup() {
  const router = useRouter();
  const onSocialClick = (e: MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    let provider: any;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };
  return (
    <div className="flex gap-2">
      <button
        onClick={onSocialClick}
        name="google"
        className="w-[calc(100%-0.25rem)] flex justify-center py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded cursor-pointer"
      >
        <span className="mr-1">Continue with Google</span>
        <Icon className="text-base" icon="mdi:google-plus" />
      </button>
      <button
        onClick={onSocialClick}
        name="github"
        className="w-[calc(100%-0.25rem)] flex justify-center py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded cursor-pointer"
      >
        <span className="mr-1">Continue with Github</span>
        <Icon className="text-base" icon="mdi:github" />
      </button>
    </div>
  );
}
