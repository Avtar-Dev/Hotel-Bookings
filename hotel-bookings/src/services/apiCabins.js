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
  const hasImagePath = newCabin.image?.startsWith?.(supabase);

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
  if (!id) query.insert([{ ...newCabin, image: imagePath }]);

  // Edit
  if (id) query.update({ other_column: "otherValue" }).eq("id", id).select();

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
