import { auth } from "@/firebase/app";
import {
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    const { loginDetails } = await req.json();

    setPersistence(auth, inMemoryPersistence);

    const credential = await signInWithEmailAndPassword(
      auth,
      loginDetails.email,
      loginDetails.password
    );

    const user = credential.user;

    const idToken = await user.getIdToken();

    const verifiedResponse = await fetch(
      "http://localhost:10888/api/v1/user/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "csrf-token": req.cookies.get("session")?.value
        },
        body: JSON.stringify({ idToken: idToken }),
      }
    );

    const verifiedResult = await verifiedResponse.json();

    console.log({ verifiedResult });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
    // return new Response(verifiedResult, { status: 200 });
  } catch (error) {
    console.log(error.code);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};
