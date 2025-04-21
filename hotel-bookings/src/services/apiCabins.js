import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  //   This checks if the image is already a valid Supabase path (likely from an edit session).
  // If yes, we’ll reuse it. If no, we'll upload a new one.
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/edit Cabins
  let query = supabase.from("cabins");

  // Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not be created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  // eq is filter method provided by supabase and data and error we are getting from supabase
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
