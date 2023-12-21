import { Service } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
}

const getServices = async (query: Query): Promise<Service[]> => {
  try {
    const url = qs.stringifyUrl({
      url: URL,
      query: {
        categoryId: query.categoryId,
      },
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);

    return [];
  }
};

export default getServices;

// import { Service } from '@/types';

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

// const getServices = async (): Promise<Service[]> => {
//   const res = await fetch(URL);

//   return res.json();
// };

// export default getServices;
