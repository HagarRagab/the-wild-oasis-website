"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { updateGuest } from "@/app/_lib/data-service";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,16}$/.test(nationalID))
    throw new Error("Please add valid nationalID");

  const updatedData = {
    nationality,
    nationalID,
    countryFlag,
  };

  await updateGuest(session.user.guestId, updatedData);

  revalidatePath("/account/profile");
  redirect("/account");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
