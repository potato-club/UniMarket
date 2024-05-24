import { getClient } from '../libs/supabase';
import { AuctionEntity, ProductEntity } from '../constant/entity';

export const getMyProduct = async (): Promise<{
  mypost: AuctionEntity[] | null;
}> => {
  const { supabase } = getClient();

  const { data: userData } = await supabase.auth.getUser();
  const { data: mypost, error } = await supabase
    .from('product')
    .select('*')
    .eq('owner_id', userData.user?.id);

  return { mypost };
};

export const getOneProduct = async (id: number) => {
  const { supabase } = getClient();

  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('id', id);

  return { data };
};

export const createProduct = async ({
  title,
  describe,
  photo,
  owner_id,
  min_price,
  created_at,
}: ProductEntity) => {
  const { supabase } = getClient();
  const { data, error } = await supabase
    .from('auction')
    .insert([{ title, describe, photo, owner_id, min_price, created_at }]);

  return { data };
};