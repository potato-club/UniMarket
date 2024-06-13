import { getClient } from '../libs/supabase';
import { AuctionEntity, ProductEntity } from '../constant/entity';
import { getuuid } from './mypage';

export const getOneProduct = async (id: number) => {
  const { supabase } = getClient();

  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('id', id);

  return { data };
};

export const getBeforeAuctionList = async () => {
  const { supabase } = getClient();

  const { data } = await supabase
    .from('product_card_view')
    .select('*')
    .is('bidder_id', null)
    .order('id', { ascending: false });

  return { data };
};
export const getAfterAuctionList = async () => {
  const { supabase } = getClient();
  const { data } = await supabase
    .from('product_card_view')
    .select('*')
    .not('bidder_id', 'is', null)
    .order('end_date', { ascending: false });

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
    .from('product')
    .insert([{ title, describe, photo, owner_id, min_price, created_at }]);

  return { data };
};

export const getMyProduct = async () => {
  const { supabase } = getClient();

  const { uuid } = await getuuid();
  const { data: mypost, error } = await supabase
    .from('product_card_view')
    .select('*')
    .eq('owner_id', uuid);

  return { mypost };
};

export const getMyDealProduct = async () => {
  const { supabase } = getClient();
  const { uuid } = await getuuid();
  const { data: mydeal, error } = await supabase
    .from('product_card_view')
    .select('*')
    .eq('bidder_id', uuid);

  return { mydeal };
};

export const updateDeletedProduct = async (id: number) => {
  const { supabase } = getClient();
  const { data: mydeal, error } = await supabase
    .from('product')
    .update({ deleted: true })
    .eq('id', id);

  return { mydeal };
};
