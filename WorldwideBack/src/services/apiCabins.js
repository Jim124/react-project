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

export const createCabin = async (cabinData) => {
  const originalName = cabinData.image.name;
  const imageName = `${Math.random().toString()}-${originalName}`.replaceAll(
    '/',
    ''
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1 create a cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabinData, image: imagePath }]);
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  // upload image
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

  return data;
};
