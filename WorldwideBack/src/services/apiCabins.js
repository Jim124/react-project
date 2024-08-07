import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }
  return data;
}

export const createEditCabin = async (cabinData, id) => {
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const originalName = cabinData.image.name;
  const imageName = `${Math.random().toString()}-${originalName}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1 create and edit a cabin
  let query = supabase.from('cabins');
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);
  else query = query.update({ ...cabinData, image: imagePath }).eq('id', id);
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // upload image
  if (!hasImagePath) {
    const { error: storedError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, cabinData.image);
    if (storedError) {
      // Handle error
      deleteCabin(data.id);
      throw new Error(
        'Cabins could not be created and image could not be uploaded'
      );
    }
  }

  return data;
};
