"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "@/app/_lib/data-service";

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

export async function createReservationAction(reservationData, formData) {
  // Authourization
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { numNights, cabinPrice, cabinId } = reservationData;
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const hasBreakfast = formData.get("hasBreakfast") === "on" ? true : false;
  const extrasPrice = 15 * numGuests * numNights;

  const newReservation = {
    ...reservationData,
    numGuests,
    observations,
    hasBreakfast,
    extrasPrice,
    totalPrice: !hasBreakfast ? cabinPrice : cabinPrice + extrasPrice,
    guestId: session.user.guestId,
    status: "unconfirmed",
    isPaid: false,
  };

  await createBooking(newReservation);
  revalidatePath(`/cabins/${cabinId}`);
  redirect("/cabins/thankYou");
}

export async function deleteReservationAction(bookingId) {
  // await new Promise((res) => setTimeout(res, 2000));
  // throw new Error();

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const isAllowed = await checkMutationPermision(
    session.user.guestId,
    bookingId,
  );
  if (!isAllowed)
    throw new Error("You are not allowed to delete this reservation");

  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);
  const bookingId = Number(formData.get("bookingId"));

  const isAllowed = await checkMutationPermision(
    session.user.guestId,
    bookingId,
  );
  if (!isAllowed)
    throw new Error("You are not allowed to update this reservation");

  await updateBooking(bookingId, { observations, numGuests });

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

async function checkMutationPermision(guestId, bookingId) {
  const guestBookings = await getBookings(guestId);
  const bookingsIds = guestBookings.map((booking) => booking.id);
  const currentBooking = guestBookings.find(
    (booking) => booking.id === bookingId,
  );
  return (
    bookingsIds.includes(bookingId) && currentBooking.status !== "checked-out"
  );
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
