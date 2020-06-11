const Two_Treatments = {
  name: 'Buy 2 Treatments - Save 43%',
  price: '77',
  weight: 12,
  dimensions: {
    l: 8.5,
    w: 12,
    h: 1,
  },
};

const Single_Treatment = {
  name: 'Single Treatment',
  price: '67',
  weight: 7,
  dimensions: {
    l: 6,
    w: 9,
    h: 1,
  },
};

export function getItemInfo(itemName) {
  switch (itemName) {
    case 'Buy 2 Treatments - Save 43%':
      return {
        ItemWeight: Two_Treatments.weight,
        ItemLength: Two_Treatments.dimensions.l,
        ItemWidth: Two_Treatments.dimensions.w,
        ItemHeight: Two_Treatments.dimensions.h,
      };
    case 'Single Treatment':
      return {
        ItemWeight: Single_Treatment.weight,
        ItemLength: Single_Treatment.dimensions.l,
        ItemWidth: Single_Treatment.dimensions.w,
        ItemHeight: Single_Treatment.dimensions.h,
      };

    default:
      console.log('No item found for: ', itemName);
      return {};
  }
}
